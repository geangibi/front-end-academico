<template>
  <div class="card-moderno" data-aos="fade-up">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">
        <i class="fas fa-users me-2"></i>
        Alunos Cadastrados
      </h2>

      <ul class="aluno-list" v-if="alunos.length > 0">
        <li 
          v-for="(aluno, index) in alunos" 
          :key="aluno.id" 
          class="aluno-item"
          data-aos="fade-left"
          :data-aos-delay="index * 100"
        >
          <div class="info-principal">
            <div class="aluno-nome">
              <i class="fas fa-user icon"></i>
              <span>{{ aluno.nome }}</span>
            </div>
            <div class="aluno-email">
              <i class="fas fa-envelope icon"></i>
              <span>{{ aluno.email }}</span>
            </div>
          </div>
          <div class="info-secundaria">
            <span class="badge-cpf">
              <i class="fas fa-id-card icon"></i>
              CPF: {{ aluno.cpf }}
            </span>
          </div>
        </li>
      </ul>

      <div v-else class="empty-list text-center" data-aos="zoom-in">
        <i class="fas fa-box-open empty-icon"></i>
        <p>Nenhum aluno cadastrado ainda.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';

export default {
  props: {
    alunos: {
      type: Array,
      required: true
    }
  },
  mounted() {
    // Garante que o AOS detecte os elementos que são renderizados dinamicamente
    this.$nextTick(() => {
      AOS.refresh();
    });
  }
}
</script>

<style scoped>
/* Reutilizamos os estilos do card para manter a consistência visual */
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

/* Estilos para a lista */
.aluno-list {
  list-style: none;
  padding: 0;
}

/* Estilo para cada item (aluno) na lista */
.aluno-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Permite quebrar linha em telas menores */
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.aluno-item:hover {
  transform: translateY(-5px) scale(1.02);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.info-principal {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.aluno-nome {
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}

.aluno-email {
  font-size: 0.9rem;
  color: #b0b0b0;
}

.aluno-nome span, .aluno-email span {
  display: inline-block;
  vertical-align: middle;
}

.icon {
  margin-right: 0.75rem;
  color: #7c3aed; /* Cor de destaque */
  width: 20px; /* Alinha os ícones */
  text-align: center;
}

.badge-cpf {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-family: 'Courier New', Courier, monospace;
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