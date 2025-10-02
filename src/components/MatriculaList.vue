<template>
  <div class="card mb-4">
    <div class="card-header bg-secondary text-white">Matrículas</div>
    <ul class="list-group list-group-flush">
      <li v-for="m in matriculas" :key="m.id" class="list-group-item">
        <div class="d-flex justify-content-between">
          <span><strong>Aluno:</strong> {{ m.alunoNome }}</span>
          <span><strong>Turma:</strong> {{ m.turmaCodigo }}</span>
        </div>
        <div>
          <small>Status: {{ m.status }}</small>
        </div>
      </li>
      <li v-if="matriculas.length===0" class="list-group-item text-center text-muted">
        Nenhuma matrícula registrada.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { matriculas: Array }
}
</script>
