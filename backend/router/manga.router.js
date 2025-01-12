import express from "express";
import { getManga, postManga, deleteManga, updateManga, getMangaById } from "../controllers/manga.controllers.js";


const router = express.Router()

router.get("/:id", getMangaById);
router.get('/',getManga)
router.post('/',postManga)
router.delete('/:id',deleteManga)
router.put('/:id',updateManga)

export default router