// backend/src/routes/intermediarioRoutes.js

const express = require('express');
const router = express.Router();
const intermediarioController = require('../controllers/intermediarioController');
const vendedorController = require('../controllers/vendedorController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// ========== DEBUG - ADICIONE AQUI ==========
console.log("\n=== CARREGANDO INTERMEDIARIO ROUTES ===");
console.log("vendedorController existe?", !!vendedorController);
console.log("vendedorController.getSolicitacoesRecebidas existe?", !!vendedorController.getSolicitacoesRecebidas);
console.log("vendedorController.aceitarSolicitacao existe?", !!vendedorController.aceitarSolicitacao);
console.log("vendedorController.rejeitarSolicitacao existe?", !!vendedorController.rejeitarSolicitacao);
console.log("===================================\n");

const auth = [authenticateToken, authorizeRole('intermediario', 'admin')];
const authVendedor = [authenticateToken, authorizeRole('vendedor', 'admin')];

// Rotas do dashboard do intermediário
router.get('/stats', auth, intermediarioController.getStats);
router.get('/oportunidades', auth, intermediarioController.getOportunidades);
router.get('/novos-produtos', auth, intermediarioController.getNovoProdutos);
router.get('/produtos-ativos', auth, intermediarioController.getProdutosAtivos);
router.get('/aprovacoes-pendentes', auth, intermediarioController.getAprovacoesPendentes);
router.get('/vendas-ativas', auth, intermediarioController.getVendasAtivas);
router.get('/historico-ganhos', auth, intermediarioController.getHistoricoGanhos);
router.get('/comissao-mensal', auth, intermediarioController.getComissaoMensal);
router.post('/solicitar/:produtoId', auth, intermediarioController.solicitarIntermediacao);
router.delete('/solicitacao/:solicitacaoId', auth, intermediarioController.cancelarSolicitacao);
router.get('/minhas-solicitacoes/:status', auth, vendedorController.getSolicitacoesPorStatus);

// Rotas do vendedor para gerenciar solicitações
router.get('/vendedor/solicitacoes', authVendedor, vendedorController.getSolicitacoesRecebidas);
router.post('/vendedor/solicitacoes/:solicitacaoId/aceitar', authVendedor, vendedorController.aceitarSolicitacao);
router.post('/vendedor/solicitacoes/:solicitacaoId/rejeitar', authVendedor, vendedorController.rejeitarSolicitacao);

// Rota SEM AUTENTICAÇÃO para listar intermediários (para vendedores)
router.get('/listar', intermediarioController.listarIntermediarios);

module.exports = router;