const BTN_ID = 'leetprint-btn';
const SOL_BTN_ID = 'leetprint-sol-btn';

function printHtml(title, subtitle, html) {
  // Hidden iframe: prints in place, no new tab, no popup blocker.
  const f = document.createElement('iframe');
  f.style.cssText = 'position:fixed;width:0;height:0;border:0;visibility:hidden';
  document.body.appendChild(f);
  // Page stylesheets carry KaTeX (solution math) and code-block styles.
  const pageStyles = [...document.querySelectorAll('link[rel="stylesheet"], style')].map(e => e.outerHTML).join('');
  const d = f.contentDocument;
  d.open();
  // CSP first: solution HTML is user-authored and re-parsed here, so no script may run.
  d.write(`<!doctype html><html><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="script-src 'none'; object-src 'none'">${pageStyles}
<style>
  html,body{height:auto!important;overflow:visible!important;background:#fff!important}
  body{font:14px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:800px;margin:32px auto;padding:0 16px;color:#111}
  h1.lp-title{font-size:22px;margin:0 0 4px}
  .lp-sub{color:#666;margin-bottom:20px}
  pre{background:#f5f5f5;padding:10px;border-radius:4px;white-space:pre-wrap}
  code{background:#f0f0f0;padding:1px 4px;border-radius:3px}
  :not(pre)>code{white-space:nowrap}
  pre code{background:none;padding:0}
  img{max-width:100%}
  table{border-collapse:collapse;margin:8px 0}
  td,th{border:1px solid #999;padding:4px 8px}
  button{display:none!important}
  .lp-body h1{font-size:20px;font-weight:600;margin:20px 0 8px}
  .lp-body h2{font-size:17px;font-weight:600;margin:16px 0 6px}
  .lp-body h3,.lp-body h4,.lp-body h5,.lp-body h6{font-size:15px;font-weight:600;margin:12px 0 4px}
  .lp-body p{margin:8px 0}
  .lp-body ul{list-style:disc;padding-left:24px;margin:8px 0}
  .lp-body ol{list-style:decimal;padding-left:24px;margin:8px 0}
  .lp-body div{overflow:visible!important}
  pre,pre *{white-space:pre-wrap!important;word-break:break-word}
</style></head><body>
<h1 class="lp-title"></h1><div class="lp-sub"></div><div class="lp-body">${html}</div>
</body></html>`);
  d.close();
  d.title = title;
  d.querySelector('.lp-title').textContent = title;
  d.querySelector('.lp-sub').textContent = subtitle;
  const w = f.contentWindow;
  w.onafterprint = () => f.remove();
  // Wait for copied stylesheets/fonts, otherwise math prints unstyled.
  w.onload = () => { w.focus(); w.print(); };
}

function printProblem() {
  const title = document.querySelector('div.text-title-large')?.textContent ?? document.title;
  const difficulty = document.querySelector('div[class*="text-difficulty"]')?.textContent ?? '';
  const desc = document.querySelector('[data-track-load="description_content"]');
  if (!desc) return alert('LeetPrint: problem description not found.');
  printHtml(title, difficulty, desc.innerHTML);
}

function printSolution() {
  const title = document.querySelector('div[class*="text-[22px]"]')?.textContent ?? document.title;
  const body = document.querySelector('div[class*="_markdown"]');
  if (!body) return alert('LeetPrint: solution content not found.');
  const problem = document.title.replace(/ - LeetCode.*$/, '');
  printHtml(title, `Solution · ${problem}`, body.innerHTML);
}

function makeButton(id, onclick) {
  const btn = document.createElement('button');
  btn.id = id;
  btn.textContent = '🖨 Print';
  btn.style.cssText = 'margin-left:auto;padding:2px 10px;border:1px solid #ccc;border-radius:6px;background:transparent;color:inherit;font-size:13px;cursor:pointer;white-space:nowrap';
  btn.onclick = onclick;
  return btn;
}

function addButtons() {
  if (!document.getElementById(BTN_ID)) {
    document.querySelector('div.text-title-large')?.parentElement.appendChild(makeButton(BTN_ID, printProblem));
  }
  if (!document.getElementById(SOL_BTN_ID) && document.querySelector('div[class*="_markdown"]')) {
    document.querySelector('div[class*="text-[22px]"]')?.after(makeButton(SOL_BTN_ID, printSolution));
  }
}

addButtons();
new MutationObserver(addButtons).observe(document.body, { childList: true, subtree: true });
