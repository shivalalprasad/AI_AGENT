import mongoose from 'mongoose';

// CompanyData schema
const companyDataSchema = new mongoose.Schema({
  title: String,
  rawText: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CompanyData', companyDataSchema);
