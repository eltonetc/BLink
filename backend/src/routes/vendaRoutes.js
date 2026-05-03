// backend/src/routes/vendaRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Buscar vendas do vendedor logado
// Buscar vendas do vendedor (intermediario) logado
router.get('/vendedor', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT 
                v.id,
                v.valor_final,
                v.status_venda,
                v.data_venda,
                p.nome as produto_nome
             FROM vendas v
             LEFT JOIN produtos p ON v.produto_id = p.id
             WHERE v.intermediario_id = ?
             ORDER BY v.data_venda DESC`,
            [req.user.id]
        );
        
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar vendas:', error);
        res.status(500).json({ error: true, message: error.message });
    }
});

// Buscar estatísticas
router.get('/estatisticas', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT 
                COUNT(*) as total_vendas,
                COALESCE(SUM(valor_final), 0) as valor_total,
                SUM(CASE WHEN status_venda = 'liquidado' THEN 1 ELSE 0 END) as vendas_concluidas
             FROM vendas 
             WHERE intermediario_id = ?`,
            [req.user.id]
        );
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ error: true, message: error.message });
    }
});

module.exports = router;
