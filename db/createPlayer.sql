INSERT INTO players (name, nickname, rank) VALUES  ($1, $2, $3)
RETURNING *;