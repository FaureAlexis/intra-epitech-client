import BaseService from "./base.service";
import Planning from "../types/Planning";
import getAxiosConfig from "../utils/AxiosConfig";
import axios, { AxiosResponse } from "axios";

class PlanningService extends BaseService {
  /**
   * Planning object.
   * @type {Planning | undefined}
   * @private
   */
  private planning?: Planning;

  /**
   * Creates an instance of PlanningService.
   * @param {string} cookie - The cookie value.
   */
  constructor(cookie: string) {
    super(cookie);
  }

  /**
   * Retrieves the whole planning.
   * If the planning has not been fetched yet, it calls the API to fetch it.
   * @returns {Promise<Planning>} A promise that resolves to the whole planning.
   */
  async getWholePlanning() {
    if (!this.planning) {
      const response = await axios.get(
        "https://intra.epitech.eu/planning/load?format=json",
        getAxiosConfig(this.cookie)
      );
      if (!response.data.length) {
        return [] as Planning;
      }
      this.planning = response.data;
    }
    return this.planning as Planning;
  }

  /**
   * Retrieves the planning for the current week.
   * @returns {Promise<Planning>} A promise that resolves to the planning for the current week.
   */
  async getWeekPlanning() {
    const today = new Date();
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1))
      .toISOString().split('T')[0];
    const sunday = new Date(today.setDate(today.getDate() - today.getDay() + 7))
      .toISOString().split('T')[0];
    const response = await axios.get(
      `https://intra.epitech.eu/planning/load?format=json&start=${monday}&end=${sunday}`,
      getAxiosConfig(this.cookie)
    );
    if (!response.data.length) {
      return [] as Planning;
    }
    return response.data as Planning;
  }

  /**
   * Retrieves the planning for today.
   * @returns {Promise<Planning>} A promise that resolves to the planning for today.
   */
  async getTodayPlanning() {
    const today = new Date().toISOString().split('T')[0];
    const response = await axios.get(
      `https://intra.epitech.eu/planning/load?format=json&start=${today}&end=${today}`,
      getAxiosConfig(this.cookie)
    );
    if (!response.data.length) {
      return [] as Planning;
    }
    return response.data as Planning;
  }
}

export default PlanningService;
