CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cosmetics (
    id SERIAL,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    category ENUM('lip', 'eye', 'cheek') NOT NULL,
    color_code VARCHAR(7),
    status ENUM('owned', 'wishlist', 'tried') NOT NULL,
    rating TINYINT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS personal_info (
    id SERIAL,
    user_id INT NOT NULL UNIQUE,
    personal_color VARCHAR(50),
    skeleton_type VARCHAR(50),
    face_type VARCHAR(50),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);