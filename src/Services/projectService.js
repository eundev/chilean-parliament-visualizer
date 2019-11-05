import axios from "axios";
import { API_URL } from "../env.js";

class ProjectsService {
  getAll() {
    const http = axios.create({
      baseURL: "https://cors-anywhere.herokuapp.com/" + API_URL
    });

    return http.get("/proyectos/").catch(error => {
      console.log(error);
      return false;
    });
  }

  getById(project_id) {
    const http = axios.create({
      baseURL: "https://cors-anywhere.herokuapp.com/" + API_URL
    });

    return http.get(`/proyectos/${project_id}`).catch(error => {
      console.log(error);
      return false;
    });
  }

  getByAuthor(deputy_id) {
    const http = axios.create({
      baseURL: "https://cors-anywhere.herokuapp.com/" + API_URL
    });

    return http.get(`/proyectos/by_author/${deputy_id}/`).catch(error => {
      console.log(error);
      return false;
    });
  }
}

export const projectService = new ProjectsService();
