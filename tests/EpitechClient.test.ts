import EpitechClient from "../src";
import ConnectError from "../src/exceptions/ConnectError";

describe("EpitechClient", () => {
    it("should throw an error if cookie is invalid", (done) => {
        expect(() => {
            const client = new EpitechClient("test");
        }).toThrowError("Could not connect to Epitech Intranet. Please verify your cookie.");
        done();
    });
    it("should connect to Epitech Intranet", (done) => {
        expect(() => {
            const client = new EpitechClient();
        }).not.toThrowError("Could not connect to Epitech Intranet. Please verify your cookie.");
        done();
    });
    it("should return a valid user name when using env", async () => {
        const client = new EpitechClient();
        const name = await client.user.getStudentName();
        expect(["Anonymous user", "Alexis FAURE"]).toContain(name);
        return;
    }, 30000);
    it("should return a valid user name when using string", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const name = await client.user.getStudentName();
        expect(["Anonymous user", "Alexis FAURE"]).toContain(name);
        return;
    }, 30000);
});

describe("testConnection function", () => {
    it("should return true when using env", async () => {
        const client = new EpitechClient();
        const connected = await client.testConnection();
        expect(connected).toBe(true);
        return;
    }, 30000);
    it("should return true when using string", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const connected = await client.testConnection();
        expect(connected).toBe(true);
        return;
    }, 30000);
    it("should throw a connectError when using invalid cookie", async () => {
      try {
        expect(new EpitechClient("user=test")).toThrow();
        return;
      } catch (e) {
        expect(e instanceof ConnectError || e instanceof Error).toBe(true);
      }
    }, 30000);
});
