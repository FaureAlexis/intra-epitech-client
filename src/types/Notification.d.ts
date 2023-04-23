interface Notification {
  id: string;
  title: string;
  class: string;
  user: {
    picture: string;
    title: string;
    url: string;
  };
  content: string;
  date: string;
}

type Notifications = Notification[];

export default Notifications;
