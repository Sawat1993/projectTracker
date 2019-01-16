const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    managerID: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    }
});

module.exports = mongoose.model('Projects', projectSchema)