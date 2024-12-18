import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const user_id = ref(null);
  const role = ref(null);
  const authenticated = ref(false); // Track authentication status

  async function login(credentials) {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );

      const { user } = response.data;
      user_id.value = user.user_id;
      role.value = user.role;
      authenticated.value = true;
      console.log("USERID: ", user_id.value);
    } catch (error) {
      this.logout();
      throw { message: "Login failed!, either incorrect password or email!" };
    }
  }

  async function checkSession() {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/check-session"
      );
      if (response.data.authenticated) {
        user_id.value = response.data.user.user_id;
        role.value = response.data.user.role;
        authenticated.value = true;
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }

  function logout() {
    user_id.value = null;
    role.value = null;
    authenticated.value = false;
    axios.post("http://localhost:3000/auth/logout");
  }

  return { user_id, role, authenticated, login, checkSession, logout };
});
