import BaseService from "./base.service";
import Notifications from "../types/Notification";
import getAxiosConfig from "../utils/AxiosConfig";
import axios from "axios";

class NotificationsService extends BaseService {
  private notifications?: Notifications;
  constructor(cookie: string) {
    super(cookie);
  }

  async getNotifications(): Promise<Notifications> {
    const response = await axios.get(
      "https://intra.epitech.eu/user/notification/message?format=json",
      getAxiosConfig(this.cookie)
    );
    this.notifications = response.data;
    return response.data as Notifications;
  }
}

export default NotificationsService;
