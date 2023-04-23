interface IUser {
  login: string;
  title: string;
  internal_email: string;
  lastname: string;
  firstname: string;
  userinfo: {
    telephone: {
      value: string;
      adm: boolean;
      public: boolean;
    };
  };
  referent_used: boolean;
  picture: string | null;
  picture_fun: string | null;
  scolaryear: string;
  promo: number;
  semester: number;
  location: string;
  documents: string;
  userdocs: string | null;
  shell: string | null;
  close: boolean;
  ctime: string;
  mtime: string;
  id_promo: string;
  id_history: string;
  course_code: string;
  semester_code: string;
  school_id: string;
  school_code: string;
  school_title: string;
  old_id_promo: string;
  old_id_location: string;
  rights: Record<string, unknown>;
  invited: boolean;
  studentyear: number;
  admin: boolean;
  editable: boolean;
  restrictprofiles: boolean;
  groups: {
    title: string;
    name: string;
    count: number;
  }[];
  events: unknown[];
  credits: number;
  gpa: {
    gpa: string;
    cycle: string;
  }[];
  nsstat: {
    active: number;
    idle: number;
    out_active: number;
    out_idle: number;
    nslog_norm: number;
  };
}

export default IUser;
