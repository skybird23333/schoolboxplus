const { createApp } = Vue

createApp({
    data() {
        return {
            options: {
                marks: {
                    calculateAverage: true,
                    horizontalGraphs: true,
                    displayBoxPlotSummary: true
                }
            }
        }
    }
})