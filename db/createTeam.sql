INSERT INTO teams (team_name) VALUES  ($1)
RETURNING *;