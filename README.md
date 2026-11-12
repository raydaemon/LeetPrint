<p align="center"><img src="icons/icon128.png" width="96" alt="LeetPrint icon"></p>

# LeetPrint

Chrome extension (Manifest V3) that adds a **🖨 Print** button to LeetCode problem and solution pages.

- **Problem pages**: button next to the title; prints the title, difficulty and description.
- **Solution pages**: button under the solution title; prints the solution title, problem name and
  the full write-up, including KaTeX math, images and the currently selected code tab.
- **Ink-friendly**: no background fills; code blocks get a thin border instead of a gray box.

Works on:

- `leetcode.com/problems/*` and `leetcode.cn/problems/*`
- Contest problems: `leetcode.com/contest/*/problems/*` and `leetcode.cn/contest/*/problems/*`
- Community solutions: `leetcode.com/problems/*/solutions/*` (e.g.
  https://leetcode.com/problems/maximize-meeting-earnings-with-idle-gaps/solutions/8549252/gaps-only-depend-on-first-last-staircase-mmad/)

## Install

Get the code, either way:

- **Download**: [LeetPrint.zip](https://github.com/raydaemon/LeetPrint/releases/latest/download/LeetPrint.zip)
  (latest release) and unzip it, or
- **Clone**: `git clone https://github.com/raydaemon/LeetPrint.git`

Then:

1. Open `chrome://extensions`, enable **Developer mode**.
2. Click **Load unpacked**, select the `LeetPrint` folder.
3. Open any problem, e.g. https://leetcode.com/problems/count-shadow-pairs-i/description/

To update: download the new zip (or `git pull`), then click the reload icon on the LeetPrint card
in `chrome://extensions`.

## Files

- `manifest.json` — extension manifest
- `content.js` — injects the Print buttons and builds the print view in a hidden iframe
- `icons/` — `icon.svg` source and rendered PNGs (16/32/48/128)

## Privacy & security

- No permissions, no network requests, no data collected: everything runs in the page.
- The print view is a hidden iframe with a `script-src 'none'` Content Security Policy, so
  user-written solution HTML can't run scripts while it is being printed.

## License

See [LICENSE](LICENSE).
