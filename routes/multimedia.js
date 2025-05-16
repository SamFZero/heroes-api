const express = require('express');
const router = express.Router();
const {
    getAllMultimedia,
    createMultimedia,
    associateToHeroe,
    getMultimediaByHeroe,
    removeAssociation
} = require('../controllers/multimedia');

// CRUD para multimedia
router.get('/', getAllMultimedia);
router.post('/', createMultimedia);

// Asociaciones con héroes
router.post('/associate', associateToHeroe);
router.get('/heroe/:heroeId', getMultimediaByHeroe);
router.delete('/:heroeId/:multimediaId', removeAssociation);

module.exports = router;