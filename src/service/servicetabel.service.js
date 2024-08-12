import axios from "axios";

export const getTabel = (callback) => {
  const token = localStorage.getItem("token"); // Asumsikan token disimpan di localStorage

  axios
    .get("https://api.agang-toyota.my.id/api/customer/service", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.error("Error fetching vehicle data:", err);
    });
};
