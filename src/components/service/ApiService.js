import axios from "axios";

const baseUrl = "http://localhost:1992";

class ApiService {
  static patientRegPost(data) {
    return axios.post(baseUrl + "/patient", data);
  }

  static login(data) {
    return axios.post(baseUrl + "/login", data);
  }

  static appointmentList() {
    const encodedUrl = encodeURI(baseUrl + "/appointments");
    return axios.get(encodedUrl);
  }
}

export default ApiService;
