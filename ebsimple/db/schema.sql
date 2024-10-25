CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.answers (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question_uuid UUID NOT NULL,
  choice char(1) NOT NULL,
  created_at TIMESTAMP default current_timestamp NOT NULL
);

-- Create a table to store AWS questions and answers
CREATE TABLE questions (
    uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL
);
