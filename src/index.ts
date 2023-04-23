import UserService from './services/user.service';
import ELearningService from './services/elearning.service';
import PlanningService from './services/planning.service';
import NotificationsService from './services/notifications.service';

class EpitechClient {
  cookie: string;
  user: UserService;
  elearning: ELearningService;
  planning: PlanningService;
  notifications: NotificationsService;

  constructor(cookie: string) {
    if (!cookie) throw new Error('Cookie is required');
    if (!cookie.startsWith("user=")) {
      this.cookie = `user=${cookie}`;
    }
    this.cookie = cookie;
    this.user = new UserService(this.cookie);
    this.elearning = new ELearningService(this.cookie);
    this.planning = new PlanningService(this.cookie);
    this.notifications = new NotificationsService(this.cookie);
    this.testConnection().then((connected) => {
      if (!connected) throw new Error('Could not connect to Epitech Intranet. Please verify your cookie.');
      console.log('Connected to Epitech Intranet');
    }).catch((error) => {
      throw new Error('Could not connect to Epitech Intranet. Please verify your cookie.');
    })
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.user.getInfo();
      return true;
    } catch (error) {
      return false;
    }
  }

};




export default EpitechClient;
