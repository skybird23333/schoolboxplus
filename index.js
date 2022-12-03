// async function init() {
//     const url = chrome.runtime.getURL('template.html')
//     console.log(url)
//     //load in the overlay from the extension
//     const res = await fetch(url)
//     //yes it uses fetch. no its not my issue if you have an outdated browser.
//     document.body.innerHTML += await res.text()
// }

// init()

const checkElementLoadedInterval = setInterval(checkPageLoad, 1000)

// Check whether the page(or the function we need) has been loaded/initialized
function checkPageLoad() {
    try {
        if(document.querySelector('#subject-graph')) {
            console.log('page loaded')
            embedScriptInPage()
            clearInterval(checkElementLoadedInterval)
        }
    } catch(e) {
        console.log(e)
        console.log('page loading')
    }
}

function embedScriptInPage() {
    const script = document.createElement("script");
    script.setAttribute('src', chrome.runtime.getURL('embedded.js'))
    document.documentElement.appendChild(script);
}