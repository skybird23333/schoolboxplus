//Check if the current page is schoolbox
if(document.querySelector('meta[name="author"]').content == 'Schoolbox Pty Ltd') {
    if(window.location.pathname.match(/learning\/grades/)) {
        console.log('Page recognised: Grades')
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
        // /learning/grades
        function embedScriptInPage() {
            const script = document.createElement("script");
            script.setAttribute('src', chrome.runtime.getURL('embeds/grades.js'))
            document.documentElement.appendChild(script);
        }
    }
    
    if(window.location.pathname.match(/\//)) {
        console.log('Page recognised: Index')
        const script = document.createElement("script");
        script.setAttribute('src', chrome.runtime.getURL('embeds/index.js'))
        document.documentElement.appendChild(script);

    }
}
