const express = require('express');
const router = express.Router();
const storesService = require('../service/stores.service')

router.get('/stores', async(req, res, next) => {
    try {
        const stores = await storesService.getStores();
        res.json(stores)
    } catch (e) {
        next(e)
    }
});

router.get('/store/:id', async(req, res, next) => {
    try {
        const store = await storesService.getStore(req.params.id);
        res.json(store)
    } catch (e) {
        next(e)
    }
});

router.post('/store', async(req, res, next) => {
    const store = req.body;
    try {
        const newStore = await storesService.saveStore(store);
        res.status(201).json(newStore)
    } catch (e) {
        next(e)
    }
});

router.put('/store/:id', async(req, res, next) => {
    const store = req.body;
    try {
        await storesService.updateStore(store);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

router.delete('/store/:id', async(req, res, next) => {
    try {
        await storesService.deleteStore(req.params.id);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

module.exports = router;