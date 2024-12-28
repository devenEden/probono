import firebaseAuth from '@/firebase/firebaseAuth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { defineStore } from 'pinia'

const useAuthStore = defineStore('AuthStore', {
  state: () => ({
    currentUser: null,

    registeringUser: false,
    registerUserError: null,
    registeredUser: null,

    loggingIn: false,
    loginError: null,

    loggingOut: false,
    logoutError: null,

    gettingCurrentUser: false,
    currentUserError: null,
    authIsReady: false,
  }),
  actions: {
    setCurrentUser(user) {
      this.currentUser = user
    },
    setAuthIsReady(isReady) {
      this.authIsReady = isReady
    },
    setGettingCurrentUser(value) {
      this.gettingCurrentUser = value
    },
    async registerUser(data) {
      this.registeringUser = true
      this.registerUserError = null
      this.registeredUser = null
      await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
        .then((res) => {
          if (!res) {
            this.registerUserError = 'Connection Error, Please try again'
            return
          }
          this.registeredUser = res.user
        })
        .catch((err) => {
          this.registerUserError = err
          console.log(err)
        })
        .finally(() => {
          this.registeringUser = false
        })

      this.registeringUser = false
    },

    async loginUser(data) {
      this.loggingIn = true
      this.currentUser = null
      this.loginError = null

      await signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
        .then((res) => {
          if (!res) this.loginError = 'Connection Error, Please try again'

          this.currentUser = res.user
        })
        .catch((err) => {
          this.loginError = err?.error || err
        })
        .finally(() => {
          this.loggingIn = false
        })
    },

    async logoutUser() {
      this.loggingOut = true
      this.logoutError = null

      await signOut(firebaseAuth)
        .then(() => {
          this.currentUser = null
        })
        .catch((err) => {
          this.logoutError = err
        })
        .finally(() => {
          this.loggingOut = null
        })
    },
  },
})

export default useAuthStore
