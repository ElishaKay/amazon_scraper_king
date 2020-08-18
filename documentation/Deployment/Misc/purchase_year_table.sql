
CREATE TABLE IF NOT EXISTS `purchase_year` (
  `purchase_year_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(11) unsigned DEFAULT NULL,
  `purchase_year` int(11) unsigned DEFAULT NULL,
  `page_number` int(11) unsigned DEFAULT NULL,
  `multi_page` boolean,
  `total_pages` int(11) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`purchase_year_id`),
  KEY `client_id purchase_year_id` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci
