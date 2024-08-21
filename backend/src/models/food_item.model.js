import mongoose, { Schema } from "mongoose";

const foodItemSchema = new Schema({
    CategoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export const Food_Item = mongoose.model("Food_Item", foodItemSchema)