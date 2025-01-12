# ChuyenDe_BackEnd

.ENV có chức năng ẩn các folder or file không muốn đăng lên github <br>
-backend có các chức năng chính xử lí CRUD ( node js , jwt (hên xui) , express, monogoDB) (Vỹ)
    <br>
    -Xây dựng đối tượng truyện tranh :title,description,status,genres:  Thể loại (dạng array để chứa nhiều thể loại),poster,chapters: [
        chapterNumber: Số thứ tự tập (chapter) 
        title: Tiêu đề của tập (nếu có) 
        pages: [
            pageNumber:  Số thứ tự trang
            imageUrl: Link ảnh của từng trang]]
            <br>
    -Xây dựng đối tượng tài khoản (username,password,role,favorites[])<br>

<br>
-frontend : ( React Hook ) <br>
    -Trang home hiển thị danh sách các manga và thanh menu Home | Tìm Kiếm | Thư Viện | Đăng nhập / Đăng kí (Vỹ)<br>
    -Trang tìm kiếm . Search và có bộ lọc (Hiếu) <br>
    -Nếu đăng nhập là user sẽ chuyển hướng trang thư viện . còn ko phải user mà là admin thì sẽ cho phép chuyển hướng sang trang đăng truyện <br>
        -Trang thư viện nếu có tồn tại đăng nhập mới hiển thị , cho các truyện ghim  trong tủ và có quyền xóa nó khỏi danh sách tủ truyện cá nhân <br>
        -Trang quản lí admin sẽ gồm 1 trang riêng biệt có cách dashboard cho phép <br>
            -Quản lí tài khoản : Thêm, xóa , chỉnh , xem các tài khoản (Phương) <br>
            -Quản lí đăng truyện : Thêm , xóa, chỉnh , xem các danh sách truyện và mỗi 1 truyện cho phép đăng các chapter lên để (Vỹ) <br>
    -Trang đăng nhập / đăng kí sẽ chuyển hướng đến phần trang login./register . Mỗi người khi đăng kí trên giao diện này sẽ mặc định là user  <br>
    (Hiếu)<br>
<br>
    -Trang Chatbot gợi ý truyện theo yêu cầu ( Leader sẽ làm thêm nếu team chạy nhanh hơn so với tiến độ ): cho phép gợi ý truyện bằng cách người dùng hỏi và sẽ truy vấn dữ liệu từ lượng lớn data từ JSON được gọi từ Backend xây dựng và ra kết quả phù hợp . Công nghệ Gemini API          
