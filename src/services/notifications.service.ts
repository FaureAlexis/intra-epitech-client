import BaseService from "./base.service";
import Notifications from "../types/Notification";
import getAxiosConfig from "../utils/AxiosConfig";
import axios from "axios";

class NotificationsService extends BaseService {
  /**
   * Notifications object.
   * @type {Notifications | undefined}
   * @private
   */
  private notifications?: Notifications;

  /**
   * Creates an instance of NotificationsService.
   * @param {string} cookie - The cookie value.
   */
  constructor(cookie: string) {
    super(cookie);
  }

  /**
   * Retrieves the notifications.
   * @returns {Promise<Notifications>} A promise that resolves to the notifications object.
   * @throws {Error} If an error occurs during the API request.
   */
  async getNotifications() {
    const response = await axios.get(
      "https://intra.epitech.eu/user/notification/message?format=json",
      getAxiosConfig(this.cookie)
    );
    this.notifications = response.data;
    return response.data as Notifications;
  }
}

export default NotificationsService;
