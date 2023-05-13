/* eslint-disable no-useless-catch */
import axios, { AxiosResponse } from "axios";
import BaseService from "./base.service";
import getAxiosConfig from "../utils/AxiosConfig";
import IUser from "../types/User";

class UserService extends BaseService {
  /**
   * User object.
   * @type {IUser | null}
   * @private
   */
  private user: IUser | null = null;

  /**
   * Creates an instance of UserService.
   * @param {string} cookie - The cookie value.
   */
  constructor(cookie: string) {
    super(cookie);
  }

  /**
   * Sets the user object.
   * @param {IUser | null} user - The user object to set.
   * @returns {void}
   */
  setUser(user: IUser | null) {
    this.user = user;
  }

  /**
   * Retrieves user information from the API.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the Axios response.
   */
  async getInfo() {
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

  /**
   * Retrieves static user information.
   * If the user information has not been fetched yet, it calls the API to fetch it.
   * @returns {Promise<IUser>} A promise that resolves to the static user information.
   */
  async getStaticInfos() {
    try {
      if (!this.user) {
        await this.getInfo();
      }
      return this.user as IUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the user's picture.
   * @returns {Promise<string>} A promise that resolves to the URL of the user's picture.
   * @throws {Error} If the user has no picture.
   */
  async getPicture() {
    try {
      const user = await this.getStaticInfos();
      if (!user.picture) throw new Error("User has no picture");
      return "https://intra.epitech.eu" + user.picture;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the user's full name.
   * @returns {Promise<string>} A promise that resolves to the user's full name.
   */
  async getStudentName() {
    try {
      const user = await this.getStaticInfos();
      return `${user.firstname} ${user.lastname}`;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the user's student year.
   * @returns {Promise<number>} A promise that resolves to the user's student year.
   * @throws {Error} If the user has no student year.
   */
  async getStudentYear() {
    try {
      const user = await this.getStaticInfos();
      if (!user.studentyear) {
        throw new Error("User has no student year");
      }
      return user.studentyear;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the user's promo.
   * @returns {Promise<number>} A promise that resolves to the user's promo.
   */
  async getStudentPromo() {
    try {
      const user = await this.getStaticInfos();
      return user.promo;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the user's location.
   * @returns {Promise<string>} A promise that resolves to the user's location.
   */
  async getStudentLocation() {
    try {
      const user = await this.getStaticInfos();
      return user.location;
    } catch (error) {
      throw error;
    }
  }

    /**
   * Retrieves the user's GPA.
   * @returns {Promise<string>} A promise that resolves to the user's GPA or "Unknown" if it is not available.
   */
  async getStudentGPA() {
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

  /**
   * Retrieves the user's cycle.
   * @returns {Promise<string>} A promise that resolves to the user's cycle or "Unknown" if it is not available.
   */
  async getStudentCycle() {
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

  /**
   * Retrieves the user's credits.
   * @returns {Promise<number>} A promise that resolves to the user's credits or 0 if it is not available.
   */
  async getStudentCredits() {
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

  /**
   * Retrieves the user's groups.
   * @returns {Promise<string[]>} A promise that resolves to an array of the user's group names or an empty array if there are no groups.
   */
  async getStudentGroups() {
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

  /**
   * Retrieves the user's internal email.
   * @returns {Promise<string>} A promise that resolves to the user's internal email.
   */
  async getStudentEmail() {
    try {
      const user = await this.getStaticInfos();
      return user.internal_email;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the user's phone number.
   * @returns {Promise<string>} A promise that resolves to the user's phone number.
   */
  async getStudentPhone() {
    try {
      const user = await this.getStaticInfos();
      return user.userinfo.telephone.value;
    } catch (error) {
      throw error;
    }
  }

    /**
   * Retrieves the user's Netsoul active status.
   * @returns {Promise<number>} A promise that resolves to the user's Netsoul active status.
   */
  async getStudentNetsoul() {
    try {
      const user = await this.getStaticInfos();
      return user.nsstat.active;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the user's Netsoul norm.
   * @returns {Promise<number>} A promise that resolves to the user's Netsoul norm.
   */
  async getStudentNetsoulNorm() {
    try {
      const user = await this.getStaticInfos();
      return user.nsstat.nslog_norm;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all available information about the student.
   * @returns {Promise<Partial<IUser>>} A promise that resolves to an object containing various student information.
   */
  async getAllStudentInfo() {
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
