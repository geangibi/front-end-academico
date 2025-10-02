<template>
  <div class="card-moderno" data-aos="fade-up">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">
        <i class="fas fa-user-plus me-2"></i>
        Cadastrar Aluno
      </h2>
      <form @submit.prevent="cadastrar">
        
        <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="100">
          <i class="fas fa-user input-icon"></i>
          <input 
            v-model="aluno.nome" 
            placeholder="Nome completo" 
            class="form-control-moderno" 
            required
          >
        </div>
        
        <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="200">
          <i class="fas fa-id-card input-icon"></i>
          <input 
            v-model="aluno.cpf" 
            placeholder="CPF" 
            class="form-control-moderno" 
            required
          >
        </div>

        <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="300">
          <i class="fas fa-envelope input-icon"></i>
          <input 
            v-model="aluno.email" 
            type="email"
            placeholder="E-mail" 
            class="form-control-moderno" 
            required
          >
        </div>

        <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="400">
          <i class="fas fa-calendar-alt input-icon"></i>
          <input 
            type="date" 
            v-model="aluno.dtNasc" 
            class="form-control-moderno" 
            required
          >
        </div>
        
        <button class="btn-submit w-100 mt-3" data-aos="zoom-in" data-aos-delay="500">
          <i class="fas fa-paper-plane me-2"></i>
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { createAluno } from '../services/api';
import Swal from 'sweetalert2';
import AOS from 'aos';

export default {
  data() {
    return { 
      aluno: { nome: "", cpf: "", email: "", dtNasc: "" } 
    };
  },
  mounted() {
    // É uma boa prática re-inicializar ou atualizar o AOS no `mounted`
    // para garantir que ele detecte os elementos corretamente.
    this.$nextTick(() => {
      AOS.refresh();
    });
  },
  methods: {
    async cadastrar() {
      try {
        await createAluno(this.aluno);
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Aluno cadastrado com sucesso.",
          background: '#1e1e2f', // Cor de fundo para combinar com o tema
          color: '#fff'
        });
        this.aluno = { nome: "", cpf: "", email: "", dtNasc: "" };
        this.$emit("aluno-cadastrado");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Falha ao cadastrar aluno. Verifique os dados.",
          background: '#1e1e2f',
          color: '#fff'
        });
      }
    }
  }
}
</script>

<style scoped>
/* Efeito de "vidro fosco" e gradiente no card */
.card-moderno {
  background: rgba(30, 30, 47, 0.75); /* Fundo semi-transparente */
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(10px); /* O efeito principal! */
  -webkit-backdrop-filter: blur(10px);
}

.card-title {
  color: #fff;
  font-weight: 600;
}

/* Container para o ícone e o input */
.input-group {
  position: relative;
}

/* Estilo do ícone dentro do campo */
.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  transition: color 0.3s ease;
}

/* Estilo moderno para os inputs */
.form-control-moderno {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.9rem 0.9rem 0.9rem 3rem; /* Espaço à esquerda para o ícone */
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control-moderno::placeholder {
  color: #888;
}

/* Efeito de "glow" quando o campo está em foco */
.form-control-moderno:focus {
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 0 0 3px rgba(80, 130, 255, 0.5);
  border-color: #5082ff;
}

/* Muda a cor do ícone quando o campo está em foco */
.form-control-moderno:focus + .input-icon,
.form-control-moderno:focus ~ .input-icon {
  color: #5082ff;
}

/* Estilizando o seletor de data para parecer menos "nativo" */
.form-control-moderno[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.6) brightness(1.2); /* Deixa o ícone do calendário mais visível */
  cursor: pointer;
}

/* Botão de cadastro com gradiente e efeito hover */
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
  transform: scale(1.03); /* Efeito de "levantar" */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>