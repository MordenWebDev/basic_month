const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({

    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
    
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })

expenseSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model("Expense", expenseSchema)