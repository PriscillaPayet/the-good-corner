

CREATE TABLE category ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    name TEXT NOT NULL
);

CREATE TABLE ad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    owner TEXT NOT NULL,
    price INTEGER,
    picture TEXT,
    location TEXT,
    category_id INTEGER NOT NULL,
    created_at TEXT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category (name) VALUES ('clothing'), ('high-tech'), ('sport'), ('furniture'), ('other');


INSERT INTO ad (title, description, owner, price, picture, location, category_id, created_at) 
VALUES 
("Mug", "Green and very cute", "Bony", 2500, "https://mafabriqueperso.fr/img/scenes/ndkcf/544.jpg", "PARIS", 1, "2024-09-25"),
("Mug", "Green and very cute", "Bony", 2500, "https://mafabriqueperso.fr/img/scenes/ndkcf/544.jpg", "PARIS", 2, "2024-07-10"),
("T-Shirt", "White and stylish", "Alex", 1000, "https://mafabriqueperso.fr/img/scenes/ndkcf/545.jpg", "PARIS", 3, "2024-07-15"),
("Backpack", "Spacious and durable", "Chris", 2500, "https://mafabriqueperso.fr/img/scenes/ndkcf/546.jpg", "PARIS", 4, "2024-08-01"),
("Shoes", "Running shoes, size 42", "Marie", 4500, "https://mafabriqueperso.fr/img/scenes/ndkcf/547.jpg", "PARIS", 5, "2024-08-05"),
("Watch", "Smartwatch with GPS", "Leo", 12000, "https://mafabriqueperso.fr/img/scenes/ndkcf/548.jpg", "PARIS", 5, "2024-08-12"),
("Laptop", "14-inch laptop, 256GB SSD", "Eva", 50000, "https://mafabriqueperso.fr/img/scenes/ndkcf/549.jpg", "PARIS", 4, "2024-09-05"),
("Headphones", "Wireless noise-cancelling", "John", 8000, "https://mafabriqueperso.fr/img/scenes/ndkcf/550.jpg", "PARIS", 3, "2024-09-10"),
("Mug", "Simple and elegant", "Clara", 500, "https://mafabriqueperso.fr/img/scenes/ndkcf/558.jpg", "LYON", 2, "2024-07-02"),
("Sofa", "Comfortable 3-seater", "Lucie", 20000, "https://mafabriqueperso.fr/img/scenes/ndkcf/559.jpg", "LYON", 1, "2024-07-18"),
("Table", "Wooden coffee table", "Hugo", 5000, "https://mafabriqueperso.fr/img/scenes/ndkcf/560.jpg", "LYON", 3, "2024-08-06"),
("Lamp", "Vintage floor lamp", "Marie", 7000, "https://mafabriqueperso.fr/img/scenes/ndkcf/561.jpg", "LYON", 3, "2024-08-10"),
("Bicycle", "Mountain bike", "Louis", 30000, "https://mafabriqueperso.fr/img/scenes/ndkcf/562.jpg", "LYON", 3, "2024-08-22"),
("Phone", "Smartphone, 128GB", "Sophie", 25000, "https://mafabriqueperso.fr/img/scenes/ndkcf/563.jpg", "LYON", 3, "2024-09-01"),
("Speaker", "Bluetooth speaker", "Nathan", 4000, "https://mafabriqueperso.fr/img/scenes/ndkcf/564.jpg", "LYON", 3, "2024-09-08"),
("Mug", "Handmade ceramic mug", "Pierre", 800, "https://mafabriqueperso.fr/img/scenes/ndkcf/551.jpg", "BORDEAUX", 4, "2024-07-03"),
("Hat", "Vintage style", "Paul", 1500, "https://mafabriqueperso.fr/img/scenes/ndkcf/552.jpg", "BORDEAUX", 4, "2024-07-11"),
("Lamp", "Modern table lamp", "Elise", 3000, "https://mafabriqueperso.fr/img/scenes/ndkcf/553.jpg", "BORDEAUX", 4, "2024-08-03"),
("Sofa", "Comfortable 3-seater", "Lucie", 20000, "https://mafabriqueperso.fr/img/scenes/ndkcf/554.jpg", "BORDEAUX", 4, "2024-08-14"),
("Table", "Wooden coffee table", "Hugo", 5000, "https://mafabriqueperso.fr/img/scenes/ndkcf/555.jpg", "BORDEAUX", 4, "2024-08-20"),
("Bicycle", "Used but functional bike", "Luc", 10000, "https://mafabriqueperso.fr/img/scenes/ndkcf/556.jpg", "BORDEAUX", 4, "2024-09-02"),
("Camera", "Digital camera with lens", "Julien", 15000, "https://mafabriqueperso.fr/img/scenes/ndkcf/557.jpg", "BORDEAUX", 4, "2024-09-15");



INSERT INTO ad (title, description, owner, price, picture, location, category_id, created_at) 
VALUES 
("Jacket", "Leather jacket, black", "Sara", 10000, "https://mafabriqueperso.fr/img/scenes/ndkcf/565.jpg", "PARIS", 5, "2024-09-01"),
("Watch", "Classic wristwatch, silver", "David", 7500, "https://mafabriqueperso.fr/img/scenes/ndkcf/566.jpg", "LYON", 5, "2024-09-01"),
("Chair", "Ergonomic office chair", "Thomas", 6000, "https://mafabriqueperso.fr/img/scenes/ndkcf/567.jpg", "BORDEAUX", 5, "2024-09-01"),
("Glasses", "Sunglasses, UV protection", "Amelie", 3000, "https://mafabriqueperso.fr/img/scenes/ndkcf/568.jpg", "PARIS", 5, "2024-09-01"),
("Phone", "Unlocked smartphone", "Julie", 20000, "https://mafabriqueperso.fr/img/scenes/ndkcf/569.jpg", "LYON", 5, "2024-09-01"),
("Bag", "Leather handbag, brown", "Nina", 12000, "https://mafabriqueperso.fr/img/scenes/ndkcf/570.jpg", "BORDEAUX", 5, "2024-09-01"),
("Camera", "Action camera with accessories", "Pierre", 25000, "https://mafabriqueperso.fr/img/scenes/ndkcf/571.jpg", "PARIS", 2, "2024-09-01"),
("Desk", "Modern wooden desk", "Lucas", 9000, "https://mafabriqueperso.fr/img/scenes/ndkcf/572.jpg", "LYON", 2, "2024-09-01"),
("Bookshelf", "Tall wooden bookshelf", "Paul", 7000, "https://mafabriqueperso.fr/img/scenes/ndkcf/573.jpg", "BORDEAUX", 2, "2024-09-01"),
("Shoes", "Casual sneakers, size 44", "Marie", 5000, "https://mafabriqueperso.fr/img/scenes/ndkcf/574.jpg", "PARIS", 2, "2024-09-01");


SELECT * FROM ad;

SELECT * FROM ad WHERE location = "BORDEAUX";

UPDATE ad SET price = 0 WHERE created_at = "2024-09-01";

DELETE FROM ad WHERE price >4000;

SELECT AVG(price) FROM ad WHERE location = "PARIS";

SELECT * FROM ad WHERE category_id = 1;

SELECT ad.id, ad.title, ad.description, ad.category_id, category.name
FROM ad
INNER JOIN category 
ON ad.category_id = category.id 
WHERE category.name = "furniture" OR category.name = "other"






