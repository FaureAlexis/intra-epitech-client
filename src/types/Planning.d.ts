interface Course {
  scolaryear: string;
  codemodule: string;
  codeinstance: string;
  codeacti: string;
  codeevent: string;
  semester: number;
  instance_location: string;
  titlemodule: string;
  prof_inst: {
    type: string;
    login: string;
    title: string;
    picture: string;
  }[];
  acti_title: string;
  num_event: number;
  start: string;
  end: string;
  total_students_registered: number;
  title: string | null;
  type_title: string;
  type_code: string;
  is_rdv: string;
  nb_hours: string;
  allowed_planning_start: string;
  allowed_planning_end: string;
  nb_group: number;
  nb_max_students_projet: number | null;
  room: {
    code: string;
    type: string;
    seats: number;
  };
  dates: string[] | null;
  module_available: boolean;
  module_registered: boolean;
  past: boolean;
  allow_register: boolean;
  event_registered: boolean;
  display: string;
  project: boolean;
  rdv_group_registered: string | null;
  rdv_indiv_registered: string | null;
  allow_token: boolean;
  register_student: boolean;
  register_prof: boolean;
  register_month: boolean;
  in_more_than_one_month: boolean;
}

type Planning = Course[];

export default Planning;
