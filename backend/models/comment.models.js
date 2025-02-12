import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    mangaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manga',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

const Comment = mongoose.model('Comment',commentSchema)
export default Comment