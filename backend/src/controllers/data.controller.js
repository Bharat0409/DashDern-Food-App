import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Food_Item } from "../models/food_item.model.js"
import { FoodCategory } from "../models/foodCategory.model.js"

const data = asyncHandler( async (req, res) => {
    const foodItems = await Food_Item.find()
    const foodCategories = await FoodCategory.find()

    if (!foodItems || !foodCategories) {
        new ApiError (500, "Data not available")
    }

    return res.status(201).json(
        new ApiResponse(200, [foodItems, foodCategories], "Food data is Avaialable")
    )

})

export { data }