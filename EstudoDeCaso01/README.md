# Estudos de Caso TCS

Repositório das atividades práticas da disciplina.

## EstudoDeCaso01: Gerenciamento de alunos

Sistema de cadastro de alunos da escola fictícia DevTech Academy, desenvolvido com HTML e JavaScript.

### Funcionalidades

- Cadastrar alunos com nome, idade, curso e nota final.
- Listar os alunos em uma tabela.
- Editar e excluir cadastros.
- Listar alunos aprovados com nota maior ou igual a 7.
- Calcular a média das notas e das idades.
- Exibir os nomes em ordem alfabética.
- Mostrar a quantidade de alunos por curso.

Os cursos disponíveis são JavaScript, Python e Java.

### Etapas do projeto

1. Formulário e tabela com cadastro, edição e exclusão.
2. Classe Aluno com construtor e métodos `isAprovado()` e `toString()`.
3. Eventos com `addEventListener`, funções anônimas e arrow functions.
4. Relatórios usando `filter`, `map`, `reduce`, `sort` e `forEach`.

Cada etapa é registrada em um commit para acompanhar a evolução do código.

## Tecnologias

- HTML
- JavaScript
- Docker e Docker Compose
- Git e GitHub

## Como executar

Com o Docker Desktop aberto, acesse a pasta da atividade:

```bash
cd EstudoDeCaso01
```

Construa a imagem e inicie o container:

```bash
docker compose up --build -d
```

Abra no navegador: http://localhost:8080

Depois de alterar o código, execute novamente o comando acima e atualize a página.

Para encerrar o container:

```bash
docker compose down
```

## Armazenamento

Os dados são armazenados em um array na memória do navegador. Ao recarregar ou fechar a página, os cadastros são perdidos.

## Histórico de versões

Para consultar os commits:

```bash
git log --oneline
```

## Arquivos do projeto

- `index.html`: define o formulário de cadastro, a tabela de alunos e, na etapa final, a seção de relatórios.
- `app.js`: implementa o cadastro, a edição, a exclusão e, conforme a etapa, a classe Aluno, os eventos e os relatórios.
- `Dockerfile`: define a imagem com Nginx que disponibiliza os arquivos HTML e JavaScript no navegador.
- `compose.yaml`: configura a construção e a execução do container, disponibilizando o sistema na porta 8080.
- `README.md`: apresenta o projeto e explica como executá-lo e consultar seu histórico de versões.
