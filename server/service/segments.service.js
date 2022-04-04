const segmentsData = require('../data/segments.data');

exports.getSegments = async() => {
    const segments = await segmentsData.getSegments();
    if (!segments) throw new Error('Segmentos não encontrados');
    return segments;
}

exports.getSegment = async(id) => {
    const segment = await segmentsData.getSegment(id);
    if (!segment) throw new Error('Segmento não encontrado');
    return segment;
}

exports.saveSegment = async(segment) => {
    const existingSegment = await segmentsData.getSegmentByName(segment.nome);
    if (existingSegment) throw new Error('Segmento já existe')
    return segmentsData.saveSegment(segment.nome);
}

exports.deleteSegment = (id) => {
    return segmentsData.deleteSegment(id);
}

exports.updateSegment = async(id, segment) => {
    await exports.getSegment(id)
    return segmentsData.updateSegment(id, segment.nome);
}