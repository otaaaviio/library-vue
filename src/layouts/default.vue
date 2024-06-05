<template>
  <v-app id="inspire">
    <v-dialog v-model="dialogOpen" max-width="500">
      <v-card :title="$t('logout')">
        <v-card-text>
          {{ $t('dialogConfirm') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :text="$t('confirm')"
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
            <v-list-item-title>{{ isUserLoggedIn ? $t('logout') : $t('login') }}</v-list-item-title>
          </v-col>
        </v-row>
      </v-btn>
      <button-menu
        :items="locales"
        :icon="'mdi-translate'"
        :show-subheader="true"
        :subheader="$t('translations')"
        :on-click="setLocale"
      />
      <button-menu
        :items="themes"
        :icon="getIconTheme"
        :on-click="setTheme"
      />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
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
    <v-main>
      <router-view/>
      <wave-component/>
      <app-footer/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {useAppStore} from "../stores/app";
import {useAuthStore} from "../stores/auth";
import WaveComponent from "../components/layout/Waves.vue";
import {i18n} from "../plugins/i18n";

const appStore = useAppStore();
const authStore = useAuthStore();

export default {
  name: 'DefaultLayout',
  components: {
    WaveComponent,
  },
  data: () => ({
    currentTheme: localStorage.getItem('theme') || 'light',
    drawer: null,
    isUserLoggedIn: false,
    dialogOpen: false,
    title: null,
  }),
  computed: {
    getIconTheme(): string {
      switch (this.currentTheme) {
        case 'dark':
          return 'mdi-weather-night';
        case 'light':
          return 'mdi-white-balance-sunny';
        default:
          return '';
      }
    },
    locales() {
      return [
        {title: this.$t('pt'), value: 'pt'},
        {title: this.$t('en'), value: 'en'},
        {title: this.$t('es'), value: 'es'},
      ];
    },
    themes() {
      return [
        {title: this.$t('darkTheme'), value: 'dark'},
        {title: this.$t('lightTheme'), value: 'light'},
        {title: this.$t('systemTheme'), value: 'system'},
      ];
    },
    drawerList() {
      return [
        {title: this.$t('books'), icon: 'mdi-book', to: '/books'},
        {title: this.$t('myReviews'), icon: 'mdi-comment-quote', to: '/myreviews'},
        {title: this.$t('listToRead'), icon: 'mdi-format-list-bulleted', to: '/listToRead'},
        {title: this.$t('account'), icon: 'mdi-account', to: '/account'},
      ];
    },
  },
  methods: {
    setTheme(theme: string) {
      if (theme === 'system') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      }
      this.$vuetify.theme.global.name = theme;
      localStorage.setItem('theme', theme);
      this.currentTheme = theme;
    },
    setLocale(locale: string) {
      i18n.global.locale = locale;
      localStorage.setItem('locale', locale);
    },
    handleAuth(): void {
      this.isUserLoggedIn ? this.dialogOpen = true : this.$router.push('/login');
    },
    logout() {
      this.dialogOpen = false;
      return authStore.logout();
    }
  },
  mounted() {
    watch(() => appStore.user, (newUser, _oldUser) => {
      this.isUserLoggedIn = newUser.id !== -1;
    }, {immediate: true});

    watch(() => this.$route.path, () => {
      const routeItem = this.drawerList.find(item => item.to === this.$route.path);
      this.title = routeItem?.title ?? 'Library';
    }, {immediate: true});
  },
}
</script>
