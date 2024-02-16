# scraper-puppeteer
** A simple web scraper demo using puppeteer

** Requirement : Chrome Browser

This demo, although has capability to scan through all the pages on the pagination bar, only scans listings from 2 pages and limits the total listing scanned to 5 pages for demo purposes.

- Clone this repo to your local machine.
- On terminal, go to your project directory where you cloned this project and run "npm install" to install required dependencies.
- run "node index"
- go to your browser. type the url "http://localhost:3000/api/search-listings?q=<Your query param>"
    (Although the google search result page will appear as per the search query, I've created this scraper assuming the first result will be homes.com and manually loaded homes.com)
- After you run the command, the scraper will run on homes.com for the city of "Tampa" and will provide a JSON file as result.


** Best practices:
This scraper has been created in limited time so best practices might not have been followed.
- Using a rotating IP address is recommended for any scraper.
- Set proper headers as it would appear in a real request. This will help to ensure the requests are not blocked.
- implement rate limiting to ensure the server isn't overloaded with just our requests.
- Try to honour the robots.txt file.
- Separate the modules as per their functionalities for better code readability.
