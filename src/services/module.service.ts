/* eslint-disable no-useless-catch */
import BaseService from "./base.service";
import {Item} from "../types/Modules";
import axios from "axios";
import getAxiosConfig from "../utils/AxiosConfig";

class ModuleService extends BaseService {
  private currentYear: number = 0;
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
  async getStudentModulesForCurrentYear(): Promise<Item[]> {
    try {
      let scolaryear = new Date().getFullYear();
      if (new Date().getMonth() < 8) {
        scolaryear--;
      }
      this.currentYear = scolaryear;
      const response = await axios.get(
        `https://intra.epitech.eu/course/filter?format=json&location=FR/BDX&course=bachelor/classic&scolaryear=${scolaryear}`,
        getAxiosConfig(this.cookie)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieve the module informations.
   * @param {string} codeModule - The module code.
   * @param {string} codeInstance - The module instance code.
   * @returns {Promise<Item>} A promise that resolves to the module informations.
   * @throws {Error}
   * If an error occurs during the API request.
   * If the module is not found.
   * If the module is not a student module.
    */
  async getModule(codeModule: string, codeInstance: string): Promise<Item> {
    if (!this.currentYear) {
      this.currentYear = new Date().getFullYear();
      if (new Date().getMonth() < 8) {
        this.currentYear--;
      }
    }

    try {
      const response = await axios.get(
        `https://intra.epitech.eu/module/${this.currentYear}/${codeModule}/${codeInstance}/?format=json`,
        getAxiosConfig(this.cookie)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ModuleService;
