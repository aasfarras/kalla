import axios from "axios";

export const changePassword = async (serviceData, callback) => {
  try {
    const token = localStorage.getItem("token"); // Pastikan token diambil dengan benar
    const response = await axios.put(
      "https://api.agang-toyota.my.id/api/customer/change-password",
      {
        old_password: serviceData.old_password,
        password: serviceData.password,
        password_confirmation: serviceData.password_confirmation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token otentikasi jika diperlukan
        },
      }
    );
    callback(response.data.data);
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};
