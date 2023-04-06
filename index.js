const themeStyles = `
:root {
    --background-primary: #111111;
    --background-secondary: #2a2a2a;
    --background-tertiary: #333333;
    --foreground-primary: rgb(221, 221, 221);
    --foreground-secondary: rgb(165, 165, 165);
    --foreground-border: rgb(56, 56, 56);

    /* Navigation bar on the top */
    --navigation-foreground: var(--foreground-primary);
    --navigation-background: var(--background-secondary);
    /* Any *-hover applies to the background */
    --navigation-hover: var(--background-tertiary);

    /* Applies to the links sidebar on the left, and 
       notifications(though notifications has its own styles)
    */
    --off-canvas-foreground: var(--foreground-primary);
    --off-canvas-background: var(--background-secondary);
    --off-canvas-hover: var(--background-tertiary);

    /* The popup from clicking on profile picture.
    */
    --accounts-menu-foreground: var(--foreground-primary);
    --accounts-menu-background: var(--background-primary);
    --accounts-menu-hover: var(--foreground-tertiary);

    /* Most texts on main page.
    */
    --content-ui-foreground: var(--foreground-primary);
    /* Seems to only apply to "SEE ALL" button on notifications.
    */
    --content-ui-background: var(--background-primary);
    --content-ui-hover: var(--background-tertiary);

    /* Used to indicate selection in multiple locations
    - Breadcrumb nav, to indicate current page
    - Marks rubric, to indicate the level allocated
    Theres definitely more
    */
    --content-ui-selected: var(--background-tertiary);
    
    /* Unknown */
    --content-ui-submit-foreground: var(--foreground-primary);
    --content-ui-submit-background: var(--background-secondary);

    /* Seen in timetable(border around active class and the heading of the text) */
    --accent-foreground: var(--foreground-primary);

    /* Seen used in timetable header to indicate active class */
    --accent-background: var(--background-tertiary);
    --accent-hover: var(--background-tertiary);
    --logo-background: var(--foreground-secondary);
    --body-background: var(--background-primary);
    --login-form-background: var(--background-primary);
    --form-border-color: var(--foreground-border);
    --form-bg-hover-color: var(--background-tertiary);
    --body-foreground: var(--foreground-primary);
    --body-foreground-h1: var(--foreground-primary);
    --navigation-foreground-highlight: var(--background-primary);

    /* Almost all(except one) of the properties also have a constrast version,
        i.e. with a "-property" after their name. I am unable to reproduce this
        on my environment, hence they are removed.
    */
}

/* The above doesn't seem to cover specific components on each page(i.e.
   timetable, news section, any body sect which have colours hard coded into them
*/
.timetable,
.timetable th,
.fc .fc-cell-shaded,
.fc-list-event,
.fc-list-day,
.island section,
.tileList,
table tr th,
table tr td,
section,
.breadcrumb li.active span:not([href]),
table {
    background-color: var(--background-secondary) !important;
    color: var(--foreground-primary) !important;
}

.main .container .content * {
    background-color: var(--background-primary) !important;
}

.tile.background-middle.background-center {
    background: var(--background-secondary);
    color: var(--foreground-primary);
}

body {
    background-color: var(--background-primary) !important;
    color: var(--foreground-primary)
}

.left-off-canvas-menu ul.off-canvas-list li h3, .left-off-canvas-menu ul.off-canvas-list li label .unit-heading, label .left-off-canvas-menu ul.off-canvas-list li .unit-heading, .left-off-canvas-menu ul.off-canvas-list li h4 {
    color: var(--foreground-primary)
}


`

//Check if the current page is schoolbox
if(document.querySelector('meta[name="author"]').content == 'Schoolbox Pty Ltd') {
    const style = document.createElement("style");
    style.innerText = themeStyles
    document.documentElement.appendChild(style)

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
    
    if(window.location.pathname === '/') {
        console.log('Page recognised: Index')
        const script = document.createElement("script");
        script.setAttribute('src', chrome.runtime.getURL('embeds/index.js'))
        document.documentElement.appendChild(script);

    }
}
