const { chromium, firefox }=require('playwright-core');
const fs=require('fs'); const assert=require('assert');
const origin=process.env.SITE_URL || 'http://127.0.0.1:4000/portfolio_Hyeongjin_Kim/';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || '/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
 const results=[];let failures=[];
 for(const width of [320,390,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  for(const route of ['', 'research/','publications/','projects/','honors/','experience/','cv/','projects/smart-stroller/','publications/split-federated-dqn/']){
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(origin+route,{waitUntil:'networkidle'});
   await page.evaluate(async()=>{for(const im of document.images){im.loading='eager';}await Promise.all([...document.images].filter(im=>im.getAttribute('src')).map(im=>im.decode().catch(()=>{})));});
   const dom=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>i.getAttribute('src')&&!i.naturalWidth).map(i=>i.src),h1:document.querySelectorAll('h1').length}));
   await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const axe=await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})));
   results.push({width,route,dom,errors,violations:axe});
   if(dom.overflow||dom.brokenImages.length||dom.h1!==1||errors.length||axe.length)failures.push({width,route,dom,errors,violations:axe});
  }
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844}});
 await page.goto(origin+'honors/');
 const toggle=page.locator('.menu-toggle');await toggle.focus();await page.keyboard.press('Enter');assert.equal(await toggle.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
 const doc=page.locator('.document-card a').first();await doc.focus();await page.keyboard.press('Enter');assert(await page.locator('dialog').evaluate(e=>e.open));
 await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)));
 await page.keyboard.press('Escape');assert(!(await page.locator('dialog').evaluate(e=>e.open)));assert(await doc.evaluate(e=>e===document.activeElement));
 await page.goto(origin+'cv/');assert(await page.locator('object[type="application/pdf"]').count()===1);assert(await page.locator('object a').count()===2);
 const downloadPromise=page.waitForEvent('download');await page.locator('.cv-actions [download]').click();const download=await downloadPromise;assert.equal(download.suggestedFilename(),'Hyeongjin_Kim_CV.pdf');await download.saveAs(require('path').join(require('os').tmpdir(), 'hyeongjin-downloaded-cv.pdf'));
 const popupPromise=page.waitForEvent('popup');await page.locator('.cv-actions [target="_blank"]').click();const popup=await popupPromise;await popup.waitForLoadState();assert(popup.url().includes('/files/Hyeongjin_Kim_CV.pdf'));await popup.close();
 await page.goto(origin+'resume/');assert(page.url().endsWith('/cv/'));await page.goto(origin+'awards/');assert(page.url().endsWith('/honors/'));
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const nojs=await context.newPage();await nojs.goto(origin+'honors/');assert(await nojs.locator('#site-nav').isVisible());assert(await nojs.locator('.document-card a').first().getAttribute('href'));await context.close();
 fs.writeFileSync(process.env.REPORT_PATH || '/tmp/hyeongjin-browser-verification.json',JSON.stringify({results,failures,interactionChecks:'Menu keyboard/Escape; dialog keyboard/focus; PDF download/open/fallback; legacy redirects; no-JS navigation and image links'},null,2));console.log(JSON.stringify({cases:results.length,failures,interactionChecks:'passed'}));
 await browser.close();process.exitCode=failures.length?1:0;
})();
