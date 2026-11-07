<p align="center"><img src="icons/icon128.png" width="96" alt="LeetPrint icon"></p>

# LeetPrint

Chrome extension (Manifest V3) that adds a **🖨 Print** button to LeetCode problem and solution pages.

- **Problem pages**: button next to the title; prints the title, difficulty and description.
- **Solution pages**: button under the solution title; prints the solution title, problem name and
  the full write-up, including KaTeX math, images and the currently selected code tab.

Works on:

- `leetcode.com/problems/*` and `leetcode.cn/problems/*`
- Contest problems: `leetcode.com/contest/*/problems/*` and `leetcode.cn/contest/*/problems/*`
- Community solutions: `leetcode.com/problems/*/solutions/*` (e.g.
  https://leetcode.com/problems/maximize-meeting-earnings-with-idle-gaps/solutions/8549252/gaps-only-depend-on-first-last-staircase-mmad/)

## Install

1. Open `chrome://extensions`, enable **Developer mode**.
2. Click **Load unpacked**, select this folder.
3. Open any problem, e.g. https://leetcode.com/problems/count-shadow-pairs-i/description/

## Files

- `manifest.json` — extension manifest
- `content.js` — injects the Print buttons and builds the print view in a hidden iframe
- `icons/` — `icon.svg` source and rendered PNGs (16/32/48/128)

## License

See [LICENSE](LICENSE).
