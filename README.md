<p align="center"><img src="icons/icon128.png" width="96" alt="LeetPrint icon"></p>

# LeetPrint

Chrome extension (Manifest V3) that adds a **🖨 Print** button next to the title on LeetCode problem pages.
Clicking it opens a clean page with only the title, difficulty and description, then prints it.

Works on:

- `leetcode.com/problems/*` and `leetcode.cn/problems/*`
- Contest problems: `leetcode.com/contest/*/problems/*` and `leetcode.cn/contest/*/problems/*`

## Install

1. Open `chrome://extensions`, enable **Developer mode**.
2. Click **Load unpacked**, select this folder.
3. Open any problem, e.g. https://leetcode.com/problems/count-shadow-pairs-i/description/

## Files

- `manifest.json` — extension manifest
- `content.js` — injects the Print button and builds the print view
- `icons/` — `icon.svg` source and rendered PNGs (16/32/48/128)

## License

See [LICENSE](LICENSE).
