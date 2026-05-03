// backend/src/controllers/intermediarioController.js

const Intermediario = require('../models/intermediarioModel');
const User = require('../models/userModel');
const db = require('../config/db');
/**
 * Estatísticas gerais do intermediário (dashboard principal)
 * GET /api/intermediario/stats
 */
exports.getStats = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const stats = await Intermediario.getStats(intermediarioId);
        res.status(200).json(stats);
    } catch (error) {
        console.error('Erro em getStats (intermediario):', error);
        res.status(500).json({ message: 'Erro ao buscar estatísticas.' });
    }
};

/**
 * NOVO: Todos os produtos publicados com status de solicitação do intermediário
 * GET /api/intermediario/todos-produtos
 */
exports.getTodosProdutosComStatus = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const produtos = await Intermediario.getTodosProdutosComStatus(intermediarioId);
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro em getTodosProdutosComStatus:', error);
        res.status(500).json({ message: 'Erro ao buscar produtos.' });
    }
};

/**
 * Oportunidades de venda — produtos publicados disponíveis para vinculação
 * GET /api/intermediario/oportunidades
 */
exports.getOportunidades = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const produtos = await Intermediario.getProdutosDisponiveis(intermediarioId);
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro em getOportunidades:', error);
        res.status(500).json({ message: 'Erro ao buscar oportunidades de venda.' });
    }
};

/**
 * Novos produtos — publicados nos últimos 30 dias
 * GET /api/intermediario/novos-produtos
 */
exports.getNovoProdutos = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const produtos = await Intermediario.getNovoProdutos(intermediarioId);
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro em getNovoProdutos:', error);
        res.status(500).json({ message: 'Erro ao buscar novos produtos.' });
    }
};

/**
 * Produtos activos do intermediário (na tabela produto_intermediario)
 * GET /api/intermediario/produtos-ativos
 */
exports.getProdutosAtivos = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const produtos = await Intermediario.getProdutosAtivos(intermediarioId);
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro em getProdutosAtivos:', error);
        res.status(500).json({ message: 'Erro ao buscar produtos ativos.' });
    }
};

/**
 * Aprovações pendentes — solicitações aguardando resposta
 * GET /api/intermediario/aprovacoes-pendentes
 */
exports.getAprovacoesPendentes = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const aprovacoes = await Intermediario.getAprovacoesPendentes(intermediarioId);
        res.status(200).json(aprovacoes);
    } catch (error) {
        console.error('Erro em getAprovacoesPendentes:', error);
        res.status(500).json({ message: 'Erro ao buscar aprovações pendentes.' });
    }
};

/**
 * Vendas activas do intermediário (status = retido)
 * GET /api/intermediario/vendas-ativas
 */
exports.getVendasAtivas = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const vendas = await Intermediario.getVendasAtivas(intermediarioId);
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro em getVendasAtivas:', error);
        res.status(500).json({ message: 'Erro ao buscar vendas ativas.' });
    }
};

/**
 * Histórico de ganhos — todas as vendas registadas
 * GET /api/intermediario/historico-ganhos
 */
exports.getHistoricoGanhos = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const historico = await Intermediario.getHistoricoGanhos(intermediarioId);
        res.status(200).json(historico);
    } catch (error) {
        console.error('Erro em getHistoricoGanhos:', error);
        res.status(500).json({ message: 'Erro ao buscar histórico de ganhos.' });
    }
};

/**
 * Comissão do mês actual
 * GET /api/intermediario/comissao-mensal
 */
exports.getComissaoMensal = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const comissao = await Intermediario.getComissaoMensal(intermediarioId);
        res.status(200).json(comissao);
    } catch (error) {
        console.error('Erro em getComissaoMensal:', error);
        res.status(500).json({ message: 'Erro ao calcular comissão mensal.' });
    }
};

/**
 * Solicitar intermediação de um produto (vincular ao perfil)
 * POST /api/intermediario/solicitar/:produtoId
 */
