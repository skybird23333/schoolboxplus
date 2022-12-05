//wrap the series calculation function so that we can get the data
const _calcfunc = $.fn.reportCardBoxplotCalculateAllSeriesData

/**
 * @typedef IReportCardSeriesData
 * @property {number[][]} allGraphData
 * @property {[]} allOutliers
 * @property {{info: null, uid: null, value: number}[][]} input
 */

$.fn.reportCardBoxplotCalculateAllSeriesData = function () {
    /**
     * @type {IReportCardSeriesData}
     */
    const result = _calcfunc.apply(this, arguments)
    //OPTION: Calculate average
    const averageScores = []
    for(let i = 0; i<=4; i++) {//for each of 5 figure summary
        let totalScores = 0
        result.allGraphData.forEach((assessment) => {
            totalScores += assessment[i]
        })
        averageScores.push(totalScores / result.allGraphData.length)
    }
    result.allGraphData.push(averageScores)
    handleResultsData(result)
    return result
}

//wrap the render as well to re-render the text on re render
const _renderfunc = $.fn.reportCardBoxplotRender

$.fn.reportCardBoxplotRender = function () {
    renderResultsData()
    //OPTION: Horizontal graphs
    //5 Figure summary depends on this option
    arguments[0].orientation = 'horizontal'

    //OPTION: Calculate average
    arguments[0].allAssessments.push('Average') //Push a new assessment named Average
    arguments[0].additionalSeries[0].data.push(
        arguments[0].additionalSeries[0].data.reduce((partialSum, a) => partialSum + a, 0) / arguments[0].additionalSeries[0].data.filter(i => !!i).length
    )


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
            //creating the spacing element(inside the loop because apparently you need a new instance or smth)
            const spacingElm = document.createElement('tspan')
            spacingElm.setAttribute('dy', '14')
            spacingElm.setAttribute('x', elm.children[assessmentIndex].getAttribute('x'))
            spacingElm.setAttribute('style', 'transform-origin: 0px 0px; white-space: inherit;')
            spacingElm.innerText = '​'
            //creating the text element
            const textElm = document.createTextNode(`|${Math.round(number)}`)
            //insent the element
            elm.children[assessmentIndex].appendChild(spacingElm)
            elm.children[assessmentIndex].appendChild(textElm)
        })

        console.log(`Assessment ${assessmentIndex}: ${assessment.map((number, numberIndex) => {
            return `${foo[numberIndex]}: ${Math.round(number)}`
        }).join('|')}`)
    })
}