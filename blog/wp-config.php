<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'tastefully');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '`(Vp?D8nN9?%nKyb ,:h9:I)D!Jb?7*D`+[uLa#}WCp8x-FzbgoljL(V{~(g0eu@');
define('SECURE_AUTH_KEY',  'zSBI+Wh_hz%N8:o@{z`P/.{aBc+%2O~*M-f@GL0;E-tv7<tNe#Z4Zp>iwcbdwL+;');
define('LOGGED_IN_KEY',    'xOP7jqlmSECV}^pfrv||wBC(R;K4{RC++_A4hfaKgKLIiM@UEy}QMx#~S}:?=SEz');
define('NONCE_KEY',        '9^Nw*8C.O_ASBL|^PJr5b+/+<bAyc*J##k+C,i+<q+x,H+*o;)OK]$VB;I+EBxm*');
define('AUTH_SALT',        '4*wMoL(QoEq !~%-%|eLgM]No!?P%,+ZKYQHB%(njj=pNu)nCD;&OO~7G6q,`NV(');
define('SECURE_AUTH_SALT', '`rJu[x+|.^mVQ PFIRGnW]W9yE=6mgoOu @eQ-M.^FN?D+jg`;bI:U*X~jU~{1{e');
define('LOGGED_IN_SALT',   '1fPwAnp|cI0=4WAHTG|uL~H/3bTSd,?@}[vjo=+SMu#__UT@bA0Kp0p+2$B4ma/0');
define('NONCE_SALT',       '!Iea/lh9EE{EE4hRD0Y lLA]pVN)5-Ep)^*AH1E1bMRX4$g+ XF(Ba.*x#R9O5P2');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

