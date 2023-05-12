interface Item {
  id: number;
  title_cn: string | null;
  semester: number;
  num: string;
  begin: string;
  end: string;
  end_register: string;
  scolaryear: number;
  code: string;
  codeinstance: string;
  location_title: string;
  instance_location: string;
  flags: string;
  credits: string;
  rights: string[];
  status: string;
  waiting_grades: null;
  active_promo: string;
  open: string;
  title: string;
}

interface PreloadItem extends Array<number | string> {
  0: number;
  1: number;
  2: string;
  3: string;
  4: string;
}

interface Data {
  preload: PreloadItem[];
  items: Item[];
}

export default ModuleResponse = Data;
export { Item };
