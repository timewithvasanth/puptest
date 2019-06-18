const puppeteer = require('puppeteer')
const fs = require('fs')

async function run() {

    // const browser = await puppeteer.launch({
    //     headless: true
    // })
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 2000,
        devtools: true
    })

    const page = await browser.newPage()
    page.on("console", msg => console.log(`Page Console: ${msg.text()}`));

    await page.goto('http://localhost:7890/highcharts4.html', {
        waitUntil: "domcontentloaded"
    })

    async function loadChart() {
        //THIS DID THE TRICK!
        page.evaluate(fs.readFileSync('./lib/highcharts/highcharts.js', 'utf8'));

        await page.evaluate(async (fs) => {

            console.log('page.evaluate Highcharts.version='
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