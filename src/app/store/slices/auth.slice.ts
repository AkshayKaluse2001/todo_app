import { auth } from "@/app/firebase";
import { AuthState, User } from "@/app/types/todoType";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";

const initialState: AuthState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,
  loading: false,
  error: null,
};

const setUserInCookies = (user: User) => {
  Cookies.set("user", JSON.stringify(user));
};

const removeUserFromCookies = () => {
  Cookies.remove("user");
};

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = { email: user.email, uid: user.uid };
      setUserInCookies(userData);
      return userData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = { email: user.email, uid: user.uid };
      setUserInCookies(userData);
      return userData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Login with Google
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = { email: user.email, uid: user.uid };
      setUserInCookies(userData);
      return userData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      removeUserFromCookies();
    },
    getCurrentUser(state) {
      const storedUser = Cookies.get("user");
      if (storedUser) {
        state.user = JSON.parse(storedUser);
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        toast.success("User Login Successfull");
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })

      // Login with Google
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        toast.success("User Login Successfull");
      })
      .addCase(loginWithGoogle.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { logout, getCurrentUser, clearError } = authSlice.actions;

export default authSlice.reducer;
