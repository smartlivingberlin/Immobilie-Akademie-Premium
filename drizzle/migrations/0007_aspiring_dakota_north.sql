CREATE TABLE `exam_questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`questionNumber` int NOT NULL,
	`questionText` text NOT NULL,
	`correctAnswer` text NOT NULL,
	`userAnswer` text,
	`isCorrect` boolean,
	`moduleId` int NOT NULL,
	`dayId` int,
	`topic` varchar(255),
	`difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'medium',
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exam_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exam_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`totalQuestions` int NOT NULL DEFAULT 50,
	`correctAnswers` int NOT NULL DEFAULT 0,
	`score` int NOT NULL DEFAULT 0,
	`timeSpent` int NOT NULL DEFAULT 0,
	`status` enum('in_progress','completed','abandoned') NOT NULL DEFAULT 'in_progress',
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exam_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exam_weak_topics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`topic` varchar(255) NOT NULL,
	`incorrectCount` int NOT NULL DEFAULT 1,
	`lastEncountered` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exam_weak_topics_id` PRIMARY KEY(`id`)
);
