import { createApp } from 'vue'
import App from './App.vue' 

const app = createApp(App)

// global error handler (logs errors that escape boundaries)
app.config.errorHandler = (err, vm, info) => {
  console.error('Global errorHandler:', err, info)
}

app.mount('#app')