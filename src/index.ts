import UserService from './services/user.service';
import ELearningService from './services/elearning.service';
import PlanningService from './services/planning.service';
import NotificationsService from './services/notifications.service';
import * as dotenv from 'dotenv';

dotenv.config();

class EpitechClient {
  cookie: string;
  user: UserService;
  elearning: ELearningService;
  planning: PlanningService;
  notifications: NotificationsService;

  constructor(cookie?: string) {
    if (!cookie && !process.env.EPITECH_COOKIE) throw new Error('Cookie is required');
    if (cookie && !cookie.startsWith("user=")) {
      throw new Error("Could not connect to Epitech Intranet. Please verify your cookie.");
    } else if (cookie) {
      this.cookie = cookie;
    } else {
      if (!process.env.EPITECH_COOKIE) throw new Error('Cookie is required');
      this.cookie = process.env.EPITECH_COOKIE as string;
    }
    this.user = new UserService(this.cookie);
    this.elearning = new ELearningService(this.cookie);
    this.planning = new PlanningService(this.cookie);
    this.notifications = new NotificationsService(this.cookie);
    this.testConnection().then((connected) => {
      if (!connected) throw new Error('Could not connect to Epitech Intranet. Please verify your cookie.');
    }).catch((error) => {
      console.error(error);
      throw new Error('Could not connect to Epitech Intranet. Please verify your cookie.');
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.user.getInfo();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default EpitechClient;
