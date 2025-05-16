const mongoose = require('mongoose');

const heroeMultimediaSchema = new mongoose.Schema({
    heroeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Heroe',
        required: true
    },
    multimediaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Multimedia',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('HeroeMultimedia', heroeMultimediaSchema);