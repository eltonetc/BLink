const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requestController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Rotas do sistema
router.post('/', authenticateToken, RequestController.enviarProposta);
router.get('/recebidas', authenticateToken, RequestController.verPropostasRecebidas);
router.put('/:id/responder', authenticateToken, RequestController.responderProposta);
router.get('/minhas', authenticateToken, RequestController.verMinhasPropostas);

module.exports = router;