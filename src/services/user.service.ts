/* eslint-disable no-useless-catch */
import axios, { AxiosResponse } from "axios";
import BaseService from "./base.service";
import getAxiosConfig from "../utils/AxiosConfig";
import IUser from "../types/User";

class UserService extends BaseService {
  private user: IUser | null = null;

  constructor(cookie: string) {
    super(cookie);
  }

  async getInfo(): Promise<AxiosResponse> {
    try {
      const response = await axios.get(
        "https://intra.epitech.eu/user/?format=json",
        getAxiosConfig(this.cookie)
      );
      this.user = response.data;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getStaticInfos(): Promise<IUser> {
    if (!this.user) {
      await this.getInfo();
    }
    return this.user as IUser;
  }

  async getPicture(): Promise<string> {
    const user = await this.getStaticInfos();
    if (!user.picture) throw new Error("User has no picture");
    return user.picture;
  }

  async getStudentName(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      return `${user.firstname} ${user.lastname}`;
    } catch (error) {
      return 'Anonymous user';
    }
  }

  async getStudentYear(): Promise<number> {
    const user = await this.getStaticInfos();
    if (!user) {
      throw new Error('Could not find user');
    }
    if (!user.studentyear) {
      throw new Error('User has no student year');
    }
    return user.studentyear;
  }

  async getStudentPromo(): Promise<number> {
    try {
      const user = await this.getStaticInfos();
      return user.promo;
    } catch (error) {
      throw new Error('Could not get user promo');
    }
  }

  async getStudentLocation(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      return user.location;
    } catch (error) {
      throw new Error('Failed to get student location');
    }
  }

  async getStudentGPA(): Promise<string> {
    const user = await this.getStaticInfos();
    if (user.gpa && user.gpa[0]) {
      return user.gpa[0].gpa;
    }
    else {
      throw new Error('GPA not found');
    }
  }

  async getStudentCycle(): Promise<string> {
    const user = await this.getStaticInfos();
    if (user && user.gpa && user.gpa.length > 0) {
      return user.gpa[0].cycle;
    }
    return "Unknown";
  }

  async getStudentCredits(): Promise<number> {
    const user = await this.getStaticInfos();
    if (!user) {
      throw new Error('Could not find user');
    }
    if (!user.credits) {
      return 0;
    }
    return user.credits;
  }

  async getStudentGroups(): Promise<string[]> {
    const user = await this.getStaticInfos();
    if (!user.groups) {
      return [];
    }
    return user.groups.map((group) => group.name);
  }

  async getStudentEmail(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      return user.internal_email;
    } catch (error) {
      console.error(error);
      return 'No email found';
    }
  }

  async getStudentPhone(): Promise<string> {
    const user = await this.getStaticInfos();
    if (user.userinfo.telephone && user.userinfo.telephone.value) {
      return user.userinfo.telephone.value;
    } else {
      throw new Error("Missing phone number");
    }
  }

  async getStudentNetsoul(): Promise<number> {
    try {
      const user = await this.getStaticInfos();
      return user.nsstat.active;
    } catch (e) {
      throw new Error(`Unable to get netsoul status: ${e}`);
    }
  }

  async getStudentNetsoulNorm(): Promise<number> {
    try {
      const user = await this.getStaticInfos();
      return user.nsstat.nslog_norm;
    } catch (e) {
      throw new Error('Unable to retrieve the netsoul statistics');
    }
  }
}


export default UserService;
