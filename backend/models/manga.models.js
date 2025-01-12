import mongoose from "mongoose";

const mangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // ten truyen manga
    description: {
        type: String
    }, 
    // mo ta 
    status: {
        type: String
    }, 
    // hoàn thành , đang ra , sắp ra
    genres: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre'
        }
    ],
    poster: {
        type: String
    }, 
    // url poster image
    chapters: [
        {
            chapterNumber: Number,
            pages: String
            // url path each chapter 
        }
    ],
},{timestamps: true})

const Manga = mongoose.model('Manga',mangaSchema)
export default Manga