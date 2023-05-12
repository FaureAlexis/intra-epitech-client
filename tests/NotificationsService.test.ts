import EpitechClient from "../src";
import Notifications from "../src/types/Notification";

describe("NotificationsService", () => {
  it("should return valid notifications", (done) => {
    const client = new EpitechClient(process.env.EPITECH_COOKIE as string);
    client.notifications.getNotifications().then((notifications: Notifications) => {
      expect(notifications).toBeInstanceOf(Array);
      expect(notifications.length).toBeGreaterThan(0);
      expect(notifications[0]).toHaveProperty("title");
      expect(notifications[0]).toHaveProperty("content");
      expect(notifications[0]).toHaveProperty("date");
      expect(notifications[0]).toHaveProperty("id");
      done();
    }).catch((err: Error) => {
      done(err);
    });
  }, 30000);
});
