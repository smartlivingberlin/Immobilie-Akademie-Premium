CREATE TABLE `flashcard_expanded_answers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`flashcardId` varchar(100) NOT NULL,
	`moduleId` int NOT NULL,
	`dayNumber` int NOT NULL,
	`question` text NOT NULL,
	`shortAnswer` text NOT NULL,
	`expandedAnswer` text NOT NULL,
	`wordCount` int NOT NULL,
	`viewCount` int NOT NULL DEFAULT 0,
	`qualityRating` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `flashcard_expanded_answers_id` PRIMARY KEY(`id`),
	CONSTRAINT `flashcard_expanded_answers_flashcardId_unique` UNIQUE(`flashcardId`)
);
