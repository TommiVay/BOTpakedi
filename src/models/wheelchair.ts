import mongoose from "mongoose";

const wheelchairSchema = new mongoose.Schema({ entry: String });

export const Wheelchair = mongoose.model("wheelchair", wheelchairSchema);
