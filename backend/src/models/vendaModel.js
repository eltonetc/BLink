// backend/models/Venda.js

const db = require('../config/database');

class Venda {
    // Criar nova venda
    static async create(vendaData) {
        const { 
            produto_id, 
            produto_nome,
            comprador_nome,
            comprador_email,
            intermediario_id,
            intermediario_nome,
            vendedor_id,
            valor,
            comissao,
            percentual_comissao,
            status = 'Pendente'
        } = vendaData;

        const venda_id = `V${Date.now()}`;
        const data_venda = new Date();

        const query = `
            INSERT INTO vendas (
                venda_id, produto_id, produto_nome, comprador_nome, comprador_email,
                intermediario_id, intermediario_nome, vendedor_id, valor, comissao,
                percentual_comissao, status, data_venda
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            venda_id, produto_id, produto_nome, comprador_nome, comprador_email,
            intermediario_id || null, intermediario_nome || null, vendedor_id, 
            valor, comissao, percentual_comissao, status, data_venda
        ];

        try {
            const [result] = await db.execute(query, values);
            return { id: result.insertId, venda_id, ...vendaData };
        } catch (error) {
            console.error('Erro ao criar venda:', error);
            throw error;
        }
    }

    // Buscar vendas por vendedor
    static async findByVendedor(vendedor_id) {
        const query = `
            SELECT 
                v.*,
                p.nome as produto_nome_real,
                p.preco_minimo,
                u.nome as vendedor_nome
            FROM vendas v
            LEFT JOIN produtos p ON v.produto_id = p.id
            LEFT JOIN usuarios u ON v.vendedor_id = u.id
            WHERE v.vendedor_id = ?
            ORDER BY v.data_venda DESC
        `;

        try {
            const [rows] = await db.execute(query, [vendedor_id]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar vendas:', error);
            throw error;
        }
    }

    // Buscar vendas por produto
    static async findByProduto(produto_id) {
        const query = `
            SELECT * FROM vendas 
            WHERE produto_id = ? 
            ORDER BY data_venda DESC
        `;

        try {
            const [rows] = await db.execute(query, [produto_id]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar vendas por produto:', error);
            throw error;
        }
    }

    // Buscar estatísticas do vendedor
    static async getStats(vendedor_id) {
        const query = `
            SELECT 
                COUNT(*) as total_vendas,
                SUM(valor) as valor_total,
                SUM(comissao) as comissao_total,
                COUNT(CASE WHEN status = 'Concluída' THEN 1 END) as vendas_concluidas,
                COUNT(CASE WHEN status = 'Em Progresso' THEN 1 END) as vendas_andamento,
                COUNT(CASE WHEN status = 'Pendente' THEN 1 END) as vendas_pendentes,
                COUNT(CASE WHEN status = 'Cancelada' THEN 1 END) as vendas_canceladas
            FROM vendas
            WHERE vendedor_id = ?
        `;

        try {
            const [rows] = await db.execute(query, [vendedor_id]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
            throw error;
        }
    }

    // Atualizar status da venda
    static async updateStatus(venda_id, status, vendedor_id) {
        const query = `
            UPDATE vendas 
            SET status = ?, updated_at = NOW()
            WHERE venda_id = ? AND vendedor_id = ?
        `;

        try {
            const [result] = await db.execute(query, [status, venda_id, vendedor_id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            throw error;
        }
    }
}

module.exports = Venda;