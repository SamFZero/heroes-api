const Multimedia = require('../models/multimedia');
const HeroeMultimedia = require('../models/heroeMultimedia');

// Obtener toda la multimedia
exports.getAllMultimedia = async (req, res) => {
    try {
        const multimedia = await Multimedia.find();
        res.json({
            success: true,
            data: multimedia
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Crear nuevo elemento multimedia
exports.createMultimedia = async (req, res) => {
    try {
        const { tipo, url, descripcion } = req.body;

        const newMultimedia = new Multimedia({
            tipo,
            url,
            descripcion
        });

        const savedMultimedia = await newMultimedia.save();

        res.status(201).json({
            success: true,
            data: savedMultimedia
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Asociar multimedia a héroe
exports.associateToHeroe = async (req, res) => {
    try {
        const { heroeId, multimediaId } = req.body;

        // Verificar que existan ambos
        const heroeExists = await Heroe.exists({ _id: heroeId });
        const multimediaExists = await Multimedia.exists({ _id: multimediaId });

        if (!heroeExists || !multimediaExists) {
            return res.status(404).json({
                success: false,
                message: 'Héroe o multimedia no encontrados'
            });
        }

        // Verificar que no exista ya la asociación
        const existingAssociation = await HeroeMultimedia.findOne({
            heroeId,
            multimediaId
        });

        if (existingAssociation) {
            return res.status(400).json({
                success: false,
                message: 'Esta asociación ya existe'
            });
        }

        const newAssociation = new HeroeMultimedia({
            heroeId,
            multimediaId
        });

        await newAssociation.save();

        res.status(201).json({
            success: true,
            message: 'Multimedia asociada correctamente al héroe'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Obtener multimedia por héroe
exports.getMultimediaByHeroe = async (req, res) => {
    try {
        const associations = await HeroeMultimedia.find({ heroeId: req.params.heroeId });
        const multimediaIds = associations.map(assoc => assoc.multimediaId);
        const multimedia = await Multimedia.find({ _id: { $in: multimediaIds } });

        res.json({
            success: true,
            data: multimedia
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Eliminar asociación multimedia-héroe
exports.removeAssociation = async (req, res) => {
    try {
        const { heroeId, multimediaId } = req.params;

        const deletedAssociation = await HeroeMultimedia.findOneAndDelete({
            heroeId,
            multimediaId
        });

        if (!deletedAssociation) {
            return res.status(404).json({
                success: false,
                message: 'Asociación no encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Asociación eliminada correctamente'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};