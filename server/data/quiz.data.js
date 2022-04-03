const database = require('../infra/system.db')

exports.getQuiz = (id) => {
    return database.oneOrNone('SELECT * FROM quiz WHERE user_uuid = $1', [id]);
}

exports.saveQuiz = (quiz, user) => {
    console.log('dados')
    console.log(quiz)
    console.log(user)
    return database.one(`INSERT INTO quiz (horario_compras_manha, horario_compras_tarde, horario_compras_noite, conhece_evento,melhor_dia_quarta,melhor_dia_quinta ,melhor_dia_sexta ,melhor_dia_sabado ,melhor_dia_domingo ,forma_pagamento_dinheiro ,forma_pagamento_credito ,forma_pagamento_debito ,forma_pagamento_pix ,forma_pagamento_picpay ,cidade_origem ,como_soube ,fechamento_amigx ,fechamento_familia ,fechamento_namoradx ,fechamento_sozinho ,recado ,user_uuid ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING *`, [quiz.periodo_compras.manha, quiz.periodo_compras.tarde, quiz.periodo_compras.noite, quiz.conhece_evento, quiz.dias_visita.quarta, quiz.dias_visita.quinta, quiz.dias_visita.sexta, quiz.dias_visita.sabado, quiz.dias_visita.domingo, quiz.forma_pagamento.dinheiro, quiz.forma_pagamento.cartao_credito, quiz.forma_pagamento.cartao_debito, quiz.forma_pagamento.pix, quiz.forma_pagamento.picpay, quiz.cidade_origem, quiz.soube_evento, quiz.fechamento.amigx, quiz.fechamento.familia, quiz.fechamento.amor, quiz.fechamento.solo, quiz.recado, user]);
}

exports.deleteQuiz = (id) => {
    return database.none('DELETE FROM quiz WHERE questionario_uuid = $1', [id]);
}

exports.updateQuiz = (id, quiz) => {
    return database.none(`UPDATE quiz SET horario_compras_manha = $1, horario_compras_tarde = $2, horario_compras_noite = $3, conhece_evento = $4, melhor_dia_quarta = $5, melhor_dia_quinta = $6 , melhor_dia_sexta = $7,melhor_dia_sabado  = $8,melhor_dia_domingo  = $9,forma_pagamento_dinheiro = $10 ,forma_pagamento_credito = $11,forma_pagamento_debito = $12,forma_pagamento_pix = $13 ,forma_pagamento_picpay = $14 ,cidade_origem  = $15,como_soube  = $16,fechamento_amigx  = $17,fechamento_familia = $18, fechamento_namoradx = $19 ,fechamento_sozinho = $20,recado = $21,status = $22 WHERE user_uuid = $23`, [quiz.periodo_compras.manha, quiz.periodo_compras.tarde, quiz.periodo_compras.noite, quiz.conhece_evento, quiz.dias_visita.quarta, quiz.dias_visita.quinta, quiz.dias_visita.sexta, quiz.dias_visita.sabado, quiz.dias_visita.domingo, quiz.forma_pagamento.dinheiro, quiz.forma_pagamento.cartao_credito, quiz.forma_pagamento.cartao_debito, quiz.forma_pagamento.pix, quiz.forma_pagamento.picpay, quiz.cidade_origem, quiz.soube_evento, quiz.fechamento.amigx, quiz.fechamento.familia, quiz.fechamento.amor, quiz.fechamento.solo, quiz.recado, quiz.status, user]);
}