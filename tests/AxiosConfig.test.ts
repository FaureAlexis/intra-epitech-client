import getAxiosConfig from "../src/utils/AxiosConfig";

describe("AxiosConfig", () => {
    it("should return a valid axios config", (done) => {
        const config = getAxiosConfig("test");
        expect(config).toHaveProperty("headers");
        expect(config.headers).toHaveProperty("Cookie");
        expect(config.headers).toHaveProperty("Referer");
        expect(config.headers.Cookie).toBe("test");
        expect(config.headers.Referer).toBe("https://intra.epitech.eu/");
        done();
    });
});
