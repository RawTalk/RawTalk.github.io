# website source code

`img` folder contains images

`CNAME` is for the URL configuration, see [Enforce HTTPS in GitHub Pages with Namecheap Domain (youtube video)](https://www.youtube.com/watch?v=FBtehan5DAo&list=LL). Namecheap account belongs to Zakaria.

`README.md` is this file.

`index.html` is the homepage.

`commonElements.js` contains common elements (such as **side bar**) that can appear on all pages.

`main.js` and `style.css` are the common JavaScript and CSS for all pages.

## non-static components
Some components have texts that are fetched (on page load) from other websites (eg Anchor.fm or Google Calendar) so web developers don't need to manually update those components.

1. The information of `Latest Podcast` is fetched from Anchor.fm, details are inside `main.js` (search `fetch latest podcast info from anchor.fm`)

2. The Google Calendar embed is in an iframe in `index.html`. The linked Google Calendar belongs to justrawtalk@gmail.com. For password ask Zakaria. 

3. Twitter latest feed.

4. The year field at the bottom of the side bar is statically set as 2021, but the JavaScript will replace it to the current year. See `main.js` (search `// set year`)

## Libraries used
1. `typewriter` for type writing the "Feel free to join -> follow -> like us"

2. `threeJS` for water well 3D model, in "water well project" page.