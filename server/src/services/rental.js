const db = require('../models');

exports.createRentalService = async ({ renterPhone, postId, price, paymentId }) => {
  if (!renterPhone || !postId || !price || !paymentId) {
    throw new Error("Thiếu thông tin bắt buộc.");
  }

  const rentalStartDate = new Date();
  const rentalEndDate = new Date(rentalStartDate);
  rentalEndDate.setMonth(rentalEndDate.getMonth() + 1);

  const rental = await db.Rental.create({
    renterPhone,
    postId,
    price,
    paymentId,
    paymentStatus: "completed",
    rentalStartDate,
    rentalEndDate,
  });

  return rental;
};
