import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS for all origins, or specify allowed origins for production
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust this in production
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/lotto', async (req, res) => {
    const { drwNo } = req.query;
    if (!drwNo) {
        return res.status(400).json({ error: 'drwNo query parameter is required.' });
    }

    try {
        const response = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from dhlottery.co.kr: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error proxying lotto request:', error);
        res.status(500).json({ error: 'Failed to fetch lotto data', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}`);
});
