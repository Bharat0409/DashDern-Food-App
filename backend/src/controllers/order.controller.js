import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Order } from "../models/orderes.model.js"

const orderData = asyncHandler( async (req, res) => {
    let data = req.body.order_data

    if (!data) {
        throw new ApiError(400, "Data not provided")
    }

    await data.splice(0, 0, { Order_date: req.body.order_date })

    const email = req.body.email
    //if email not exisitng in db then create: else: InsertMany()
    // console.log(typeof email)
    let eId = await Order.findOne({ "email": email })   
    // console.log(eId)
    if (eId === null) {
        const orderCreated = await Order.create({
            email: req.body.email,
            order_data: [data]
        })
        console.log(orderCreated)
        if (!orderCreated) {
            throw new ApiError(500, "Server Error")
        }

        return res.status(201).json(
            new ApiResponse(200, { success: true }, "Data submitted successfully")
        )
    }

    else {
        const orderUpdated = await Order.findOneAndUpdate({email:req.body.email},
            { $push:{order_data: data} })

        if (!orderUpdated) {
            throw new ApiError(500, "Server Error")
        }

        return res.status(201).json(
            new ApiResponse(200, { success: true }, "Data submitted successfully")
        )
    }
    
})

const myOrderData = asyncHandler( async (req, res) => {
    
    const email = req.body.email

    if (!email) {
        throw new ApiError(400, "No email provided for the user")
    }

    const myData = await Order.findOne({ "email": email })

    if(!myData) {
        throw new ApiError(500, "Server Error")
    }

    return res.status(200).json(
        new ApiResponse(200, {orderData: myData}, "Data fetched successfully")
    )
    
})

export {
    orderData,
    myOrderData
}