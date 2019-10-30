import axios from "axios";
import { API_URL } from "../env.js";

class DeputyService {
  getAll() {
    const http = axios.create({
      baseURL: "https://cors-anywhere.herokuapp.com/" + API_URL
    });

    return http.get("/diputados/").catch(error => {
      console.log(error);
      return false;
    });
  }

  getById(deputy_id) {
    const http = axios.create({
      baseURL: "https://cors-anywhere.herokuapp.com/" + API_URL
    });

    return http.get(`/diputados/${deputy_id}`).catch(error => {
      console.log(error);
      return false;
    });
  }
  getVotaciones(deputy_id) {
    const http = axios.create({
      baseURL: "https://cors-anywhere.herokuapp.com/" + API_URL
    });

    return http.get(`/diputados/${deputy_id}/votaciones`).catch(error => {
      console.log(error);
      return false;
    });
  }
  getAsistencia(deputy_id) {
    const http = axios.create({
      baseURL: "https://cors-anywhere.herokuapp.com/" + API_URL
    });

    return http.get(`/diputados/${deputy_id}/asistencia`).catch(error => {
      console.log(error);
      return false;
    });
  }
}

export const deputyService = new DeputyService();
