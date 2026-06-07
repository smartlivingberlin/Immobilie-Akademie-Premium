ALTER TABLE `partner_payout_ledger`
  ADD COLUMN `stripeTransferId` varchar(64) DEFAULT NULL;
