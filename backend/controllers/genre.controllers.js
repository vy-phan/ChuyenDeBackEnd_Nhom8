import Genre from './../models/genre.models.js'
import mongoose from 'mongoose'

export const getGenreById = async (req, res) => {
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No such genre with this ID" });
    }

    try {
        const genre = await Genre.findById(id);

        if (!genre) {
            return res.status(404).json({ success: false, message: "Genre not found" });
        }

        res.status(200).json({ success: true, data: genre });
    } catch (error) {
        console.error("Error in GET Genre by ID:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getGenre = async(req,res) => {
    try {
        const genres = await Genre.find(); // Lấy tất cả the loai
        res.status(200).json({ success: true, data: genres });
    } catch (error) {
        console.log("Error in GET genres:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const postGenre = async(req,res) => {
    const genre = req.body 

    if (!genre.name || !genre.description) {        
        return res.status(400).json({success: false,message: "Please provid all fields"})        
    }    

    const newGenre = new Genre(genre)
    try {        
        await newGenre.save()
        res.status(201).json({success: true,data: newGenre})
    } catch (error) {
        console.error("Error in POST Product:", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const deleteGenre = async(req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No such genre" });
    }
    try {
        await Genre.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Genre deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });    
    }
}

export const updateGenre = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No such genre with this ID" });
    }

    try {
        const genre = await Genre.findByIdAndUpdate(
            id, 
            { ...updates }, 
            { new: true }
        );

        if (!genre) {
            return res.status(404).json({ success: false, message: "Genre not found" });
        }

        res.status(200).json({ success: true, data: genre });
    } catch (error) {
        console.error("Error in UPDATE Genre:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
