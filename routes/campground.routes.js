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
import upload from '../cloudinary/index.js';

const router = express.Router();

router.get('/all', getAllCampgrounds);
router.get('/new', isLoggedIn, showNewCampgroundForm);
router.post('/', isLoggedIn, upload.array('images'), createNewCampground);
router.get('/:id', getCampground);
router.put('/:id', isLoggedIn, upload.array('images'), editCampground);
router.delete('/:id', isLoggedIn, deleteCampground);
router.get('/:id/edit', isLoggedIn, editCampgroundForm);

export default router;
