//wrap the series calculation function so that we can get the data
const _calcfunc = $.fn.reportCardBoxplotCalculateAllSeriesData
    
$.fn.reportCardBoxplotCalculateAllSeriesData = function () {
    const result = _calcfunc.apply(this, arguments)
    handleResultsData(result)
    return result
}

//wrap the render as well to re-render the text on re render
const _renderfunc = $.fn.reportCardBoxplotRender

$.fn.reportCardBoxplotRender = function () {
    renderResultsData()
    return _renderfunc.apply(this, arguments)
}

//Click the "Apply filters" button to trigger reload
document.querySelector('#submit_button').click()

function wait(time) {
    return new Promise((res, _) => {setTimeout(() => {res()}, time)})
}

let assessmentData = []

//Handle the results and render them
async function handleResultsData({ allGraphData }) {
    assessmentData = allGraphData
}

async function renderResultsData() {
    const foo = ['min', 'Q1', 'Q2', 'Q3', 'max']
    await wait(10)

    /**
     * @type {Element}
     */
    const elm = document.querySelector('g.highcharts-axis-labels.highcharts-xaxis-labels')
    assessmentData.forEach((assessment, assessmentIndex) => {
        
        assessment.forEach((number, numberIndex) => {
            if(numberIndex > 0) return
            //creating the spacing element(inside the loop because apparently you need a new instance or smth)
            const spacingElm = document.createElement('tspan')
            spacingElm.setAttribute('dy', '14')
            spacingElm.setAttribute('x', elm.children[assessmentIndex].getAttribute('x'))
            spacingElm.setAttribute('style', 'transform-origin: 0px 0px; white-space: inherit;')
            spacingElm.innerText = '​'
            //creating the text element
            const textElm = document.createTextNode(`\n${foo[numberIndex]}: ${Math.round(number)}`)
            //insent the element
            elm.children[assessmentIndex].appendChild(spacingElm)
            elm.children[assessmentIndex].appendChild(textElm)
        })

        console.log(`Assessment ${assessmentIndex}: ${assessment.map((number, numberIndex) => {
            return `${foo[numberIndex]}: ${Math.round(number)}`
        }).join('|')}`)
    })
}