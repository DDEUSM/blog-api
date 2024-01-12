CREATE TABLE blog.users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    gender VARCHAR(6)
);

CREATE TABLE blog.posts (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES blog.users(id), 
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date TIMESTAMP DEFAULT NOW()
);