import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Session, User } from "@supabase/supabase-js";

interface SessionUser {
  user: User;
  session: Session;
  lastUpdated: number;
}

// Solo lo que realmente necesitas para login
type SignInPayload = {
  user: User;
  session: Session;
};

type SessionState = SessionUser | null;

const initialState = null as SessionState;

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    signIn: (_, action: PayloadAction<SignInPayload>) => {
      return {
        ...action.payload,
        lastUpdated: Date.now(),
      };
    },

    signOut: () => null,

    refreshSession: (state, action: PayloadAction<Session | null>) => {
      if (state && action.payload) {
        state.session = action.payload;
        state.lastUpdated = Date.now();
      } else {
        return null; // si la sesión muere, matamos el estado
      }
    },
  },
});

export const { signIn, signOut, refreshSession } = sessionSlice.actions;
export default sessionSlice.reducer;