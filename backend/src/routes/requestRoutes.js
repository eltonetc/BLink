const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requestController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Rotas do sistema
router.post('/', authenticateToken, RequestController.enviarProposta);
router.get('/tabelas', authenticateToken, RequestController.verTabelas);
router.get('/colunas', authenticateToken, RequestController.verColunas);
router.get('/colunasProdutosIntermediado', authenticateToken, RequestController.getProdutosIntermediados);
router.get('/recebidas', authenticateToken, RequestController.verPropostasRecebidas);
router.put('/:id/responder', authenticateToken, RequestController.responderProposta);
router.get('/minhas', authenticateToken, RequestController.verMinhasPropostas);

// Rota para clientes verem produtos intermediados (pública)
router.get('/produtos-intermediados', RequestController.getProdutosIntermediados);

module.exports = router;