CREATE TABLE `whitelabel_configs` (
`id` int AUTO_INCREMENT NOT NULL,
`slug` varchar(64) NOT NULL,
`companyName` varchar(255) NOT NULL,
`logoUrl` text,
`faviconUrl` text,
`primaryColor` varchar(7) NOT NULL DEFAULT '#2563eb',
`secondaryColor` varchar(7) NOT NULL DEFAULT '#1e293b',
`accentColor` varchar(7) NOT NULL DEFAULT '#3b82f6',
`sidebarColor` varchar(7) NOT NULL DEFAULT '#0f172a',
`welcomeText` text,
`footerText` text,
`contactEmail` varchar(320),
`contactPhone` varchar(50),
`websiteUrl` text,
`azavEnabled` boolean NOT NULL DEFAULT false,
`azavCertNumber` varchar(100),
`azavValidUntil` timestamp,
`enabledModules` varchar(255) NOT NULL DEFAULT '1,2,3,4,5',
`maxUsers` int NOT NULL DEFAULT 100,
`isActive` boolean NOT NULL DEFAULT true,
`adminUserId` int,
`createdAt` timestamp NOT NULL DEFAULT (now()),
`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT `whitelabel_configs_id` PRIMARY KEY(`id`),
CONSTRAINT `whitelabel_configs_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','trainer') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `tenantId` int;
