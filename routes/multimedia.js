const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
    getAllMultimedia,
    createMultimedia,
    updateMultimedia,
    associateToHeroe,
    getMultimediaByHeroe,
    removeAssociation,
    deleteMultimedia
} = require('../controllers/multimedia');

router.get('/', auth, getAllMultimedia);
router.post('/', auth, createMultimedia);
router.put('/:id', auth, updateMultimedia);
router.post('/associate', auth, associateToHeroe);
router.get('/heroe/:heroeId', auth, getMultimediaByHeroe);
router.delete('/:heroeId/:multimediaId', auth, removeAssociation);
router.delete('/solo/:id', auth, deleteMultimedia);

module.exports = router;
