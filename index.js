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