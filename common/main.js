function $(x) {return document.querySelector(x)}

let hamburger = $('#hamburger')
let sideBar = $('#sideBar')
let modalCover = $('#modalCover')
hamburger.addEventListener('click', function() {
    sideBar.classList.add('show')
    modalCover.classList.add('show') 
})
modalCover.addEventListener('click', function() {
    sideBar.classList.remove('show')
    modalCover.classList.remove('show')
})

// set twemoji
twemoji.parse(document.body, {
    folder: 'svg',
    ext: '.svg'
})

// set year
const yearSpan = $('#year')
yearSpan.innerHTML = new Date().getFullYear()


// light dark theme toggle
let twitterFeeds = document.getElementsByClassName('twitter-timeline')
let darkThemeToggle = $('#darkThemeToggle')
let body = $('body')
let isDark = false
let isDarkLocal = eval(localStorage.getItem('isDarkTheme'))
if (isDarkLocal !== null) isDark = isDarkLocal
if (isDark) toggleDarkTheme('dark')
darkThemeToggle.addEventListener('click', function() {
    if (isDark) toggleDarkTheme('light')
    else toggleDarkTheme('dark')
    isDark = !isDark
    localStorage.setItem('isDarkTheme', isDark.toString())
})
function toggleDarkTheme(darkLightTheme) {
    if (darkLightTheme=='dark') {
        body.classList.add('dark')
        changeTwitterTheme('light', 'dark')
        darkThemeToggle.innerHTML = 'Light Theme'
    } else {
        body.classList.remove('dark')
        changeTwitterTheme('dark', 'light')
        darkThemeToggle.innerHTML = 'Dark Theme'
    }
    sideBar.classList.remove('show')
    modalCover.classList.remove('show')
}

// change twitter theme (dark light)
function changeTwitterTheme(darkLightFrom, darkLightTo) {
    for (let i=0; i<twitterFeeds.length; i++) {
        if (twitterFeeds[i].contentDocument==null) {
            // before twitter embed loaded
            twitterFeeds[i].setAttribute('data-theme', darkLightTo)
        } else {
            // after twitter embed loaded
            twitterFeeds[i].contentDocument.head.children[2].href = 
                twitterFeeds[i].contentDocument.head.children[2].href.replace(darkLightFrom,darkLightTo)
        }
    }
}

function copyText(that) {
    text = that.getAttribute('data-copytext')
    navigator.clipboard.writeText(text)
    that.classList.add('clicked')
    setTimeout( function(){that.classList.remove('clicked')}, 1000)
}