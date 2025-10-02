<template>
  <div class="card-moderno" data-aos="fade-up">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">
        <i class="fas fa-user-graduate me-2"></i>
        Matricular Aluno
      </h2>
      <form @submit.prevent="matricular">
        <div class="select-group mb-3" data-aos="fade-up" data-aos-delay="100">
          <i class="fas fa-user input-icon"></i>
          <select v-model="matricula.alunoId" class="form-select-moderno" required>
            <option disabled value="">Selecione o aluno</option>
            <option v-for="a in alunos" :key="a.id" :value="a.id">{{ a.nome }}</option>
          </select>
        </div>

        <div class="select-group mb-3" data-aos="fade-up" data-aos-delay="200">
          <i class="fas fa-chalkboard input-icon"></i>
          <select v-model="matricula.turmaId" class="form-select-moderno" required>
            <option disabled value="">Selecione a turma</option>
            <option v-for="t in turmas" :key="t.id" :value="t.id">{{ t.codigo }}</option>
          </select>
        </div>

        <button class="btn-submit w-100 mt-3" data-aos="zoom-in" data-aos-delay="300">
          <i class="fas fa-check-circle me-2"></i>
          Matricular
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { createInscricao } from '../services/api';
import Swal from 'sweetalert2';
import AOS from 'aos';

export default {
  props: {
    alunos: Array,
    turmas: Array
  },
  data() {
    return {
      matricula: { alunoId: "", turmaId: "" }
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.refresh();
    });
  },
  methods: {
    async matricular() {
      try {
        await createInscricao(this.matricula);
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Aluno matriculado com sucesso.",
          background: '#1e1e2f',
          color: '#fff',
          confirmButtonColor: '#4f46e5'
        });
        this.matricula = { alunoId: "", turmaId: "" };
        this.$emit("matriculado");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Falha ao matricular o aluno. Verifique se ele já não está na turma.",
          background: '#1e1e2f',
          color: '#fff',
          confirmButtonColor: '#4f46e5'
        });
      }
    }
  }
};
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
}

.card-title {
  color: #fff;
  font-weight: 600;
}

/* Container para o <select> e ícones */
.select-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  z-index: 1; /* Garante que o ícone fique sobre o select */
  transition: color 0.3s ease;
}

/* Seta customizada para o select */
.select-group::after {
  content: '\f078'; /* Ícone de seta para baixo do Font Awesome */
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none; /* Impede que a seta intercepte cliques */
  transition: color 0.3s ease;
}

/* Estilo moderno para o <select> */
.form-select-moderno {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.9rem 2.5rem 0.9rem 3rem; /* Espaço para ícone e seta */
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  -webkit-appearance: none; /* Remove a aparência padrão no Chrome/Safari */
  -moz-appearance: none; /* Remove a aparência padrão no Firefox */
  appearance: none; /* Remove a aparência padrão em outros browsers */
  transition: all 0.3s ease;
}

/* Estilo para as opções do select */
.form-select-moderno option {
  background-color: #1e1e2f;
  color: #fff;
}

.form-select-moderno:focus {
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 0 0 3px rgba(80, 130, 255, 0.5);
  border-color: #5082ff;
}

/* Muda a cor dos ícones quando o select está em foco */
.select-group:focus-within .input-icon,
.select-group:focus-within::after {
  color: #5082ff;
}

/* Botão de Matricular */
.btn-submit {
  background: linear-gradient(45deg, #4f46e5, #7c3aed);
  color: #fff;
  border: none;
  padding: 0.9rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-submit:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>