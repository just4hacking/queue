CREATE TYPE ACTION_STATUS AS ENUM ('with_action', 'without_action', 'in_progress', 'done');

CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  comment VARCHAR(200) NOT NULL DEFAULT '',
  amount DECIMAL NOT NULL CONSTRAINT amount CHECK (amount >= 0),
  action_status ACTION_STATUS NOT NULL,
  paid BOOLEAN NOT NULL
);

CREATE TABLE donation_messages(
  id SERIAL PRIMARY KEY,
  donation_id INTEGER REFERENCES donations(id) ON DELETE SET NULL,
  color VARCHAR(6)
);