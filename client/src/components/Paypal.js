import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { convertVnPriceToNumber } from "../ultils/Common/convertVnPriceToNumber";
import { apiCreateRental } from "../services/rental";
import { useLocation } from "react-router-dom";

const Paypal = ({ price, postId, userPhone }) => {
  
  
  const priceVnd = convertVnPriceToNumber(price);
  const totalAmount =
    priceVnd && !isNaN(priceVnd) ? (priceVnd / 23500).toFixed(2) : "10.00";

  return (
    <div>
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "pill", label: "paypal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount,
                  currency_code: "USD",
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          return actions.order.capture().then(async (details) => {
            alert(`Thanh toán thành công! Cảm ơn bạn, ${details.payer.name.given_name}.`);

            try {
              const res = await apiCreateRental({
                renterPhone : userPhone,
                postId,
                price,
                paymentId: details.id,
                rentalEndDate: null
              });
             

              if (res?.data?.err === 0) {
                console.log("Lưu thông tin thuê thành công:", res.data);
              } else {
                console.error("Lỗi khi lưu:", res?.data?.msg);
              }
            } catch (err) {
              console.error("Lỗi gọi API tạo rental:", err);
            }
          });
        }}
      />
    </div>
  );
};

export default Paypal;
