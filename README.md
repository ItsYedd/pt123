# 🏠 Website Thuê Phòng Trọ

Đây là một website tìm kiếm và quản lý phòng trọ được xây dựng với React (frontend) và Node.js + Sequelize (backend). Người dùng có thể tìm kiếm phòng trọ theo nhiều tiêu chí, xem chi tiết bài đăng, và quản lý các bài đăng nếu là admin.

## Tính năng

### Người dùng
- Tìm kiếm phòng trọ theo khu vực, giá, diện tích.
- Thêm, sửa, xóa bài đăng
- Xem chi tiết bài đăng với hình ảnh, bản đồ và thông tin liên hệ.
- Đăng nhập, đăng ký tài khoản.


### Quản trị viên
- Quản lý tất cả bài đăng.
- Thêm, sửa, xóa bài đăng.
- Xem danh sách người dùng và phân quyền.

## Công nghệ sử dụng

### Frontend
- React.js
- Tailwind CSS
- React Router
- Redux Toolkit
- Axios
- Framer Motion

### Backend
- Node.js + Express
- Sequelize (ORM)
- MySQL
- JWT Authentication
- Multer (upload ảnh)
  

## Cài đặt & Chạy thử

### Backend

```bash
cd server
npm install
cp .env.example .env  # cấu hình database, JWT, v.v.
npm start
```
### Frontend

```bash
cd client
npm start
```


---
### Cấu trúc thư mục
```bash
├── client/               # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── containers/
│   │   │   ├── Public/
│   │   │   └── System/
│   │   ├── services/
│   │   ├── store/
│   │   │   ├── actions/
│   │   │   └── reducers/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── axiosConfig.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── redux.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── server/              # Backend Node.js
│   ├── data/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── migrations/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── phongtro123.sql
│   ├── insert.txt
│   ├── server.js
│   └── package.json

## Thông tin

- Tác giả:Mai Thành Vĩnh
- Liên hệ: maithanhvinh202@gmail.com




