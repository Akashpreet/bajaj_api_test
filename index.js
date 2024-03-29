import express from "express";
import bodyParser from "body-parser";

// Initialize Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Extract array from the request body
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: 'Data should be an array' });
        }

        // Initialize arrays for even numbers, odd numbers, and alphabets
        const evenNumbers = [];
        const oddNumbers = [];
        const uppercaseAlphabets = [];

        // Iterate through the input array
        data.forEach((element) => {
            if (typeof element === 'number') {
                if (element % 2 === 0) {
                    evenNumbers.push(element);
                } else {
                    oddNumbers.push(element);
                }
            } else if (typeof element === 'string' && /^[A-Za-z]$/.test(element)) {
                uppercaseAlphabets.push(element.toUpperCase());
            }
        });

        // Construct response object
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            even_numbers: evenNumbers,
            odd_numbers: oddNumbers,
            alphabets: uppercaseAlphabets
        };

        // Send response
        res.json(response);
    } catch (error) {
        // Handle exceptions gracefully
        console.error(error);
        res.status(500).json({ is_success: false, error: 'Internal server error' });
    }
});

// GET route for / (root route)
app.get('/', (req, res) => {
    const status = {
        "operation-code": 1
    };
    res.status(200);
    res.json(status);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
