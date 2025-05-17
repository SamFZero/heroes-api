const express = require('express');
const router = express.Router();
const {
    getAllMultimedia,
    createMultimedia,
    associateToHeroe,
    getMultimediaByHeroe,
    removeAssociation,
    updateMultimedia
} = require('../controllers/multimedia');

router.get('/', getAllMultimedia);
router.post('/', createMultimedia);

router.post('/associate', associateToHeroe);
router.get('/heroe/:heroeId', getMultimediaByHeroe);
router.delete('/:heroeId/:multimediaId', removeAssociation);
router.put('/:id', updateMultimedia);

module.exports = router;