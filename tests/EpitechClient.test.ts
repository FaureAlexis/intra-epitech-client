import EpitechClient from "../src";

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
    it("should return a valid user name", async () => {
        const client = new EpitechClient("user=randomcookie");
        const name = await client.user.getStudentName();
        expect(name).toBe("Anonymous user");
        return;
    });
});
