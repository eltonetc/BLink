// backend/src/models/intermediarioModel.js

const db = require('../config/db');

const Intermediario = {

    /**
     * NOVO: Todos os produtos publicados, com status da solicitação do intermediário
     * Retorna TODOS os produtos + indica se já foi solicitado e em que estado
     */
    getTodosProdutosComStatus: async (intermediarioId) => {
        try {
            const sql = `
                SELECT
                    p.id,
                    p.nome,
                    p.descricao,
                    p.preco_minimo,
                    p.comissao_intermediario,
                    p.estado,
                    p.provincia,
                    p.foto_produto,
                    DATE_FORMAT(p.data_cadastro, '%d/%m/%Y') AS data_cadastro,
                    u.nome AS vendedor_nome,
                    c.nome AS categoria_nome,
                    si.id AS solicitacao_id,
                    si.status AS status_solicitacao
                FROM produtos p
                LEFT JOIN usuarios u ON u.id = p.vendedor_id
                LEFT JOIN categorias c ON c.id = p.categoria_id
                LEFT JOIN solicitacoes_intermediacao si
                    ON si.produto_id = p.id
                    AND si.intermediario_id = ?
                    AND si.status IN ('pendente', 'aceite')
                WHERE p.estado = 'publicado'
                ORDER BY p.data_cadastro DESC
            `;
            const [rows] = await db.execute(sql, [intermediarioId]);

            return rows.map(p => {
                let foto_url = 'https://placehold.co/300x200/2d3748/ffffff?text=Sem+Imagem';
                if (p.foto_produto && Buffer.isBuffer(p.foto_produto) && p.foto_produto.length > 0) {
                    try {
                        foto_url = `data:image/jpeg;base64,${p.foto_produto.toString('base64')}`;
                    } catch (_) {}
                }
                return {
                    id: p.id,
                    nome: p.nome,
                    descricao: p.descricao || '',
                    preco_minimo: parseFloat(p.preco_minimo),
                    comissao_intermediario: parseFloat(p.comissao_intermediario || 0),
                    estado: p.estado,
                    provincia: p.provincia || '',
                    foto_url,
                    data_cadastro: p.data_cadastro,
                    vendedor_nome: p.vendedor_nome || '',
                    categoria_nome: p.categoria_nome || '',
                    solicitacao_id: p.solicitacao_id || null,
                    status_solicitacao: p.status_solicitacao || null // null = disponível, 'pendente', 'aceite'
                };
            });
        } catch (error) {
            console.error('Erro ao buscar todos os produtos com status:', error.message);
            throw error;
        }
    },

    /**
     * Produtos publicados disponíveis para intermediação
     * (não vinculados a este intermediário, estado = publicado)
     */
    getProdutosDisponiveis: async (intermediarioId) => {
    try {
        const sql = `
            SELECT
                p.id,
                p.nome,
                p.descricao,
                p.preco_minimo,
                p.comissao_intermediario,
                p.estado,
                p.provincia,
                p.foto_produto,
                DATE_FORMAT(p.data_cadastro, '%d/%m/%Y') AS data_cadastro,
                u.nome AS vendedor_nome,
                c.nome AS categoria_nome
            FROM produtos p
            LEFT JOIN usuarios u ON u.id = p.vendedor_id
            LEFT JOIN categorias c ON c.id = p.categoria_id
            WHERE p.estado = 'publicado'
              AND p.id NOT IN (
                  SELECT si.produto_id
                  FROM solicitacoes_intermediacao si
                  WHERE si.intermediario_id = ?
                    AND si.status IN ('pendente', 'aceite')
              )
            ORDER BY p.data_cadastro DESC
        `;
        const [rows] = await db.execute(sql, [String(intermediarioId)]); // VARCHAR
    
            return rows.map(p => {
                let foto_url = 'https://placehold.co/300x200/2d3748/ffffff?text=Sem+Imagem';
                if (p.foto_produto && Buffer.isBuffer(p.foto_produto) && p.foto_produto.length > 0) {
                    try {
                        foto_url = `data:image/jpeg;base64,${p.foto_produto.toString('base64')}`;
                    } catch (_) {}
                }
                return {
                    id: p.id,
                    nome: p.nome,
                    descricao: p.descricao || '',
                    preco_minimo: parseFloat(p.preco_minimo),
                    comissao_intermediario: parseFloat(p.comissao_intermediario || 0),
                    estado: p.estado,
                    provincia: p.provincia || '',
                    foto_url,
                    data_cadastro: p.data_cadastro,
                    vendedor_nome: p.vendedor_nome || '',
                    categoria_nome: p.categoria_nome || ''
                };
            });
        } catch (error) {
            console.error('Erro ao buscar produtos disponíveis:', error.message);
            throw error;
        }
    },

    /**
     * Novos produtos publicados (últimos 30 dias) disponíveis para intermediação
     */
    getNovoProdutos: async (intermediarioId) => {
        try {
            const sql = `
                SELECT
                    p.id,
                    p.nome,
                    p.descricao,
                    p.preco_minimo,
                    p.comissao_intermediario,
                    p.estado,
                    p.provincia,
                    p.foto_produto,
                    DATE_FORMAT(p.data_cadastro, '%d/%m/%Y') AS data_vinculo,
                    u.nome AS vendedor_nome,
                    c.nome AS categoria_nome
                FROM solicitacoes_intermediacao s
                JOIN produtos p ON p.id = s.produto_id
                LEFT JOIN usuarios u ON c.id = p.vendedor_id
                LEFT JOIN categorias c ON c.id = p.categoria_id
                WHERE s.intermediario = ?
                  AND p.data_cadastro >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                  AND p.id NOT IN (
                    
                  )
                ORDER BY p.data_cadastro DESC
            `;
            const [rows] = await db.execute(sql, [intermediarioId]);

            return rows.map(p => {
                let foto_url = 'https://placehold.co/300x200/2d3748/ffffff?text=Sem+Imagem';
                if (p.foto_produto && Buffer.isBuffer(p.foto_produto) && p.foto_produto.length > 0) {
                    try {
                        foto_url = `data:image/jpeg;base64,${p.foto_produto.toString('base64')}`;
                    } catch (_) {}
                }
                return {
                    id: p.id,
                    nome: p.nome,
                    descricao: p.descricao || '',
                    preco_minimo: parseFloat(p.preco_minimo),
                    comissao_intermediario: parseFloat(p.comissao_intermediario || 0),
                    estado: p.estado,
                    provincia: p.provincia || '',
                    foto_url,
                    data_cadastro: p.data_cadastro,
                    vendedor_nome: p.vendedor_nome || '',
                    categoria_nome: p.categoria_nome || ''
                };
            });
        } catch (error) {
            console.error('Erro ao buscar novos produtos:', error.message);
            throw error;
        }
    },

    /**
     * Produtos activos do intermediário (da tabela produto_intermediario)
     */
    getProdutosAtivos: async (intermediarioId) => {
        try { 
            
            
            
            

            return rows.map(p => {
                let foto_url = 'https://placehold.co/300x200/2d3748/ffffff?text=Sem+Imagem';
                if (p.foto_produto && Buffer.isBuffer(p.foto_produto) && p.foto_produto.length > 0) {
                    try {
                        foto_url = `data:image/jpeg;base64,${p.foto_produto.toString('base64')}`;
                    } catch (_) {}
                }
                return {
                    id: p.id,
                    nome: p.nome,
                    descricao: p.descricao || '',
                    preco_minimo: parseFloat(p.preco_minimo),
                    comissao_intermediario: parseFloat(p.comissao_intermediario || 0),
                    estado: p.estado,
                    provincia: p.provincia || '',
                    foto_url,
                    data_vinculo: p.data_vinculo,
                    vendedor_nome: p.vendedor_nome || '',
                    categoria_nome: p.categoria_nome || '',
                    vinculo_id: p.vinculo_id,
                    vinculo_status: p.vinculo_status
                };
            });
        } catch (error) {
            console.error('Erro ao buscar produtos ativos:', error.message);
            // Fallback para solicitacoes_intermediacao caso produto_intermediario não exista ainda
            try {
                const sqlFallback = `
                    SELECT
                        p.id,
                        p.nome,
                        p.descricao,
                        p.preco_minimo,
                        p.comissao_intermediario,
                        p.estado,
                        p.provincia,
                        p.foto_produto,
                        DATE_FORMAT(si.data_solicitacao, '%d/%m/%Y') AS data_vinculo,
                        u.nome AS vendedor_nome,
                        c.nome AS categoria_nome
                    FROM solicitacoes_intermediacao si
                    INNER JOIN produtos p ON p.id = si.produto_id
                    LEFT JOIN usuarios u ON u.id = p.vendedor_id
                    LEFT JOIN categorias c ON c.id = p.categoria_id
                    WHERE si.intermediario_id = ?
                      AND si.status = 'aceite'
                      AND p.estado != 'removido'
                    ORDER BY si.data_solicitacao DESC
                `;
                const [rowsFallback] = await db.execute(sqlFallback, [intermediarioId]);
                return rowsFallback.map(p => {
                    let foto_url = 'https://placehold.co/300x200/2d3748/ffffff?text=Sem+Imagem';
                    if (p.foto_produto && Buffer.isBuffer(p.foto_produto) && p.foto_produto.length > 0) {
                        try { foto_url = `data:image/jpeg;base64,${p.foto_produto.toString('base64')}`; } catch (_) {}
                    }
                    return {
                        id: p.id, nome: p.nome, descricao: p.descricao || '',
                        preco_minimo: parseFloat(p.preco_minimo),
                        comissao_intermediario: parseFloat(p.comissao_intermediario || 0),
                        estado: p.estado, provincia: p.provincia || '', foto_url,
                        data_vinculo: p.data_vinculo,
                        vendedor_nome: p.vendedor_nome || '', categoria_nome: p.categoria_nome || ''
                    };
                });
            } catch (fallbackError) {
                console.error('Fallback também falhou:', fallbackError.message);
                throw fallbackError;
            }
        }
    },

    /**
     * Aprovações pendentes — solicitações aguardando resposta do vendedor
     */
    getAprovacoesPendentes: async (intermediarioId) => {
        try {
            const sql = `
                SELECT
                    s.id AS solicitacao_id,
                    p.nome As produto_nome,
                    p.foto_url,
                    u.nome AS vendedor_nome,
                    DATE_FORMAT(s.data_solicitacao, '%d/%m/%Y') AS data_solicitacao,
                FROM solicitacoes_intermediacao s
                JOIN produtos p ON s.produtos_id = p.id
                LEFT JOIN usuarios u ON s.vendedor_id = u.id
                WHERE s.intermediario_id = ?
                    AND s.status = 'pendente'
                ORDER BY s.data_solicitacao DESC   
            `;
            const [rows] = await db.execute(sql, [intermediarioId]);

            return rows.map(rows =>({
                ...rows,
                 foto_url: row.foto_url || 'https://placehold.co/60x60/1e3a5f/ffffff?text=P'

            }));
        }catch (error){
            console.error('Erro ao buscar aprovações pendentes:', error.message);
            return[];
        }
    },

    /**
     * Vendas activas do intermediário (status = retido)
     */
    getVendasAtivas: async (intermediarioId) => {
        try {
            const sql = `
                SELECT
                    v.id,
                    v.valor_final,
                    v.status_venda,
                    DATE_FORMAT(v.data_venda, '%d/%m/%Y') AS data_venda,
                    p.nome AS produto_nome,
                    p.comissao_intermediario,
                    p.foto_produto,
                    u_cliente.nome AS cliente_nome
                FROM vendas v
                INNER JOIN produtos p ON p.id = v.produto_id
                LEFT JOIN usuarios u_cliente ON u_cliente.id = v.cliente_id
                WHERE v.intermediario_id = ?
                  AND v.status_venda = 'retido'
                ORDER BY v.data_venda DESC
            `;
            const [rows] = await db.execute(sql, [intermediarioId]);

            return rows.map(v => {
                let foto_url = 'https://placehold.co/60x60/2d3748/ffffff?text=P';
                if (v.foto_produto && Buffer.isBuffer(v.foto_produto) && v.foto_produto.length > 0) {
                    try {
                        foto_url = `data:image/jpeg;base64,${v.foto_produto.toString('base64')}`;
                    } catch (_) {}
                }
                const valor = parseFloat(v.valor_final);
                const comissaoPct = parseFloat(v.comissao_intermediario || 0);
                const ganho = parseFloat(((valor * comissaoPct) / 100).toFixed(2));
                return {
                    id: v.id,
                    valor_final: valor,
                    ganho_estimado: ganho,
                    comissao_pct: comissaoPct,
                    status_venda: v.status_venda,
                    data_venda: v.data_venda,
                    produto_nome: v.produto_nome,
                    foto_url,
                    cliente_nome: v.cliente_nome || 'Cliente'
                };
            });
        } catch (error) {
            console.error('Erro ao buscar vendas ativas:', error.message);
            throw error;
        }
    },

    /**
     * Histórico de ganhos — todas as vendas registadas
     */
    getHistoricoGanhos: async (intermediarioId) => {
        try {
            const sql = `
                SELECT
                    v.id,
                    v.valor_final,
                    v.status_venda,
                    DATE_FORMAT(v.data_venda, '%d/%m/%Y') AS data_venda,
                    YEAR(v.data_venda) AS ano,
                    MONTH(v.data_venda) AS mes,
                    p.nome AS produto_nome,
                    p.comissao_intermediario,
                    p.foto_produto,
                    u_cliente.nome AS cliente_nome
                FROM vendas v
                INNER JOIN produtos p ON p.id = v.produto_id
                LEFT JOIN usuarios u_cliente ON u_cliente.id = v.cliente_id
                WHERE v.intermediario_id = ?
                  AND v.status_venda IN ('liquidado', 'retido', 'estornado')
                ORDER BY v.data_venda DESC
            `;
            const [rows] = await db.execute(sql, [intermediarioId]);

            return rows.map(v => {
                let foto_url = 'https://placehold.co/60x60/2d3748/ffffff?text=P';
                if (v.foto_produto && Buffer.isBuffer(v.foto_produto) && v.foto_produto.length > 0) {
                    try {
                        foto_url = `data:image/jpeg;base64,${v.foto_produto.toString('base64')}`;
                    } catch (_) {}
                }
                const valor = parseFloat(v.valor_final);
                const comissaoPct = parseFloat(v.comissao_intermediario || 0);
                const ganho = parseFloat(((valor * comissaoPct) / 100).toFixed(2));
                return {
                    id: v.id,
                    valor_final: valor,
                    ganho: ganho,
                    comissao_pct: comissaoPct,
                    status_venda: v.status_venda,
                    data_venda: v.data_venda,
                    ano: v.ano,
                    mes: v.mes,
                    produto_nome: v.produto_nome,
                    foto_url,
                    cliente_nome: v.cliente_nome || 'Cliente'
                };
            });
        } catch (error) {
            console.error('Erro ao buscar histórico de ganhos:', error.message);
            throw error;
        }
    },

    /**
     * Comissão mensal do intermediário (mês actual)
     */
    getComissaoMensal: async (intermediarioId) => {
        try {
            const sql = `
                SELECT
                    COALESCE(SUM((v.valor_final * p.comissao_intermediario) / 100), 0) AS comissao_total,
                    COUNT(v.id) AS total_vendas,
                    MONTH(NOW()) AS mes_atual,
                    YEAR(NOW()) AS ano_atual
                FROM vendas v
                INNER JOIN produtos p ON p.id = v.produto_id
                WHERE v.intermediario_id = ?
                  AND v.status_venda IN ('liquidado', 'retido')
                  AND MONTH(v.data_venda) = MONTH(NOW())
                  AND YEAR(v.data_venda) = YEAR(NOW())
            `;
            const [rows] = await db.execute(sql, [intermediarioId]);
            return {
                comissao_total: parseFloat(rows[0].comissao_total || 0).toFixed(2),
                total_vendas: parseInt(rows[0].total_vendas || 0),
                mes: parseInt(rows[0].mes_atual),
                ano: parseInt(rows[0].ano_atual)
            };
        } catch (error) {
            console.error('Erro ao calcular comissão mensal:', error.message);
            throw error;
        }
    },

    /**
     * Estatísticas gerais do intermediário (dashboard)
     */
    getStats: async (intermediarioId) => {
        try {
            // Produtos activos (da tabela produto_intermediario)
            let totalAtivos = 0;
            try {
                const [ativos] = await db.execute(
                    `SELECT COUNT(*) AS total FROM produto_intermediario
                     WHERE intermediario_id = ? AND status = 'ativo'`,
                    [intermediarioId]
                );
                totalAtivos = parseInt(ativos[0].total || 0);
            } catch (_) {
                // Fallback: usar solicitacoes_intermediacao
                const [ativos] = await db.execute(
                    `SELECT COUNT(*) AS total FROM solicitacoes_intermediacao
                     WHERE intermediario_id = ? AND status = 'aceite'`,
                    [intermediarioId]
                );
                totalAtivos = parseInt(ativos[0].total || 0);
            }

            // Vendas realizadas (total histórico)
            const [vendas] = await db.execute(
                `SELECT COUNT(*) AS total FROM vendas
                 WHERE intermediario_id = ? AND status_venda IN ('liquidado', 'retido')`,
                [intermediarioId]
            );

            // Aprovações pendentes
            const [pendentes] = await db.execute(
                `SELECT COUNT(*) AS total FROM solicitacoes_intermediacao
                 WHERE intermediario_id = ? AND status = 'pendente'`,
                [intermediarioId]
            );

            // Comissão do mês actual
            const [comissao] = await db.execute(
                `SELECT COALESCE(SUM((v.valor_final * p.comissao_intermediario) / 100), 0) AS total
                 FROM vendas v
                 INNER JOIN produtos p ON p.id = v.produto_id
                 WHERE v.intermediario_id = ?
                   AND v.status_venda IN ('liquidado', 'retido')
                   AND MONTH(v.data_venda) = MONTH(NOW())
                   AND YEAR(v.data_venda) = YEAR(NOW())`,
                [intermediarioId]
            );

            const totalVendas = parseInt(vendas[0].total || 0);
            const taxa = totalAtivos > 0
                ? parseFloat(((totalVendas / totalAtivos) * 100).toFixed(1))
                : 0;

            return {
                produtos_ativos: totalAtivos,
                vendas_realizadas: totalVendas,
                aprovacoes_pendentes: parseInt(pendentes[0].total || 0),
                comissao_mes: parseFloat(comissao[0].total || 0).toFixed(2),
                taxa_conversao: taxa
            };
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error.message);
            throw error;
        }
    },

    /**
     * Criar solicitação de intermediação (vincular produto)
     */
    criarSolicitacao: async (intermediarioId, produtoId) => {
    let connection;
    try {
        console.log('=== MODEL: criarSolicitacao ===');
        console.log(`Intermediario ID recebido: ${intermediarioId} (${typeof intermediarioId})`);
        console.log(`Produto ID recebido: ${produtoId} (${typeof produtoId})`);
        
        // OBTEM CONEXÃO
        connection = await db.getConnection();
        console.log('Conexão obtida com sucesso');
        
        // VALIDAÇÕES INICIAIS
        if (!intermediarioId || !produtoId) {
            console.error('IDs inválidos');
            return { error: true, message: "IDs inválidos" };
        }

        // Converte produtoId para INT
        const prodId = parseInt(produtoId);
        if (isNaN(prodId)) {
            console.error('Produto ID não é número válido');
            return { error: true, message: "ID do produto inválido" };
        }
        
        // IntermediarioId como string
        const interId = String(intermediarioId);
        console.log(`Produto ID convertido: ${prodId} (${typeof prodId})`);
        console.log(`Intermediario ID convertido: ${interId} (${typeof interId})`);

        // 1. VERIFICAR PRODUTO
        console.log('Buscando produto...');
        const [produto] = await connection.execute(
            `SELECT id, vendedor_id, nome, estado FROM produtos WHERE id = ?`,
            [prodId]
        );
        
        console.log(`Resultado produto:`, produto);

        if (produto.length === 0) {
            console.log(`❌ Produto ${prodId} não encontrado`);
            return { produtoIndisponivel: true, message: "Produto não encontrado" };
        }

        if (produto[0].estado !== 'publicado') {
            console.log(`❌ Produto não está publicado. Estado: ${produto[0].estado}`);
            return { produtoIndisponivel: true, message: "Produto não está disponível para intermediação" };
        }

        const vendedorId = String(produto[0].vendedor_id);
        console.log(`Vendedor ID: ${vendedorId}`);

        // 2. VERIFICAR SOLICITAÇÃO EXISTENTE
        console.log('Verificando solicitação existente...');
        const [existente] = await connection.execute(
            `SELECT id, status FROM solicitacoes_intermediacao
             WHERE intermediario_id = ? AND produto_id = ? AND status IN ('pendente', 'aceite')`,
            [interId, prodId]
        );
        
        console.log(`Solicitação existente:`, existente);

        if (existente.length > 0) {
            console.log(`⚠️ Solicitação já existe com status: ${existente[0].status}`);
            return { jaExiste: true, status: existente[0].status };
        }

        // 3. GERAR UUID
        console.log('Gerando UUID...');
        const [uuidResult] = await connection.execute('SELECT UUID() as uuid');
        const solicitacaoId = uuidResult[0].uuid;
        console.log(`UUID gerado: ${solicitacaoId}`);

        // 4. INSERIR SOLICITAÇÃO
        console.log('Inserindo solicitação...');
        const insertQuery = `INSERT INTO solicitacoes_intermediacao 
            (id, produto_id, intermediario_id, vendedor_id, status, data_solicitacao)
            VALUES (?, ?, ?, ?, 'pendente', NOW())`;
        
        console.log('Query:', insertQuery);
        console.log('Valores:', [solicitacaoId, prodId, interId, vendedorId]);
        
        const [insertResult] = await connection.execute(insertQuery, [
            solicitacaoId,
            prodId,
            interId,
            vendedorId
        ]);
        
        console.log('Resultado insert:', insertResult);
        console.log(`✅ Solicitação criada! ID: ${solicitacaoId}`);
        
        return { 
            sucesso: true, 
            id: solicitacaoId,
            message: "Solicitação criada com sucesso"
        };
        
    } catch (error) {
        console.error('❌❌❌ ERRO NO MODEL:', error);
        console.error('Código do erro:', error.code);
        console.error('SQL State:', error.sqlState);
        console.error('SQL Message:', error.sqlMessage);
        console.error('Stack:', error.stack);
        
        return { 
            error: true, 
            message: error.sqlMessage || error.message,
            code: error.code
        };
    } finally {
        if (connection) {
            connection.release();
            console.log('Conexão liberada');
        }
    }
},
    /**
     * Cancelar / remover solicitação de intermediação (apenas pendentes)
     */
    cancelarSolicitacao: async (intermediarioId, solicitacaoId) => {
        try {
            const [result] = await db.execute(
                `DELETE FROM solicitacoes_intermediacao
                 WHERE id = ? AND intermediario_id = ? AND status = 'pendente'`,
                [solicitacaoId, intermediarioId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao cancelar solicitação:', error.message);
            throw error;
        }
    }
};

module.exports = Intermediario;

