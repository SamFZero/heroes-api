const express = require('express');
const router = express.Router();
const {
    getAllHeroes,
    getHeroeById,
    createHeroe,
    updateHeroe,
    deleteHeroe,
    searchHeroes
} = require('../controllers/heroe');

router.get('/', getAllHeroes);
router.get('/:id', getHeroeById);
router.post('/', createHeroe);
router.put('/:id', updateHeroe);
router.delete('/:id', deleteHeroe);

module.exports = router;