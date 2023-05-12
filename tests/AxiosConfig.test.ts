import getAxiosConfig from "../src/utils/AxiosConfig";

describe("AxiosConfig", () => {
    it("should return a valid axios config", (done) => {
        const config = getAxiosConfig("test");
        expect(config).toHaveProperty("headers");
        expect(config.headers).toHaveProperty("cookie");
        expect(config.headers).toHaveProperty("referer");
        expect(config.headers.cookie).toBe("test");
        expect(config.headers.referer).toBe("https://intra.epitech.eu/");
        done();
    });
});
