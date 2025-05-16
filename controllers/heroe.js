const Heroe = require('../models/heroe');
const HeroeMultimedia = require('../models/heroeMultimedia');
const Multimedia = require('../models/multimedia');

// Obtener todos los héroes
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

// Obtener un héroe por ID
exports.getHeroeById = async (req, res) => {
    try {
        const heroe = await Heroe.findById(req.params.id);
        if (!heroe) {
            return res.status(404).json({
                success: false,
                message: 'Héroe no encontrado'
            });
        }

        // Obtener multimedia asociada
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

// Crear un nuevo héroe
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

// Actualizar un héroe
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

// Eliminar un héroe
exports.deleteHeroe = async (req, res) => {
    try {
        // Eliminar primero las asociaciones de multimedia
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

// Buscar héroes por término
exports.searchHeroes = async (req, res) => {
    try {
        const term = req.params.term;
        const heroes = await Heroe.find({
            $or: [
                { nombre: { $regex: term, $options: 'i' } },
                { bio: { $regex: term, $options: 'i' } }
            ]
        });

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