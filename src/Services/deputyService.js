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
  getVotes(deputy_id) {
    const http = axios.create({
      baseURL: "https://cors-anywhere.herokuapp.com/" + API_URL
    });

    return http.get(`/diputados/${deputy_id}/votos`).catch(error => {
      console.log(error);
      return false;
    });
  }
  getAttendance(deputy_id) {
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
