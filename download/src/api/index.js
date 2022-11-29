import express from 'express';

import { validationCheck } from '../validators/helpers.js';
import { fileValidator } from '../validators/validators.js';

import { sendFile } from './files.js';

export const router = express.Router();

router.get('/failid/:fileName', fileValidator, validationCheck, sendFile);
