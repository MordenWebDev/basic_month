const expenseModel = require("../models/expense.model");

const createExpense = async (req, res, next) => {
  try {
    const { amount, category, description } = req.body;
    const user = req.user.id;

    if (!amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || isNaN(amount)) {
      return res
        .status(400)
        .json({ message: "Amount must be a valid number greater than zero" });
    }
    if (category.trim().length <= 0) {
      return res.status(400).json({ message: "Category must not be empty" });
    }

    const expense = await expenseModel.create({
      amount,
      category,
      description,
      user,
    });
    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (error) {
    next(error);
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const user = req.user.id;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;
    const expenses = await expenseModel
      .find({ user })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Expenses fetched successfully", expenses });
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const user = req.user.id;
    const expenseid = req.params.id;
    const allowedFields = ["amount", "category", "description"];
    const cleanedData = {};
    for (const key in req.body) {
      if (allowedFields.includes(key)) {
        cleanedData[key] = req.body[key];
      }
    }
    if (Object.keys(cleanedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    const updatedexpense = await expenseModel.findOneAndUpdate(
      { _id: expenseid, user },
      { $set: cleanedData },
      { new: true },
    );
    if (!updatedexpense) {
      return res.status(404).json({ message: "Expense not found " });
    }
    res.status(200).json({
      message: "Expense updated successfully",
      updatedexpense,
    });
  } catch (error) {
    next(error);
  }
};
const deleteExpense = async (req, res, next) => {
  try {
    const user = req.user.id;
    const expenseid = req.params.id;
    const deletedexpense = await expenseModel.findOneAndDelete({
      _id: expenseid,
      user,
    });
    if (!deletedexpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense };
