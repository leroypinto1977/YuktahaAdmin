// import mongoose from "mongoose";
// import AutoIncrementFactory from "mongoose-sequence";

// const connection = mongoose.connection;
// const AutoIncrement = AutoIncrementFactory(connection);

// // Define the workshop item schema
// const WorkshopItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   workshopid: { type: Number, required: true },
//   outer_Img: { type: String, required: true },
//   paid: { type: Boolean, required: true },
// });

// // Define the event item schema
// const EventItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   eventid: { type: Number, required: true },
//   outer_Img: { type: String, required: true },
//   paid: { type: Boolean, required: true },
// });

// const UserDetailsSchema = new mongoose.Schema(
//   {
//     k_id: { type: String, required: true },
//     yuktahaId: { type: String, unique: true }, // String for prefix
//     yuktahaNumber: { type: Number, unique: true }, // Ensure it gets assigned
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     city: { type: String, required: true },
//     picture: { type: String, required: true },
//     college: { type: String, required: true },
//     department: { type: String, required: true },
//     yearOfStudy: { type: String, required: true },
//     // Updated workshop fields
//     workshopsRegistered: { type: Number, required: true, default: 0 },
//     workshop: [WorkshopItemSchema], // Array of workshop items
//     // New technical events fields
//     teventsRegistered: { type: Number, required: true, default: 0 },
//     tevents: [EventItemSchema], // Array of technical event items
//     // New non-technical events fields
//     nteventsRegistered: { type: Number, required: true, default: 0 },
//     ntevents: [EventItemSchema], // Array of non-technical event items
//     phoneNumber: { type: String, required: true },
//     userLevel: { type: String, required: true, default: "user" },
//   },
//   { timestamps: true, collection: "User-Details" }
// );

// // Apply Auto-Increment Plugin
// UserDetailsSchema.plugin(AutoIncrement, {
//   inc_field: "yuktahaNumber",
//   start_seq: 1,
// });

// // Ensure `yuktahaId` is Assigned Before Saving
// UserDetailsSchema.pre("save", function (next) {
//   if (!this.yuktahaId && this.yuktahaNumber) {
//     this.yuktahaId = `yuk2k25_${this.yuktahaNumber}`;
//     console.log("Generated yuktahaId:", this.yuktahaId);
//   }
//   next();
// });

// export default mongoose.models.UserDetails ||
//   mongoose.model("UserDetails", UserDetailsSchema, "User-Details");

// models/UserDetails.js

import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const connection = mongoose.connection;
const AutoIncrement = AutoIncrementFactory(connection);

// Define the workshop item schema
const WorkshopItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workshopid: { type: Number, required: true },
  outer_Img: { type: String, required: true },
  paid: { type: Boolean, required: true },
});

// Define the event item schema
const EventItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  eventid: { type: Number, required: true },
  outer_Img: { type: String, required: true },
  paid: { type: Boolean, required: true },
});

const UserDetailsSchema = new mongoose.Schema(
  {
    k_id: { type: String, required: true },
    userRole: { type: String, default: "user" },
    yuktahaId: { type: String, unique: true },
    yuktahaNumber: { type: Number, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    picture: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
    yearOfStudy: { type: String, required: true },
    // Ensure workshopsRegistered is always a number
    workshopsRegistered: {
      type: Number,
      required: true,
      default: 0,
      get: (v) => Math.round(v),
      set: (v) => (typeof v === "string" ? parseInt(v) || 0 : v),
    },
    workshop: [WorkshopItemSchema],
    teventsRegistered: {
      type: Number,
      required: true,
      default: 0,
      get: (v) => Math.round(v),
      set: (v) => (typeof v === "string" ? parseInt(v) || 0 : v),
    },
    tevents: [EventItemSchema],
    nteventsRegistered: {
      type: Number,
      required: true,
      default: 0,
      get: (v) => Math.round(v),
      set: (v) => (typeof v === "string" ? parseInt(v) || 0 : v),
    },
    ntevents: [EventItemSchema],
    phoneNumber: { type: String, required: true },
    userLevel: { type: String, required: true, default: "user" },
  },
  { timestamps: true, collection: "User-Details" }
);

// Add middleware to ensure numeric values
UserDetailsSchema.pre("save", function (next) {
  // Convert string numbers to actual numbers
  if (typeof this.workshopsRegistered === "string") {
    this.workshopsRegistered = parseInt(this.workshopsRegistered) || 0;
  }
  if (typeof this.teventsRegistered === "string") {
    this.teventsRegistered = parseInt(this.teventsRegistered) || 0;
  }
  if (typeof this.nteventsRegistered === "string") {
    this.nteventsRegistered = parseInt(this.nteventsRegistered) || 0;
  }
  next();
});

// Apply Auto-Increment Plugin
UserDetailsSchema.plugin(AutoIncrement, {
  inc_field: "yuktahaNumber",
  start_seq: 1,
});

// Ensure `yuktahaId` is Assigned Before Saving
UserDetailsSchema.pre("save", function (next) {
  if (!this.yuktahaId && this.yuktahaNumber) {
    this.yuktahaId = `yuk2k25_${this.yuktahaNumber}`;
    console.log("Generated yuktahaId:", this.yuktahaId);
  }
  next();
});

export default mongoose.models.UserDetails ||
  mongoose.model("UserDetails", UserDetailsSchema, "User-Details");
