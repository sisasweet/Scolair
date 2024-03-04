var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moduleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    id_ens: { type: Schema.Types.ObjectId, ref: 'User', required: true}
});

var Module = mongoose.model('Module', moduleSchema);

module.exports = Module;