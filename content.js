const BTN_ID = 'leetprint-btn';

function printProblem() {
  const title = document.querySelector('div.text-title-large')?.textContent ?? document.title;
  const difficulty = document.querySelector('div[class*="text-difficulty"]')?.textContent ?? '';
  const desc = document.querySelector('[data-track-load="description_content"]');
  if (!desc) return alert('LeetPrint: problem description not found.');

  // Hidden iframe: prints in place, no new tab, no popup blocker.
  const f = document.createElement('iframe');
  f.style.cssText = 'position:fixed;width:0;height:0;border:0;visibility:hidden';
  document.body.appendChild(f);
  const d = f.contentDocument;
  d.open();
  d.write(`<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
  body{font:14px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:800px;margin:32px auto;padding:0 16px;color:#111}
  h1{font-size:22px;margin:0 0 4px}
  .diff{color:#666;margin-bottom:20px}
  pre{background:#f5f5f5;padding:10px;border-radius:4px;white-space:pre-wrap}
  code{background:#f0f0f0;padding:1px 4px;border-radius:3px}
  :not(pre)>code{white-space:nowrap}
  img{max-width:100%}
  table{border-collapse:collapse;margin:8px 0}
  td,th{border:1px solid #999;padding:4px 8px}
</style></head><body>
<h1>${title}</h1><div class="diff">${difficulty}</div>${desc.innerHTML}
</body></html>`);
  d.close();
  f.contentWindow.onafterprint = () => f.remove();
  f.contentWindow.focus();
  f.contentWindow.print();
}

function addButton() {
  if (document.getElementById(BTN_ID)) return;
  const row = document.querySelector('div.text-title-large')?.parentElement;
  if (!row) return;
  const btn = document.createElement('button');
  btn.id = BTN_ID;
  btn.textContent = '🖨 Print';
  btn.style.cssText = 'margin-left:auto;padding:2px 10px;border:1px solid #ccc;border-radius:6px;background:transparent;color:inherit;font-size:13px;cursor:pointer;white-space:nowrap';
  btn.onclick = printProblem;
  row.appendChild(btn);
}

addButton();
new MutationObserver(addButton).observe(document.body, { childList: true, subtree: true });
