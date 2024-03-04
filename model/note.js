var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    id_etd: { type: Number, required: true},
    td: Number,
    tp: Number,
    control: Number,
    moyen: Number
});

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;