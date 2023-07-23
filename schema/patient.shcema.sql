CREATE TABLE IF NOT EXISTS patient(
  id          SERIAL PRIMARY KEY,
  name        varchar(200) NOT NULL,
  history     varchar(200) NOT NULL,
  appointment varchar(200) NOT NULL,
  age        integer
);




-- psql -d healthcare -f ./schema/doctors.schema.sql