/* eslint-disable no-useless-catch */
/* eslint-disable no-prototype-builtins */
import BaseService from "./base.service";
import ELearningResponse, { Step } from "../types/ELearning";
import getAxiosConfig from "../utils/AxiosConfig";
import axios, { AxiosResponse } from "axios";

/**
 * Service class for e-learning functionality.
 * Extends the BaseService class.
 */
class ELearningService extends BaseService {
  /**
   * E-Learning response object.
   * @type {ELearningResponse | null}
   * @private
   */
  private elearning: ELearningResponse | null = null;

  /**
   * Creates an instance of ELearningService.
   * @param {string} cookie - The cookie value.
   */
  constructor(cookie: string) {
    super(cookie);
  }

  /**
   * Retrieves information from the e-learning API.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the Axios response object.
   * @throws {Error} If an error occurs during the API request.
   */
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

  /**
   * Retrieves the static information from the e-learning API.
   * If the information has not been fetched yet, it calls the getInfo() method.
   * @returns {Promise<ELearningResponse>} A promise that resolves to the ELearningResponse object.
   */
  async getStaticInfos(): Promise<ELearningResponse> {
    if (!this.elearning) {
      await this.getInfo();
    }
    return this.elearning as ELearningResponse;
  }

  /**
   * Retrieves the e-learning information (all modules).
   * Alias for getStaticInfos().
   * @returns {Promise<ELearningResponse>} A promise that resolves to the ELearningResponse object.
   */
  async getELearning(): Promise<ELearningResponse> {
    return await this.getStaticInfos();
  }

  /**
   * Retrieves the videos for a given module.
   * @param {string} moduleName - The name of the module.
   * @returns {Promise<Array<{ title: string; step: Step }> | null>} A promise that resolves to an array of videos for the given module,
   * or null if the module does not exist.
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
