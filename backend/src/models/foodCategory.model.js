import mongoose, { Schema } from "mongoose";

const foodCategorySchema = new Schema({
    CategoryName: {
        type: String,
        required: true
    }
});

export const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema)