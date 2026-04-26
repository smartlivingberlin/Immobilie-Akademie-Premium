CREATE TABLE `password_reset_tokens` (
  `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `email` varchar(320) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expiresAt` timestamp NOT NULL,
  `usedAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `password_reset_tokens_token_unique` UNIQUE(`token`)
);
