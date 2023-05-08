CREATE TABLE `pokemon` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`weight` integer NOT NULL,
	`height` integer NOT NULL,
	`hp` integer NOT NULL,
	`attack` integer NOT NULL,
	`defense` integer NOT NULL,
	`special_attack` integer NOT NULL,
	`special_defense` integer NOT NULL,
	`speed` integer NOT NULL,
	`sprite` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pokemon_types` (
	`pokemon_id` integer NOT NULL,
	`type_id` integer NOT NULL,
	FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`),
	FOREIGN KEY (`type_id`) REFERENCES `types`(`id`)
);
--> statement-breakpoint
CREATE TABLE `types` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
