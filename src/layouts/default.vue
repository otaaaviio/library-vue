<template>
  <v-app id="inspire">
    <dialog-confirm :dialogOpen="dialogOpen" :title="title" :on-click="function () {}"/>
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
import WaveComponent from "../components/layout/Waves.vue";
import DialogConfirm from "../components/utils/dialogConfirm.vue";
import {i18n} from "../plugins/i18n";

const store = useAppStore();

export default {
  components: {
    DialogConfirm,
    WaveComponent,
  },
  data: () => ({
    drawer: null,
    isUserLoggedIn: false,
    dialogOpen: false,
    title: null,
  }),
  computed: {
    getIconTheme(): string {
      switch (localStorage.getItem('theme')) {
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
        {title: this.$t('reviews'), icon: 'mdi-comment-quote', to: '/myreviews'},
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
    },
    setLocale(locale: string) {
      i18n.global.locale = locale;
      localStorage.setItem('locale', locale);
    },
    handleAuth(): void {
      this.isUserLoggedIn ? this.dialogOpen = true : this.$router.push('/login');
    },
  },
  mounted() {
    watch(() => store.user, (newUser, _oldUser) => {
      this.isUserLoggedIn = newUser.id !== -1;
    }, {immediate: true});

    watch(() => this.$route.path, () => {
      const routeItem = this.drawerList.find(item => item.to === this.$route.path);
      this.title = routeItem?.title ?? 'Library';
    }, {immediate: true});
  },
}
</script>
