import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SliderCustom, Paypal } from "../../components";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Rent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [postId, setPostId] = useState(state?.postId || localStorage.getItem("postId"));
  const [userId, setUserId] = useState(state?.userId || localStorage.getItem("userId"));
  const [imageArray, setImageArray] = useState([]);
  

  useEffect(() => {
    if (state) {
      localStorage.setItem("postId", state.postId);
      localStorage.setItem("userId", state.userId);
      setPostId(state.postId);
      setUserId(state.userId);
      try {
        setImageArray(state?.image ? JSON.parse(state.image) : []);
      } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        setImageArray([]);
      }
    }
  }, [state]);

  // Nếu postId hoặc userId bị thiếu, điều hướng về trang trước
  // useEffect(() => {
  //   if (!postId || !userId) {
  //     alert("Dữ liệu không hợp lệ. Vui lòng quay lại.");
  //     navigate(-1);
  //   }
  // }, [postId, userId, navigate]);

  return (
    <PayPalScriptProvider options={{
      clientId: "AeEVXd6k17plLIprjEstc84Z6cjOh_aciQ0UL65NvaoavZFca19r2IGNgdT3AnLHyjryt2V_BrZ5ea6n",
      currency: "USD",
      intent: "capture",
      components: "buttons"
    }}>
      <div className="container p-8">
        <h1>Thuê nhanh</h1>

        <h2 className="text-xl font-medium mb-4">Hình ảnh</h2>
        {imageArray.length > 0 ? (
          <SliderCustom images={imageArray} />
        ) : (
          <p>Không có hình ảnh để hiển thị</p>
        )}

        <h2 className="text-xl font-medium mt-6">Thông tin bài đăng</h2>
        <p><strong>Tiêu đề:</strong> {state?.title}</p>
        <p><strong>Địa chỉ:</strong> {state?.address}</p>
        <p><strong>Giá thuê:</strong> {state?.price} VND</p>
        <p><strong>Thời gian:</strong> 1 tháng</p>

        <h2 className="text-xl font-medium mt-6">Thông tin người đăng</h2>
        <div className="contact-info">
          <p>Tên: {state?.userName}</p>
          <p>Điện thoại: {state?.userPhone}</p>
          <p>Zalo: {state?.userZalo}</p>
        </div>

        <h2 className="text-xl font-medium mt-6">Thanh toán</h2>
        <Paypal price={state?.price} userPhone={state?.userPhone || "khong co so"} postId={postId} />
      </div>
    </PayPalScriptProvider>
  );
};

export default Rent;