import EpitechClient from "../src";
import Planning from "../src/types/Planning";

describe("PlanningService", () => {
  test("should failed when using invalid cookie", (done) => {
    const client = new EpitechClient();
    client.planning.setCookie("invalid");
    client.planning.getTodayPlanning().catch((err: Error) => {
      expect(err.message).toBe("Request failed with status code 403");
      done();
    });
  }, 30000);
  test("should return valid planning for today", (done) => {
    const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
    client.planning.getTodayPlanning().then((planning: Planning) => {
      expect(planning).toBeInstanceOf(Array);
      //handle if we are week-end, dont check the size of the array in this case
      const currentDay = new Date().getDay();
      if (currentDay === 0 || currentDay === 6) {
        done();
        return;
      }
      expect(planning.length).toBeGreaterThan(0);
      expect(planning[0]).toHaveProperty("scolaryear");
      expect(planning[0]).toHaveProperty("semester");
    }).catch((err: Error) => {
      done(err);
    }).finally(() => {
      done();
    });
  }, 30000);
  test("should return valid planning for the whole year", (done) => {
    const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
    client.planning.getWholePlanning().then((planning: Planning) => {
      expect(planning).toBeInstanceOf(Array);
      expect(planning.length).toBeGreaterThan(0);
      expect(planning[0]).toHaveProperty("scolaryear");
      expect(planning[0]).toHaveProperty("semester");
    }).catch((err: Error) => {
      done(err);
    }).finally(() => {
      done();
    });
  }, 30000);
  test("should return valid planning for the week", (done) => {
    const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
    client.planning.getWeekPlanning().then((planning: Planning) => {
      expect(planning).toBeInstanceOf(Array);
      expect(planning.length).toBeGreaterThan(0);
      expect(planning[0]).toHaveProperty("scolaryear");
      expect(planning[0]).toHaveProperty("semester");
    }).catch((err: Error) => {
      done(err);
    }).finally(() => {
      done();
    });
  }, 30000);
});
