type Step = {
  slugmodule: string;
  disabled: string;
  type: string;
  stepcode: string;
  last_view: null | string;
  titlestep: string;
  fullpath: string;
  current_language: string;
  available_language: string;
  srtpath: null | string;
  srtpath_fr: null | string;
  srtpath_en: null | string;
  srtpath_cn: null | string;
  current_language_srt: null | string;
  available_language_srt: string;
  forum_path: null | string;
  code: string;
};

type ModuleClass = {
  title: string;
  slug: string;
  type: string;
  disabled: string;
  steps: Array<{ title: string; step: Step }>;
};

type Module = {
  title: string;
  slug: string;
  classes: ModuleClass[];
};

type SemesterModules = {
  semester: number;
  modules: { [key: string]: Module };
};

type EpitechIntraResponse = {
  [key: string]: SemesterModules;
};

export { Step, ModuleClass, Module, SemesterModules};
export default EpitechIntraResponse;
