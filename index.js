const express = require('express');
const path = require('path');

const app = express();

// Middleware untuk file statis
app.use(express.static('public'));

// Endpoint untuk konfigurasi API
app.get('/api-config.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`
        // --- KONFIGURASI API ---
        window.API_KEY = "ftS3uUCMOztd71uxhWp9MsVQchbBNQXLOcLJpkQW1W9aQg3gyXvUzJQkHW7bV54P6fKeWrzIWJf44nuuUh7xPTMQHY8lCtslMfez";
        window.API_BASE_URL = "https://zproxy.officialardytc27.workers.dev/?url=https://atlantich2h.com";
        window.NOMOR_WHATSAPP = "6289525036410";
    `);
});

// Route khusus untuk halaman produk
app.get('/product/freefire', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'freefire', 'freefire.html'));
});

app.get('/product/mobilelegends', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mobilelegends', 'mobilegends.html'));
});

// 404 Handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Ekspor app untuk Vercel
module.exports = app;
