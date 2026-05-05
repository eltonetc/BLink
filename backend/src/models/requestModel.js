const pool = require('../config/db');

const RequestModel = {

  // 1. Função que faltava e dava erro! (Anti-Spam)
  async verSeJaExiste(intermediario_id, produto_id) {
    const sql = 'SELECT * FROM solicitacoes_intermediacao WHERE intermediario_id = ? AND produto_id = ?';
    const [rows] = await pool.execute(sql, [intermediario_id, produto_id]);
    return rows[0]; 
  },

  // 2. Função de Criar (CORRIGIDA com vendedor_id, status e data)
  async criar({ intermediario_id, produto_id, vendedor_id }) {
    const sql = `
      INSERT INTO solicitacoes_intermediacao 
      (id, intermediario_id, produto_id, vendedor_id, status, data_solicitacao) 
      VALUES (UUID(), ?, ?, ?, 'pendente', NOW())
    `;
    const [result] = await pool.execute(sql, [intermediario_id, produto_id, vendedor_id]); 
    return result;
  },

  // 3. Buscar proposta pelo ID
  async verPorId(id) {
    const sql = 'SELECT * FROM solicitacoes_intermediacao WHERE id = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  },

  // 4. Vendedor vê propostas recebidas
  async verPorVendedor(vendedor_id) {
    const sql = `
      SELECT s.* 
      FROM solicitacoes_intermediacao s
      JOIN produtos p ON s.produto_id = p.id
      WHERE p.vendedor_id = ?
    `;
    const [rows] = await pool.execute(sql, [vendedor_id]);
    return rows;
  },

  // 5. Atualizar status (Aceitar/Rejeitar)
  async actualizarStatus(id, status) {
    const sql = 'UPDATE solicitacoes_intermediacao SET status = ? WHERE id = ?';
    await pool.execute(sql, [status, id]);
  },

  // 6. Intermediário vê o que ele enviou
  async verPorIntermediario(intermediario_id) {
    const sql = 'SELECT * FROM solicitacoes_intermediacao WHERE intermediario_id = ?';
    const [rows] = await pool.execute(sql, [intermediario_id]);
    return rows;
  },

  // 7. Contar propostas aceites (Se precisar no futuro)
  async contarAceitesPorProduto(produto_id) {
    const sql = "SELECT COUNT(*) as total FROM solicitacoes_intermediacao WHERE produto_id = ? AND status = 'aceite'";
    const [rows] = await pool.execute(sql, [produto_id]);
    return rows[0].total;
  }
};

module.exports = RequestModel;