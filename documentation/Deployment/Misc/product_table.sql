CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_by` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_cost` varchar(50) DEFAULT NULL,
  `product_link` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_imgurl` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_id` int(11) unsigned DEFAULT NULL,
  `purchase_year` int(11) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

