<template>
  <v-app id="inspire">
    <v-dialog v-model="dialogOpen" max-width="500">
      <v-card :title="$t('logout.title')">
        <v-card-text>
          {{ $t('logout.confirm') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :text="$t('logout.btnConfirm')"
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
            <v-list-item-title>{{ isUserLoggedIn ? $t('logout.title') : $t('login.btn') }}</v-list-item-title>
          </v-col>
        </v-row>
      </v-btn>
      <v-btn @click="handleLang" class="ml-3" elevation="2">
        {{ langIcon }}
      </v-btn>
      <v-btn @click="toggleDarkMode" class="ml-3 mr-3" elevation="2">
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
      <wave-component />
      <app-footer/>
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from 'vue'
import WaveComponent from "../components/waves.vue";

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
    isUserLoggedIn: false,
    dialogOpen: false,
    langBR: localStorage.getItem('locale') === 'br',
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
    handleLang() {
      this.langBR = !this.langBR;
      this.$i18n.locale = this.langBR ? 'br' : 'en';
      localStorage.setItem('locale', this.langBR ? 'br' : 'en');
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
    drawerList() {
      return [
        {title: this.$t('pages.home'), icon: 'mdi-home', to: '/home'},
        {title: this.$t('pages.books'), icon: 'mdi-book', to: '/books'},
        {title: this.$t('pages.account'), icon: 'mdi-account', to: '/account'},
      ];
    },
    themeIcon() {
      return this.darkMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
    },
    langIcon() {
      return this.langBR ? 'BR' : 'EN'
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
