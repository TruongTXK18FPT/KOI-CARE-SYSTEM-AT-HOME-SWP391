-- Create Database
CREATE DATABASE IF NOT EXISTS KoiCareSystem;
USE KoiCareSystem;

-- Table for Account
CREATE TABLE Account (
    accountId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    accountImg VARCHAR(255),
    roleDB ENUM('admin', 'member', 'manager') default 'member',
    fullName VARCHAR(100) NOT NULL,
    gender ENUM('male', 'female', 'other'),
    birthDay DATE,
    phone VARCHAR(15),
    address VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Table for Pond
CREATE TABLE Pond (
    id INT AUTO_INCREMENT PRIMARY KEY,
    accountId INT,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    numberOfFish INT DEFAULT 0,
    size FLOAT,
    volume FLOAT,
    drainCount INT,
    depth FLOAT,
    skimmerCount INT,
    FOREIGN KEY (accountId) REFERENCES Account(accountId)
);

-- Table for Koi Fish
CREATE TABLE KoiFish (
    fish_id INT AUTO_INCREMENT PRIMARY KEY,
    nameFish VARCHAR(100),
    imageFish VARCHAR(255),
    Pond_id INT,
    quantity INT,
    physique VARCHAR(255),
    age INT,
    length FLOAT,
    weight FLOAT,
    sex ENUM('MALE', 'FEMALE'),
    variety VARCHAR(100),
    inPondSince DATE,
    breeder VARCHAR(100),
    purchasePrice DECIMAL(10, 2),
    FOREIGN KEY (Pond_id) REFERENCES Pond(id)
);

-- Table for Water Parameters
CREATE TABLE WaterParameter (
    waterParameter_id INT AUTO_INCREMENT PRIMARY KEY, -- New primary key column
    pond_id INT,
    dateTime DATETIME,
    NO2 FLOAT,
    O2 FLOAT,
    NO3 FLOAT,
    temperature FLOAT,
    PO4 FLOAT,
    pHValue FLOAT,
    NH4 FLOAT,
    KH FLOAT,
    GH FLOAT,
    CO2 FLOAT,
    salt FLOAT,
    totalChlorines FLOAT,
    outdoorTemp FLOAT,
    amountFed FLOAT,
    note TEXT,
    FOREIGN KEY (pond_id) REFERENCES Pond(id)
);


-- Table for Product
CREATE TABLE Product (
    productID INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(100),
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stockQuantity INT CHECK (stockQuantity > 0),
    imageUrl VARCHAR(255)
);

-- Table for Order
CREATE TABLE `Order` (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    accountID INT,
    orderDate DATETIME,
    totalAmount DECIMAL(10, 2),
    status ENUM('PENDING', 'SHIPPED', 'DELIVERED') DEFAULT 'PENDING',
    shippingAddress VARCHAR(255),
    paymentMethod varchar(255),
    FOREIGN KEY (accountID) REFERENCES Account(accountId)
);

-- Table for Order Details
CREATE TABLE OrderDetails (
    orderDetailID INT AUTO_INCREMENT PRIMARY KEY,
    orderID INT,
    productID INT,
    quantity INT,
    unitPrice DECIMAL(10, 2),
    totalPrice DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unitPrice) STORED,
    FOREIGN KEY (orderID) REFERENCES `Order`(orderID),
    FOREIGN KEY (productID) REFERENCES Product(productID)
);

-- Table for Blog
CREATE TABLE Blog (
    blogID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    authorID INT,  -- Changed from authorImage to authorID
    blogImage VARCHAR(255),
    createdDate DATETIME,
    description TEXT,
    FOREIGN KEY (authorID) REFERENCES Account(accountID) -- Corrected reference to accountID
);


-- Table for Post
CREATE TABLE Post (
    postID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    account_id INT,
    content TEXT,
    imageUrl VARCHAR(255),
    postedDate DATETIME,
    category VARCHAR(100),
    FOREIGN KEY (account_id) REFERENCES Account(accountId)
);

-- Table for Recommend Food
CREATE TABLE recommendFood (
    fish_id INT,
    typeOfFish VARCHAR(100),
    typeOfFood VARCHAR(100),
    numberOfFood INT,
    PRIMARY KEY (fish_id),
    FOREIGN KEY (fish_id) REFERENCES KoiFish(fish_id)
);

-- Table for Product Feedback
CREATE TABLE ProductFeedback (
    feedbackID INT AUTO_INCREMENT PRIMARY KEY,
    productID INT,
    accountID INT,
    feedbackText TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5), -- Ratings between 1 and 5
    feedbackDate DATETIME,
    FOREIGN KEY (productID) REFERENCES Product(productID),
    FOREIGN KEY (accountID) REFERENCES Account(accountId)
);

-- Table for Post Feedback
CREATE TABLE BlogFeedback (
    feedbackID INT AUTO_INCREMENT PRIMARY KEY,
    blogID INT,
    accountID INT,
    feedbackText TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5), -- Ratings between 1 and 5
    feedbackDate DATETIME,
    FOREIGN KEY (blogID) REFERENCES Blog(blogID),
    FOREIGN KEY (accountID) REFERENCES Account(accountId)
);

ALTER TABLE KoiFish 
MODIFY sex ENUM('male', 'female');
ALTER TABLE `Order` 
MODIFY status ENUM('pending', 'shipped', 'delivered','cancel') DEFAULT 'pending';
SET SQL_SAFE_UPDATES = 0;
-- Table for Cart
CREATE TABLE Cart (
    cartID INT AUTO_INCREMENT PRIMARY KEY,
    accountID INT,
    productID INT,
    quantity INT DEFAULT 1,
    addedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (accountID) REFERENCES Account(accountId),
    FOREIGN KEY (productID) REFERENCES Product(productID)
);
UPDATE Pond p
SET numberOfFish = (
    SELECT SUM(kf.quantity)
    FROM KoiFish kf
    WHERE kf.Pond_id = p.id
)
WHERE p.id IN (
    SELECT DISTINCT Pond_id FROM KoiFish
);
DROP TABLE IF EXISTS WaterParameter;
ALTER TABLE `Order`
MODIFY COLUMN paymentMethod ENUM('cashOnDelivery', 'vnPay');
DROP TABLE IF EXISTS recommendFood;
DROP TABLE IF EXISTS cart;
SELECT *
FROM `Order`;
ALTER TABLE `Account`
MODIFY roleDB enum('admin', 'member', 'manager', 'supervisor') default 'member';
ALTER TABLE KoiFish
MODIFY status ENUM('deceased', 'sick','live') DEFAULT 'live';
ALTER TABLE Pond
DROP COLUMN Capacity;



