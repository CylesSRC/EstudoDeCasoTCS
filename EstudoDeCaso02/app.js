class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }
  get nome() { return this._nome; }
  set nome(valor) { this._nome = valor; }
  get idade() { return this._idade; }
  set idade(valor) { this._idade = valor; }
  get cargo() { return this._cargo; }
  set cargo(valor) { this._cargo = valor; }
  get salario() { return this._salario; }
  set salario(valor) { this._salario = valor; }
  toString() { return `${this.nome}, ${this.idade} anos, ${this.cargo}, ${moeda.format(this.salario)}`; }
}
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
let funcionarios = [];
let indiceEdicao = null;
const formulario = document.getElementById('formulario');
const tabela = document.getElementById('funcionarios');
const salvar = document.getElementById('salvar');
function cancelar() {
  formulario.reset();
  indiceEdicao = null;
  salvar.textContent = 'Cadastrar';
}
function cadastrar() {
  if (!formulario.reportValidity()) return;
  const nome = formulario.elements.nome.value.trim();
  const cargo = formulario.elements.cargo.value.trim();
  const idade = Number(formulario.elements.idade.value);
  const salario = Number(formulario.elements.salario.value);
  if (!nome || !cargo) { alert('Preencha nome e cargo.'); return; }
  if (indiceEdicao === null) {
    funcionarios.push(new Funcionario(nome, idade, cargo, salario));
  } else {
    const funcionario = funcionarios[indiceEdicao];
    funcionario.nome = nome;
    funcionario.idade = idade;
    funcionario.cargo = cargo;
    funcionario.salario = salario;
  }
  cancelar();
  renderizar();
}
formulario.onsubmit = function (evento) { evento.preventDefault(); cadastrar(); };
salvar.onclick = function () { cadastrar(); };

function editar(indice) {
  const funcionario = funcionarios[indice];
  indiceEdicao = indice;
  for (const campo of ['nome', 'idade', 'cargo', 'salario']) {
    formulario.elements[campo].value = funcionario[campo];
  }
  salvar.textContent = 'Salvar alterações';
  formulario.elements.nome.focus();
}
function excluir(indice) {
  funcionarios.splice(indice, 1);
  cancelar();
  renderizar();
}
document.getElementById('cancelar').onclick = function () { cancelar(); };

function renderizar() {
  tabela.replaceChildren();
  funcionarios.forEach((funcionario, indice) => {
    const linha = document.createElement('tr');
    [funcionario.nome, funcionario.idade, funcionario.cargo, moeda.format(funcionario.salario)].forEach(valor => {
      const td = document.createElement('td');
      td.textContent = valor;
      linha.appendChild(td);
    });
    const acoes = document.createElement('td');
    ['Editar', 'Excluir'].forEach(acao => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.textContent = acao;
      botao.onclick = function () {
        if (acao === 'Editar') editar(indice);
        else excluir(indice);
      };
      acoes.appendChild(botao);
    });
    linha.appendChild(acoes);
    tabela.appendChild(linha);
  });
}
renderizar();
