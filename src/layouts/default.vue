<template>
  <v-app id="inspire">
    <v-dialog v-model="dialogOpen" max-width="500">
      <v-card title="Logout">
        <v-card-text>
          Are you sure you want to leave?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Confirm"
            @click="logout"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn @click="handleAuth">
        <v-row align="center">
          <v-icon>{{ isUserLoggedIn ? 'mdi-logout' : 'mdi-login' }}</v-icon>
          <v-col>
            <v-list-item-title>{{ isUserLoggedIn ? 'Logout' : 'Login' }}</v-list-item-title>
          </v-col>
        </v-row>
      </v-btn>
      <v-btn @click="toggleDarkMode" class="ml-3">
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list>
        <v-list-item v-for="item in drawerList" :key="item.title" link :to="item.to">
          <v-row align="center">
            <v-col cols="auto">
              <v-icon>{{ item.icon }}</v-icon>
            </v-col>
            <v-col>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="bg-grey-lighten-2">
      <router-view/>
      <app-footer/>
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from 'vue'

const drawer = ref(null)
</script>

<script>
import {useAppStore} from "../stores/app";
import axios from "axios";
import {toast} from "vue3-toastify";

const store = useAppStore();

export default {
  data: () => ({
    drawer: null,
    darkMode: localStorage.getItem('theme') === 'dark',
    title: 'Library',
    drawerList: [
      {title: 'Home', icon: 'mdi-home', to: '/home'},
      {title: 'Books', icon: 'mdi-book', to: '/books'},
      {title: 'Account', icon: 'mdi-account', to: '/account'},
    ],
    isUserLoggedIn: false,
    dialogOpen: false,
  }),
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light')
      this.$vuetify.theme.global.name = this.darkMode ? 'dark' : 'light'
    },
    handleAuth() {
      this.isUserLoggedIn ? this.openDialog() : this.$router.push('/login');
    },
    openDialog() {
      this.dialogOpen = true;
    },
    logout() {
      axios.defaults.withCredentials = true;
      axios.get('sessions/logout')
        .then(() => {
          this.dialogOpen = false;
          store.clearUser();
          this.$router.push('/home').then(() => {
            toast.success("Logout successful");
          });
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            store.clearUser();
            this.$router.push('/home').then(() => {
              toast.success("Logout successful");
            });
          } else if (err.response?.status === 404) toast.error("User not found")
          else toast.error("Logout failed");
        });
    }
  },
  computed: {
    themeIcon() {
      return this.darkMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
    },
  },
  mounted() {
    watch(() => store.user, (newUser, oldUser) => {
      this.isUserLoggedIn = newUser.id !== -1;
    }, {immediate: true});
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler() {
        const routeItem = this.drawerList.find(item => item.to === this.$route.path);
        this.title = routeItem?.title ?? 'Library';
      },
    },
  },
}
</script>
