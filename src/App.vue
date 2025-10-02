<template>
  <div class="dashboard-container">
    <header class="dashboard-header" data-aos="fade-down">
      <h1><i class="fas fa-university"></i> Sistema Acadêmico</h1>
    </header>

    <main class="main-content" data-aos="fade-up">
      <nav class="tab-nav">
        <button @click="activeListTab = 'turmas'" :class="{ active: activeListTab === 'turmas' }"><i class="fas fa-layer-group"></i> Turmas</button>
        <button @click="activeListTab = 'alunos'" :class="{ active: activeListTab === 'alunos' }"><i class="fas fa-users"></i> Alunos</button>
        <button @click="activeListTab = 'cursos'" :class="{ active: activeListTab === 'cursos' }"><i class="fas fa-book"></i> Cursos</button>
        <button @click="activeListTab = 'matriculas'" :class="{ active: activeListTab === 'matriculas' }"><i class="fas fa-clipboard-list"></i> Matrículas</button>
      </nav>

      <div class="tab-content">
        <transition name="fade" mode="out-in">
          <TurmaList v-if="activeListTab === 'turmas'" :turmas="turmas" @excluir="excluirTurma" @ver-alunos="abrirModalAlunos" />
          <AlunoList v-else-if="activeListTab === 'alunos'" :alunos="alunos" />
          <CursoList v-else-if="activeListTab === 'cursos'" :cursos="cursos" />
          <MatriculaList v-else-if="activeListTab === 'matriculas'" :matriculas="matriculas" />
        </transition>
      </div>
    </main>

    <aside class="action-panel" data-aos="fade-up" data-aos-delay="100">
        <nav class="tab-nav">
            <button @click="activeFormTab = 'matricular'" :class="{ active: activeFormTab === 'matricular' }" title="Matricular Aluno"><i class="fas fa-user-graduate"></i></button>
            <button @click="activeFormTab = 'aluno'" :class="{ active: activeFormTab === 'aluno' }" title="Cadastrar Aluno"><i class="fas fa-user-plus"></i></button>
            <button @click="activeFormTab = 'turma'" :class="{ active: activeFormTab === 'turma' }" title="Cadastrar Turma"><i class="fas fa-chalkboard-teacher"></i></button>
            <button @click="activeFormTab = 'curso'" :class="{ active: activeFormTab === 'curso' }" title="Cadastrar Curso"><i class="fas fa-book-medical"></i></button>
        </nav>
        <div class="tab-content">
            <transition name="fade" mode="out-in">
                <MatriculaForm v-if="activeFormTab === 'matricular'" :alunos="alunos" :turmas="turmas" @matriculado="carregarMatriculas" />
                <AlunoForm v-else-if="activeFormTab === 'aluno'" @aluno-cadastrado="carregarAlunos" />
                <TurmaForm v-else-if="activeFormTab === 'turma'" :cursos="cursos" @turma-cadastrada="carregarTurmas" />
                <CursoForm v-else-if="activeFormTab === 'curso'" @curso-cadastrado="carregarCursos" />
            </transition>
        </div>
    </aside>

    <ModalAlunosTurma :show="modalAberto" :turma="turmaSelecionada" @close="modalAberto=false" />
  </div>
</template>

<script>
// Imports
import { getTurmas, deleteTurma, getAlunos, getCursos, getMatriculas } from './services/api';
import ModalAlunosTurma from './components/ModalAlunosTurma.vue';
import TurmaForm from './components/TurmaForm.vue';
import TurmaList from './components/TurmaList.vue';
import AlunoForm from './components/AlunoForm.vue';
import AlunoList from './components/AlunoList.vue';
import CursoForm from './components/CursoForm.vue';
import CursoList from './components/CursoList.vue';
import MatriculaForm from './components/MatriculaForm.vue';
import MatriculaList from './components/MatriculaList.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    TurmaForm, TurmaList, AlunoForm, AlunoList, CursoForm, CursoList,
    MatriculaForm, MatriculaList, ModalAlunosTurma
  },
  data() {
    return {
      turmas: [], alunos: [], cursos: [], matriculas: [],
      activeListTab: 'turmas',
      activeFormTab: 'matricular',
      modalAberto: false,
      turmaSelecionada: null,
    };
  },
  async mounted() {
    this.carregarTodosOsDados();
  },
  methods: {
    async carregarTodosOsDados() {
      await Promise.all([ this.carregarTurmas(), this.carregarAlunos(), this.carregarCursos(), this.carregarMatriculas() ]);
    },
    async carregarTurmas() { this.turmas = await getTurmas(); },
    async carregarAlunos() { this.alunos = await getAlunos(); },
    async carregarCursos() { this.cursos = await getCursos(); },
    async carregarMatriculas() { this.matriculas = await getMatriculas(); },
    
    async excluirTurma(id) {
      const result = await Swal.fire({
        title: 'Você tem certeza?', text: "Esta ação não pode ser revertida!", icon: 'warning',
        showCancelButton: true, confirmButtonColor: '#4f46e5', cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!', cancelButtonText: 'Cancelar', background: '#1e1e2f', color: '#fff'
      });

      if (result.isConfirmed) {
        await deleteTurma(id);
        Swal.fire({ title: 'Excluída!', text: 'A turma foi removida.', icon: 'success', background: '#1e1e2f', color: '#fff' });
        this.carregarTurmas();
      }
    },
    abrirModalAlunos(turmaId) {
      this.turmaSelecionada = this.turmas.find(t => t.id === turmaId);
      this.modalAberto = true;
    },
  }
}
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); /* Coluna principal flexível, lateral com 1/3 */
  grid-template-areas:
    "header header"
    "main   panel";
  gap: 2rem;
  padding: 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.dashboard-header {
  grid-area: header;
  text-align: center;
  color: #fff;
  margin-bottom: 1rem;
}
.dashboard-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.main-content {
  grid-area: main;
}

.action-panel {
  grid-area: panel;
}

/* Navegação por Abas */
.tab-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.tab-nav button {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #a0aec0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.tab-nav button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.tab-nav button.active {
  background: #4f46e5;
  color: #fff;
  border-color: #4f46e5;
  font-weight: bold;
}

/* Painel de Ações usa abas só com ícones para economizar espaço */
.action-panel .tab-nav button {
    font-size: 1.1rem;
}

.tab-content {
  min-height: 400px;
}

/* Animação de Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsividade */
@media (max-width: 1024px) {
  .dashboard-container {
    grid-template-columns: 1fr; /* Coluna única */
    grid-template-areas:
      "header"
      "panel" 
      "main";
  }
}
</style>