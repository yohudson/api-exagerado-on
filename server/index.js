const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/', require('./routes/users.routes'));
app.use('/', require('./routes/genders.routes'));
app.use('/', require('./routes/quiz.routes'));
app.use('/', require('./routes/brands.routes'));
app.use('/', require('./routes/favbrands.routes'));
app.use('/', require('./routes/segments.routes'));
app.use('/', require('./routes/stores.routes'));
app.use('/', require('./routes/attractions.routes'));
app.use('/', require('./routes/agenda.routes'));
app.use((error, req, res, next) => {
    if (error.message === 'Usuários não encontrados') {
        return res.status(404).send(error.message)
    }
    if (error.message === 'Usuário não encontrado') {
        return res.status(404).send(error.message)
    }
    if (error.message === 'Usuário já existe') {
        return res.status(409).send(error.message)
    }
    if (error.message === 'Gêneros não encontrados') {
        return res.status(404).send(error.message)
    }
    if (error.message === 'Gênero não encontrado') {
        return res.status(404).send(error.message)
    }
    if (error.message === 'Gênero já existe') {
        return res.status(409).send(error.message)
    }
    if (error.message === 'Questionário não encontrado') {
        return res.status(404).send(error.message)
    }
    if (error.message === 'Lista de marcas não encontrada') {
        return res.status(404).send(error.message)
    }
    if (error.message === 'Marca não encontrada') {
        return res.status(404).send(error.message)
    }
    res.status(500).send(error.message)

});

app.listen(PORT);