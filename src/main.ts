import {registerPlugins} from '@/plugins'
import App from './App.vue'
import {createApp} from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
