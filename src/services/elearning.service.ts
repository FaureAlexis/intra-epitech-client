/* eslint-disable no-useless-catch */
/* eslint-disable no-prototype-builtins */
import BaseService from "./base.service";
import ELearningResponse, { Step } from "../types/ELearning";
import getAxiosConfig from "../utils/AxiosConfig";
import axios, { AxiosResponse } from "axios";

class ELearningService extends BaseService {
  private elearning: ELearningResponse | null = null;

  constructor(cookie: string) {
    super(cookie);
  }

  async getInfo(): Promise<AxiosResponse> {
    try {
      const response = await axios.get(
        "https://intra.epitech.eu/e-learning/?format=json",
        getAxiosConfig(this.cookie)
      );
      this.elearning = response.data;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getStaticInfos(): Promise<ELearningResponse> {
    if (!this.elearning) {
      await this.getInfo();
    }
    return this.elearning as ELearningResponse;
  }

  async getELearning(): Promise<ELearningResponse> {
    return await this.getStaticInfos();
  }

    /**
   * Returns the videos for a given module.
   * @param moduleName The name of the module.
   * @returns The videos for the given module or null if the module does not exist.
   */

  async getModuleVideos(moduleName: string): Promise<Array<{ title: string; step: Step }> | null> {
    const modules = await this.getStaticInfos();
    for (const semesterIndex in modules) {
      const semester = modules[semesterIndex];
      if (semester.modules.hasOwnProperty(moduleName)) {
        const module = semester.modules[moduleName];
        if (module.classes.length > 0) {
          return module.classes[0].steps;
        }
      }
      }
    return null;
  }
}

export default ELearningService;
