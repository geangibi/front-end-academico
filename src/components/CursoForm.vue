<template>
  <div class="card-moderno" data-aos="fade-up">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">
        <i class="fas fa-book-medical me-2"></i>
        Cadastrar Curso
      </h2>
      <form @submit.prevent="cadastrar">

        <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="100">
          <i class="fas fa-chalkboard-teacher input-icon"></i>
          <input
            v-model="curso.nome"
            placeholder="Nome do curso"
            class="form-control-moderno"
            required
          >
        </div>

        <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="200">
          <i class="fas fa-hourglass-half input-icon"></i>
          <input
            type="number"
            v-model="curso.cargaHoraria"
            placeholder="Carga Horária (horas)"
            class="form-control-moderno"
            required
          >
        </div>

        <div class="checkbox-group my-4" data-aos="fade-up" data-aos-delay="300">
          <input
            type="checkbox"
            id="ativo"
            v-model="curso.ativo"
            class="checkbox-input"
          >
          <label for="ativo" class="checkbox-label">
            <span class="checkbox-box"></span>
            Curso Ativo
          </label>
        </div>

        <button class="btn-submit w-100" data-aos="zoom-in" data-aos-delay="400">
          <i class="fas fa-plus-circle me-2"></i>
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { createCurso } from '../services/api';
import Swal from 'sweetalert2';
import AOS from 'aos';

export default {
  data() {
    return {
      curso: { nome: "", cargaHoraria: null, ativo: true }
    };
  },
  mounted() {
    // Garante que o AOS detecte os elementos do componente
    this.$nextTick(() => {
      AOS.refresh();
    });
  },
  methods: {
    async cadastrar() {
      try {
        await createCurso(this.curso);
        // Usando o SweetAlert estilizado
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Curso cadastrado com sucesso.",
          background: '#1e1e2f',
          color: '#fff',
          confirmButtonColor: '#4f46e5'
        });
        this.curso = { nome: "", cargaHoraria: null, ativo: true };
        this.$emit("curso-cadastrado");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Falha ao cadastrar o curso.",
          background: '#1e1e2f',
          color: '#fff',
          confirmButtonColor: '#4f46e5'
        });
      }
    }
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
}

.card-title {
  color: #fff;
  font-weight: 600;
}

/* Grupo de Input com Ícone */
.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  transition: color 0.3s ease;
}

.form-control-moderno {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.9rem 0.9rem 0.9rem 3rem;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control-moderno:focus {
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 0 0 3px rgba(80, 130, 255, 0.5);
  border-color: #5082ff;
}

.form-control-moderno:focus ~ .input-icon {
  color: #5082ff;
}

/* Checkbox Estilizado */
.checkbox-group {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-input {
  display: none; /* Esconde o checkbox padrão */
}

.checkbox-label {
  display: flex;
  align-items: center;
  color: #e0e0e0;
  cursor: pointer;
}

.checkbox-box {
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

/* Ícone de "check" que aparece quando marcado */
.checkbox-box::after {
  content: '\f00c'; /* Código do ícone de check do Font Awesome */
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  color: #fff;
  font-size: 12px;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkbox-label .checkbox-box {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

.checkbox-input:checked + .checkbox-label .checkbox-box::after {
  opacity: 1;
  transform: scale(1);
}


/* Botão de Cadastro */
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