<template>
  <div class="page-container">
    <div class="card-moderno" data-aos="fade-up">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">
          <i class="fas fa-user-plus me-2"></i>
          Cadastro de Alunos
        </h2>

        <div class="progress-container mb-4">
          <div class="progress-fill" :style="{ width: (currentStep - 1) * 100 + '%' }"></div>
        </div>

        <transition name="fade" mode="out-in">
          <form @submit.prevent="nextStep" v-if="currentStep === 1" key="step1">
            <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="100">
              <i class="fas fa-user input-icon"></i>
              <input type="text" v-model="novoAluno.nome" class="form-control-moderno" placeholder="Nome Completo" required>
            </div>
            <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="200">
              <i class="fas fa-id-card input-icon"></i>
              <input type="text" v-model="novoAluno.cpf" class="form-control-moderno" placeholder="CPF" required>
            </div>
            <div class="d-grid mt-4">
              <button type="submit" class="btn-submit">
                Próximo <i class="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </form>

          <form @submit.prevent="cadastrarAluno" v-else key="step2">
            <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="100">
              <i class="fas fa-envelope input-icon"></i>
              <input type="email" v-model="novoAluno.email" class="form-control-moderno" placeholder="E-mail" required>
            </div>
            <div class="input-group mb-3" data-aos="fade-up" data-aos-delay="200">
              <i class="fas fa-calendar-alt input-icon"></i>
              <input type="date" v-model="novoAluno.dtNasc" class="form-control-moderno" required>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <button type="button" @click="prevStep" class="btn-secondary-moderno">
                <i class="fas fa-arrow-left me-2"></i> Voltar
              </button>
              <button type="submit" class="btn-submit">
                <i class="fas fa-check me-2"></i> Cadastrar
              </button>
            </div>
          </form>
        </transition>
      </div>
    </div>

    <div class="separator" data-aos="zoom-in"></div>

    <div class="card-moderno" data-aos="fade-up" data-aos-delay="200">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">
          <i class="fas fa-users me-2"></i>
          Alunos Cadastrados
        </h2>
        <ul class="aluno-list" v-if="alunos.length > 0">
          <li v-for="(aluno, index) in alunos" :key="aluno.id" class="aluno-item" data-aos="fade-left" :data-aos-delay="index * 100">
            <div class="info-principal">
              <div class="aluno-nome"><i class="fas fa-user icon"></i><span>{{ aluno.nome }}</span></div>
              <div class="aluno-email"><i class="fas fa-envelope icon"></i><span>{{ aluno.email }}</span></div>
            </div>
            <div class="info-secundaria">
              <div class="aluno-detalhe"><i class="fas fa-id-card icon"></i><span>CPF: {{ aluno.cpf }}</span></div>
              <div class="aluno-detalhe"><i class="fas fa-calendar-alt icon"></i><span>Nasc.: {{ formatarData(aluno.dtNasc) }}</span></div>
            </div>
          </li>
        </ul>
        <div v-else class="empty-list text-center" data-aos="zoom-in">
          <i class="fas fa-box-open empty-icon"></i>
          <p>Nenhum aluno cadastrado ainda.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import AOS from 'aos';

export default {
  name: "AlunosPage",
  data() {
    return {
      alunos: [],
      novoAluno: { nome: "", cpf: "", email: "", dtNasc: "" },
      currentStep: 1,
    };
  },
  methods: {
    async listarAlunos() {
      try {
        const response = await fetch("http://localhost:3000/api/alunos");
        if (!response.ok) throw new Error(`Erro ao buscar alunos`);
        this.alunos = await response.json();
      } catch (error) {
        console.error("Falha ao listar alunos:", error);
        this.showAlert("Erro!", "Não foi possível carregar a lista de alunos.", "error");
      } finally {
        this.$nextTick(() => AOS.refresh());
      }
    },
    nextStep() {
      if (this.novoAluno.nome && this.novoAluno.cpf) {
        this.currentStep = 2;
      } else {
        this.showAlert("Atenção!", "Preencha nome e CPF para continuar.", "warning");
      }
    },
    prevStep() {
      this.currentStep = 1;
    },
    async cadastrarAluno() {
      if (!this.novoAluno.email || !this.novoAluno.dtNasc) {
        this.showAlert("Atenção!", "Preencha e-mail e data de nascimento.", "warning");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/api/alunos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.novoAluno)
        });
        if (!response.ok) throw new Error(`Erro ao cadastrar`);
        
        this.showAlert("Sucesso!", "Aluno cadastrado com sucesso!", "success");
        this.novoAluno = { nome: "", cpf: "", email: "", dtNasc: "" };
        this.currentStep = 1;
        this.listarAlunos();
      } catch (error) {
        console.error("Falha ao cadastrar aluno:", error);
        this.showAlert("Erro!", "Não foi possível cadastrar o aluno.", "error");
      }
    },
    showAlert(title, text, icon) {
      Swal.fire({
        title, text, icon,
        background: '#1e1e2f',
        color: '#fff',
        confirmButtonColor: '#4f46e5'
      });
    },
    formatarData(data) {
      if (!data) return '';
      return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }
  },
  mounted() {
    this.listarAlunos();
  }
};
</script>

<style scoped>
/* Container principal da página */
.page-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

/* Estilo unificado do card "Glassmorphism" */
.card-moderno {
  background: rgba(30, 30, 47, 0.75);
  border-radius: 1rem;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.card-title {
  color: #fff;
  font-weight: 600;
}

/* Barra de Progresso */
.progress-container {
  width: 100%;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 4px;
  transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
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
.form-control-moderno[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.6) brightness(1.2); cursor: pointer;
}

/* Botões */
.btn-submit, .btn-secondary-moderno {
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-submit {
  background: linear-gradient(45deg, #4f46e5, #7c3aed);
  color: #fff;
}
.btn-submit:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
}

.btn-secondary-moderno {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.btn-secondary-moderno:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Divisor */
.separator {
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  margin: 3rem 0;
}

/* Lista de Alunos */
.aluno-list { list-style: none; padding: 0; }

.aluno-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}
.aluno-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.info-principal, .info-secundaria {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.aluno-nome { font-size: 1.1rem; font-weight: bold; color: #fff; }
.aluno-email { font-size: 0.9rem; color: #b0b0b0; }
.aluno-detalhe { font-size: 0.9rem; color: #ccc; }

.icon {
  margin-right: 0.75rem;
  color: #7c3aed;
  width: 20px;
  text-align: center;
}

/* Estado Vazio */
.empty-list { padding: 3rem 1rem; color: #888; }
.empty-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }

/* Animação de Transição para os Passos */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>