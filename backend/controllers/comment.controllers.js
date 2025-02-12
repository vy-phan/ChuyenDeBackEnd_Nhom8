import Comment from "../models/comment.models.js";
import mongoose from 'mongoose'

export const createComment = async (req, res) => {
    const { content, mangaId, userId } = req.body;
    if (!content || !mangaId || !userId) {
        return res.status(400).json({ success: false, message: "Please provid all fields" })
    }
    try {
        const newComment = new Comment({ content, mangaId, userId })
        await newComment.save()
        res.status(201).json({ success: true, data: newComment })
    } catch (error) {
        console.error("Error in CREATE Comment:", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const getComment = async (req, res) => {
    try {
        const comments = await Comment.find()
        res.status(200).json({ success: true, data: comments })
    } catch (error) {
        console.error("Error in GET Comment:", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No such comment" });
    }
    try {
        await Comment.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Comment deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });    
    }
}