const express = require('express');
const router = express.Router();
const usersService = require('../service/users.service')


router.get('/users', async(req, res, next) => {
    try {
        const users = await usersService.getUsers();
        res.json(users)
    } catch (e) {
        next(e)
    }
});

router.get('/users/:id', async(req, res, next) => {
    try {
        const user = await usersService.getUser(req.params.id);
        res.json(user)
    } catch (e) {
        next(e)
    }
});

router.post('/users', async(req, res, next) => {
    console.log(req.body)
    const user = req.body;
    console.log('passo de rota')
    try {
        const newUser = await usersService.saveUser(user);
        res.status(201).json(newUser)
    } catch (e) {
        next(e)
    }
});

router.put('/users/:id', async(req, res, next) => {
    const user = req.body;
    try {
        await usersService.updateUser(req.params.id, user);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

router.delete('/users/:id', async(req, res, next) => {
    try {
        await usersService.deleteUser(req.params.id);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

module.exports = router;