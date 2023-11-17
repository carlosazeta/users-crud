import { type Middleware, configureStore } from "@reduxjs/toolkit";
import usersReducer, {rollbackUser} from './users/slice'
import { toast } from "sonner";

const persistanceMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action
  const previousState = store.getState()

  if( type === 'users/deleteUserById') {
    const userToRemove = previousState.users.find(user => user.id === payload)

    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      method: 'DELETE'
    })
      .then(res => {
        if(res.ok) {
          toast.success(`User ${payload} delete correctly`)
        }
      })
      .catch(err => {
        toast.error(`Error deleting user ${payload}`)
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        console.log(err)
      })
  }

  next(action)
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: [persistanceMiddleware, syncWithDatabaseMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch