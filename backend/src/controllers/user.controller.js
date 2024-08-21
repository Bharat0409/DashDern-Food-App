import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"

const generateAccessTokens = async (userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        await user.save({ validateBeforeSave: false })

        return accessToken

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
}}

const registerUser = asyncHandler( async (req, res) => {

    const {name, email, password, location} = req.body

    if (
        [name, email, password, location].some((field) => field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(400, "User with email or username already exists")
    }

    const user = await User.create({
        name, 
        email,
        password,
        location
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went erong while signing in the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "USer registered Successfully")
    )
})

const loginUser = asyncHandler( async (req, res) => {

    const {email, password} = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isValidPassword = await user.isPasswordCorrect(password)

    if (!isValidPassword) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const accessToken = await generateAccessTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken
            },
            "User logged In Successfully"
        )
    )

})

// const logoutUser = asyncHandler( async (req, res) => {
//     const options = {
//         httpOnly: true,
//         secure: true
//     }

//     return res.status(200)
//     .clearCookie("accessToken", options)
//     .json(new ApiResponse(200, {}, "User logged Out"))
// })

export {
    registerUser,
    loginUser
}