import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface AuthState {
  user: User | null;
  token: string | null;
}

let storedUser: User | null = null;
const rawUser = localStorage.getItem("user");

try {
  storedUser = rawUser ? JSON.parse(rawUser) : null;
} catch (error) {
  console.warn("Geçersiz user JSON verisi:", rawUser);
  storedUser = null;
}

interface LoginPayload {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: storedUser,
  token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { user, token } = action.payload;

      // Gelen verinin kontrolü
      if (!user || !user.id || !token) {
        console.error("Invalid login data:", action.payload);
        return;
      }

      state.user = user;
      state.token = token;

      try {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("LocalStorage error:", error);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
