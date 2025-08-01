/** @format */

import express from 'express';
import {
  getAllCampgrounds,
  showNewCampgroundForm,
  createNewCampground,
  getCampground,
  editCampgroundForm,
  editCampground,
  deleteCampground,
} from '../controllers/campground.controllers.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', getAllCampgrounds);
router.get('/new', isLoggedIn, showNewCampgroundForm);
router.post('/', isLoggedIn, createNewCampground);
router.get('/:id', getCampground);
router.put('/:id', isLoggedIn, editCampground);
router.delete('/:id', isLoggedIn, deleteCampground);
router.get('/:id/edit', isLoggedIn, editCampgroundForm);

export default router;
