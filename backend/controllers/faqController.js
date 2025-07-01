// Handles FAQ-related requests
import fileParserService from '../services/fileParserService.js';
import CompanyData from '../models/CompanyData.js';

export const uploadFAQ = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      console.warn('[FAQ] No file uploaded');
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const parsed = await fileParserService.parseFile(file);
    const doc = await CompanyData.create(parsed);
    console.log(`[FAQ] Uploaded and stored: ${doc.title}`);
    res.json({ title: doc.title, size: file.size, wordCount: parsed.wordCount });
  } catch (err) {
    next(err);
  }
};

export const listFAQs = async (req, res, next) => {
  try {
    const faqs = await CompanyData.find({}, 'title createdAt tags');
    res.json(faqs);
  } catch (err) {
    next(err);
  }
};
