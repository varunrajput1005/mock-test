const Exam = require('../models/exam.model');

exports.createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
