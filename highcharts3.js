const puppeteer = require('puppeteer')
const fs = require('fs')

console.log('main fs W_OK=' + fs.W_OK)

async function run() {

    console.log('run fs W_OK=' + fs.W_OK)

    // const browser = await puppeteer.launch({
    //     headless: true
    // })
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 2000,
        devtools: true    })

    const page = await browser.newPage()
    page.on("console", msg => console.log(`Page Console: ${msg.text()}`));

    await page.goto('http://localhost/highcharts3.html', {
        waitUntil: "domcontentloaded"
    })

    async function loadChart() {

        console.log('loadChart fs W_OK=' + fs.W_OK)

        await page.evaluate(async (fs) => {

            console.log('page.evaluate fs W_OK=' + fs.W_OK)
            console.log('Highcharts.version='
                + Highcharts.version)

            var myChart = Highcharts.chart('container', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Fruit Consumption'
                },
                xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                },
                yAxis: {
                    title: {
                        text: 'Fruit eaten'
                    }
                },
                series: [{
                    name: 'Jane',
                    data: [1, 0, 4]
                }, {
                    name: 'John',
                    data: [5, 7, 3]
                }]
            });
        }, fs)
    }

    await loadChart()
    await browser.close()
}

run()