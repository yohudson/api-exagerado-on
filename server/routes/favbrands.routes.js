const express = require('express');
const router = express.Router();
const brandsService = require('../service/favbrands.service')

router.get('/favorites', async(req, res, next) => {
    try {
        const brands = await favbrandsService.getBrands();
        res.json(brands)
    } catch (e) {
        next(e)
    }
});

router.post('/favorites', async(req, res, next) => {
    const brand = req.body;
    try {
        const newBrand = await brandsService.saveBrands(brand);
        res.status(201).json(newBrand)
    } catch (e) {
        next(e)
    }
});

module.exports = router;