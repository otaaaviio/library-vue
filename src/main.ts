import {registerPlugins} from './plugins'
import App from './app.vue'
import {createApp} from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

console.log('Server is running on http://localhost:3000')
