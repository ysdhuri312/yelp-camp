/** @format */

import express from 'express';
import {
  createReview,
  deleteReview,
} from '../controllers/review.controller.js';
const router = express.Router();

router.post('/:id/reviews', createReview);
router.delete('/:id/review/:reviewId', deleteReview);

export default router;
