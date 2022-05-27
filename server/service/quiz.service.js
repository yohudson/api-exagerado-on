const quizData = require('../data/quiz.data');

exports.getQuiz = async(id) => {
    const quiz = await quizData.getQuiz(id);
    if (!quiz) throw new Error('Questionário não encontrado');
    return quiz;
}

exports.getAllQuiz = async() => {
    const quiz = await quizData.getAllQuiz();
    if (!quiz) throw new Error('Questionários não encontrados');
    return quiz;
}

exports.saveQuiz = async(quiz) => {
    const user = quiz.user_uuid
    return quizData.saveQuiz(quiz, user);
}

exports.deleteQuiz = (id) => {
    return quizData.deleteQuiz(id);
}

exports.updateQuiz = async(id, quiz) => {
    await exports.getQuiz(id)
    return quizData.updateQuiz(id, quiz);
}