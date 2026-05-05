const RequestModel = require('../models/requestModel');
const db = require('../config/db');

const RequestController = {

  // Intermediário envia proposta ao Vendedor
  async enviarProposta(req, res) {
    try {
      // Voltámos a pedir o vendedor_id no body, para não mexeres no ProductModel
      const { vendedor_id, produto_id, preco_venda } = req.body;
      const intermediario_id = req.user.id;

      // SEGURANÇA QUE NÃO QUEBRA NADA: Impedir que o intermediário envie 50 propostas ao mesmo produto (spam)
      const jaPropos = await RequestModel.verSeJaExiste(intermediario_id, produto_id);
      if (jaPropos) {
        return res.status(400).json({ error: 'Já enviou uma proposta para este produto' });
      }

       const result = await RequestModel.criar({
          intermediario_id,
          produto_id
          // Tirei o vendedor_id e o preco_venda porque não existem na BD do teu colega
        });

      res.status(201).json({ message: 'Proposta enviada com sucesso', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao enviar proposta', details: err.message });
    }
  },

  // Vendedor vê propostas recebidas
  async verPropostasRecebidas(req, res) {
    try {
      const vendedor_id = req.user.id;
      const propostas = await RequestModel.verPorVendedor(vendedor_id);
      res.json(propostas);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar propostas', details: err.message });
    }
  },

  // Vendedor aceita ou rejeita proposta
    // Vendedor aceita ou rejeita proposta
    // Vendedor aceita ou rejeita proposta (VERSÃO LIMPA DE TESTE)
  async responderProposta(req, res) {
    try {
      const id = req.params.id;
      const status = req.body.status;
      const vendedor_id = req.user.id; 

      if (!['aceite', 'rejeitada'].includes(status)) {
        return res.status(400).json({ error: 'Status inválido' });
      }

      // 1. Buscar a proposta
      const proposta = await RequestModel.verPorId(id);
      if (!proposta) {
        return res.status(404).json({ error: 'Proposta não encontrada' });
      }

      // 2. Buscar o produto para saber o dono
      const db = require('../config/db'); // Muda para 'pool' se for o teu caso
      const [produtoRows] = await db.execute('SELECT vendedor_id FROM produtos WHERE id = ?', [proposta.produto_id]);
      const produto = produtoRows[0];
      
      if (!produto) {
        return res.status(404).json({ error: 'Produto não existe' });
      }

      // 3. Segurança
      if (produto.vendedor_id !== vendedor_id) {
        return res.status(403).json({ error: 'Não tem permissão' });
      }

      // 4. Atualizar na base de dados
      await RequestModel.actualizarStatus(id, status);
      
      res.json({ message: 'Status atualizado com sucesso!' });
      
    } catch (err) {
      res.status(500).json({ error: 'Erro ao responder proposta', details: err.message });
    }
  },
  // Intermediário vê propostas que enviou
  async verMinhasPropostas(req, res) {
    try {
      const intermediario_id = req.user.id;
      const proposta = await RequestModel.verPorIntermediario(intermediario_id);
      res.json(proposta);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar propostas', details: err.message });
    }
  },

  // Adiciona isto dentro do teu RequestModel

    // 1. Buscar proposta pelo ID (usada para validar quem é o dono antes de aprovar/rejeitar)
  async verPorId(id) {
    const sql = 'SELECT * FROM requests WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows[0]; 
  },

    // 2. Verificar se intermediário já enviou proposta para este produto (Anti-Spam)
  async verSeJaExiste(intermediario_id, produto_id) {
    const sql = 'SELECT * FROM requests WHERE intermediario_id = ? AND produto_id = ?';
    const [rows] = await db.execute(sql, [intermediario_id, produto_id]);
    return rows[0]; 
  },

    // 3. Contar propostas ACEITES num produto (Para garantir o limite de 10)
  async contarAceitesPorProduto(produto_id) {
    const sql = 'SELECT COUNT(*) as total FROM requests WHERE produto_id = ? AND status = "aceite"';
    const [rows] = await db.execute(sql, [produto_id]);
    return rows[0].total; 
  },

  async verTabelas(req, res) {
    try {
      const db = require('../config/db'); 
      const [rows] = await db.execute('SHOW TABLES');
      res.json({ tabelas_no_banco: rows });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar tabelas', details: err.message });
    }
  },

  async verColunas(req, res) {
    try {
      const db = require('../config/db'); // Muda para 'pool' se for preciso
      const [rows] = await db.execute('DESCRIBE solicitacoes_intermediacao');
      res.json({ colunas_da_tabela: rows });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar colunas', details: err.message });
    }
  }

};



module.exports = RequestController;