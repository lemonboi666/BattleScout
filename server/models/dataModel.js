const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    content: String,
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
