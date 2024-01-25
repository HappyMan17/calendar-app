import express from 'express';
import { JWTValidation, fieldsValidation } from '../middlewares/jwtValidation';
import { check } from 'express-validator';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/events';
import { isDate } from '../helpers/isDate';

const router = express.Router();

router.get('/', JWTValidation, getEvents);
router.post('/',[
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    JWTValidation,
    fieldsValidation,
], createEvent);
router.put('/:id', [
  check('title', 'Title is required').not().isEmpty(),
  check('start', 'Start date is required').custom(isDate),
  check('end', 'End date is required').custom(isDate),
  JWTValidation,
  fieldsValidation,
], updateEvent);
router.delete('/:id', JWTValidation, deleteEvent);

export default router;
