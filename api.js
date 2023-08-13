const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 8080;


function buscarPorCampo(campo, valor, callback) {
    const db = new sqlite3.Database('cadsus.db');
    const query = `SELECT * FROM cadsus WHERE ${campo} = ?`;
    
    db.get(query, [valor], (err, row) => {
        db.close();
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, row);
    });
}


function buscarRegistros(query, values, callback) {
    const db = new sqlite3.Database('cadsus.db');

    db.all(query, values, (err, rows) => {
        db.close();
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
}



function formatarResultadoNextel(row) {
    return {
        cpf: row.cpf,
        nome: row.nome,
        tipo: row.tipo,
        logradouro: row.logr,
        numero: row.num,
        complemento: row.complemento,
        bairro: row.bairro,
        cidade: row.cidade,
        uf: row.uf,
        cep: row.cep,
        ddd: row.ddd,
        telefone: row.tel,
        inst: row.inst,
        operadora: row.operadora
    };
}


function formatarResultadoClaro(row) {
    return {
        cpf: row.cpf,
        nome: row.nome,
        pessoa: row.pessoa,
        ddd: row.ddd,
        telefone: row.fone,
        inst: row.inst
    };
}




function formatarResultado(row) {
    return {
        cpf: row.cpf,
        cns: row.cns,
        nome: row.nome,
        nascimento: row.nascimento,
        sexo: row.sexo,
        raca_cor: row.raca_cor,
        falecido: row.falecido,
        data_falecimento: row.data_falecimento,
        mae: row.mae,
        pai: row.pai,
        celular: row.celular,
        telefone: row.telefone,
        contato: row.contato,
        email: row.email,
        endereco: {
            rua: row.rua,
            numero: row.numero,
            complemento: row.complemento,
            bairro: row.bairro,
            cidade: row.cidade,
            estado: row.estado,
            cep: row.cep
        },
        rg: {
            numero: row.rg,
            orgao_emissor: row.rg_orgao_emissor,
            data_emissao: row.rg_data_emissao
        },
        nis: row.nis
    };
}


app.get('/api/buscar-por-cpf', (req, res) => {
    const cpf = req.query.cpf;
    if (!cpf) {
        return res.status(400).json({ message: 'CPF não especificado' });
    }

    buscarPorCampo('cpf', cpf, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar CPF' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'CPF não encontrado' });
        }
    });
});


app.get('/api/buscar-por-nome', (req, res) => {
    const nome = req.query.nome;
    if (!nome) {
        return res.status(400).json({ message: 'Nome não especificado' });
    }

    buscarPorCampo('nome', nome, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar nome' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'Nome não encontrado' });
        }
    });
});


app.get('/api/buscar-por-celular', (req, res) => {
    const celular = req.query.celular;
    if (!celular) {
        return res.status(400).json({ message: 'Celular não especificado' });
    }

    buscarPorCampo('celular', celular, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar celular' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'Celular não encontrado' });
        }
    });
});


app.get('/api/buscar-por-telefone', (req, res) => {
    const telefone = req.query.telefone;
    if (!telefone) {
        return res.status(400).json({ message: 'Telefone não especificado' });
    }

    buscarPorCampo('telefone', telefone, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar telefone' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'Telefone não encontrado' });
        }
    });
});


app.get('/api/buscar-por-cns', (req, res) => {
    const cns = req.query.cns;
    if (!cns) {
        return res.status(400).json({ message: 'CNS não especificado' });
    }

    buscarPorCampo('cns', cns, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar CNS' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'CNS não encontrado' });
        }
    });
});
app.get('/api/buscar-cpf-todas', (req, res) => {
    const cpf = req.query.cpf;
    if (!cpf) {
        return res.status(400).json({ message: 'CPF não especificado' });
    }

    const resultados = [];


    buscarPorCampo('cpf', cpf, (err, cadsusRow) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar CPF na tabela cadsus' });
        }

        if (cadsusRow) {
            resultados.push({ tabela: 'cadsus', registros: [formatarResultado(cadsusRow)] });
        }


        const queryNextel = "SELECT * FROM nextel WHERE cpf = ?";
        buscarRegistros(queryNextel, [cpf], (err, nextelRows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar CPF na tabela nextel' });
            }

            if (nextelRows.length > 0) {
                resultados.push({ tabela: 'nextel', registros: nextelRows.map(formatarResultadoNextel) });
            }

            const queryClaro = "SELECT * FROM CLARO_CPF WHERE cpf = ?";
            buscarRegistros(queryClaro, [cpf], (err, claroRows) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Erro ao buscar CPF na tabela CLARO_CPF' });
                }

                if (claroRows.length > 0) {
                    resultados.push({ tabela: 'CLARO_CPF', registros: claroRows.map(formatarResultadoClaro) });
                }

                return res.status(200).json({ resultados });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

