var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var claimSchema = new Schema({
    id_etd: { type: Number, required: true},
    id_ens: { type: Number, required: true},
    msg: { type: Number, required: true}
});

var Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;