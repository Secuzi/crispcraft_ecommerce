import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const role = ref(null);
  const authenticated = ref(false); // Track authentication status

  async function login(username, password) {
    try {
      const response = await axios.post("/auth/login", { username, password });
      user.value = response.data.user;
      role.value = response.data.role;
      authenticated.value = true;
    } catch (error) {
      this.logout();
      throw new Error("Login failed");
    }
  }

  async function checkSession() {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/check-session"
      );
      if (response.data.authenticated) {
        user.value = response.data.user;
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
    user.value = null;
    role.value = null;
    authenticated.value = false;
    axios.post("http://localhost:3000/auth/logout");
  }

  return { user, role, authenticated, login, checkSession, logout };
});
