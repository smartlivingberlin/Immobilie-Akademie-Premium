CREATE TABLE `auth_credentials` (
  `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `openId` varchar(64) NOT NULL,
  `hash` text NOT NULL,
  `salt` varchar(64) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `auth_credentials_openId_unique` UNIQUE(`openId`)
);
