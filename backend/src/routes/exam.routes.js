const express = require('express');
const router = express.Router();
const { createExam, getAllExams } = require('../controllers/exam.controller');

router.post('/', createExam);
router.get('/', getAllExams);

module.exports = router;
