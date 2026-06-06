const expenseModel = require("../models/expense.model");

const createExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const user = req.user.id;
    const expense = await expenseModel.create({
      amount,
      category,
      description,
      user,
    });
    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Error creating expense" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const user = req.user.id;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;
    const expenses = await expenseModel.find({ user }).skip(skip).limit(limit);
    res
      .status(200)
      .json({ message: "Expenses fetched successfully", expenses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

const updateExpenses = async (req, res) => {
  try {
    const user = req.user.id;
    const expenseid = req.params.id;

    const updatedexpenses = await expenseModel.findOneAndUpdate(
      { _id: expenseid, user },
      { $set: req.body },
      { new: true },
    );
    if (!updatedexpenses) {
      return res
        .status(404)
        .json({ message: "Expenses not found unable to update expenses" });
    }
    res.status(200).json({
      message: "Expenses updateExpenses successfully",
      updatedexpenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updateExpenses expenses" });
  }
};
const deleteExpenses = async (req, res) => {
  try {
    const user = req.user.id;
    const expenseid = req.params.id;
    const deletedexpenses = await expenseModel.findOneAndDelete({
      _id: expenseid,
      user,
    });
    if (!deletedexpenses) {
      return res
        .status(404)
        .json({ message: "Expenses not found unable to delete expenses" });
    }
    res.status(200).json({ message: "Expenses deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expenses" });
  }
};

module.exports = { createExpense, getExpenses, updateExpenses, deleteExpenses };
