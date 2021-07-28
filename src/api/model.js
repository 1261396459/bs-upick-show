import { client } from "@/api/base";

export const model = {
  apiUrl: "/model",
  create(data) {
    return client.post(this.apiUrl, data);
  },

  del(id) {
    return client.delete(this.apiUrl + id);
  },

  update(id, data) {
    return client.put(this.apiUrl + id, data);
  },

  read(id) {
    return client.get(this.apiUrl + "/list/" + id);
  }
};
