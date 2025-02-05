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
  - [`genre.controllers.js`](backend/controllers/genre.cNodeMailer
- **Frontend**: React, React Router, Tailwind CSS, DaisyUI, Axios, Zustand, React Hot Toast, React Icons, React Markdown, Rehype Raw, Google Generative AI
- **Công cụ xây dựng**: Vite, ESLint, PostCSS, Autoprefixer

## Hướng dẫn cài đặt

1. **Backend**:
   - Điều hướng đến thư mục `backend`.
   - Tạo file `.env` cùng cấp thư mục backend và fronten với các biến môi trường cần thiết.
   ```
        PORT=6000
        MONGODB_URL=dường dẫn url mongodbmongodb
        NODE_ENV=development
        JWT_SECRET=mã jwt

        EMAIL_USER= mã của email 
        EMAIL_APP_PASSWORD=mã password mà đăng kí google email yêu cầu quyền
   ```
   [`MongoDB`](https://cloud.mongodb.com/)

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
