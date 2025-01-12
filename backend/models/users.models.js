import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }, // or use roles collection for more complex roles
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Manga'
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export default User