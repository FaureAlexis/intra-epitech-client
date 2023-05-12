import BaseService from "./base.service";
import Planning from "../types/Planning";
import getAxiosConfig from "../utils/AxiosConfig";
import axios, { AxiosResponse } from "axios";

class PlanningService extends BaseService {
  private planning?: Planning;
  constructor(cookie: string) {
    super(cookie);
  }

  async getWholePlanning(): Promise<Planning> {
    if (!this.planning) {
      const response: AxiosResponse = await axios.get(
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

  async getWeekPlanning(): Promise<Planning> {
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

  async getTodayPlanning(): Promise<Planning> {
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
