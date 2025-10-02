const API = "http://localhost:3000/api";

// ALUNOS
export const getAlunos = () => fetch(`${API}/alunos`).then(r => r.json());
export const getAlunosByTurma = (id) => fetch(`${API}/turmas/${id}/alunos`).then(r => r.json());
export const createAluno = (data) =>
  fetch(`${API}/alunos`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteAluno = (id) => fetch(`${API}/alunos/${id}`, { method: "DELETE" });

// CURSOS
export const getCursos = () => fetch(`${API}/cursos`).then(r => r.json());
export const createCurso = (data) =>
  fetch(`${API}/cursos`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteCurso = (id) => fetch(`${API}/cursos/${id}`, { method: "DELETE" });

// TURMAS
export const getTurmas = () => fetch(`${API}/turmas`).then(r => r.json());
export const createTurma = (data) =>
  fetch(`${API}/turmas`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteTurma = (id) => fetch(`${API}/turmas/${id}`, { method: "DELETE" });

// MATRÍCULAS
export const createMatricula = (data) =>
  fetch(`${API}/matriculas`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const updateMatricula = (id, data) =>
  fetch(`${API}/matriculas/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
// INSCRIÇÕES
export const createInscricao = (data) =>
    fetch(`${API}/inscricoes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(r => r.json());

// Retorna todas as matrículas
export const getMatriculas = async () => {

  const response = await fetch(`${API}/matriculas`); 
  if (!response.ok) throw new Error('Erro ao buscar matrículas');
  return response.json();
};
