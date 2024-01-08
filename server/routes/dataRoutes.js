const express = require('express');
const router = express.Router();
const DataModel = require('../models/dataModel');

// Handle form submissions
router.post('/submit', async (req, res) => {
    const inputData = req.body.data;

    try {
        // Save data to the database
        const newData = new DataModel({ content: inputData });
        await newData.save();

        console.log('Data saved:', newData);

        res.status(201).send('Data submitted successfully!');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Get submitted data from the database
router.get('/data', async (req, res) => {
    try {
        // Retrieve data from the database
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
