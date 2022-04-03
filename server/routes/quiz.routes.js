const express = require('express');
const router = express.Router();
const quizService = require('../service/quiz.service')

router.get('/quiz/:id', async(req, res, next) => {
    try {
        const quiz = await quizService.getQuiz(req.params.id);
        res.json(quiz)
    } catch (e) {
        next(e)
    }
});

router.post('/quiz', async(req, res, next) => {
    console.log('rota')
    console.log(req.body)
    const quiz = req.body;
    try {
        const newQuiz = await quizService.saveQuiz(quiz);
        res.status(201).json(newQuiz)
    } catch (e) {
        next(e)
    }
});

router.put('/quiz/:id', async(req, res, next) => {
    const quiz = req.body;
    try {
        await quizService.updateQuiz(req.params.id, quiz);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

router.delete('/quiz/:id', async(req, res, next) => {
    try {
        await quizService.deleteQuiz(req.params.id);
        res.status(204).end()
    } catch (e) {
        next(e)
    }
});

module.exports = router;