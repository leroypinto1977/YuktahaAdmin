// import mongoose from "mongoose";

// const WorkshopSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     dept: { type: String, required: true },
//     short_desc: { type: String, required: true },
//     desc: { type: String, required: true },
//     workshopid: { type: Number, unique: true, required: true }, // Unique identifier
//     open: { type: Boolean, default: true },
//     limit: { type: Number, required: true },
//     availability: { type: Number, required: true },
//     onspot_availability: { type: Number, required: true, default: 0 },
//     ecn: { type: String, required: true }, // Event Coordinator Name
//     ecc: { type: String, required: true }, // Event Coordinator Contact
//     venue: { type: String, required: true },
//     time: { type: String, required: true },
//     date: { type: String, required: true },
//     pr: { type: String, required: true },
//     fees: { type: Number, required: true },
//     outer_Img: { type: String, required: false }, // Image for promotion
//     inner_Img: { type: String, required: false }, // Internal event image
//     count: { type: Number, default: 0 }, // Tracks participant count
//     groupId: { type: Number, required: true, default: 0 },
//     participants: [
//       {
//         yuktahaId: { type: String, required: true },
//         firstName: { type: String, required: true },
//         email: { type: String, required: true },
//         phoneNumber: { type: String, required: true },
//         college: { type: String, required: true },
//       },
//     ],
//   },
//   { timestamps: true, collection: "Workshops" }
// );

// export default mongoose.models.Workshop ||
//   mongoose.model("Workshop", WorkshopSchema, "Workshops");

import mongoose from "mongoose";

const WorkshopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dept: { type: String, required: true },
    short_desc: { type: String, required: true },
    desc: { type: String, required: true },
    workshopid: { type: Number, unique: true, required: true }, // Unique identifier
    open: { type: Boolean, default: true },
    onspot_open: { type: Boolean, default: true },
    limit: { type: Number, required: true },
    availability: { type: Number, required: true },
    onspot_availability: { type: Number, required: true, default: 0 },
    ecn: { type: String, required: true }, // Event Coordinator Name
    ecc: { type: String, required: true }, // Event Coordinator Contact
    venue: { type: String, required: true },
    time: { type: String, required: true }, // Existing time field (string)
    date: { type: String, required: true }, // Existing date field (string)
    actualDate: { type: Date, required: true }, // New date field in Date format
    actualTime: { type: String, required: true }, // New time field (can store HH:mm format)
    pr: { type: String, required: true },
    fees: { type: Number, required: true },
    outer_Img: { type: String, required: false }, // Image for promotion
    inner_Img: { type: String, required: false }, // Internal event image
    count: { type: Number, default: 0 }, // Tracks participant count
    groupId: { type: Number, required: true, default: 0 },
    participants: [
      {
        yuktahaId: { type: String, required: true },
        firstName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        college: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, collection: "Workshops" }
);

export default mongoose.models.Workshop ||
  mongoose.model("Workshop", WorkshopSchema, "Workshops");
