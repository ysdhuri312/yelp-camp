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
} from '../controllers/campground.controller.js';

const router = express.Router();

router.get('/all', getAllCampgrounds);
router.get('/new', showNewCampgroundForm);
router.post('/', createNewCampground);
router.get('/:id', getCampground);
router.put('/:id', editCampground);
router.delete('/:id', deleteCampground);
router.get('/:id/edit', editCampgroundForm);

export default router;
