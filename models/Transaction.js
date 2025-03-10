// import mongoose from "mongoose";

// const TransactionSchema = new mongoose.Schema(
//   {
//     transactionId: { type: String, unique: true, required: true },
//     yuktahaId: { type: String, required: true },
//     firstName: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     stage: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     fees: { type: Number, required: true },
//     event_type: { type: String, required: true },
//     eventId: { type: Number, required: true },
//     freepass: { type: Boolean, default: false },
//     email: { type: String, required: true },
//   },
//   { timestamps: true, collection: "Transactions" }
// );

// export default mongoose.models.Transaction ||
//   mongoose.model("Transaction", TransactionSchema, "Transactions");

// models/Transaction.js
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    yuktahaId: { type: String, required: true },
    firstName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    fees: { type: Number, required: true },
    event_type: { type: String, required: true },
    eventId: { type: String, required: true },
    email: { type: String, required: true },
    freepass: { type: Boolean, default: false },
    status: { type: String, default: "initiated" },
  },
  { timestamps: true, collection: "Transactions" }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema, "Transactions");
