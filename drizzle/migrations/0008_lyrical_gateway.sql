ALTER TABLE `exam_sessions` ADD `timeLimit` int DEFAULT 1800 NOT NULL;--> statement-breakpoint
ALTER TABLE `exam_sessions` ADD `difficulty` enum('easy','medium','hard') DEFAULT 'medium' NOT NULL;--> statement-breakpoint
ALTER TABLE `exam_sessions` ADD `isIHKMode` boolean DEFAULT false NOT NULL;