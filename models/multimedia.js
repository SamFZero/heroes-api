const mongoose = require('mongoose');

const multimediaSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['imagen', 'video', 'audio'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Multimedia', multimediaSchema);