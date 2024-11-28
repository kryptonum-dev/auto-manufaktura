/**
 * Global declaration of theme color in HEX format.
 * This color is used for theming purposes across the application.
 * @constant
 * @type {string}
 */
export const THEME_COLOR: string = '#02080D';

/**
 * Global declaration of background color in HEX format.
 * This color is used for the background across the application.
 * @constant
 * @type {string}
 */
export const BACKGROUND_COLOR: string = '#02080D';

/**
 * Global declaration of the locale (language) for the application.
 * This constant is used to set the language attribute in the HTML tag.
 * @constant
 * @type {string}
 */
export const LOCALE: string = 'pl';

/**
 * Global declaration of the domain for the application.
 * This constant is used for constructing full URLs and determining external links.
 * @constant
 * @type {string}
 */
export const DOMAIN: string = 'https://auto-manufaktura.pl';

/**
 * Global declaration of the default title for the application.
 * This constant is used as a fallback title when a specific page title is not provided.
 * @constant
 * @type {string}
 */
export const DEFAULT_TITLE: string = 'Auto Manufaktura';

/**
 * Global declaration of the default description for the application.
 * This constant is used as a fallback description when a specific page description is not provided.
 * It's typically used in meta tags for SEO purposes.
 * @constant
 * @type {string}
 */
export const DEFAULT_DESCRIPTION: string =
  'Nasza firma to zespół mechaników z wieloletnim doświadczeniem, którzy dbają o pełne zadowolenie każdego klienta. Pomożemy Ci sprawić, aby Twoje auto było w jak najlepszej formie!';

/**
 * URL for the main logo.
 * @constant
 * @type {string}
 */
export const LOGO_URL: string = `${DOMAIN}/auto-manufaktura-logo.png`;

/**
 * Object containing regular expressions for validation purposes.
 * @constant
 * @type {Object}
 * @property {RegExp} email - Regular expression for validating email addresses.
 * @property {RegExp} phone - Regular expression for validating phone numbers.
 * @property {RegExp} string - Regular expression for trimming and validating strings.
 */
export const REGEX: { email: RegExp; phone: RegExp; string: RegExp } = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^(?:\+(?:\d{1,3}))?(?:[ -]?\(?\d{1,4}\)?[ -]?\d{1,5}[ -]?\d{1,5}[ -]?\d{1,6})$/,
  string: /^(?!\s+$)(.*?)\s*$/,
};

/**
 * Global declaration of the easing function for JS animations.
 * @constant
 * @type {number[]}
 */
export const EASING: number[] = [0.645, 0.045, 0.355, 1];
