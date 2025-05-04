import * as services from '../services/rental'

// controllers/rental.js
const { createRentalService } = require('../services/rental');

exports.createRental = async (req, res) => {
  try {
    const rental = await createRentalService(req.body);
    return res.status(201).json({ message: 'Tạo thông tin thuê thành công.', rental });
  } catch (error) {
    console.error('Lỗi tạo thuê:', error);
    return res.status(500).json({ message: error.message || 'Lỗi server khi tạo thông tin thuê.' });
  }
};
