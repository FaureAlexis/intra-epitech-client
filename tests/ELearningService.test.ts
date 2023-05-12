import EpitechClient from "../src";
import ElearningResponse, { Step } from "../src/types/ELearning";

describe("ELearningService", () => {
  test("should failed when using invalid cookie", (done) => {
    const client = new EpitechClient();
    client.elearning.setCookie("invalid");
    client.elearning.getELearning().catch((err: Error) => {
      expect(err.message).toBe("Request failed with status code 403");
      done();
    });
  }, 30000);
  test("should return valid elearning", (done) => {
    const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
    client.elearning.getELearning().then((elearning: ElearningResponse) => {
      expect(elearning).toBeInstanceOf(Object);
      expect(elearning).toHaveProperty("-2");
      expect(elearning["-2"]).toHaveProperty("modules");
      done();
    }).catch((err: Error) => {
      done(err);
    });
  }, 30000);
  test("should return valid elearning for a specific module", (done) => {
    const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
    client.elearning.getModuleVideos("B-NWP-400").then((module: Array<{ title: string; step: Step }> | null) => {
      expect(module).toBeInstanceOf(Array);
      expect(module?.length).toBeGreaterThan(0);
      done();
    }).catch((err: Error) => {
      done(err);
    });
  }, 30000);
  test("should return null for a non-existing module", (done) => {
    const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
    client.elearning.getModuleVideos("NO").then((module: Array<{ title: string; step: Step }> | null) => {
      expect(module).toBeNull();
      done();
    }).catch((err: Error) => {
      done(err);
    });
  }, 30000);
});
