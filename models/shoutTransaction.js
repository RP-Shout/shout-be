var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const shoutTransaction = new Schema({
    adminId: { type: Schema.ObjectId, ref: 'admin' },
    managerId: { type: Schema.ObjectId, ref: 'user' },
    receiverId: { type: Schema.ObjectId, ref: 'user' },
    emailId: { type: String, trim: true, required: true },
    credits: { type: Number },
    message: { type: String },
    redeemed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    merchantId: { type: Schema.ObjectId, ref: 'merchant' },
    companyValueId: { type: Schema.Types.ObjectId, ref: 'companyValues' }
});

module.exports = mongoose.model('shoutTransaction', shoutTransaction);