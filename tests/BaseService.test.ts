import BaseService from "../src/services/base.service";

describe("BaseService", () => {
  it("should return a valid BaseService", (done) => {
    const service = new BaseService("test");
    expect(service).toHaveProperty("cookie");
    expect(service).toHaveProperty("getCookie");
    expect(service.getCookie()).toBe("test");
    expect(service).toHaveProperty("setCookie");
    service.setCookie("test2");
    expect(service.getCookie()).toBe("test2");
    done();
  });
});

