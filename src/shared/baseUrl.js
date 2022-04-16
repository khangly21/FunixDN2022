
//Bước 1: mở cmd và cd vào thư mục này và chạy json-server --watch db.json -d 2000 -p 3001
    /// Problem: Oops, db.json does not seem to exist!! Creating db.json with some default data (như Resourse mặc định)
      //// Solution: phải cd vào thư mục json-server nơi có chứa db.json
///Bước 2: localhost:3000 nơi đang báo lỗi Failed to fetch => Enter sẽ kết nối được json-server
export const baseUrl='http://localhost:3001/'; //the baseUrl refer to the json-server address! 
//cách này thì sẽ làm server address tách biệt với React application
//json-server folder có thể chạy ở chỗ nào khác, nhưng chỗ này sẽ update địa chỉ của nó

//dù npm chạy trên port 3000 nhưng vẫn lấy được resource từ json-server đang listening to port 3001, chờ 2s loading spinner trước khi dữ liệu hiện ra: