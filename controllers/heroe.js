const Heroe = require('../models/heroe');
const HeroeMultimedia = require('../models/heroeMultimedia');
const Multimedia = require('../models/multimedia');

exports.getAllHeroes = async (req, res) => {
    try {
        const heroes = await Heroe.find();
        res.json({
            success: true,
            data: heroes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getHeroeById = async (req, res) => {
    try {
        const heroe = await Heroe.findById(req.params.id);
        if (!heroe) {
            return res.status(404).json({
                success: false,
                message: 'Héroe no encontrado'
            });
        }

        const multimediaAssociations = await HeroeMultimedia.find({ heroeId: heroe._id });
        const multimediaIds = multimediaAssociations.map(assoc => assoc.multimediaId);
        const multimedia = await Multimedia.find({ _id: { $in: multimediaIds } });

        res.json({
            success: true,
            data: {
                ...heroe.toObject(),
                multimedia
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.createHeroe = async (req, res) => {
    try {
        const { nombre, bio, img, aparicion, casa } = req.body;

        const newHeroe = new Heroe({
            nombre,
            bio,
            img,
            aparicion,
            casa
        });

        const savedHeroe = await newHeroe.save();

        res.status(201).json({
            success: true,
            data: savedHeroe
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.updateHeroe = async (req, res) => {
    try {
        const { nombre, bio, img, aparicion, casa } = req.body;

        const updatedHeroe = await Heroe.findByIdAndUpdate(
            req.params.id,
            { nombre, bio, img, aparicion, casa },
            { new: true, runValidators: true }
        );

        if (!updatedHeroe) {
            return res.status(404).json({
                success: false,
                message: 'Héroe no encontrado'
            });
        }

        res.json({
            success: true,
            data: updatedHeroe
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteHeroe = async (req, res) => {
    try {
        await HeroeMultimedia.deleteMany({ heroeId: req.params.id });

        const deletedHeroe = await Heroe.findByIdAndDelete(req.params.id);

        if (!deletedHeroe) {
            return res.status(404).json({
                success: false,
                message: 'Héroe no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Héroe eliminado correctamente'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};