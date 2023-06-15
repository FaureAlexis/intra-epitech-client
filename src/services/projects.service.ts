/* eslint-disable no-useless-catch */
import BaseService from "./base.service";
import axios from "axios";
import getAxiosConfig from "../utils/AxiosConfig";
import {Project, FileData} from "../types/Projects";

class ProjectService extends BaseService {
    /**
     * Get project information
     * @param {string} path - The path of the project (ex /2022/B-SEC-400/BDX-4-1/acti-587876)
     * @returns {Promise<Project>} A promise that resolves to the project information.
     * @throws {Error} If an error occurs during the API request.
     * If the project is not found.
    */
    async getProject(path: string): Promise<Project> {
        try {
            const response = await axios.get(
                `https://intra.epitech.eu/module${path}/?format=json`,
                getAxiosConfig(this.cookie)
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get project files
     * @param {string} path - The path of the project (ex /2022/B-SEC-400/BDX-4-1/acti-587876)
     * @returns {Promise<FileData[]>} A promise that resolves to the project information.
     * @throws {Error} If an error occurs during the API request.
     * If the project is not found.
    */
    async getProjectFiles(path: string): Promise<FileData[]> {
        try {
            const response = await axios.get(
                `https://intra.epitech.eu/module${path}/file/?format=json`,
                getAxiosConfig(this.cookie)
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ProjectService;