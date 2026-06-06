const expensesController = require('../controllers/expenses.controller');
const authMiddleware = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();

router.post('/', authMiddleware, expensesController.createExpense);
router.get('/', authMiddleware, expensesController.getExpenses);
router.patch('/:id', authMiddleware, expensesController.updateExpenses);
router.delete('/:id', authMiddleware, expensesController.deleteExpenses);

module.exports = router;