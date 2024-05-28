<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{ title }}</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn @click="handleAuth">
        <v-row align="center">
          <v-col cols="auto">
            <v-icon>{{ isUserLoggedIn ? 'mdi-login' : 'mdi-logout' }}</v-icon>
          </v-col>
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
const context = useAppStore();

export default {
  data: () => ({
    drawer: null,
    darkMode: false,
    title: 'Library',
    drawerList: [
      {title: 'Home', icon: 'mdi-home', to: '/home'},
      {title: 'Books', icon: 'mdi-book', to: '/books'},
      {title: 'Authors', icon: 'mdi-account-group', to: '/authors'},
      {title: 'Publishers', icon: 'mdi-library', to: '/publishers'},
    ],
    isUserLoggedIn: true,
  }),
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.darkMode = !this.darkMode;
    },
    handleAuth() {
      this.isUserLoggedIn ? this.$router.push('/login') : this.logout();
    },
    logout() {
      context.logout();
      this.$router.push('/login');
    }
  },
  computed: {
    themeIcon() {
      return this.darkMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
    },
  },
  mounted() {
    this.isUserLoggedIn = context.user.id !== -1;
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
