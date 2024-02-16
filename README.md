# scraper-puppeteer
**A simple web scraper demo using puppeteer**

**Requirement: Chrome Browser**

This demo scraper, although can scan through all the pages on the pagination bar, only scans listings from 2 pages and limits the total listing scanned to 5 pages for demo purposes.

- Clone this repo to your local machine.
- On the terminal, go to your project directory where you cloned this project and run "npm install" to install the required dependencies.
- run "node index"
- go to your browser. type the URL "http://localhost:3000/api/search-listings?q=<Your query param>"
    (Although the Google search result page will appear as per the search query, I've created this scraper assuming the first result will be homes.com and manually loaded homes.com)
- After you run the command, the scraper will run on homes.com for the city of "Tampa" and will provide a JSON file as a result.


** Best practices:
This scraper has been created in limited time so best practices might not have been followed.
- Using a rotating IP address is recommended for any scraper.
- Set proper headers as they would appear in a real request. This will help to ensure the requests are not blocked.
- implement rate limiting to ensure the server isn't overloaded with just our requests.
- Try to honor the robots.txt file.
- Separate the modules as per their functionalities for better code readability.
