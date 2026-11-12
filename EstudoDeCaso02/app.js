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
  funcionarios.push(new Funcionario(nome, idade, cargo, salario));
  cancelar();
  renderizar();
}
formulario.onsubmit = function (evento) { evento.preventDefault(); cadastrar(); };
salvar.onclick = function () { cadastrar(); };

function renderizar() {
  tabela.replaceChildren();
  funcionarios.forEach((funcionario, indice) => {
    const linha = document.createElement('tr');
    [funcionario.nome, funcionario.idade, funcionario.cargo, moeda.format(funcionario.salario)].forEach(valor => {
      const td = document.createElement('td');
      td.textContent = valor;
      linha.appendChild(td);
    });
    tabela.appendChild(linha);
  });
}
renderizar();
