CREATE DATABASE lifehack;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--User table
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  is_admin BOOLEAN 
);

--Testing Insert 

--School table
CREATE TABLE schools (
  school_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_name VARCHAR(100) NOT NULL
);

CREATE TABLE school_relations (
  school_id UUID REFERENCES schools(school_id) NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL
);

INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Anderson Serangoon Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Anglo-Chinese Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Anglo-Chinese IB Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Catholic Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Dunman High School');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Eunoia Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Hwa Chong Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Jurong Pioneer Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Nanyang Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'National Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Raffles Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'River Valley Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Saint Andrews Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'St. Josephs Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Tampines Meridian Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Temasek Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Victoria Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'Yishun Innova Junior College');
INSERT INTO schools (school_id, school_name) VALUES (DEFAULT, 'National University of Singapore');

CREATE TABLE school_message_board (
  school_id UUID REFERENCES schools(school_id) NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL,
  message_content TEXT NOT NULL,
  date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Check in question 1, 2, 3, 4, 5 
CREATE TABLE answers (
  user_id UUID REFERENCES users(user_id) NOT NULL,
  date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  answer1 INTEGER NOT NULL,
  answer2 INTEGER NOT NULL,
  answer3 INTEGER NOT NULL,
  answer4 INTEGER NOT NULL,
  answer5 INTEGER NOT NULL
);

--Quotes
CREATE TABLE quotes (
    quote_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL
);

INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Winston Churchill', 'Success is not final, failure is not fatal: it is the courage to continue that counts.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Helen Keller', 'Never bend your head. Always hold it high. Look the world straight in the eye.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Theodore Roosevelt', 'Believe you can and youre halfway there.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Jimmy Dean', 'I cant change the direction of the wind, but I can adjust my sails to always reach my destination.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Demi Lovato', 'No matter what youre going through, theres a light at the end of the tunnel.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Audrey Hepburn', 'Nothing is impossible. The word itself says "Im possible!"');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Mandy Hale', 'You dont always need a plan. Sometimes you just need to breathe, trust, let go and see what happens.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Meghan Markle', 'You are enough just as you are.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Pablo Picasso', 'Everything you can imagine is real.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Elon Musk', 'If something is important enough, even if the odds are stacked against you, you should still do it.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Johann Wolfgang Von Goethe', 'Magic is believing in yourself. If you can make that happen, you can make anything happen.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Albert Einstein', 'If you want to live a happy life, tie it to a goal, not to people or things.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Albert Einstein', 'E=MC^2');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Steve Jobs', 'Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Soren Kierkegaard', 'Life is not a problem to be solved, but a reality to be experienced.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Celine Dion', 'Life imposes things on you that you can’t control, but you still have the choice of how you’re going to live through this.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Marilyn Monroe', 'Keep smiling, because life is a beautiful thing and there’s so much to smile about.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Jane Fonda', 'It’s never too late – never too late to start over, never too late to be happy.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'Henry David Thoreau', 'Go confidently in the direction of your dreams.  Live the life you have imagined.');
INSERT INTO quotes (quote_id,author_name,content) VALUES (DEFAULT, 'George Eliot', 'It is never too late to be what you might have been.');


--LEFT JOIN query (Tim's)
SELECT COUNT(distinct users.user_id) FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN answers ON answers.user_id = users.user_id WHERE schools.school_id = '4cc70458-2265-41f5-9e1e-e24b8e5f4f89';

SELECT count() FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN question1 ON question1.user_id = users.user_id WHERE schools.school_id = '4cc70458-2265-41f5-9e1e-e24b8e5f4f89' AND users.is_admin = 'f';

-- Get all question scores from one user 
INSERT INTO answers (user_id, date_time, answer1, answer2, answer3, answer4, answer5) VALUES ('c81d5410-3e62-412c-96be-86e2bcb682b1', NOW(), 5, 4, 3, 4, 1);

SELECT date_time::date FROM answers WHERE user_id = 'c81d5410-3e62-412c-96be-86e2bcb682b1' ORDER BY date_time DESC;

SELECT COUNT(DISTINCT users.user_id) FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN answers ON answers.user_id = users.user_id WHERE schools.school_id = '4cc70458-2265-41f5-9e1e-e24b8e5f4f89' AND date_time::date BETWEEN '2021-07-23' AND 'current_date'