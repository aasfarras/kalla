import axios from "axios";

export const getDashboard = async (callback) => {
  const token = localStorage.getItem("token"); // Pastikan token diambil dengan benar

  axios
    .get("https://api.agang-toyota.my.id/api/customer/other/questionnaire", {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token otentikasi jika diperlukan
      },
    })
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.error("Error fetching dashboard data:", err);
    });
};
