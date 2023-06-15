interface Project {
    scolaryear: string;
    codemodule: string;
    codeinstance: string;
    codeacti: string;
    instance_location: string;
    module_title: string;
    id_activite: string;
    project_title: string;
    type_title: string;
    type_code: string;
    register: boolean;
    register_by_bloc: string;
    register_prof: string;
    nb_min: number;
    nb_max: number;
    begin: string;
    end: string;
    end_register: string;
    deadline: string;
    is_rdv: boolean;
    instance_allowed: string;
    title: string;
    description: string;
    closed: boolean;
    over: number;
    over_deadline: number;
    date_access: boolean;
    instance_registered: string;
    user_project_status: string;
    root_slug: string;
    forum_path: null | string;
    slug: string;
    call_ihk: string;
    nb_notes: number;
    user_project_master: string;
    user_project_code: string;
    user_project_title: string;
    registered_instance: number;
    registered: {
      id: string;
      title: string;
      code: string;
      final_note: null | number;
      repository: null | string;
      closed: boolean;
      master: {
        login: string;
        date_ins: string;
        date_modif: null | string;
        status: string;
        picture: string;
        title: string;
      };
      members: {
        login: string;
        date_ins: string;
        date_modif: null | string;
        status: string;
        picture: string;
        title: string;
      }[];
    }[];
    notregistered: {
      login: string;
      picture: string;
      title: string;
      location: null | string;
      promo: number;
      course_code: string;
      grade: null | string;
      cycle: string;
      date_ins: string;
      credits: number;
      flags: string[];
      semester: string;
    }[];
    urls: {
      notation: boolean;
      title: string;
      link: string;
    }[];
}

interface FileData {
    type: string;
    slug: string;
    title: string;
    secure: boolean;
    synchro: boolean;
    archive: boolean;
    language: string;
    size: number;
    ctime: string;
    mtime: string;
    mime: string;
    isLeaf: boolean;
    noFolder: boolean;
    rights: {
      ged_read: number;
      ged_write: number;
    };
    modifier: {
      login: string;
      title: string;
      picture: string;
    };
    fullpath: string;
}

export { Project, FileData } ;