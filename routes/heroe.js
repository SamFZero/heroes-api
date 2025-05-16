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

// CRUD para héroes
router.get('/', getAllHeroes);
router.get('/:id', getHeroeById);
router.post('/', createHeroe);
router.put('/:id', updateHeroe);
router.delete('/:id', deleteHeroe);

// Búsqueda
router.get('/buscar/:term', searchHeroes);

module.exports = router;