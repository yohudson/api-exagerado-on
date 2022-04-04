const express = require('express');
const router = express.Router();
const segmentsService = require('../service/segments.service')

router.get('/segments', async(req, res, next) => {
    try {
        const segments = await segmentsService.getSegments();
        res.json(segments)
    } catch (e) {
        next(e)
    }
});

router.get('/segment/:id', async(req, res, next) => {
    try {
        const segment = await segmentsService.getSegment(req.params.id);
        res.json(segment)
    } catch (e) {
        next(e)
    }
});

router.post('/segments', async(req, res, next) => {
    const segment = req.body;
    try {
        const newSegment = await segmentsService.saveSegment(segment);
        res.status(201).json(newSegment)
    } catch (e) {
        next(e)
    }
});

router.put('/segment/:id', async(req, res, next) => {
    const segment = req.body;
    try {
        await segmentsService.updateSegment(req.params.id, segment);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

router.delete('/segment/:id', async(req, res, next) => {
    try {
        await segmentsService.deleteSegment(req.params.id);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

module.exports = router;