# LeetPrint

Manifest V3 Chrome extension: adds a **🖨 Print** button to LeetCode problem and solution pages
and prints a clean view of the content.

## Layout

No build step, no dependencies, no permissions. One content script.

- `manifest.json`: content script matches `leetcode.com` / `leetcode.cn` problem and contest
  problem URLs. `problems/*` also covers solution pages (`problems/<slug>/solutions/<id>/...`).
- `content.js`:
  - `addButtons()` runs on load and on every DOM mutation (LeetCode is an SPA). It adds
    the problem button (`#leetprint-btn`) next to `div.text-title-large`, and the solution
    button (`#leetprint-sol-btn`) after the solution title `div[class*="text-[22px]"]`
    when a solution body `div[class*="_markdown"]` exists.
  - `printProblem()` / `printSolution()` collect title, subtitle and content HTML, then call
    `printHtml()`.
  - `printHtml()` writes a hidden iframe, copies the page's `<link rel=stylesheet>` and
    `<style>` tags into it (KaTeX in solutions renders only as HTML and needs LeetCode's CSS),
    overrides typography reset by Tailwind (`.lp-body` rules), and prints on iframe `load`
    so stylesheets and fonts are ready. Title and subtitle are set with `textContent`.
- `icons/`: `icon.svg` source. Regenerate PNGs with:

```sh
for n in 16 32 48 128; do rsvg-convert -w $n -h $n icons/icon.svg -o icons/icon$n.png; done
```

LeetCode selectors are hashed or utility classes and can change; when a button disappears,
inspect the live page and update the selectors in `content.js`.

## Versioning

Bump the version in `manifest.json` with every code change.

- Format: `6.<month>.<DDNN>`, where `DD` is the day and `NN` the build number that day,
  starting at `01`. Example: the second build on Nov 7 is `6.11.0702`.
- Chrome forbids leading zeros in `version`, so strip them there and keep the padded form in
  `version_name`: `"version": "6.11.702"`, `"version_name": "6.11.0702"`.

## Testing

1. `node --check content.js`.
2. Reload the unpacked extension at `chrome://extensions` and try a problem page and a
   solution page.
3. When automating a browser, don't call `print()` (the dialog blocks automation): inject the
   script with the `w.print()` call replaced by making the iframe visible, then screenshot.

## Git

- Commit by feature: one commit per user-visible change, even if made together.
- Commit messages in English, imperative mood, short subject line.
- Remote: `git@github-raymond:raydaemon/LeetPrint.git`, branch `main`.
