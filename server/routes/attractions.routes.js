const express = require('express');
const router = express.Router();
const attractionsService = require('../service/attraction.service')

router.get('/attractions', async(req, res, next) => {
    try {
        const attractions = await attractionsService.getAttractions();
        res.json(attractions)
    } catch (e) {
        next(e)
    }
});

router.get('/attraction/:id', async(req, res, next) => {
    try {
        const attraction = await attractionsService.getAttraction(req.params.id);
        res.json(attraction)
    } catch (e) {
        next(e)
    }
});

router.post('/attraction', async(req, res, next) => {
    const attraction = req.body;
    try {
        const newAttraction = await attractionsService.saveAttraction(attraction);
        res.status(201).json(newAttraction)
    } catch (e) {
        next(e)
    }
});

router.put('/attraction/:id', async(req, res, next) => {
    const attraction = req.body;
    try {
        await attractionsService.updateAttraction(attraction);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

router.delete('/attraction/:id', async(req, res, next) => {
    try {
        await attractionsService.deleteAttraction(req.params.id);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

module.exports = router;