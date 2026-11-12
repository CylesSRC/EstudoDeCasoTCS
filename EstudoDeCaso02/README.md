# EstudoDeCaso02: Gestão de funcionários

Sistema de gestão de funcionários de uma startup de tecnologia, desenvolvido com HTML e JavaScript.

## Funcionalidades

- Cadastrar funcionários com nome, idade, cargo e salário.
- Listar os funcionários em uma tabela.
- Editar e excluir cadastros.
- Listar funcionários com salário maior que R$ 5.000.
- Calcular a média salarial.
- Exibir os cargos sem repetição.
- Mostrar os nomes dos funcionários em maiúsculo.

## Etapas do projeto

1. Cadastro e listagem com a classe `Funcionario`, construtor, getters, setters e método `toString()`.
2. Edição e exclusão com eventos `onclick` e atualização dos atributos pelos setters da classe.
3. Uso de funções anônimas nos eventos e arrow functions na busca, atualização e remoção de funcionários.
4. Relatórios dinâmicos com `filter`, `map`, `reduce` e `Set`.

Cada etapa é registrada em um commit para acompanhar a evolução do código.

## Tecnologias

- HTML
- JavaScript
- Docker e Docker Compose
- Git e GitHub

## Como executar

Com o Docker Desktop aberto, acesse a pasta da atividade a partir da pasta principal do repositório:

```bash
cd EstudoDeCaso02
```

Construa a imagem e inicie o container:

```bash
docker compose up --build -d
```

Abra no navegador: http://localhost:8080

Depois de alterar o código, execute novamente o comando acima e atualize a página.

Se o EstudoDeCaso01 estiver usando a porta 8080, execute `docker compose down` na pasta dele antes de iniciar esta atividade.

Para encerrar o container desta atividade, execute na pasta `EstudoDeCaso02`:

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

- `index.html`: define o formulário de cadastro, a tabela de funcionários e a seção de relatórios.
- `app.js`: implementa a classe Funcionario, o cadastro, a edição, a exclusão e os relatórios.
- `Dockerfile`: define a imagem com Nginx que disponibiliza os arquivos HTML e JavaScript no navegador.
- `compose.yaml`: configura a construção e a execução do container, disponibilizando o sistema na porta 8080.
- `README.md`: apresenta o projeto e explica como executá-lo e consultar seu histórico de versões.
