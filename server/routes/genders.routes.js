const express = require('express');
const router = express.Router();
const genderService = require('../service/genders.service')


router.get('/genders', async(req, res, next) => {
    try {
        const gender = await genderService.getGenders();
        res.json(gender)
    } catch (e) {
        next(e)
    }
});

router.get('/gender/:id', async(req, res, next) => {
    try {
        const gender = await genderService.getGender(req.params.id);
        res.json(gender)
    } catch (e) {
        next(e)
    }
});

router.post('/gender', async(req, res, next) => {
    const gender = req.body;
    try {
        const newGender = await genderService.saveGender(gender);
        res.status(201).json(newGender)
    } catch (e) {
        next(e)
    }
});

router.put('/gender/:id', async(req, res, next) => {
    const gender = req.body;
    try {
        await genderService.updateGender(req.params.id, gender);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

router.delete('/gender/:id', async(req, res, next) => {
    try {
        await genderService.deleteGender(req.params.id);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

module.exports = router;