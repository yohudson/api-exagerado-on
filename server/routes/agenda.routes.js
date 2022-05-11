const express = require('express');
const router = express.Router();
const agendaService = require('../service/agenda.service')

router.get('/agenda', async(req, res, next) => {
    try {
        const agenda = await agendaService.getAgendas();
        res.json(agenda)
    } catch (e) {
        next(e)
    }
});

router.get('/agenda/:id', async(req, res, next) => {
    try {
        const agenda = await agendaService.getAgenda(req.params.id);
        res.json(agenda)
    } catch (e) {
        next(e)
    }
});

router.post('/agenda', async(req, res, next) => {
    const agenda = req.body;
    try {
        const newAgenda = await agendaService.saveAgenda(agenda);
        res.status(201).json(newAgenda)
    } catch (e) {
        next(e)
    }
});

router.put('/agenda/:id', async(req, res, next) => {
    const agenda = req.body;
    try {
        await agendaService.updateAgenda(agenda);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

router.delete('/agenda/:id', async(req, res, next) => {
    try {
        await agendaService.deleteAgenda(req.params.id);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

module.exports = router;