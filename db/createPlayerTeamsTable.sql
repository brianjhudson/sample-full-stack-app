CREATE TABLE IF NOT EXISTS players_teams (
   id serial primary key,
   team_id int references teams (id),
   player_id int references players(id)
);