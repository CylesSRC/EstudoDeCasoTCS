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
    atualizar(indiceEdicao, nome, idade, cargo, salario);
  }
  cancelar();
  renderizar();
}
formulario.onsubmit = function (evento) { evento.preventDefault(); cadastrar(); };
salvar.onclick = function () { cadastrar(); };

// Antes: const buscar = function (indice) { return funcionarios[indice]; };
// Depois: a arrow function retorna a expressão diretamente.
const buscar = indice => funcionarios.find((funcionario, posicao) => posicao === indice);
const atualizar = (indice, nome, idade, cargo, salario) => {
  const funcionario = buscar(indice);
  funcionario.nome = nome;
  funcionario.idade = idade;
  funcionario.cargo = cargo;
  funcionario.salario = salario;
};
const editar = indice => {
  const funcionario = buscar(indice);
  indiceEdicao = indice;
  ['nome', 'idade', 'cargo', 'salario'].forEach(campo => {
    formulario.elements[campo].value = funcionario[campo];
  });
  salvar.textContent = 'Salvar alterações';
  formulario.elements.nome.focus();
};
const excluir = indice => {
  funcionarios = funcionarios.filter((funcionario, posicao) => posicao !== indice);
  cancelar();
  renderizar();
};
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
  gerarRelatorios();
}

function gerarRelatorios() {
  const acima = funcionarios.filter(funcionario => funcionario.salario > 5000);
  const media = funcionarios.length
    ? moeda.format(funcionarios.reduce((soma, funcionario) => soma + funcionario.salario, 0) / funcionarios.length)
    : 'Sem funcionários cadastrados';
  const cargos = [...new Set(funcionarios.map(funcionario => funcionario.cargo))];
  const nomes = funcionarios.map(funcionario => funcionario.nome.toLocaleUpperCase('pt-BR'));
  const linhas = [
    'Salário maior que R$ 5.000: ' + (acima.map(funcionario => funcionario.toString()).join('; ') || 'Nenhum'),
    'Média salarial: ' + media,
    'Cargos únicos: ' + (cargos.join(', ') || 'Nenhum'),
    'Nomes em maiúsculo: ' + (nomes.join(', ') || 'Nenhum')
  ];
  const saida = document.getElementById('relatorios');
  saida.replaceChildren();
  linhas.forEach(texto => {
    const p = document.createElement('p');
    p.textContent = texto;
    saida.appendChild(p);
  });
}
renderizar();
