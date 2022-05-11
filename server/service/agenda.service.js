const agendaData = require('../data/agenda.data');

exports.getAgendas = async() => {
    const agenda = await agendaData.getAgendas();
    if (!agenda) throw new Error('Agenda não encontrada');
    return agenda;
}

exports.getAgenda = async(id) => {
    const agenda = await agendaData.getAgenda(id);
    if (!agenda) throw new Error('Evento não encontrado');
    return agenda;
}

exports.saveAgenda = async(agenda) => {
    const existingAgenda = await agendaData.getAgendaByUuid(agenda.agenda_uuid);
    if (existingAgenda) throw new Error('Evento já está agendado')
    return agendaData.saveAgenda(agenda);
}

exports.deleteAgenda = (id) => {
    return agendaData.deleteAgenda(id);
}

exports.updateAgenda = async(agenda) => {
    await exports.getAgenda(agenda.uuid)
    return agendaData.updateAgenda(agenda);
}