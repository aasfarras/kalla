import axios from "axios";

export const getTest = (callback) => {
  const token = localStorage.getItem("token"); // Asumsikan token disimpan di localStorage

  axios
    .get("https://api.agang-toyota.my.id/api/admin/vehicle/22", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.error("Error fetching Test data:", err);
    });
};
