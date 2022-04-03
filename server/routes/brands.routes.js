const express = require('express');
const router = express.Router();
const brandsService = require('../service/brands.service')

router.get('/brands', async(req, res, next) => {
    try {
        const brands = await brandsService.getBrands();
        res.json(brands)
    } catch (e) {
        next(e)
    }
});

router.get('/brand/:id', async(req, res, next) => {
    try {
        const brand = await brandsService.getBrand(req.params.id);
        res.json(brand)
    } catch (e) {
        next(e)
    }
});

router.post('/brand', async(req, res, next) => {
    const brand = req.body;
    try {
        const newBrand = await brandsService.saveBrand(brand);
        res.status(201).json(newBrand)
    } catch (e) {
        next(e)
    }
});

router.put('/brand/:id', async(req, res, next) => {
    const brand = req.body;
    try {
        await brandsService.updateBrand(req.params.id, brand);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

router.delete('/brand/:id', async(req, res, next) => {
    try {
        await brandsService.deleteBrand(req.params.id);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

module.exports = router;