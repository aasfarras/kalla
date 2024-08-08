import axios from "axios";

export const getDelivery = (callback) => {
  const token = localStorage.getItem("token"); // Asumsikan token disimpan di localStorage

  axios
    .get("https://api.agang-toyota.my.id/api/customer/vehicle", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.error("Error fetching delivery data:", err);
    });
};
