import express from 'express'
import {getBook} from "../controller/book_Controller.js"

const router=express.Router()

router.get("/",getBook)

export default router