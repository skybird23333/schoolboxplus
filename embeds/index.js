//show progress bar on timetable
const query = $('.show-for-medium-up .timetable td:has(.timetable-subject-active)')

if (query.length) {

    const timeText = $('.show-for-medium-up .timetable-period-active time')[0].innerHTML
    const startTime = dayjs(timeText.split('–')[0], 'hh:mma')
    const endTime = dayjs(timeText.split('–')[1], 'hh:mma')
    const classDuration = dayjs(startTime, '').diff(endTime)
    const remainingDuration = dayjs().diff(endTime)
    const classProgress = (-classDuration + remainingDuration) / (-classDuration) * 100
    const remainingTime = dayjs(endTime).subtract(dayjs()).format('mm:ss')

    /**
     * @type {Element}
    */
    const parentContainer = query[0]

    parentContainer.children[0].children[0].style.height = '140px'
    const color = parentContainer.children[0].children[0].style.background


    const progressText = document.createElement('div')
    progressText.innerHTML = `${remainingTime} left`

    const progressBarElapsed = document.createElement('div')
    progressBarElapsed.setAttribute('style', `position: absolute;\
    left: 0;\
    width: ${classProgress}%;\
    height: 20px;\
    background-color: ${color};\
    z-index: -1;
    `)
    const progressBarRemaining = document.createElement('div')
    progressBarRemaining.setAttribute('style', `position: absolute;\
    right: 0;\
    width: ${100 - classProgress}%;\
    height: 20px;\
    background-color: gray;\
    z-index: -1;
    `)

    const progressContainer = document.createElement('div')
    progressContainer.setAttribute('class', 'timetable-subject')
    progressContainer.setAttribute('style', 'height: 20px; padding: 0;position: relative;')
    progressContainer.appendChild(progressText)
    progressContainer.appendChild(progressBarElapsed)
    progressContainer.appendChild(progressBarRemaining)

    const timetableElement = $('div.small-12.columns div section:has(div.scrollable.show-for-medium-up)')[0]
    timetableElement.appendChild(progressContainer)

    setInterval(() => {
        const timeText = $('.show-for-medium-up .timetable-period-active time')[0].innerHTML
        const startTime = dayjs(timeText.split('–')[0], 'hh:mma')
        const endTime = dayjs(timeText.split('–')[1], 'hh:mma')
        const classDuration = dayjs(startTime, '').diff(endTime)
        const remainingDuration = dayjs().diff(endTime)
        const classProgress = (-classDuration + remainingDuration) / (-classDuration) * 100
        console.log(endTime)
        const remainingTime = dayjs(endTime).subtract(dayjs()).format('mm:ss')

        progressText.innerHTML = `${remainingTime} left`
        progressBarElapsed.style.width = `${classProgress}%`
        progressBarRemaining.style.width = `${100 - classProgress}%`
    }, 1000)
}