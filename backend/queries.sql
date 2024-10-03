 DROP TABLE ad;
 DROP TABLE category;

CREATE TABLE category ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    name TEXT NOT NULL
);

CREATE TABLE ad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    ownerEmail TEXT,
    owner TEXT NOT NULL,
    price INTEGER,
    picture TEXT,
    location TEXT,
    category_id INTEGER NOT NULL,
    created_at TEXT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category (name) VALUES ('Clothing'), ('High-tech'), ('Sport'), ('Furniture'), ('Cars'), ('Decoration'), ('Toys');


INSERT INTO ad (title, description, ownerEmail, owner, price, picture, location, category_id, created_at) 
VALUES 
("Mug", "Green and very cute", "bony@example.com", "Bony", 2500, "https://cdn.pixabay.com/photo/2016/11/29/12/46/coffee-1869599_640.jpg", "PARIS", 2, "2024-07-10"),
("Backpack", "Spacious and durable", "chris@example.com", "Chris", 2500, "https://cdn.pixabay.com/photo/2019/07/15/10/57/backpack-4339090_640.jpg", "PARIS", 4, "2024-08-01"),
("Shoes", "Running shoes, size 42", "marie@example.com", "Marie", 4500, "https://cdn.pixabay.com/photo/2018/08/31/09/35/baby-shoes-3644176_640.jpg", "PARIS", 5, "2024-08-05"),
("Watch", "Smartwatch with GPS", "leo@example.com", "Leo", 12000, "https://cdn.pixabay.com/photo/2015/06/25/17/22/smart-watch-821559_640.jpg", "PARIS", 5, "2024-08-12"),
("Laptop", "14-inch laptop, 256GB SSD", "eva@example.com", "Eva", 50000, "https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_640.jpg", "PARIS", 4, "2024-09-05"),
("Sofa", "Comfortable 3-seater", "lucie@example.com", "Lucie", 20000, "https://cdn.pixabay.com/photo/2020/02/14/09/01/lost-places-4847906_640.jpg", "LYON", 1, "2024-07-18"),
("Table", "Wooden coffee table", "hugo@example.com", "Hugo", 5000, "https://cdn.pixabay.com/photo/2019/05/28/00/15/indoors-4234071_640.jpg", "LYON", 3, "2024-08-06"),
("Lamp", "Vintage floor lamp", "marie@example.com", "Marie", 7000, "https://cdn.pixabay.com/photo/2016/09/11/17/36/retro-lampshade-1662061_640.jpg", "LYON", 3, "2024-08-10"),
("Bicycle", "Mountain bike", "louis@example.com", "Louis", 30000, "https://cdn.pixabay.com/photo/2017/06/18/17/51/stockholm-2416597_1280.jpg", "LYON", 3, "2024-08-22"),
("Phone", "Smartphone, 128GB", "sophie@example.com", "Sophie", 25000, "https://cdn.pixabay.com/photo/2020/01/27/15/30/background-4797499_640.jpg", "LYON", 3, "2024-09-01"),
("Speaker", "Bluetooth speaker", "nathan@example.com", "Nathan", 4000, "https://mafabriqueperso.fr/img/scenes/ndkcf/564.jpg", "LYON", 3, "2024-09-08"),
("Hat", "Vintage style", "paul@example.com", "Paul", 1500, "https://mafabriqueperso.fr/img/scenes/ndkcf/552.jpg", "BORDEAUX", 4, "2024-07-11"),
("Camera", "Digital camera with lens", "julien@example.com", "Julien", 15000, "https://cdn.pixabay.com/photo/2020/04/30/17/05/camera-5113699_640.jpg", "BORDEAUX", 4, "2024-09-15");





SELECT * FROM ad;

-- SELECT * FROM ad WHERE location = "BORDEAUX";

-- UPDATE ad SET price = 0 WHERE created_at = "2024-09-01";

-- DELETE FROM ad WHERE price >4000;

-- SELECT AVG(price) FROM ad WHERE location = "PARIS";

-- SELECT * FROM ad WHERE category_id = 1;

--  SELECT ad.id, ad.title, ad.description, ad.category_id, category.name
--  FROM ad
--  INNER JOIN category 
--  ON ad.category_id = category.id 
--  WHERE category.name = "furniture" OR category.name = "other"

-- SELECT ad.id, ad.title, ad.description, ad.owner, ad.price, ad.picture, ad.location, ad.created_at, category.name AS category_name
-- FROM ad
-- INNER JOIN category ON ad.category_id = category.id;



SELECT * FROM ad WHERE category_id IS NULL;




