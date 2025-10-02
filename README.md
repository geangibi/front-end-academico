# Sistema Acadêmico - Frontend Vue.js

Este repositório contém o código-fonte do frontend para um Sistema de Gerenciamento Acadêmico. A interface foi desenvolvida com Vue.js 3 e estilizada do zero para ter um visual moderno, com tema escuro, efeitos de vidro (glassmorphism) e animações suaves com a biblioteca AOS.

---

### Demonstração Visual

É altamente recomendado adicionar uma imagem ou GIF aqui para mostrar o resultado final.

![Demonstração do Sistema Acadêmico](URL_DA_SUA_IMAGEM_OU_GIF_AQUI)
*(Substitua o link acima pela URL de uma imagem ou GIF do seu projeto funcionando)*

---

### ✨ Tecnologias Utilizadas

* **[Vue.js (v3)](https://vuejs.org/)**: Framework principal para a construção da interface.
* **[AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)**: Para as animações de entrada dos componentes.
* **[Font Awesome](https://fontawesome.com/)**: Para os ícones utilizados em toda a aplicação.
* **[SweetAlert2](https://sweetalert2.github.io/)**: Para a exibição de notificações e alertas de confirmação de forma elegante.
* **CSS Moderno**: Estilização feita do zero com Flexbox, Grid Layout e efeitos como `backdrop-filter` para o glassmorphism.

---

### 🚀 Funcionalidades

O sistema conta com as seguintes funcionalidades:

* **Dashboard Principal:**
    * [x] Layout responsivo de duas colunas.
    * [x] Painel principal com abas para visualização de listas.
    * [x] Painel de ações lateral para todos os formulários de cadastro.

* **Gerenciamento de Alunos:**
    * [x] Formulário para cadastro de novos alunos.
    * [x] Listagem de alunos cadastrados.

* **Gerenciamento de Cursos:**
    * [x] Formulário para cadastro de novos cursos.
    * [x] Listagem de cursos disponíveis.

* **Gerenciamento de Turmas:**
    * [x] Formulário para cadastro de novas turmas, associando-as a um curso.
    * [x] Listagem de turmas com opções para ver alunos e excluir.
    * [x] Modal para visualizar os alunos matriculados em uma turma específica.

* **Gerenciamento de Matrículas:**
    * [x] Formulário para matricular um aluno em uma turma.
    * [x] Listagem de todas as matrículas realizadas.

---

### 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
* **Um servidor backend rodando na porta `3000`** que forneça os endpoints da API. Este projeto é apenas o frontend.

---

### ⚙️ Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)
    cd NOME_DO_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure a API:**
    Certifique-se de que seu servidor backend esteja rodando em `http://localhost:3000`. O arquivo `src/services/api.js` está configurado para fazer requisições para essa URL.

4.  **Execute o projeto em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).

---

### 📁 Estrutura dos Componentes

O projeto está organizado da seguinte forma na pasta `src/components`:

* `App.vue`: O componente principal que organiza o layout do dashboard.
* `AlunoForm.vue` / `AlunoList.vue`: Formulário e lista para Alunos.
* `CursoForm.vue` / `CursoList.vue`: Formulário e lista para Cursos.
* `TurmaForm.vue` / `TurmaList.vue`: Formulário e lista para Turmas.
* `MatriculaForm.vue` / `MatriculaList.vue`: Formulário e lista para Matrículas.
* `ModalAlunosTurma.vue`: O modal que exibe os alunos de uma turma.
