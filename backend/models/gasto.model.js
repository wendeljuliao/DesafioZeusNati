const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gastoSchema = new Schema({
  username: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Gasto = mongoose.model('Gasto', gastoSchema);

module.exports = Gasto;