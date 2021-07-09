
    `Requisitos ok:`

    - [1 -  os status para o pedido da tela de `Detalhe pedido` do Administrador]
    - [2 -  os status para o pedido da tela `Pedidos` do Administrador]
    - [3 -  os status para o pedido da tela `Pedidos do Cliente`]
    - [4 -  os status para o pedido da tela `Detalhes de Pedido` do Cliente]
    - [5 -  botão no sidebar para acessar o chat do cliente]
    - [6 -  funcionalidade de chat na visão de cliente](
    - [7 -  botão no sidebar para acessar a lista de chats do administrador]
    - [8 -  funcionalidade de lista de conversas de chat na visão de administrador]
    - [9 -  funcionalidade de chat na visão de administrador]

    `Requisitos a desenvolver:`
    - [10 - a cobertura de testes unitários do back-end]
    - [11 - Realizar o deploy do projeto back-end e front-end](
    - [12 - Desenvolva a cobertura de testes unitários do front-end]


# Habilidades aprendidas

- Organização do código e a arquitetura geral da aplicação (tanto da API quando do front-end);

- Uso sockets através do socket.io;

- Aderência aos princípios SOLID;

- Aa usar dois bancos de dados paralelamente na mesma aplicação.

* Refatorar a camada de modelo para usar Sequelize;
* Possibilitar que um administrador possa mudar o status atual de um pedido para um terceiro tipo `Preparando` e exibir essa informação nas partes que são determinadas;
* Desenvolver um chat onde um cliente possa conversar diretamente com o administrador;
* Fazer testes com cobertura de 90% para o back-end e front-end;
* Fazer deploy da aplicação utilizando o Heroku

Para servir arquivos estáticos como imagens no back-end, utilize o seguinte path:
`/back-end/public/`

![image](https://res.cloudinary.com/drdpedroso/image/upload/c_scale,w_400/v1575815877/Screenshot_2019-12-08_at_11.37.25_kzt7rl.png)



## Antes de começar a desenvolver:

1. Clone o repositório

  * Entre na pasta do repositório que você acabou de clonar:
 

2. Instale as dependências [**Caso existam**]
  * `npm install`


# Como desenvolver

Este repositório já contém um _backend_ e um _frontend_ com suas respectivas bases criadas. Após clonar o projeto, entre nas respectivas pastas para instalar as dependências.


## Linter
[ESLint](https://eslint.org/) para fazer a análise estática do seu código.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `sd-06-project-trybeer-v2/back-end/package.json`
- `sd-06-project-trybeer-v2/front-end/package.json`

Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Devido ao fato de as configurações das regras do `ESLint` dos projetos de front e back **serem diferentes**, **é preciso executar o `ESLint` em cada projeto**.

Você pode também instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).


O [StyleLint](https://stylelint.io/) também foi usado para fazer a análise estática do seu código.

**O Stylelint é aplicável _APENAS_ no frontend**

Para poder rodar o `StyleLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint:styles`. Se a análise do `StyleLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Para o banco de dados, foi utilizado o `MySQL` e o `MongoDB`. Modelados  com as funcionalidades do _Sequelize_ 

##### FALTA **escrever testes unitários que devem cobrir pelo menos 90% do projeto**. Na [documentação do Jest CLI](https://jestjs.io/docs/en/cli) é possível ver como essa cobertura é coletada.



⚠️ **Sobre o Sequelize**

- A lógica da regra de negócio da aplicação deve estar centralizada no back-end, ou seja, na API `Node.js`. Com isso, o único lugar que deve conter a lógica será o back-end: o banco de dados e front-end **não devem** conter lógicas de regra de negócio. Ou seja, muito cuidado ao utilizar _triggers_, _procedures_, dentre outras, e muito cuidado com regras de negócio no front-end.

- O projeto  utiliza o _ORM Sequelize_ ao invés do driver do _MySQL_.

Para rodar os arquivos basta rodar esse comando:

`npm run seed` - para popular o banco.

Assim o banco e terá alguns dados inseridos.

**É essencial seguir esses passos!**

**Faça essas configurações para as variáveis de ambiente usadas nesses arquivos:**

1 - Passo

Haverá um arquivo no caminho: `sd-06-project-trybeer-v2/back-end/config/config.js`

```javascript
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.SCHEMA,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.SCHEMA,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.SCHEMA,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    logging: false,
  },
};
```

**A variável SCHEMA obrigatoriamente deve ser 'Trybeer'**

2 - Passo

Haverá um arquivo no caminho: `sd-06-project-trybeer-v2/cypress/plugins/index.js`. Neste arquivo, na linha 44, Haverá a seguinte comando:

`config.env.gitHubUser = process.env.GITHUB_USER;`

OBS: O valor da variável `GITHUB_USER` deverá ser o mesmo nome do seu usuário do github. O grupo deve escolher o nome de usuário de uma pessoa integrante.

3 - Passo

No arquivo `sd-06-project-trybeer-v2.github/workflows/main.yml` altere a linha 45 para incluir o nome de usuário utilizado no passo anterior.

antes:
```
GITHUB_USER: ${{ github.actor }}
```

depois:
```
GITHUB_USER: 'fulan_de_tal'
```

4 - Passo

Quando for criar a conexão com o `MONGODB` crie duas variáveis de ambiente `process.env.DB_URL` e `process.env.DB_NAME` e configure o banco conforme exemplo abaixo:

```javascript
const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let schema = null;

const connection = async () => {
  if (schema) return Promise.resolve(schema);

  return mongoClient
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(process.env.DB_NAME))
  .then((dbSchema) => {
    schema = dbSchema;
    return schema;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
module.exports = connection;
```

Onde a variável `process.env.DB_URL` será a url do banco exemplo abaixo:

`DB_URL=mongodb://localhost:27017`

E a variável `process.env.DB_NAME` e o nome do banco com exemplo abaixo:

`DB_NAME=Trybeer`

5 - Passo

Ha um arquivo de conexão com o mongodb já pronto no caminho `sd-06-project-trybeer-v2/cypress/plugins/connection.js`,  então não se esqueça de adicionar essas variáveis na pasta raiz tambem para poder rodar local.

**Você irá precisar configurar as variáveis globais do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

# Requisitos do projeto

### 1 - status para o pedido da tela de `Detalhe pedido` do Administrador

- Todo pedido realizado deve ter um status referente ao seu progresso atual.

- Os `status` do pedido devem ser os seguintes:

   - `Pendente` logo quando o pedido for criado;

   - `Preparando` quando o pedido for iniciado pelo usuário admin;

   - `Entregue` quando o pedido for finalizado pelo usuário admin;.

- O usuário admin deve alterar o status do pedido. L

- Qualquer atualização feita no pedido pelo usuário admin deve se refletir em tempo real para o cliente.

#### Tela de `Detalhe pedido` do Administrador

```
- Dado que é feito uma compra, será validado que ela está com status `Pendente` na tela de `Detalhes do pedido` do admin

- administrador ao acessar um determinado pedido evisualiza o botão `Preparar Pedido`

- administrador ao acessar um determinado pedido  visualiza o botão `Marcar como entregue`

- clicar no botão `Preparar pedido`  altera o status do detalhe do pedido para `Preparando`

- clicar no botão `Marcar como entregue`altera o status do detalhe do pedido para `Entregue`

-  clicar no botão `Marcar como entregue` os botões `Preparar pedido` e `Marcar como entregue` somem da tela
```

### 2 - os status para o pedido da tela `Pedidos` do Administrador
- Todo pedido realizado tem um status referente ao seu progresso atual.

- Os `status` :

   - `Pendente` logo quando o pedido for criado;

   - `Preparando` quando o pedido for iniciado pelo usuário admin;

   - `Entregue` quando o pedido for finalizado pelo usuário admin;

#### Tela de `Pedido` do Administrador

![Tela de pedido Administrador](./public/pedidosadmin.png)



### 3 - os status para o pedido da tela `Pedidos do Cliente`

- Todo pedido realizado tem um status referente ao seu progresso atual.

- Os `status` do pedido :

   - `Pendente` logo quando o pedido for criado;

   - `Preparando` quando o pedido for iniciado pelo usuário admin;

   - `Entregue` quando o pedido for finalizado pelo usuário admin;.

#### Tela de `Pedidos` do Cliente

![Tela pedidos de cliente](./public/pedidoscliente.png)
```

### 4 -status para o pedido da tela `Detalhes de Pedido` do Cliente

- Todo pedido realizado dtem um status referente ao seu progresso atual.

- Os `status` do pedido :

   - `Pendente` logo quando o pedido for criado;

   - `Preparando` quando o pedido for iniciado pelo usuário admin;

   - `Entregue` quando o pedido for finalizado pelo usuário admin;.

#### Tela de `Detalhes de Pedido` do Cliente

![Detalhe pedido Administrador](./public/detalhespedidocliente.png)



### 5 - botão no sidebar para acessar o chat do cliente

- Essa funcionalidade só existe  na **visão de cliente**

- No menu lateral,  botão de chat denominada `Conversar com a loja`.

    - clicar no item descrito como `Conversar com a loja` leva para uma página de chat.


#### Sidebar do Cliente


![Detalhe pedido Administrador](./public/sidebarCliente.png)


### 6 - funcionalidade de chat na visão de cliente

- só  na **visão de cliente**

- Na página de chat, as mensagens aparecem ordenadas com as mais recentes embaixo.

    - A página  mostra as mensagens enviadas e recebidas, com as mensagens mais recentes mais embaixo.

    - A página  tem um input para digitar o texto e um botão para envio de nova mensagem ao chat.

- O nickname do cliente é o email cadastrado.

- O chat contem tambem a hora que a mensagem foi enviada.

- A hora  tem o formato `15:30`.

- O histórico da conversa  salvo no banco de dados `MondoDB` e aparece quando a pessoa abre a página.

![Chat do cliente](./public/telachatcliente.png)

```
### 7 - Criar botão no sidebar para acessar a lista de chats do administrador

-  funcionalidade  na **visão de admin**

- A plataforma é acessível, no menu lateral, a funcionalidade de chats denominada `Conversas`.

    - Leva para uma página de listas de chats.

    - A rota  `/admin/chats`;


![Chat do cliente](./public/sidebarAdmin.png)

```
### 8 -funcionalidade de lista de conversas de chat na visão de administrador

- Essa funcionalidade só  **visão de admin**

- A paginá contem uma lista de conversas lista com todas as conversas da loja.

    - As conversas aparecem numa lista. Cada conversa é identificada pelo email da pessoa cliente em questão.

        - Uo email do cliente deve redirecioana para a janela com o chat daquela conversa.

    - A lista de conversas é ordenada pela data da última mensagem.

    - Caso não tenham conversas, é exibido o texto "Nenhuma conversa por aqui".


  ![Chat do cliente](./public/listadeconversas.png)


### 9 - Dfuncionalidade de chat na visão de administrador

-  ao clicar numitem da lista de conversas exibe na tela o respectivo chat.

    - o item da lista exibe n a janela com o chat daquela conversa.

    - A página da conversa mostra, no topo da tela, o email do usuário que a Loja está conversando.

    - A página da conversa tem um botão de voltar que ao ser clicado redireciona a pessoa a página de listagem de conversas novamente.

- O histórico de cada conversa é salvo no banco de dados e aparece quando a pessoa abre a página.

- A lista de conversas é ordenada pela data da última mensagem.

    - as mais recentes no topo da lista.

![Chat do admin](./public/chatAdmin.png)

```

### 10 - Desenvolver a cobertura de testes unitários do back-end

- A cobertura de testes unitários do back-end deve ser de, no mínimo, 90%.

### 11 - Realizar o deploy do projeto back-end e front-end

#### Deploy Heroku

IMPORTANTE: Crie uma variável de ambiente com o nome `GITHUB_USER` deverá ser criada com o seu usuário do github.

#### Faça o deploy do front-end:

Crie um app do Heroku com o front-end. Não é necessário a criação do Procfile aqui. Vamos deixar o Heroku utilizar as configurações padrões. No momento de criar o app do Heroku, utilize o buildpack descrito abaixo, em Dicas.

O nome do seu app no heroku deve ser seu nome de usuário do github seguido de "-front". Por exemplo, se o seu usuário do github for "joao", o nome do seu app será "joao-front" e a url precisar ser https://joao-front.herokuapp.com/.

 #### Faça o deploy do back-end:

Crie um app do Heroku com o back-end. Não é necessário a criação do Procfile aqui. Vamos deixar o Heroku utilizar as configurações padrões. No momento de criar o app do Heroku, utilize o buildpack descrito abaixo, em Dicas.

O nome do seu app no heroku deve ser seu nome de usuário do github seguido de "-back". Por exemplo, se o seu usuário do github for "joao", o nome do seu app será "joao-back" e a url precisar ser https://joao-back.herokuapp.com/.

Configure as variáveis de ambiente do app para apontar para as API's publicadas.

Faça o deploy com o git.

- Sera validado se é possivel acessar a aplicação e verificar se estou na tela url de login

- Será validado que é possível fazer cadastro de um cliente com sucesso e ser redirecionado para tela de produtos

### 12 - Desenvolva a cobertura de testes unitários do front-end

- A cobertura de testes unitários do front-end deve ser de, no mínimo, 90%.
