import express from "express";
import { deleteGenre, getGenre, getGenreById, postGenre, updateGenre } from "../controllers/genre.controllers.js";
import protectRoute from "../middleware/protectToken.js";

const router = express.Router()

router.get('/:id',getGenreById)
router.get('/',getGenre)
router.post('/',protectRoute,postGenre)
router.delete('/:id',protectRoute,deleteGenre)
router.put('/:id',protectRoute,updateGenre)

export default router
