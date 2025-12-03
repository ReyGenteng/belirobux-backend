const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Daftar API key yang diizinkan
const ALLOWED_API_KEYS = ['GamesNowTopUp', 'TopUp23c0748dg7'];

// API key eksternal (simpan di environment variable untuk keamanan)
const EXTERNAL_API_KEY = 'ftS3uUCMOztd71uxhWp9MsVQchbBNQXLOcLJpkQW1W9aQg3gyXvUzJQkHW7bV54P6fKeWrzIWJf44nuuUh7xPTMQHY8lCtslMfez';

app.get('/deposit/create.js', async (req, res) => {
    try {
        // 1. Validasi API key pengguna
        const userApiKey = req.query.apikey;
        
        if (!userApiKey || !ALLOWED_API_KEYS.includes(userApiKey)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Invalid API key',
                allowed_keys: ALLOWED_API_KEYS
            });
        }

        // 2. Ambil parameter dari query
        const { reff_id, nominal, type = 'ewallet', metode = 'qrisfast' } = req.query;

        // 3. Validasi parameter wajib
        if (!reffid || !nominal) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: reffid and nominal are required'
            });
        }

        // 4. Validasi nominal (harus angka)
        if (isNaN(nominal) || Number(nominal) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid nominal: must be a positive number'
            });
        }

        // 5. Buat URL untuk API eksternal
        const externalUrl = `https://atlantich2h.com/deposit/create`;
        
        // 6. Konfigurasi parameter untuk API eksternal
        const params = {
            api_key: EXTERNAL_API_KEY,
            reff_id: reffid,
            nominal: nominal,
            type: type,
            metode: metode
        };

        // 7. Panggil API eksternal
        const response = await axios.get(externalUrl, { params });
        
        // 8. Teruskan respons dari API eksternal
        res.set('Content-Type', 'application/json');
        res.json(response.data);

    } catch (error) {
        console.error('Error:', error.message);
        
        // Handle error dari API eksternal
        if (error.response) {
            res.status(error.response.status).json({
                success: false,
                message: 'External API error',
                error: error.response.data
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
