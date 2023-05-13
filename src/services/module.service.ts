/* eslint-disable no-useless-catch */
import BaseService from "./base.service";
import {Item} from "../types/Modules";
import axios from "axios";
import getAxiosConfig from "../utils/AxiosConfig";

class ModuleService extends BaseService {
  /**
   * Creates an instance of ModuleService.
   * @param {string} cookie - The cookie value.
   */
  constructor(cookie: string) {
    super(cookie);
  }

  /**
   * Retrieves the student modules for the current academic year.
   * @returns {Promise<Item[]>} A promise that resolves to an array of student modules.
   * @throws {Error} If an error occurs during the API request.
   */
  async getStudentModulesForCurrentYear() {
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
