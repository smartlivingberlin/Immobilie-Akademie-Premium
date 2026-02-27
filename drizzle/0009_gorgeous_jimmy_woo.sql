CREATE TABLE `certificates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`examSessionId` int NOT NULL,
	`moduleId` int NOT NULL,
	`moduleName` varchar(255) NOT NULL,
	`score` int NOT NULL,
	`totalQuestions` int NOT NULL,
	`correctAnswers` int NOT NULL,
	`pdfUrl` text NOT NULL,
	`pdfKey` varchar(500) NOT NULL,
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`)
);
