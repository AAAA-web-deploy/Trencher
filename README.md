# TRENCHER — Ethereum edition

A static website based on the supplied saved reference site, with the generated Doge and blue artwork. The corrected blue city and armored vehicle is `dist/TRENCHER_files/dog.webp`. The layout includes the reference navigation, hero, scrolling marquee, about, how-to-buy, tokenomics, meme gallery/lightbox, and footer.

## Run locally

The site requires no build or dependencies. From this folder run:

```sh
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. Deploy the contents of `dist/` to any static host, with `index.html` as its entry point.

## Configure before publishing

Edit `dist/TRENCHER_files/site-config.js`. Set the Ethereum contract address, verified exchange URL, official X and Telegram URLs, and verified tokenomics. Blank values display “Coming soon” or a friendly notice; the contract copy buttons remain disabled until a valid 0x address is supplied. Never use someone else's contract address or claim token details that you have not confirmed. Review the text in `dist/index.html`, particularly the How to Buy and tokenomics descriptions, after setting the values.

## Notes

The provided reference archive did not contain its original hero background or its three web fonts. This build uses the generated Doge hero and DejaVu Sans Bold as a bundled substitute, so the result follows the reference structure and styling but is not pixel-identical. The generated illustrations can differ from the originals. Third-party font license information is in `dist/fonts/LICENSE-DejaVu.txt`.
