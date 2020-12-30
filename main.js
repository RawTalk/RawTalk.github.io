// scroll reveal elements
ScrollReveal().reveal('#welcome', { delay: 0, scale: 0.9, container: 'body'});
ScrollReveal().reveal('#socialsContainer',{ delay: 250, scale: 0.9, distance: '10px', container: 'body'});
ScrollReveal().reveal('.socialsReveal', { interval: 120, scale: 0.7, container: 'body'});
ScrollReveal().reveal('#googleFormContainer', { delay: 900, scale: 1})
ScrollReveal().reveal('#podcastContainer', { delay: 1200, scale: 0.9, distance: '10px', container: 'body'});
ScrollReveal().reveal('#sendQuestionContainer', { delay: 1300, scale: 0.5})
ScrollReveal().reveal('#calendarContainer', {delay: 1300, scale: 0.9, distance: '10px', container: 'body'});
ScrollReveal().reveal('.associates__item', { interval: 100, scale: 0.3, viewFactor: 0.6});

// helper functions
function $(x) {return document.querySelector(x);}

function extractCDATA(str) {
    str = str.replace("<![CDATA[","");
    str = str.replace("]]>","");
    return str;
}

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
