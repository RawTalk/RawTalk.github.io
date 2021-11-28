const blogPostsContainer = $('#blogPostsContainer')
const blogPosts = $('#blogPosts')
let postCount = parseInt(blogPosts.getAttribute('data-count'))

let blogData = JSON.parse(getSessionStorageWithExpiry('blogData'))

if (blogData==null) {
    // let timeNow = Math.ceil(Math.random()*1000000)
    let timeNow = Date.now() - 10
    const blog_api_url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ocnarfchan?t=${timeNow}`
    fetch(blog_api_url)
        .then(response => response.json())
        .then(function(data) {
            blogData = []
            for (let i = 0; i < data.items.length; i++) {
                let di  = data.items[i]
                let pubDate = new Date(di.pubDate)
                pubDate = pubDate.toLocaleDateString('en-GB',{year: 'numeric', month: 'short', day: 'numeric'})

                let dout = {
                    title: di.title,
                    pubDate: pubDate,
                    link: di.link,
                    thumbnail: di.thumbnail,
                    description: getAbstract(di.description),
                    categories: di.categories,
                    thumbnailSize: 'cover'
                }
                if (dout.thumbnail.startsWith('https://medium.com')) {
                    dout.thumbnail = "img/RawTalkLogo.svg"
                    dout.thumbnailSize = 'contain'
                }

                blogData.push(dout)
            }
            setSessionStorageWithExpiry('blogData', JSON.stringify(blogData))
            drawBlogPosts(blogData)
        })
} else {
    drawBlogPosts(blogData)
}

function getAbstract(str, maxLength=120) {
    str = str.replace(/<figure>(.*?)<\/figure>/g,"") //replace with your string.
    str = str.replace(/<img[^>]*>/g,"") //replace with your string.
    str = str.replace('h4', 'p')
    str = str.replace('h3', 'p')
    str = str.substr(0, maxLength)
    
    str = str.substr(0, Math.min(str.length, str.lastIndexOf(" "))) //re-trim if we are in the middle of a word
    str = `${str}...`
    return str
}

function drawBlogPosts(blogData) {
    postCount = Math.min(postCount, blogData.length)
    if (postCount==0) {
        blogPostsContainer.innerHTML = ''
    }

    for (let i = 0; i < postCount; i++) {
        let dout = blogData[i] 
        let categoriesHTML = ''
        dout.categories.forEach(c => {
            categoriesHTML = `${categoriesHTML} <span class="post__tag">${c}</span>`
        })

        let includePubDate = ''
        let blogDate = $('#blogDate')
        if (blogDate != null) {
            blogDate.innerHTML = dout.pubDate
        } else {
            includePubDate = `<div class="section__date" style="margin-left: -3px">${dout.pubDate}</div>`
        }

        blogPosts.insertAdjacentHTML('beforeend', `
            <a href="${dout.link}" target="_blank">
                <div class="section section--iconText hoverFillParent" style="position: relative;">
                    <div class="section__icon" style="background-image: url('${dout.thumbnail}'); background-size: ${dout.thumbnailSize}; background-color: #020E1E"></div>
                    <div class="section__textGroup">
                        <div class="post__title">
                            ${dout.title} 
                            <span style="padding-right: 3px;"></span>
                            ${includePubDate}
                        </div>
                        
                        <div>${dout.description}</div>
                        <div>${categoriesHTML}</div>
                        <div class="newTab"></div>
                        <div class="hoverFill hoverFill--blue"></div>
                    </div>
                </div>
            </a>
        `)
    }
}

function setSessionStorageWithExpiry(key, value, ttl=3600*1000) {
    // ttl = 3600*1000, default 1 hour until expiry
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    sessionStorage.setItem(key, JSON.stringify(item))
}

function getSessionStorageWithExpiry(key) {
    const itemStr = sessionStorage.getItem(key)
    if (!itemStr) return null

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        sessionStorage.removeItem(key)
        return null
    }
    return item.value
}