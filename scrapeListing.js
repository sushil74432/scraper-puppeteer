const puppeteer = require("puppeteer");


// Function to scrape listing details
async function scrapeListings(query) {
    console.log(`Searching for :: ${query}`);
    const browser = await puppeteer.launch({ product: 'chrome', headless: 0 ,args: ['--disable-http2']});
    const page = await browser.newPage();
    

    console.log(page);
    console.log(1);

    // Go to Google and search for the query
    await page.goto(`https://www.google.com/search?q=${query}`);
    // console.log(2);

    // Click on the first result link
    await page.click('div.g a')

    // This next step assumes that homes.com is the first result in the search. For demo purpose, I am manually loading homes.com

    //-----------------------------------------------------------------------------------------------------------------------------------

    //---manually loading homes.com - start
    await page.setExtraHTTPHeaders({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding':' gzip, deflate, br',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    })
    await page.goto(`https://www.homes.com/`);
    console.log("3. loaded homes.com");
    //---manually loading homes.com - end


    await page.waitForSelector('button#propertySearchBtn');    
    
    // Input a city and search for homes
    const city = "Tampa";
    await page.type('div input.multiselect-search', city);
    await page.keyboard.press('Enter');
    console.log("4. Typed in search param");

    // Wait for search results to load
    await page.waitForSelector('li.placard-container');
    await page.waitForSelector('span.pageRange');

    // grab the total pages of listing
    const totalPages = await page.evaluate(()=>{
        let string = document.getElementsByClassName("pageRange")[0].textContent
        return parseInt(string.match(/of\s(\d+)/)[1]);
    }); 
    
    console.log("Total Pages : "+totalPages);

    let allPages = [];
    for(let i = 1; i <= totalPages; i++){
        const baseUrl = "https://www.homes.com/tampa-fl/p";
        let url = baseUrl+i;
        allPages.push(url);
    }

    var allHomes = [];
    console.log("list of all pages"+allPages);
//-----------------------------------------------------------------------------------------------------------------------------------
    
    // Get all home listings url
    // for(let i = 0; i < allPages.length; i++){
    for(let i = 0; i < 2; i++){      //for test purpose only. uncomment for demo with 2 pages.
        let url = allPages[i];
        console.log("Scraping Listing from URL :: "+url);
        if(i != 0){
            await page.goto(url);
        }
        let list = await page.evaluate(()=>{
            let allHouseLinkInPage = []
            let listUrlElem = document.querySelectorAll(".for-sale-content-container a");
            listUrlElem.forEach(houseUrl => {
                allHouseLinkInPage.push(houseUrl.href);
            });
            return allHouseLinkInPage;
        });
        allHomes = [...allHomes, ...list];
    };

//-----------------------------------------------------------------------------------------------------------------------------------
    //Goto Individual listing pages and scrape details
    let houseDetails = [];
    // for(let i = 0; i< allHomes.length; i++){
    for(let i = 0; i< 5; i++){ //uncomment for demo with just 5 house links
        let curUrl = allHomes[i];
        await page.goto(curUrl);
        console.log(`6. loaded ${curUrl}`);
        await page.waitForSelector("#ldp-property-info-container");
        let details = await page.evaluate(()=>{
            let obj = {};
            obj.address = document.querySelector('.property-info-address').textContent.trim().replace(/[\r\n\s]+/gm, " ");
            obj.price = document.querySelector('.property-info-price').textContent.trim().replace(/[\r\n\s]+/gm, " ");
            obj.beds = document.querySelector('span.property-info-feature:has(span.feature-beds)').textContent.trim().replace(/[\r\n\s]+/gm, " ");
            obj.bath = document.querySelector('span.property-info-feature:has(span.feature-baths)').textContent.trim().replace(/[\r\n\s]+/gm, " ");
            obj.area = document.querySelector('span.property-info-feature:has(span.feature-sqft').textContent.trim().replace(/[\r\n\s]+/gm, " ");
            return obj;
        });
        // console.log(details);
        houseDetails.push(details);
    }
    console.log(houseDetails);
    
    // Close browser
    await browser.close();

    return houseDetails;
}

module.exports = {scrapeListings};