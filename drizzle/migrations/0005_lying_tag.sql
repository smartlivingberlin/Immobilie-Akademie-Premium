CREATE TABLE `video_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`videoId` int NOT NULL,
	`currentPosition` int NOT NULL DEFAULT 0,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`percentageWatched` int NOT NULL DEFAULT 0,
	`lastWatchedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `video_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `video_tutorials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`videoUrl` text NOT NULL,
	`platform` enum('youtube','vimeo') NOT NULL,
	`videoId` varchar(100) NOT NULL,
	`durationSeconds` int,
	`moduleId` int NOT NULL,
	`dayNumber` int NOT NULL,
	`displayOrder` int NOT NULL DEFAULT 0,
	`isRequired` boolean NOT NULL DEFAULT false,
	`thumbnailUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `video_tutorials_id` PRIMARY KEY(`id`)
);
