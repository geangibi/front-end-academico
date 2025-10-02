<template>
  <div class="card-moderno" data-aos="fade-up">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">
        <i class="fas fa-layer-group me-2"></i>
        Turmas Disponíveis
      </h2>

      <ul class="item-list" v-if="turmas.length > 0">
        <li
          v-for="(turma, index) in turmas"
          :key="turma.id"
          class="item-entry"
          data-aos="fade-left"
          :data-aos-delay="index * 100"
        >
          <div class="item-info">
            <div class="info-principal">
              <div class="item-name">
                <i class="fas fa-barcode icon"></i>
                <span>{{ turma.codigo }} ({{ turma.turno }})</span>
              </div>
              <div class="item-detail">
                <i class="fas fa-book icon"></i>
                <span>{{ turma.curso_nome }}</span>
              </div>
            </div>
          </div>
          
          <div class="item-actions">
            <button class="btn-action btn-primary" @click="$emit('ver-alunos', turma.id)">
              <i class="fas fa-users"></i> Ver Alunos
            </button>
            <button class="btn-action btn-danger" @click="$emit('excluir', turma.id)">
              <i class="fas fa-trash-alt"></i> Excluir
            </button>
          </div>
        </li>
      </ul>

      <div v-else class="empty-list text-center" data-aos="zoom-in">
        <i class="fas fa-box-open empty-icon"></i>
        <p>Nenhuma turma cadastrada ainda.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';

export default {
  props: {
    turmas: {
      type: Array,
      required: true
    }
  },
  // Boa prática em Vue 3 para declarar os eventos emitidos
  emits: ['ver-alunos', 'excluir'], 
  mounted() {
    this.$nextTick(() => {
      AOS.refresh();
    });
  }
}
</script>

<style scoped>
/* Estilo unificado do card "Glassmorphism" */
.card-moderno {
  background: rgba(30, 30, 47, 0.75);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #e0e0e0;
}

.card-title {
  color: #fff;
  font-weight: 600;
}

/* Estilos para a lista e seus itens */
.item-list {
  list-style: none;
  padding: 0;
}

.item-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.item-entry:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.info-principal {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}

.item-detail {
  font-size: 0.9rem;
  color: #b0b0b0;
}

.icon {
  margin-right: 0.75rem;
  color: #7c3aed;
  width: 20px;
  text-align: center;
}

/* Estilos para os botões de ação */
.item-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-action {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-action.btn-primary:hover {
  background-color: rgba(79, 70, 229, 0.5); /* Roxo/Azul */
  border-color: rgba(99, 102, 241, 0.8);
}

.btn-action.btn-danger:hover {
  background-color: rgba(220, 38, 38, 0.5); /* Vermelho */
  border-color: rgba(239, 68, 68, 0.8);
}

/* Estilo para a mensagem de lista vazia */
.empty-list {
  padding: 3rem 1rem;
  color: #888;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}
</style>