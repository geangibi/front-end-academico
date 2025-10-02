import { createApp } from 'vue'
import App from './App.vue'

// Importar AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

// Importar Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

// Inicializar AOS
app.use({
  install() {
    AOS.init({
      duration: 800, // Duração da animação em ms
      once: true,    // Animação acontece apenas uma vez
    });
  }
});

app.mount('#app')