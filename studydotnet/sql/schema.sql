CREATE DATABASE studyapp;

CREATE TABLE answers (
  uuid uniqueidentifier not null DEFAULT newid(),
  question_uuid uniqueidentifier NOT NULL,
  choice char(1) NOT NULL,
  created_at DATETIME NOT NULL default CURRENT_TIMESTAMP
);

-- Create a table to store AWS questions and answers
CREATE TABLE questions (
  -- https://stackoverflow.com/questions/40731995/how-to-auto-generate-uniqueidentifier-on-insert-query-in-sql-server
    uuid uniqueidentifier not null DEFAULT newid(),
    question NTEXT NOT NULL,
    option_a NTEXT NOT NULL,
    option_b NTEXT NOT NULL,
    option_c NTEXT NOT NULL,
    option_d NTEXT NOT NULL,
    correct_option CHAR(1) NOT NULL
);
