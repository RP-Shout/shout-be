
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyValues = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: 'company' },
    name: { type: String, trim: true },
    description: { type: String, trim: true }
});

module.exports = mongoose.model('companyValues', companyValues);