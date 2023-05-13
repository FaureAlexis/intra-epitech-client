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

  setUser(user: IUser | null): void {
    this.user = user;
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
    try {
      if (!this.user) {
        await this.getInfo();
      }
      return this.user as IUser;
    } catch (error) {
      throw error;
    }
  }

  async getPicture(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      if (!user.picture) throw new Error("User has no picture");
      return "https://intra.epitech.eu" + user.picture;
    } catch (error) {
      throw error;
    }
  }

  async getStudentName(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      return `${user.firstname} ${user.lastname}`;
    } catch (error) {
      throw error;
    }
  }

  async getStudentYear(): Promise<number> {
    try {
      const user = await this.getStaticInfos();
      if (!user.studentyear) {
        throw new Error('User has no student year');
      }
      return user.studentyear;
    } catch (error) {
      throw error;
    }
  }

  async getStudentPromo(): Promise<number> {
    try {
      const user = await this.getStaticInfos();
      return user.promo;
    } catch (error) {
      throw error;
    }
  }

  async getStudentLocation(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      return user.location;
    } catch (error) {
      throw error;
    }
  }

  async getStudentGPA(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      if (user.gpa && user.gpa[0]) {
        return user.gpa[0].gpa;
      }
      return "Unknown";
    } catch (error) {
      throw error;
    }
  }

  async getStudentCycle(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      if (user && user.gpa && user.gpa.length > 0) {
        return user.gpa[0].cycle;
      }
      return "Unknown";
    } catch (error) {
      throw error;
    }
  }

  async getStudentCredits(): Promise<number> {
    try {
      const user = await this.getStaticInfos();
      if (!user.credits) {
        return 0;
      }
      return user.credits;
    } catch (error) {
      throw error;
    }
  }

  async getStudentGroups(): Promise<string[]> {
    try {
      const user = await this.getStaticInfos();
      if (!user.groups) {
        return [];
      }
      return user.groups.map((group) => group.name);
    } catch (error) {
      throw error;
    }
  }

  async getStudentEmail(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      return user.internal_email;
    } catch (error) {
      throw error;
    }
  }

  async getStudentPhone(): Promise<string> {
    try {
      const user = await this.getStaticInfos();
      return user.userinfo.telephone.value;
    } catch (error) {
      throw error;
    }
  }

  async getStudentNetsoul(): Promise<number> {
    try {
      const user = await this.getStaticInfos();
      return user.nsstat.active;
    } catch (error) {
      throw error;    }
  }

  async getStudentNetsoulNorm(): Promise<number> {
    try {
      const user = await this.getStaticInfos();
      return user.nsstat.nslog_norm;
    } catch (error) {
      throw error;
    }
  }

  async getAllStudentInfo(): Promise<Partial<IUser>> {
    try {
      const user = {
        picture: await this.getPicture(),
        studentyear: await this.getStudentYear(),
        promo: await this.getStudentPromo(),
        location: await this.getStudentLocation(),
        credits: await this.getStudentCredits(),
        login: await this.getStudentEmail(),
        netsoul: await this.getStudentNetsoul(),
        netsoulNorm: await this.getStudentNetsoulNorm(),
        gpaInt: await this.getStudentGPA(),
        cycle: await this.getStudentCycle(),
        phone: await this.getStudentPhone(),
      };
      return user;
    } catch (error) {
        throw error;
      }
  }
}


export default UserService;