exports.solicitarIntermediacao = async (req, res) => {
    console.log('db está definido?', !!db);  // Adicione esta linha
    // Capturar TUDO que acontecer
    let responseSent = false;
    
    const sendResponse = (status, data) => {
        if (!responseSent) {
            responseSent = true;
            return res.status(status).json(data);
        }
    };
    
    try {
        console.log('========================================');
        console.log('🚀 INICIANDO SOLICITACAO');
        console.log('========================================');
        
        // 1. Verificar token
        console.log('1️⃣ Verificando token...');
        if (!req.user) {
            console.error('❌ req.user é undefined');
            return sendResponse(401, { 
                success: false,
                message: 'Token inválido',
                debug: 'req.user not found'
            });
        }
        
        const intermediarioId = req.user.id;
        const { produtoId } = req.params;
        
        console.log(`2️⃣ Parâmetros recebidos:`);
        console.log(`   - intermediarioId: ${intermediarioId} (${typeof intermediarioId})`);
        console.log(`   - produtoId: ${produtoId} (${typeof produtoId})`);
        
        // 2. Validar IDs
        if (!intermediarioId || !produtoId) {
            return sendResponse(400, {
                success: false,
                message: 'IDs obrigatórios',
                debug: { intermediarioId, produtoId }
            });
        }
        
        // 3. Verificar se o produto existe
        console.log('3️⃣ Buscando produto...');
        let produto;
        try {
            const [rows] = await db.execute(
                'SELECT id, vendedor_id, nome, estado, preco_minimo FROM produtos WHERE id = ?',
                [parseInt(produtoId)]
            );
            produto = rows;
            console.log(`   ✅ Produto encontrado: ${produto.length > 0 ? produto[0].nome : 'NENHUM'}`);
        } catch (err) {
            console.error('   ❌ Erro na query do produto:', err);
            return sendResponse(500, {
                success: false,
                message: 'Erro ao consultar produto',
                debug: err.message
            });
        }
        
        if (produto.length === 0) {
            return sendResponse(404, {
                success: false,
                message: `Produto ${produtoId} não encontrado`,
                debug: 'Produto não existe no banco'
            });
        }
        
        if (produto[0].estado !== 'publicado') {
            return sendResponse(400, {
                success: false,
                message: 'Produto não está disponível',
                debug: { estado: produto[0].estado }
            });
        }
        
        const vendedorId = produto[0].vendedor_id;
        console.log(`   - Vendedor ID: ${vendedorId}`);
        
        if (!vendedorId) {
            return sendResponse(400, {
                success: false,
                message: 'Produto sem vendedor associado',
                debug: 'vendedor_id é null'
            });
        }
        
        // 4. Verificar solicitação existente
        console.log('4️⃣ Verificando solicitação existente...');
        let existente;
        try {
            const [rows] = await db.execute(
                `SELECT id, status FROM solicitacoes_intermediacao 
                 WHERE intermediario_id = ? AND produto_id = ? 
                 AND status IN ('pendente', 'aceite')`,
                [String(intermediarioId), parseInt(produtoId)]
            );
            existente = rows;
            console.log(`   ✅ Solicitações encontradas: ${existente.length}`);
        } catch (err) {
            console.error('   ❌ Erro na query:', err);
            return sendResponse(500, {
                success: false,
                message: 'Erro ao verificar solicitações',
                debug: err.message
            });
        }
        
        if (existente.length > 0) {
            return sendResponse(409, {
                success: false,
                message: `Já existe solicitação ${existente[0].status}`,
                debug: existente[0]
            });
        }
        
        // 5. Inserir nova solicitação
        console.log('5️⃣ Inserindo nova solicitação...');
        
        // Gerar UUID manualmente (evita problemas com a função UUID do MySQL)
        const generateUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        
        const solicitacaoId = generateUUID();
        console.log(`   - UUID gerado: ${solicitacaoId}`);
        
        let insertResult;
        try {
            const [result] = await db.execute(
                `INSERT INTO solicitacoes_intermediacao 
                 (id, produto_id, intermediario_id, vendedor_id, status, data_solicitacao)
                 VALUES (?, ?, ?, ?, 'pendente', NOW())`,
                [
                    solicitacaoId,
                    parseInt(produtoId),
                    String(intermediarioId),
                    String(vendedorId)
                ]
            );
            insertResult = result;
            console.log(`   ✅ Inserção realizada! Affected rows: ${result.affectedRows}`);
        } catch (err) {
            console.error('   ❌ ERRO NA INSERÇÃO:', err);
            console.error('   - Código:', err.code);
            console.error('   - SQL Message:', err.sqlMessage);
            console.error('   - SQL State:', err.sqlState);
            
            return sendResponse(500, {
                success: false,
                message: 'Erro ao inserir no banco',
                debug: {
                    code: err.code,
                    sqlMessage: err.sqlMessage,
                    message: err.message
                }
            });
        }
        
        // 6. Sucesso!
        console.log('✅✅✅ SOLICITAÇÃO CRIADA COM SUCESSO! ✅✅✅');
        console.log(`   ID: ${solicitacaoId}`);
        console.log(`   Produto: ${produto[0].nome}`);
        console.log(`   Intermediário: ${intermediarioId}`);
        console.log('========================================\n');
        
        return sendResponse(201, {
            success: true,
            message: 'Solicitação de intermediação criada com sucesso!',
            data: {
                solicitacao_id: solicitacaoId,
                produto_id: parseInt(produtoId),
                produto_nome: produto[0].nome,
                status: 'pendente'
            }
        });
        
    } catch (error) {
        console.error('❌❌❌ ERRO CATASTRÓFICO ❌❌❌');
        console.error('Mensagem:', error.message);
        console.error('Stack:', error.stack);
        
        return sendResponse(500, {
            success: false,
            message: 'Erro interno no servidor',
            debug: {
                error: error.message,
                stack: error.stack?.split('\n')[0]
            }
        });
    }
};
/**
 * Cancelar uma solicitação pendente
 * DELETE /api/intermediario/solicitacao/:solicitacaoId
 */
