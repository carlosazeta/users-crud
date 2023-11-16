import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = [
  {
    id: '1',
    name: "Peter Doe",
    email: 'PeterDoe@gmail.com',
    github: 'peterdoe',
  },
  {
    id: '2',
    name: "Carlos Agundez",
    email: 'azetadev@gmail.com',
    github: 'carlosazeta',
  },
  {
    id: '3',
    name: "Peter Doe",
    email: 'PeterDoe@gmail.com',
    github: 'peterdoe',
  },
  {
    id: '4',
    name: "Peter Doe",
    email: 'PeterDoe@gmail.com',
    github: 'peterdoe',
  },
  {
    id: '5',
    name: "Peter Doe",
    email: 'PeterDoe@gmail.com',
    github: 'peterdoe',
  }
]

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    }
  }
})

export default usersSlice.reducer

export const { deleteUserById } = usersSlice.actions