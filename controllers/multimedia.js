const Multimedia = require('../models/multimedia');
const Heroe = require('../models/heroe'); // ✅ Importación que faltaba
const HeroeMultimedia = require('../models/heroeMultimedia');

exports.getAllMultimedia = async (req, res) => {
    try {
        const multimedia = await Multimedia.find();
        res.json({
            success: true,
            data: multimedia
        });
    } catch (err) {
        console.error('Error obteniendo multimedia:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

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
        console.error('Error creando multimedia:', err);
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.associateToHeroe = async (req, res) => {
    try {
        const { heroeId, multimediaId } = req.body;

        const heroeExists = await Heroe.exists({ _id: heroeId });
        const multimediaExists = await Multimedia.exists({ _id: multimediaId });

        if (!heroeExists || !multimediaExists) {
            return res.status(404).json({
                success: false,
                message: 'Héroe o multimedia no encontrados'
            });
        }

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
        console.error('Error asociando multimedia:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

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
        console.error('Error obteniendo multimedia por héroe:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.updateMultimedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, url, descripcion } = req.body;

        const updated = await Multimedia.findByIdAndUpdate(
            id,
            { tipo, url, descripcion },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Multimedia no encontrada'
            });
        }

        res.json({
            success: true,
            data: updated
        });
    } catch (err) {
        console.error('Error actualizando multimedia:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteMultimedia = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Multimedia.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Multimedia no encontrada' });
        }
        await HeroeMultimedia.deleteMany({ multimediaId: id });
        res.json({ success: true, message: 'Multimedia y asociaciones eliminadas correctamente' });
    } catch (err) {
        console.error('Error eliminando multimedia:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};