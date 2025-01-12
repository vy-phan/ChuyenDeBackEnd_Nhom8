import express from "express";
import { deleteGenre, getGenre, getGenreById, postGenre } from "../controllers/genre.controllers.js";

const router = express.Router()

router.get('/:id',getGenreById)
router.get('/',getGenre)
router.post('/',postGenre)
router.delete('/:id',deleteGenre)

export default router

