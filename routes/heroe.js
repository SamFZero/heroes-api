const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

const {
    getAllHeroes,
    getHeroeById,
    createHeroe,
    updateHeroe,
    deleteHeroe,
    searchHeroes
} = require('../controllers/heroe');

router.get('/', auth, getAllHeroes);
router.get('/:id', auth, getHeroeById);
router.post('/', auth, createHeroe);
router.put('/:id', auth, updateHeroe);
router.delete('/:id', auth, deleteHeroe);

module.exports = router;