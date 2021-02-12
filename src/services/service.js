import http from "../Http";

class Service {

  get(id) {
    return http.get(`/crawl/${id}`);
  }

  create(data) {
    return http.post("/crawl", data);
  }

}


export default new Service()