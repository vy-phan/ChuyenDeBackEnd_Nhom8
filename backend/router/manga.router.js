import express from "express";
import { getManga, postManga, deleteManga, updateManga, getMangaById } from "../controllers/manga.controllers.js";
import protectRoute from "../middleware/protectToken.js";

const router = express.Router()

router.get("/:id", getMangaById);
router.get('/',getManga)
router.post('/',protectRoute,postManga)
router.delete('/:id',protectRoute,deleteManga)
router.put('/:id',protectRoute,updateManga)

export default router