import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {userId} = req.user

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }
    const like = await Like.findOne({videoId, userId})
    if (like) {
        await like.remove()
    } else {
        await Like.create({videoId, userId})
    }
    return res
    .status(200)
    .json(new ApiResponse(200, "Like toggled"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const {userId} = req.user

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }
    const comment = await Comment.findById(commentId)
    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }
    const like = await Like.findOne({commentId, userId})
    if (like) {
        await like.remove()
    } else {
        await Like.create({commentId, userId})
    }
    return res 
    .status(200)
    .json(new ApiResponse(200, "Like toggled"))
})

const toggleTweetlike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    const {userId} = req.user
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id")
    }
    const tweet = await Tweet.findById(tweetId)
    if (!tweet) {
        throw new ApiError(404, "Tweet not found")
    }
    const like = await Like.findOne({tweetId, userId})
    if (like) {
        await like.remove()
    } else {
        await Like.create({tweetId, userId})
    }
    return res
    .status(200)
    .json(new ApiResponse(200, "Like toggled"))
})

const getLikedVideos = asyncHandler(async (req, res) => {
    //Get all liked videos
    const {userId} = req.user
    const likedVideos = await Video.find({likes: userId})
    return res
    .status(200)
    .json(new ApiResponse(200, "Liked videos", likedVideos))
})


export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetlike,
    getLikedVideos
}