exports.cancelarSolicitacao = async (req, res) => {
    try {
        const intermediarioId = req.user.id;
        const { solicitacaoId } = req.params;

        const cancelado = await Intermediario.cancelarSolicitacao(intermediarioId, solicitacaoId);

        if (!cancelado) {
            return res.status(404).json({ message: 'Solicitação não encontrada ou já foi processada.' });
        }

        res.status(200).json({ message: 'Solicitação cancelada com sucesso.' });
    } catch (error) {
        console.error('Erro em cancelarSolicitacao:', error);
        res.status(500).json({ message: 'Erro ao cancelar solicitação.' });
    }
};

/**
 * Listar todos os intermediários disponíveis (para vendedores)
 * GET /api/intermediario/listar
 */
exports.listarIntermediarios = async (req, res) => {
    try {
        const db = require('../config/db');

        const [intermediarios] = await db.execute(
            `SELECT
                id,
                nome,
                email,
                tipo_usuario,
                status,
                data_criacao
             FROM usuarios
             WHERE tipo_usuario = 'intermediario'
             AND status = 'ativo'
             ORDER BY nome ASC`
        );

        const formatados = intermediarios.map(inter => ({
            id: inter.id,
            nome: inter.nome,
            email: inter.email || '',
            tipo_usuario: inter.tipo_usuario,
            status: inter.status,
            data_criacao: inter.data_criacao,
            telefone: 'N/A',
            avaliacao: 4.5,
            cidade: 'N/A'
        }));

        console.log(`Listando ${formatados.length} intermediários`);
        res.status(200).json(formatados);
    } catch (error) {
        console.error('Erro em listarIntermediarios:', error);
        res.status(500).json({
            error: true,
            message: 'Erro ao buscar intermediários'
        });
    }
};
