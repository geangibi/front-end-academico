<template>
  <transition name="fade">
    <div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
      <div class="card-moderno modal-content" data-aos="zoom-in">
        
        <header class="modal-header">
          <h2 class="card-title">
            <i class="fas fa-users me-2"></i>
            Alunos da Turma: {{ turma?.codigo || 'Carregando...' }}
          </h2>
          <button @click="$emit('close')" class="close-button">&times;</button>
        </header>

        <main class="modal-body">
          <div v-if="loading" class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i> Carregando...
          </div>

          <ul class="item-list" v-else-if="alunos?.length > 0">
            <li v-for="aluno in alunos" :key="aluno.id" class="item-entry">
              <div class="info-principal">
                <div class="item-name"><i class="fas fa-user icon"></i><span>{{ aluno.nome }}</span></div>
                <div class="item-detail"><i class="fas fa-envelope icon"></i><span>{{ aluno.email }}</span></div>
              </div>
            </li>
          </ul>

          <div v-else class="empty-list text-center">
            <i class="fas fa-box-open empty-icon"></i>
            <p>Nenhum aluno matriculado nesta turma.</p>
          </div>
        </main>

      </div>
    </div>
  </transition>
</template>

<script>
import { getAlunosByTurma } from '../services/api';
import AOS from 'aos';

export default {
  props: {
    show: Boolean,
    turma: Object
  },
  emits: ['close'],
  data() {
    return {
      alunos: [],
      loading: false
    };
  },
  watch: {
    // A mágica acontece aqui: usamos um 'watch' para observar mudanças na prop 'turma'.
    // Quando uma nova turma é selecionada, este método é acionado.
    async turma(novaTurma) {
      if (novaTurma && this.show) {
        this.loading = true;
        this.alunos = []; // Limpa a lista anterior
        try {
          // Busca os alunos específicos da nova turma
          this.alunos = await getAlunosByTurma(novaTurma.id);
        } catch (error) {
          console.error("Falha ao buscar alunos da turma:", error);
        } finally {
          this.loading = false;
          this.$nextTick(() => AOS.refresh()); // Atualiza o AOS se necessário
        }
      }
    }
  }
}
</script>

<style scoped>
/* Estilos do Modal e Backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 2.5rem;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.2s;
}
.close-button:hover {
  transform: scale(1.2);
}

.modal-body {
  overflow-y: auto;
  padding-right: 1rem; /* Espaço para a barra de rolagem */
}

/* Estilos de Carregamento e Lista (reaproveitados) */
.loading-spinner {
  text-align: center;
  padding: 3rem;
  font-size: 1.5rem;
  color: #fff;
}

.item-list { list-style: none; padding: 0; }
.item-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
}
.info-principal { display: flex; flex-direction: column; gap: 0.75rem; }
.item-name { font-size: 1.1rem; font-weight: bold; color: #fff; }
.item-detail { font-size: 0.9rem; color: #b0b0b0; }
.icon { margin-right: 0.75rem; color: #7c3aed; width: 20px; text-align: center; }
.empty-list { padding: 3rem 1rem; color: #888; }
.empty-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }


/* Animação do Modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>