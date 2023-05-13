import EpitechClient from "../src";
import IUser from "../src/types/User";
import * as dotenv from "dotenv";
dotenv.config();

let user: IUser;

describe("UserService", () => {
    beforeAll(async () => {
        jest.setTimeout(30000);
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        user = await client.user.getStaticInfos();
        if (!user) {
            throw new Error("Could not find user");
        }
    }, 30000);
    it("should return a valid user name", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const name = await client.user.getStudentName();
        expect(["Anonymous user", "Alexis FAURE"]).toContain(name);
        return;
    }, 30000);
    it("should return a valid user promo", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const promo = await client.user.getStudentPromo();
        expect(promo).toBe(user.promo);
        return;
    }, 30000);
    it("should return a valid user year", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const year = await client.user.getStudentYear();
        expect(year).toBe(user.studentyear);
        return;
    }, 30000);
    it("should return a valid user picture", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const picture = await client.user.getPicture();
        expect(picture.startsWith("https://intra.epitech.eu/file/userprofil/profilview/") && picture.endsWith("@epitech.eu.jpg")).toBe(true);
        return;
    }, 30000);
    it("should return a valid user location", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const location = await client.user.getStudentLocation();
        expect(location).toBe(user.location);
        return;
    }, 30000);
    it("should return a valid user gpa", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const gpa = await client.user.getStudentGPA();
        expect(gpa).toBe(user.gpa[0].gpa);
        return;
    }, 30000);
    it("should return a valid user credits", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const credits = await client.user.getStudentCredits();
        expect(credits).toBe(user.credits);
        return;
    }, 30000);
    it("should return valid user informations", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const partialUser = await client.user.getAllStudentInfo();
        expect(partialUser.login).toBe(user.login);
        return;
    }, 30000);
    it("should throw an error when using invalid cookie", async () => {
        const client = new EpitechClient();
        client.user.setCookie("invalid");
        client.cookie = "invalid";
        client.user.setUser(null);
        await expect(client.user.getPicture()).rejects.toThrow("Request failed with status code 403");
        await expect(client.user.getStudentPromo()).rejects.toThrow("Request failed with status code 403");
        client.user.setCookie("invalid");
        client.cookie = "invalid";
        client.user.setUser(null);
        await expect(client.user.getStudentLocation()).rejects.toThrow("Request failed with status code 403");
        await expect(client.user.getStudentCredits()).rejects.toThrow("Request failed with status code 403");
        await expect(client.user.getStudentEmail()).rejects.toThrow("Request failed with status code 403");
        await expect(client.user.getStudentNetsoul()).rejects.toThrow("Request failed with status code 403");
        await expect(client.user.getStudentNetsoulNorm()).rejects.toThrow("Request failed with status code 403");
        await expect(client.user.getStudentGPA()).rejects.toThrow("Request failed with status code 403");
        await expect(client.user.getStudentCycle()).rejects.toThrow("Request failed with status code 403");
        await expect(client.user.getStudentPhone()).rejects.toThrow("Request failed with status code 403");
        await expect(client.user.getStudentYear()).rejects.toThrow("Request failed with status code 403");
    }, 30000);
});
