-- Insert sample data into Account table
INSERT INTO Account (email, password, accountImg, roleDB, fullName, gender, birthDay, phone, address, status)
VALUES
('truongtxse184532@gmail.com','truong123','https://img.freepik.com/premium-vector/vector-logo-design-doremon-cartoon-character_1042381-2328.jpg','manager','Tran Xuan Truong','male','2004-11-09','0931430662','51K Phan Tay Ho','active'),
('doremon@gmail.com','nobita','https://w0.peakpx.com/wallpaper/749/883/HD-wallpaper-doraemon-wala-littel-heart-doremon-anime-cartoon.jpg','member','Dorayaki Doraemon','male','2000-11-26','0909791792','FPT University','active');
INSERT INTO Account (email, password, accountImg, roleDB, fullName, gender, birthDay, phone, address, status)
VALUES ('test@example.com', '$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8', 'null', 'MEMBER', 'Test User', 'MALE', '1990-01-01', '1234567890', '123 Test St', 'ACTIVE');
SELECT *
FROM Account;
INSERT INTO Account(email,password,accountImg,roleDB,fullName,gender,birthDay,phone,address,status)VALUES
('admin@gmail.com','admin123','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQSTl2qlWDbIZiDybtSCXLGU8ZxXU_rguMg&s','admin','Tran Admin','other','2004-11-20','0907020304','567 Pham Van Dong','active');
SELECT *
FROM Product;
INSERT INTO Product (productName, description, category, price, stockQuantity, imageUrl)
VALUES 
('Koi Fish Food Prenium', 'High-quality food to enhance Koi fish growth and color.', 'Fish Food', 25.00, 100, 'https://pondmax.com.au/cdn/shop/products/fishfood5.5kg6mm_2048x.jpg?v=1620624725'),
('Goldfish Flakes', 'Nutritious flakes for Goldfish.', 'Fish Food', 15.00, 150, 'https://www.vietpet.net/wp-content/uploads/2019/11/thuc-an-cho-ca-vang-tetrafin-goldfish-flakes.jpg'),
('Aquarium Plants Set', 'A set of live plants to beautify your aquarium.', 'Aquarium Decor', 40.00, 50, 'https://java-plants.com/wp-content/uploads/2023/12/IMG_7337-2-600x450.jpeg'),
('Fish Tank Heater', 'Submersible heater for maintaining water temperature.', 'Aquarium Equipment', 30.00, 200, 'https://image1.slideserve.com/3123451/fresh-water-aquarium-equipment-l.jpg'),
('Water Conditioner', 'Removes harmful chemicals from tap water.', 'Aquarium Supplies', 12.00, 300, 'https://premiumaquatics.com/category_image/premiumaquatics.com/0x0/690_1654633197.jpg'),
('Koi Pond Filter', 'Efficient filter for keeping your Koi pond clean.', 'Aquarium Equipment', 150.00, 20, 'https://www.shutterstock.com/image-vector/aquarium-equipment-external-fish-tank-260nw-684131755.jpg');
INSERT INTO Product (productName, description, category, price, stockQuantity, imageUrl)
VALUES 
('Koi Immune Booster', 'A supplement to boost Koi fish immunity and resistance to disease.', 'Fish Healthcare', 35.00, 80, 'https://i.ebayimg.com/images/g/dIMAAOxyOlhSzwDN/s-l1200.jpg'),
('Antibiotic for Koi', 'Effective treatment for bacterial infections in Koi.', 'Fish Healthcare', 45.00, 70, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjVrP7mCZMxLQodZlsoOlMt94nfNGbsPNyUA&s'),
('Koi Parasite Treatment', 'Eliminates parasites in Koi fish ponds.', 'Fish Healthcare', 50.00, 40, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSMPfZ9QeMGsm2f02YapP1_-ZClAiwKswluQ&s'),
('Koi Fish Salt Bath', 'Salt mix for salt baths to reduce stress and illness in Koi.', 'Fish Healthcare', 25.00, 200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9T-CZ3pafgYQetq07XlBY23ntwlrF0UGqTA&s'),
('Koi Digestive Aid', 'Improves digestion and nutrient absorption in Koi fish.', 'Fish Healthcare', 22.00, 90, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5nhSTaGCsTISHi7byGNqyNHitypxesnfbaQ&s'),
('Koi Antifungal Treatment', 'Treats fungal infections on Koi fish skin and fins.', 'Fish Healthcare', 38.00, 60, 'https://i5.walmartimages.com/seo/Pond-Care-Pond-Fish-Medications-PondCare-PimaFix-Antifungal-Remedy-for-Koi-Goldfish_a200e3d2-2f3f-49b7-8314-8b25e05a7710.de916d1f36f019bd10d99f9b28c50111.jpeg'),
('Koi Growth Enhancer', 'Special formula to enhance Koi fish growth rate.', 'Fish Food', 55.00, 45, 'https://becahoanggia.vn/wp-content/uploads/2023/07/CAM-AQUAMASTER-2.jpg'),
('Premium Color Enhancer Food', 'Enhances vibrant colors in Koi.', 'Fish Food', 60.00, 70, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpGi1C_ozjDmVZc-jTPwDA5fWd8VbeyEIxWA&s'),
('Koi Wheat Germ Food', 'High-protein wheat germ food ideal for colder seasons.', 'Fish Food', 28.00, 90, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6kt_TY3MysLxHi4VZEgGrwcUaiiTeSFM1OQ&s'),
('Koi Breeder Food', 'Specialized food for breeding Koi fish.', 'Fish Food', 75.00, 30, 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/94/MTA-148000627/no-brand_no-brand_full01.jpg'),
('Koi Pond pH Buffer', 'Maintains optimal pH levels in Koi ponds.', 'Fish Healthcare', 20.00, 150, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqL34U-bTeuVFYPnaWcGpBbXsFefX51GskA&s'),
('Koi Pond Dechlorinator', 'Removes chlorine and chloramine from pond water.', 'Fish Healthcare', 18.00, 200, 'https://m.media-amazon.com/images/I/91mNYx2rm7L.jpg'),
('Koi Fish Multivitamin Food', 'Nutritionally balanced food with essential vitamins.', 'Fish Food', 35.00, 100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5SqKXLxdqr3Le7SPbuquLzhqEHURFyowpA&s'),
('Koi Algae Control Tablets', 'Prevents and controls algae growth in ponds.', 'Fish Healthcare', 42.00, 75, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNtyW1BBtPe0iqT03mclLY6--ZxwkPQEmoQ&s'),
('Koi High Energy Food', 'High-energy food for active Koi fish.', 'Fish Food', 48.00, 60, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG2zkFB4gzuxVAsLCP66eh0wTuK3eJj3LHKA&s'),
('Koi Color Restoration Food', 'Restores natural colors in Koi that have faded.', 'Fish Food', 65.00, 50, 'https://longsinh.com.vn/wp-content/uploads/2018/02/Bright.jpg');
INSERT INTO Pond (accountId, name, image, numberOfFish, size, volume, drainCount, depth, skimmerCount)
VALUES 
(1, 'Backyard Pond', 'https://i0.wp.com/nvswaterscapes.com/wp-content/uploads/2023/05/small-pond-ideas-for-backyard.jpg?resize=1024%2C682&ssl=1', 10, 200.5, 1500.75, 3, 5.5, 2),
(1, 'Front Yard Pond', 'https://cdn.prod.website-files.com/66049e7528c8741030ff3af1/662c206269b23c38d0293eb6_project-showcase-front-yard-koi-pond.jpeg', 15, 250.0, 1800.80, 2, 6.0, 1),
(1, 'Garden Pond', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgQRVo_vEVJAb07BT9uKjkB2Ph52BC6ZaGwQ&s', 8, 180.0, 1400.50, 1, 4.8, 2);
SELECT *
FROM Pond;


INSERT INTO KoiFish (nameFish, imageFish, Pond_id, quantity, physique, age, length, weight, sex, variety, inPondSince, breeder, purchasePrice)
VALUES
('Golden Koi', 'https://as2.ftcdn.net/v2/jpg/01/59/56/11/1000_F_159561126_vppu7c1p4aD1aoPhLhDaESYBKLMr6wrs.jpg', 7, 5, 'Strong', 2, 30.5, 4.3, 'MALE', 'Kohaku', '2023-04-10', 'Breeder A', 150.00),
('Silver Koi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXTk2u1IETGzbglZkvVQEgCyHnh2Vlx0xzIg&s', 8, 3, 'Slim', 1, 25.0, 3.8, 'FEMALE', 'Showa', '2023-06-05', 'Breeder B', 130.50),
('Black Koi', 'https://hanoverkoifarms.com/wp-content/uploads/2017/01/karasu2-598x1024.jpg', 9, 2, 'Muscular', 3, 35.2, 5.0, 'MALE', 'Sanke', '2023-02-22', 'Breeder C', 180.75),
('Red Koi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNil44lMgPxyh5_kgHYqREmENVYNRcWt39A&s', 8, 6, 'Medium', 1, 28.0, 4.1, 'FEMALE', 'Tancho', '2023-08-15', 'Breeder D', 145.00),
('White Koi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXTk2u1IETGzbglZkvVQEgCyHnh2Vlx0xzIg&s', 7, 1, 'Thin', 4, 32.0, 4.5, 'MALE', 'Utsuri', '2023-01-20', 'Breeder E', 165.25),
('Blue Koi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpDoxkBj_lC1LVpfab6S18vDOstZTe1tEaWw&s', 7, 4, 'Robust', 2, 27.5, 3.9, 'FEMALE', 'Asagi', '2023-03-18', 'Breeder F', 155.40),
('Yellow Koi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi1p884iUPXGvHVdNUEndOyyXAd9_A0ogTWQ&s', 7, 7, 'Stocky', 3, 33.8, 4.7, 'MALE', 'Shusui', '2022-12-05', 'Breeder G', 175.90),
('Orange Koi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07VTJPuJftssmRtGcBI_w2zbZUNNrs0tBMg&s', 8, 2, 'Slim', 1, 26.3, 3.4, 'FEMALE', 'Goshiki', '2023-07-12', 'Breeder H', 140.65),
('Purple Koi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGFdV0-_ja9htSNZdI4faiDDbq_zcpp-S-8w&s', 8, 3, 'Medium', 2, 29.5, 4.0, 'MALE', 'Bekko', '2023-05-05', 'Breeder I', 160.10),
('Green Koi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAhyeKuBtlG_mBMh5HY6fvmMdE6SPL-wvVqw&s', 9, 5, 'Muscular', 3, 31.2, 4.2, 'FEMALE', 'Kumonryu', '2023-02-18', 'Breeder J', 170.80);
SELECT *
FROM waterparameter;
INSERT INTO Product (productName, description, category, price, stockQuantity, imageUrl)
VALUES
('Koi Fish Food Prenium', 'High-quality food to enhance Koi fish growth and color.', 'Fish Food', 100000, 100, 'https://pondmax.com.au/cdn/shop/products/fishfood5.5kg6mm_2048x.jpg?v=1620624725');
INSERT INTO Blog (title, content, authorID, blogImage, createdDate, description) VALUES
('Chọn giống cá Koi chất lượng', 
    'Chọn giống cá Koi là một bước khởi đầu quan trọng trong hành trình nuôi cá Koi. Những chú cá khỏe mạnh, sắc nét với màu sắc nổi bật không chỉ tôn lên vẻ đẹp của hồ mà còn giúp duy trì môi trường sinh thái ổn định. Khi chọn giống, bạn nên chú ý đến các đặc điểm như hình dáng cân đối, vây khỏe mạnh và màu sắc sáng. Ngoài ra, cần lưu ý đến nguồn gốc của cá, ưu tiên những nơi uy tín, và chọn giống phù hợp với điều kiện môi trường hồ để cá dễ thích nghi.', 
    1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBOk4Zj-8oG6JuTfvUgN9f9-LOji8VUcCyEg&s', 
    NOW(), 
    'Làm thế nào để chọn giống cá Koi chất lượng cho hồ của bạn.'),
    
('Cách duy trì chất lượng nước hồ cá Koi', 
    'Chất lượng nước là yếu tố then chốt quyết định sức khỏe và sự phát triển của cá Koi. Để duy trì nước sạch và ổn định, bạn cần thường xuyên kiểm tra các chỉ số như pH, NH4, NO3, và độ cứng. Sử dụng hệ thống lọc cơ học và sinh học để loại bỏ tạp chất và duy trì hệ vi sinh trong hồ. Đảm bảo thay nước định kỳ nhưng tránh thay quá nhiều một lần để cá không bị sốc.', 
    2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRukw4Xvxj4pNfA7Sz8J25cTFbVyNGasRdNAA&s', 
    NOW(), 
    'Hướng dẫn duy trì chất lượng nước tối ưu cho hồ cá Koi.'),
    
('Thức ăn phù hợp cho cá Koi theo mùa', 
    'Chế độ dinh dưỡng cho cá Koi cần điều chỉnh theo mùa để tối ưu hóa sức khỏe của chúng. Vào mùa xuân và hè, khi nhiệt độ cao, cá Koi cần thức ăn giàu protein để phát triển. Trong khi đó, vào mùa thu và đông, nên giảm lượng thức ăn giàu đạm, tăng cường thức ăn chứa carbohydrate giúp cá dễ tiêu hóa và duy trì năng lượng. Điều này giúp cá khỏe mạnh trong suốt mùa lạnh mà không bị tích mỡ quá mức.', 
    3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwLU0wauwPc32xYZeu2kT_5yGTcOTquB2Bqg&s', 
    NOW(), 
    'Lời khuyên chọn thức ăn cho cá Koi theo từng mùa trong năm.'),
    
('Phòng ngừa bệnh cho cá Koi', 
    'Cá Koi có thể mắc phải nhiều bệnh như nấm, ký sinh trùng và nhiễm khuẩn. Phòng ngừa là phương pháp tối ưu nhất để giảm thiểu rủi ro. Đảm bảo rằng hồ cá được làm sạch thường xuyên, và duy trì chất lượng nước ở mức lý tưởng. Kiểm tra sức khỏe của cá định kỳ để phát hiện sớm các dấu hiệu bệnh như vây xòe, cá bơi lờ đờ, hoặc dấu hiệu nấm trên da.', 
    4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXoYxPicI18DTL-uHlKuTS5VzN0HftHJ027Q&s', 
    NOW(), 
    'Cách phát hiện sớm và phòng ngừa các bệnh thường gặp ở cá Koi.'),
    
('Thiết kế hồ cá Koi chuẩn', 
    'Việc thiết kế hồ cá Koi không chỉ dừng lại ở thẩm mỹ mà còn ảnh hưởng trực tiếp đến sức khỏe của cá. Hồ nên có độ sâu ít nhất 1,5 mét để cá có đủ không gian bơi lội và có thể duy trì nhiệt độ ổn định. Đảm bảo hệ thống lọc nước và máy bơm hoạt động tốt, đồng thời thiết kế thêm khu vực cây thủy sinh hoặc chỗ trú ẩn để cá có nơi nghỉ ngơi, tránh ánh nắng gắt.', 
    5, 'https://sanvuonadong.vn/wp-content/uploads/2021/07/ban-ve-thiet-ke-ho-ca-koi.jpg', 
    NOW(), 
    'Những lưu ý khi thiết kế hồ cá Koi đạt tiêu chuẩn.'),
    
('Cách tạo hệ thống lọc nước hiệu quả', 
    'Hệ thống lọc là yếu tố không thể thiếu để duy trì chất lượng nước ổn định cho hồ cá Koi. Một hệ thống lọc hiệu quả nên có đủ các bộ phận lọc cơ học để loại bỏ các cặn bẩn, và lọc sinh học để duy trì hệ vi sinh. Ngoài ra, bạn có thể xem xét lắp đặt đèn UV để tiêu diệt vi khuẩn và tảo trong hồ. Điều này giúp ngăn ngừa bệnh tật và tạo môi trường trong sạch cho cá.', 
    1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjEN2nFBldbFwlWMhV94NBZt2xGzviiCpYg&s', 
    NOW(), 
    'Hướng dẫn thiết lập hệ thống lọc nước tối ưu cho hồ cá Koi.'),
    
('Kiểm tra và điều chỉnh độ pH cho hồ cá Koi', 
    'Độ pH lý tưởng cho hồ cá Koi nằm trong khoảng từ 6.5 đến 8.0. Độ pH quá cao hoặc quá thấp có thể ảnh hưởng đến sức khỏe cá và hệ vi sinh trong hồ. Kiểm tra pH hàng tuần và sử dụng các chất điều chỉnh pH nếu cần. Đặc biệt, không thay đổi độ pH đột ngột để tránh gây sốc cho cá.', 
    2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO8i4AleHNfqrFdgg8PyoYuEFc5q4cbmuOA&s', 
    NOW(), 
    'Cách kiểm tra và điều chỉnh pH để bảo vệ cá Koi.'),
    
('Chăm sóc cá Koi vào mùa đông', 
    'Vào mùa đông, nhiệt độ nước giảm xuống thấp, cá Koi trở nên chậm chạp và ăn ít đi. Để chuẩn bị cho mùa đông, giảm lượng thức ăn và chọn loại thức ăn dễ tiêu hóa. Kiểm tra hệ thống sưởi ấm và cố gắng duy trì nhiệt độ nước ổn định để tránh gây sốc cho cá. Đồng thời, giảm tần suất thay nước và tránh tác động mạnh đến cá.', 
    3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3hb-zZMyZKqFEtHiGhl9uL7Fpufuj8jdgxg&s', 
    NOW(), 
    'Lưu ý chăm sóc cá Koi khi thời tiết lạnh.'),
    
('Sử dụng đèn UV để diệt khuẩn trong hồ cá Koi', 
    'Đèn UV là một công cụ hiệu quả để tiêu diệt vi khuẩn và các loại tảo có hại trong hồ cá Koi. Tuy nhiên, đèn UV chỉ nên bật một số giờ nhất định trong ngày để tránh ảnh hưởng đến cá và hệ vi sinh trong hồ. Cần lưu ý chọn loại đèn UV có công suất phù hợp với dung tích hồ để đạt hiệu quả tối đa mà không gây hại cho cá.', 
    4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQqWOl9F5wAW36Cr0fydYVz111QvZt1hY_EQ&s', 
    NOW(), 
    'Cách sử dụng đèn UV để bảo vệ môi trường sống của cá Koi.'),
    
('Thay nước định kỳ cho hồ cá Koi', 
    'Thay nước là cách đơn giản nhưng rất quan trọng để giữ môi trường nước trong lành cho cá Koi. Thay khoảng 10-15% lượng nước mỗi tuần sẽ giúp loại bỏ chất thải và chất độc tích tụ mà không làm thay đổi đột ngột hệ sinh thái trong hồ. Cẩn thận khi thay nước vào mùa đông, nên dùng nước ấm để tránh làm cá bị sốc nhiệt.', 
    5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwLU0wauwPc32xYZeu2kT_5yGTcOTquB2Bqg&s', 
    NOW(), 
    'Hướng dẫn thay nước định kỳ để bảo vệ sức khỏe cá Koi.')
;
select *
from OrderDetails;
INSERT INTO Account (email, password, accountImg, roleDB, fullName, gender, birthDay, phone, address, status)
VALUES 
('superadmin@gmail.com', 'superadmin1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfN2wUtMrKxoqZmmYbmj1yWoWwBrEIcJoeA&s', 'supervisor', 'Dinh Hinh Phuong Huong', 'male', '1999-07-12', '1234567890', 'VietNam', 'active')


