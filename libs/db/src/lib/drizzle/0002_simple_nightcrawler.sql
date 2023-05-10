CREATE TABLE `pokemon_teams` (
	`team_id` integer NOT NULL,
	`pokemon_id` integer NOT NULL,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`)
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
