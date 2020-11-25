/**
 * Created by Sanchit Dang
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPerformance = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  valueId: { type: Schema.Types.ObjectId, ref: 'companyValues', required: true },
  createdAt: { type: Schema.Types.Date, default: Date.now(), required: true },
  comment: { type: Schema.Types.String, required: true },
  rating: { type: Schema.Types.Number, required: true, min: 0, max: 10 }
});

module.exports = mongoose.model('userPerformance', userPerformance);