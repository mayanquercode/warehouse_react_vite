import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Session, User } from "@supabase/supabase-js";

interface SessionUser {
  user: User;
  session: Session;
  lastUpdated: number; // Para tracking
}

type SessionState = SessionUser | null;

const initialState: SessionState = null;

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    signIn: (_, action: PayloadAction<SessionUser>) => {
      return {
        ...action.payload,
        lastUpdated: Date.now(),
      };
    },
    signOut: () => {
      return null;
    },
    refreshSession: (state, action: PayloadAction<Session>) => {
      if (state) {
        state.session = action.payload;
        state.lastUpdated = Date.now();
      }
    },
  },
});

export const { signIn, signOut, refreshSession } = sessionSlice.actions;
export default sessionSlice.reducer;
