<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-card class="elevation-6 mt-10 z-index-2" :style="{ width: '500px' }">
        <v-col>
          <v-card-text class="mt-2">
            <h1
              class="text-center"
            >{{ $t('accountManage') }}</h1>
            <h5 class="text-center mb-5" v-html="$t('accountOptions')"/>
            <v-form class="d-flex justify-center align-center" @submit.prevent="onSubmit" ref="form">
              <v-col>
                <v-text-field
                  variant="outlined"
                  :label="$t('name')"
                  outlined
                  v-model="user.name"
                  dense
                  :rules="[v => (/^[a-zA-Z ]*$/.test(v)) || $t('nameInvalid')]"
                />
                <v-text-field
                  label="Email"
                  variant="outlined"
                  outlined
                  v-model="user.email"
                  dense
                  :rules="[() => !user.email || /.+@.+\..+/.test(user.email) || $t('emailInvalid')]"
                />
                <input-password
                  :showPassword="showPassword"
                  @click:append="showPassword = !showPassword"
                  :password="user.password"
                  v-model="user.password"
                  :required="false"
                  :label="$t('password')"
                />
                <input-password
                  :showPassword="showConfirmPassword"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  :password="user.confirmPassword"
                  :required="false"
                  v-model="user.confirmPassword"
                  :label="$t('passwordConfirmation')"
                />
                <v-btn type="submit" dark block tile>{{ $t('save') }}</v-btn>
              </v-col>
            </v-form>
          </v-card-text>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {useAppStore} from "../stores";
import {onMounted, ref} from "vue";
import {toast} from "vue3-toastify";

export default {
  data: () => ({
    showPassword: false,
    showConfirmPassword: false,
    acceptTerms: false
  }),
  setup() {
    const appStore = useAppStore();
    const user = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const fillUser = () => {
      user.value.name = appStore.user.name;
      user.value.email = appStore.user.email;
    }

    onMounted(fillUser)

    return {
      user,
    }
  },
  methods: {
    fieldChanged(field) {
      const appStore = useAppStore();
      if(field != 'password' && field != 'confirmPassword')
        return this.user[field] !== appStore.user[field];
    },
    async onSubmit() {
      const appStore = useAppStore();
      if (this.$refs.form.validate()) {
        const fieldsToCheck = ['name', 'email', 'password'];
        const data = fieldsToCheck.reduce((acc, field) => {
          if (this.fieldChanged(field)) {
            acc[field] = this.user[field];
          }
          return acc;
        }, {});

        if (this.user.password !== '' && this.user.password === this.user.confirmPassword) {
          data.password = this.user.password;
        }
        if(Object.keys(data).length > 0) {
          await appStore.updateUser(data);
        } else {
          toast.info(this.$t('no changes'));
        }
      }
    }
  }
}
</script>


