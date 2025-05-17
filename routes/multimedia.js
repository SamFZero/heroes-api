const express = require('express');
const router = express.Router();
const {
    getAllMultimedia,
    createMultimedia,
    associateToHeroe,
    getMultimediaByHeroe,
    updateMultimedia,
    deleteMultimedia
} = require('../controllers/multimedia');

router.get('/', getAllMultimedia);
router.post('/', createMultimedia);
router.put('/:id', updateMultimedia);
router.delete('/:id', deleteMultimedia);

router.post('/associate', associateToHeroe);
router.get('/heroe/:heroeId', getMultimediaByHeroe);

module.exports = router;