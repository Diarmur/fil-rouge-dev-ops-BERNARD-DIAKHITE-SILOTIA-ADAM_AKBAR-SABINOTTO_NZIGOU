CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (title, content)
SELECT 'Premier article', 'Bienvenue sur le mini-blog DevOps.'
WHERE NOT EXISTS (SELECT 1 FROM posts);
