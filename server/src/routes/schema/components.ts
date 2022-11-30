/**
 * Question
 * @typedef {object} Question
 * @property {string} id
 * @property {string} type
 * @property {string} label
 * @property {integer} order
 */

/**
 * Create Question
 * @typedef {object} CreateQuestion
 * @property {string} type - required
 * @property {string} label - required
 * @property {integer} order - required
 */

/**
 * Answer
 * @typedef {object} Answer
 * @property {string} id
 * @property {string} answer
 * @property {string} question_id
 * @property {string} user_id
 */

/**
 * Create Answer
 * @typedef {object} CreateAnswer
 * @property {string} answer - required
 * @property {string} question_id - required
 * @property {string} user_id - required
 */

/**
 * User
 * @typedef {object} User
 * @property {string} id
 * @property {string} name
 */

/**
 * Create User
 * @typedef {object} CreateUser
 * @property {string} name - required
 */
