CREATE TABLE IF NOT EXISTS posts (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  category     VARCHAR(100),
  author       VARCHAR(100),
  published_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO posts (title, excerpt, category, author, published_at) VALUES
  ('The quiet revolution reshaping how we think about software', 'A new generation of tools is changing the relationship between developers and the systems they build.', 'Technology', 'Sophie Laurent', NOW() - INTERVAL '1 day'),
  ('New findings challenge what we knew about deep-sea ecosystems', 'Researchers have discovered unexpected biodiversity at extreme ocean depths.', 'Science', 'Maya Chen', NOW() - INTERVAL '2 days'),
  ('Architecture is having an identity crisis', 'The built environment is being pulled in contradictory directions by climate, cost, and culture.', 'Culture', 'Tobias Kern', NOW() - INTERVAL '3 days'),
  ('Why the most interesting fonts come from unexpected places', 'Independent type foundries are quietly outpacing the big names.', 'Design', 'Lena Brandt', NOW() - INTERVAL '4 days'),
  ('Open source is winning, but not how anyone predicted', 'The economics of open source have shifted in subtle but important ways.', 'Technology', 'Ravi Nair', NOW() - INTERVAL '5 days');