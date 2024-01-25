/**
 * Route: /api/events/
 */

import express from 'express';
import { JWTValidation } from '../middlewares/jwtValidation.js';
import { validateFields } from '../middlewares/fieldsValidator.js';
import { check } from 'express-validator';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/events.js';
import { isDate } from '../helpers/isDate.js';

export const router = express.Router();

router.get('/', JWTValidation, getEvents);
router.post('/',[
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    JWTValidation,
    validateFields,
], createEvent);
router.put('/:id', [
  check('title', 'Title is required').not().isEmpty(),
  check('start', 'Start date is required').custom(isDate),
  check('end', 'End date is required').custom(isDate),
  JWTValidation,
  validateFields,
], updateEvent);
router.delete('/:id', JWTValidation, deleteEvent);
