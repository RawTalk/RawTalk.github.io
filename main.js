// helper functions
function $(x) {return document.querySelector(x);}
function classArray(x) {return document.getElementsByClassName(x);}

function extractCDATA(str) {
    str = str.replace("<![CDATA[","");
    str = str.replace("]]>","");
    return str;
}

// set year
const yearSpan = $('#year');
yearSpan.innerHTML = new Date().getFullYear();

// fetch latest podcast info from anchor.fm
const podcast = $('#podcast');
const podcast__date = $('#podcast__date');
const podcast__title = $('#podcast__title');
const podcast__details = $('#podcast__details');
const PODCAST_RSS_URL = "https://anchor.fm/s/3bc51044/podcast/rss";

fetch(PODCAST_RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        const items = data.querySelectorAll("item");
        let items__latest = items[0];
        
        let pubDate = items__latest.querySelector("pubDate").innerHTML;
        let pubTitle = items__latest.querySelector("title").innerHTML;
        let pubDetails = items__latest.querySelector("description").innerHTML;

        pubDate = "<strong>Latest Podcast</strong>: ".concat(pubDate.substring(5, 16)); // extract date
        pubTitle = extractCDATA(pubTitle);
        pubDetails = extractCDATA(pubDetails);

        podcast__date.innerHTML = pubDate;
        podcast__title.innerHTML = pubTitle;
        podcast__details.innerHTML = pubDetails;

        podcast.href = items__latest.querySelector("link").innerHTML;
    })

// typewriter loop
const typewriteSpan = $('#typewriteSpan');
var typewriter = new Typewriter(typewriteSpan, {
    loop: true,
    delay: 50,
    cursor: '_',
})

typewriter
    .pauseFor(300)
    .typeString('join')
    .pauseFor(2000)
    .deleteAll(50)
    .typeString('follow')
    .pauseFor(2000)
    .deleteAll(50)
    .typeString('like')
    .pauseFor(2000)
    .deleteAll(50)
    .start();