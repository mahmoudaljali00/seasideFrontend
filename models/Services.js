const { Schema, models, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    afilink: { type: String },
    price: { type: String }, // u can use number
    status: { type: String },
  },
  {
    timestamps: true, // this will automatically manage createdAt and updatedAt
  }
);

export const Service = models.Service || model("Service", serviceSchema, "services");