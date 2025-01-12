## Backend

Backend xử lý các thao tác CRUD chính sử dụng Node.js, JWT, Express và MongoDB. Các chức năng chính bao gồm:

- **Quản lý người dùng**: Xử lý đăng ký, đăng nhập, đăng xuất, xác minh email và cập nhật người dùng.
  - [`auth.controllers.js`](backend/controllers/auth.controllers.js)
  - [`auth.router.js`](backend/router/auth.router.js)
  - [`users.models.js`](backend/models/users.models.js)
  - [`protectToken.js`](backend/middleware/protectToken.js)
  - [`generateToken.js`](backend/utils/generateToken.js)

- **Quản lý Manga**: Quản lý dữ liệu manga bao gồm tạo, xemxem , cập nhật và xóa.
  - [`manga.controllers.js`](backend/controllers/manga.controllers.js)
  - [`manga.router.js`](backend/router/manga.router.js)
  - [`manga.models.js`](backend/models/manga.models.js)

- **Quản lý Thể loại**: Quản lý các thể loại liên quan đến manga.
  - [`genre.controllers.js`](backend/controllers/genre.controllers.js)
  - [`genre.router.js`](backend/router/genre.router.js)
  - [`genre.models.js`](backend/models/genre.models.js)

- **Cấu hình cơ sở dữ liệu**: Kết nối với MongoDB.
  - [`db.js`](backend/config/db.js)

- **Dịch vụ Email**: Gửi email xác minh sử dụng Mailtrap.
  - [`emails.js`](backend/mailtrap/emails.js)
  - [`mailtrap.config.js`](backend/mailtrap/mailtrap.config.js)



## Frontend

Frontend được xây dựng bằng React với hooks và bao gồm các chức năng chính sau:

- **Trang chủ**: Hiển thị danh sách manga và menu điều hướng.
  - [`Home.jsx`](frontend/src/pages/Home.jsx)

- **Trang tìm kiếm**: Cho phép người dùng tìm kiếm manga với các bộ lọc.
  - [`Search.jsx`](frontend/src/pages/Search.jsx)

- **Trang yêu thích**: Hiển thị manga yêu thích của người dùng.
  - [`Favorite.jsx`](frontend/src/pages/Favorite.jsx)

- **Bảng điều khiển Admin**: Cho phép người dùng admin quản lý manga và tài khoản người dùng.
  - [`Admin.jsx`](frontend/src/pages/Admin.jsx)
  - [`DetailAdmin.jsx`](frontend/src/pages/DetailAdmin.jsx)

- **Xác thực**: Xử lý đăng nhập, đăng ký và xác minh email người dùng.
  - [`Login.jsx`](frontend/src/pages/Login.jsx)
  - [`Register.jsx`](frontend/src/pages/Register.jsx)
  - [`VerifyEmail.jsx`](frontend/src/pages/VerifyEmail.jsx)

- **Trang hồ sơ**: Hiển thị thông tin hồ sơ người dùng.
  - [`Profile.jsx`](frontend/src/pages/Profile.jsx)

- **Chi tiết Manga**: Hiển thị thông tin chi tiết về một manga cụ thể.
  - [`DetailCard.jsx`](frontend/src/pages/DetailCard.jsx)

- **Chi tiết Thể loại**: Hiển thị manga liên quan đến một thể loại cụ thể.
  - [`DetailGenre.jsx`](frontend/src/pages/DetailGenre.jsx)

- **Chatbot**: Cung cấp gợi ý manga sử dụng chatbot.
  - [`Chatbot.jsx`](frontend/src/compontents/Chatbot.jsx)
  - [`ChatbotIcon.jsx`](frontend/src/compontents/ChatbotIcon.jsx)

## Công nghệ sử dụng

- **Backend**: Node.js, Express, MongoDB, JWT, Mailtrap
- **Frontend**: React, React Router, Tailwind CSS, DaisyUI, Axios, Zustand, React Hot Toast, React Icons, React Markdown, Rehype Raw, Google Generative AI
- **Công cụ xây dựng**: Vite, ESLint, PostCSS, Autoprefixer

## Hướng dẫn cài đặt

1. **Backend**:
   - Điều hướng đến thư mục `backend`.
   - Tạo file `.env` cùng cấp thư mục backend và frontendfrontend với các biến môi trường cần thiết.
   ```
        PORT=6000
        MONGODB_URL=dường dẫn url mongodbmongodb
        NODE_ENV=development
        JWT_SECRET=mã jwtjwt

        MAILTRAP_ENDPOINT=send.api.mailtrap.io
        MAILTRAP_TOKEN=mã token từ mailtrap cung cấpcấp
   ```
   [`MongoDB`](https://cloud.mongodb.com/)
   [`Mailtrap`](https://mailtrap.io/sending/domains)

   - Chạy `npm install` để cài đặt các phụ thuộc.
   - Chạy `npm run dev` để khởi động server backend.

2. **Frontend**:
   - Điều hướng đến thư mục `frontend`.
   - Tạo file `.env` trong thư mục frontend với các biến môi trường cần thiết.
   ```
        VITE_GEMNI_API_KEY=mã api key được lấy từ google ai studio
   ```
   [`GoogleAI Studio`](https://aistudio.google.com/app/apikey)

   - Chạy `npm install` để cài đặt các phụ thuộc.
   - Chạy `npm run dev` để khởi động server frontend.