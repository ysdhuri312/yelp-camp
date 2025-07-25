/** @format */

import express from 'express';
import {
  createReview,
  deleteReview,
} from '../controllers/review.controllers.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.post('/:id/reviews', createReview);
router.delete('/:id/review/:reviewId', isLoggedIn, deleteReview);

export default router;
