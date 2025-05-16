const mongoose = require('mongoose');

const heroeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    aparicion: {
        type: String,
        required: true
    },
    casa: {
        type: String,
        enum: ['Marvel', 'DC', 'Otro'],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Heroe', heroeSchema);