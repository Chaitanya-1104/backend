// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package
const base64 = require('base64-js'); // For decoding base64 files

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// POST Endpoint to handle data and file uploads
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body; // Extract "data" and "file_b64" from the request body

    // Simulated user information
    const user_id = "chaitanya_nath_01012004";
    const email = "chaitanya@abc.com";
    const roll_number = "AP21110011422";

    // Arrays for numbers and alphabets
    const numbers = [];
    const alphabets = [];

    // Iterate through the "data" array to separate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item); // Push numbers to "numbers" array
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item); // Push alphabets to "alphabets" array
        }
    });

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(c => c === c.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [Math.max(...lowercaseAlphabets)] : [];

    // File validation and decoding logic
    let file_valid = false;
    let file_mime_type = null;
    let file_size_kb = null;

    // If file_b64 exists, decode it and calculate its size
    if (file_b64) {
        try {
            const file_bytes = Buffer.from(file_b64, 'base64'); // Decode Base64 string
            file_size_kb = file_bytes.length / 1024; // Calculate file size in KB
            file_mime_type = "application/octet-stream"; // Set a dummy MIME type (use library to detect exact type)
            file_valid = true;
        } catch (error) {
            file_valid = false; // If decoding fails, mark the file as invalid
        }
    }

    // Response object
    const response = {
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: file_valid,
        file_mime_type: file_mime_type,
        file_size_kb: file_size_kb
    };

    // Send the JSON response back to the client
    res.json(response);
});

// GET Endpoint to return a hardcoded operation code
app.get('/bfhl', (req, res) => {
    // Hardcoded response with operation code 1
    res.json({
        operation_code: 1
    });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
