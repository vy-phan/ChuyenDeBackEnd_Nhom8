import Manga from './../models/manga.models.js'
import mongoose from 'mongoose'

export const getMangaById = async (req, res) => {
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No such manga with this ID" });
    }

    try {
        const manga = await Manga.findById(id);

        if (!manga) {
            return res.status(404).json({ success: false, message: "Manga not found" });
        }

        res.status(200).json({ success: true, data: manga });
    } catch (error) {
        console.error("Error in GET Manga by ID:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const getManga = async(req,res) => {
    try {
        const mangas = await Manga.find(); // Lấy tất cả truyện
        res.status(200).json({ success: true, data: mangas });
    } catch (error) {
        console.log("Error in GET mangas:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const postManga = async(req,res) => {
    const manga = req.body 

    // || !manga.chapters
    if (!manga.title || !manga.description || !manga.status || !manga.genres || !manga.poster  ) {
        return res.status(400).json({success: false,message: "Please provid all fields"})
    }

    const newManga = new Manga(manga)
    try {
        await newManga.save()
        res.status(201).json({success: true,data: newManga})
    } catch (error) {
        console.error("Error in POST Product:", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const deleteManga = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No such manga" });
    }
    try {
        await Manga.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Manga deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });    
    }
}

export const updateManga = async(req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "No such manga"})
    }
    try {
        const updatedManga = await Manga.findByIdAndUpdate(id, {...req.body}, {new: true})
        res.status(200).json({success: true, message: updatedManga})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Server Error"})    
    }
}   

