import EpitechClient from "../src";
import IUser from "../src/types/User";
import * as dotenv from "dotenv";
dotenv.config();

let user: IUser;

describe("UserService", () => {
    beforeAll(async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        console.log('cookie: ', client.cookie.length, ' env: ', process.env.EPITECH_COOKIE?.length);
        user = await client.user.getStaticInfos();
        if (!user) {
            throw new Error("Could not find user");
        }
    });
    it("should return a valid user name", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const name = await client.user.getStudentName();
        expect(["Anonymous user", "Alexis FAURE"]).toContain(name);
        return;
    });
    it("should return a valid user promo", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const promo = await client.user.getStudentPromo();
        expect(promo).toBe(user.promo);
        return;
    });
    it("should return a valid user year", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const year = await client.user.getStudentYear();
        expect(year).toBe(user.studentyear);
        return;
    });
    it("should return a valid user picture", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const picture = await client.user.getPicture();
        expect(picture.startsWith("https://intra.epitech.eu/file/userprofil/profilview/") && picture.endsWith("@epitech.eu.jpg")).toBe(true);
        return;
    });
    it("should return a valid user location", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const location = await client.user.getStudentLocation();
        expect(location).toBe(user.location);
        return;
    });
    it("should return a valid user gpa", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const gpa = await client.user.getStudentGPA();
        expect(gpa).toBe(user.gpa[0].gpa);
        return;
    });
    it("should return a valid user credits", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const credits = await client.user.getStudentCredits();
        expect(credits).toBe(user.credits);
        return;
    });
    it("should return valid user informations", async () => {
        const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
        const partialUser = await client.user.getAllStudentInfo();
        expect(partialUser.login).toBe(user.login);
        return;
    });
});
