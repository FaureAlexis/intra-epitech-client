class BaseService {
  protected cookie: string;

  constructor(cookie: string) {
    this.cookie = cookie;
  }

  getCookie() {
    return this.cookie;
  }
  setCookie(cookie: string) {
    this.cookie = cookie;
  }
};

export default BaseService;
