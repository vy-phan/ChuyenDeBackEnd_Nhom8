import express from "express";
import { deleteComment, getComment, createComment } from "../controllers/comment.controllers.js";

const router = express.Router()

router.get('/',getComment)
router.post('/',createComment)
router.delete('/:id',deleteComment)

export default router