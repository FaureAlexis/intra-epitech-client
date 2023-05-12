/* eslint-disable no-useless-catch */
import BaseService from "./base.service";
import {Item} from "../types/Modules";
import axios from "axios";
import getAxiosConfig from "../utils/AxiosConfig";

class ModuleService extends BaseService {
  constructor(cookie: string) {
    super(cookie);
  }

  async getStudentModulesForCurrentYear(): Promise<Item[]> {
    try {
      let scolaryear = new Date().getFullYear();
      if (new Date().getMonth() < 8) {
        scolaryear--;
      }
      const response = await axios.get(
        `https://intra.epitech.eu/course/filter?format=json&location=FR/BDX&course=bachelor/classic&scolaryear=${scolaryear}`,
        getAxiosConfig(this.cookie)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ModuleService;

