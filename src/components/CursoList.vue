<template>
  <div class="card-moderno" data-aos="fade-up">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">
        <i class="fas fa-book me-2"></i>
        Cursos Cadastrados
      </h2>

      <ul class="item-list" v-if="cursos.length > 0">
        <li
          v-for="(curso, index) in cursos"
          :key="curso.id"
          class="item-entry"
          data-aos="fade-left"
          :data-aos-delay="index * 100"
        >
          <div class="info-principal">
            <div class="item-name">
              <i class="fas fa-chalkboard-teacher icon"></i>
              <span>{{ curso.nome }}</span>
            </div>
            <div class="item-detail">
              <i class="fas fa-hourglass-half icon"></i>
              <span>Carga Horária: {{ curso.cargaHoraria }} horas</span>
            </div>
          </div>
          
          <div class="info-secundaria">
            <span
              :class="['status-badge', curso.ativo ? 'status-ativo' : 'status-inativo']"
            >
              <i :class="['fas', curso.ativo ? 'fa-check-circle' : 'fa-times-circle']"></i>
              {{ curso.ativo ? "Ativo" : "Inativo" }}
            </span>
          </div>
        </li>
      </ul>

      <div v-else class="empty-list text-center" data-aos="zoom-in">
        <i class="fas fa-box-open empty-icon"></i>
        <p>Nenhum curso cadastrado ainda.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';

export default {
  props: {
    cursos: {
      type: Array,
      required: true
    }
  },
  mounted() {
    // Garante que a biblioteca de animação reconheça os itens da lista
    // que são renderizados após o carregamento inicial.
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
  color: #7c3aed; /* Cor de destaque roxa */
  width: 20px;
  text-align: center;
}

/* Estilo para a tag de status (Ativo/Inativo) */
.status-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.status-badge.status-ativo {
  background-color: rgba(22, 163, 74, 0.2);
  color: #4ade80; /* Verde claro */
}

.status-badge.status-inativo {
  background-color: rgba(239, 68, 68, 0.2);
  color: #f87171; /* Vermelho claro */
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