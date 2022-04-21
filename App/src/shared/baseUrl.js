export const baseUrl='http://localhost:3001/'; //the baseUrl refer to the json-server address! 
//cách này thì sẽ làm server address tách biệt với React application
//json-server folder có thể chạy ở chỗ nào khác, nhưng chỗ này sẽ update địa chỉ của nó

//để tạo port 3001 thì: json-server --watch db.json -d 2000 -p 3001
//dù npm chạy trên port 3000 nhưng vẫn lấy được resource từ json-server đang listening to port 3001, chờ 2s loading spinner trước khi dữ liệu hiện ra