const database = require('../infra/system.db')

exports.getAgendas = () => {
    return database.query('SELECT * FROM agenda ORDER BY data_hora_inicio');
}

exports.getAgenda = (id) => {
    return database.oneOrNone('SELECT * FROM agenda WHERE agenda_uuid = $1', [id]);
}

exports.getAgendaByUuid = (id) => {
    return database.oneOrNone('SELECT * FROM agenda WHERE agenda_uuid = $1', [id]);
}

exports.getAgendaByAttraction = (id) => {
    return database.oneOrNone('SELECT * FROM agenda WHERE atracao_uuid = $1', [id]);
}

exports.saveAgenda = (agenda) => {
    return database.one(`INSERT INTO agenda(atracao_uuid,atracao_nome,data_hora_inicio,data_hora_fim,local,status,descricao) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`, [agenda.atracao_uuid, agenda.atracao_nome, agenda.data_hora_inicio, agenda.data_hora_fim, agenda.local, agenda.status, agenda.descricao]);
}

exports.deleteAgenda = (id) => {
    return database.none('DELETE FROM agenda WHERE agenda_uuid = $1', [id]);
}

exports.updateAgenda = (agenda) => {
    console.log(agenda)
    return database.none(`UPDATE agenda SET atracao_uuid = $1,atracao_nome = $2,data_hora_inicio = $3,data_hora_fim = $4,local = $5,status = $6,descricao = $7 WHERE agenda_uuid = $8`, [agenda.atracao_uuid, agenda.atracao_nome, agenda.data_hora_inicio, agenda.data_hora_fim, agenda.local, agenda.status, agenda.descricao, agenda.uuid]);
}

exports.updateAgendaStatus = (agenda) => {
    return database.none(`UPDATE agenda SET status = $1 WHERE agenda_uuid = $2`, [agenda.status, agenda.agenda_uuid]);
}