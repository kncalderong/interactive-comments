import express from 'express';
const router = express.Router()
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 request per 15 minutes
  messageLimit: 'to many requests from this Ip address, please try again after 15 minutes'
})
  
import { createComment, updateComment, deleteComment, getAllComments } from '../controllers/commentsController.js'

router.route('/').post(apiLimiter, createComment).get(getAllComments) // I will limite the number of comments created by One IP direction in  15minutes window
router.route('/:id').patch(updateComment).delete(deleteComment)
export default router