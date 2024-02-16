// Import required modules
const express = require("express");
const {scrapeListings} = require("./scrapeListing");

// Create Express app to create web server
const app = express();
const PORT = 3000;


// Define API endpoint
app.get('/api/search-listings/', async (req, res) => {
    const query = req.query.q;
    console.log(`Got a request. Keyword:: ${query}`);
    try {
        const listings = await scrapeListings(query);
        res.json({ listings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
