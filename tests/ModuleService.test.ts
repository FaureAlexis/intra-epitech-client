import EpitechClient from "../src";
import { Item } from "../src/types/Modules";

describe("ModuleService", () => {
  test("should failed when using invalid cookie", (done) => {
    const client = new EpitechClient();
    client.modules.setCookie("invalid");
    client.modules.getStudentModulesForCurrentYear().catch((err: Error) => {
      expect(err.message).toBe("Request failed with status code 403");
      done();
    });
  }, 30000);
  test("should return valid modules", (done) => {
    const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
    client.modules.getStudentModulesForCurrentYear().then((modules: Item[]) => {
      expect(modules).toBeInstanceOf(Array);
      expect(modules.length).toBeGreaterThan(0);
      expect(modules[0]).toHaveProperty("title_cn");
      expect(modules[0]).toHaveProperty("semester");
    }).catch((err: Error) => {
      done(err);
    }
    ).finally(() => {
      done();
    });
  }, 30000);
});
