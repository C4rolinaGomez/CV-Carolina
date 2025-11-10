import {create} from 'zustand'

export const useEmail = create(set => ({
  email: '',
  setEmail: email => set({email}),
}))
