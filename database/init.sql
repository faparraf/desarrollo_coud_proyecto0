CREATE USER proyecto0_user WITH PASSWORD 'pr0y3ct0o';;
CREATE DATABASE proyecto0;

\connect proyecto0

CREATE TABLE users(
   username TEXT NOT NULL,
   user_pass TEXT NOT NULL,
   PRIMARY KEY( username )
);

CREATE TABLE events(
   id SERIAL PRIMARY KEY,
   username TEXT NOT NULL,
   date_event TIMESTAMP NOT NULL,
   name_event TEXT NOT NULL,
   type_event TEXT NOT NULL,
   FOREIGN KEY (username) REFERENCES users (username)
);


GRANT ALL PRIVILEGES ON DATABASE proyecto0 TO proyecto0_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO proyecto0_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO proyecto0_user;