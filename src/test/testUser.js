import AuthService from "../services/AuthService";
import SessionService from "../services/SessionService";

export const testUser = async () => {

  console.log("========== TEST USER ==========");

  try {

    // REGISTER
    const id = await AuthService.register({

      full_name: "Septi",

      email: "septi@gmail.com",

      password: "123456",

      phone: "08123456789",

    });

    console.log("✅ Register berhasil");
    console.log("User ID :", id);

  } catch (e) {

    console.log("⚠️ Register :", e.message);

  }

  try {

    // LOGIN
    const user = await AuthService.login(

      "septi@gmail.com",

      "123456"

    );

    console.log("✅ Login berhasil");

    console.log(user);

  } catch (e) {

    console.log(e.message);

  }

  console.log(" ");

  console.log("Current User");

  console.log(SessionService.getCurrentUser());

  console.log(" ");

  console.log("Status Login");

  console.log(SessionService.isLogin());

  AuthService.logout();

  console.log(" ");

  console.log("Setelah Logout");

  console.log(SessionService.isLogin());

};