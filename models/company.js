var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');

var company = new Schema({
  companyName: { type: String, trim: true },
  superAdminId: { type: Schema.ObjectId, ref: 'admin', unique: true, required: true },
  companyLogo: { type: String, trim: true },
  location: { type: String, trim: true },
  businessPhoneNumber: { type: Number, trim: true },
  contactEmail: { type: String, unique: true, sparse: true },
  companyDescription: { type: String, trim: true },
  teamsConfig: {
    attentionSpan: { type: Number, default: 30 },
    recognition: { type: Number, default: 100 },
    recognitionSpan: { type: Number, default: 30 }
  }
});

module.exports = mongoose.model('company', company);