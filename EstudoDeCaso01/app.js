class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = notaFinal;
  }
  isAprovado() { return this.notaFinal >= 7; }
  toString() { return `${this.nome}, ${this.idade} anos, ${this.curso}, nota ${this.notaFinal}`; }
}
const alunos = [];
let indiceEdicao = null;
const formulario = document.getElementById('formulario');
const tabela = document.getElementById('alunos');
function cancelar() {
  indiceEdicao = null;
  formulario.reset();
  document.getElementById('salvar').textContent = 'Cadastrar';
}
function salvar() {
  if (!formulario.reportValidity()) return;
  const nome = formulario.elements.nome.value.trim();
  if (!nome) { alert('Informe um nome.'); return; }
  const idade = Number(formulario.elements.idade.value);
  const curso = formulario.elements.curso.value;
  const notaFinal = Number(formulario.elements.notaFinal.value);
  const aluno = new Aluno(nome, idade, curso, notaFinal);
  const editando = indiceEdicao !== null;
  if (editando) alunos[indiceEdicao] = aluno;
  else alunos.push(aluno);
  cancelar();
  renderizar();
  
}
function editar(indice) {
  const aluno = alunos[indice];
  indiceEdicao = indice;
  for (const campo of ['nome', 'idade', 'curso', 'notaFinal']) {
    formulario.elements[campo].value = aluno[campo];
  }
  document.getElementById('salvar').textContent = 'Salvar alterações';
  formulario.elements.nome.focus();
  
}
function excluir(indice) {
  alunos.splice(indice, 1);
  cancelar();
  renderizar();
  
}
function renderizar() {
  tabela.replaceChildren();
  for (let indice = 0; indice < alunos.length; indice++) {
    const aluno = alunos[indice];
    const linha = document.createElement('tr');
    for (const valor of [aluno.nome, aluno.idade, aluno.curso, aluno.notaFinal]) {
      const celula = document.createElement('td');
      celula.textContent = valor;
      linha.appendChild(celula);
    }
    const acoes = document.createElement('td');
    for (const acao of ['Editar', 'Excluir']) {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.textContent = acao;
      botao.onclick = function () {
        if (acao === 'Editar') editar(indice);
        else excluir(indice);
      };
      acoes.appendChild(botao);
    }
    linha.appendChild(acoes);
    tabela.appendChild(linha);
  }
  
}
formulario.onsubmit = function (evento) { evento.preventDefault(); salvar(); };
renderizar();
