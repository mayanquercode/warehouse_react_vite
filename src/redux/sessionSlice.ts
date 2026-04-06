import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Session, User } from '@supabase/supabase-js'

interface SessionUser {
  user: User
  session: Session
}

type SessionState = SessionUser | null

const initialState: SessionState = null

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signOut: () => {
      return null
    },
    signIn: (_, action: PayloadAction<SessionUser>) => {
      return action.payload
    }
  }
})

export const { signIn, signOut } = sessionSlice.actions
export default sessionSlice.reducer
