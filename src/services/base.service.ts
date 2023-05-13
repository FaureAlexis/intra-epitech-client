/**
 * Base service class.
 */
class BaseService {
  protected cookie: string;
  /**
   * Creates an instance of BaseService.
   * @param {string} cookie - The cookie value.
   */
  constructor(cookie: string) {
    /**
     * The cookie value.
     * @type {string}
     * @protected
     */
    this.cookie = cookie;
  }

  /**
   * Get the cookie value.
   * @returns {string} The cookie value.
   */
  getCookie() {
    return this.cookie;
  }

  /**
   * Set the cookie value.
   * @param {string} cookie - The new cookie value.
   */
  setCookie(cookie : string) {
    this.cookie = cookie;
  }
}

export default BaseService;

