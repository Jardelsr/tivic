# tivic

# endpoints criadas para a API
- POST /login, passando um parâmetro `accountNumber` com a numeração, de 1 até 10 da conta corrente.
  Caso a conta corrente passada como parâmentro no body não exista na base de dados, vai ser criado um novo registro na tabela de `accounts` com um saldo base de 500,00 e então será gerado e retornado um token jwt.
  Caso a conta corrente exista, será gerado e retornado um token jwt.
  
- GET /accounts/balance, passando o bearer token gerado no login
  É retornado o saldo da conta corrente retirada do token usado usado na requisição.
  
- /accounts/deposit, passando o bearer token gerado no login e um parâmentro numérico `value` no body
  Adicion ao saldo o valor passado em `value`.
  
- /accounts/withdraw, passando o bearer token gerado no login e um parâmentro numérico `value` no body
  Subtrai do saldo o valor passado em `value` caso o resultado da operação seja superior a 0.

# sobre a implemetação
Foi utilizado o NodeJs para fazer a API por se tratar de uma framework de rápida implementação e bastante prática pra um projeto pequeno, como o apresentado no teste.

Para a organização das pastas, foi feita uma organização padrão, separando as classes nas pastas de controllers(onde fica o controller com os principais métodos usados nas endpoints), database(com o arquivo com as configurações de conexão com o banco de dados), middleware (com o arquivo que faz a autorização do token de login), models (onde ficam os arquivos com os metodos que fazem buscas e operações no banco de dados) e routes (com o arquivo de configuração das rotas das endpoints).

Sobre à regra de negócio. Decidi identificar a conta ao qual à endpoint de `accounts/balance` vai retornar o saldo usando um token jwt para não ter que passar o número da conta pela url da requisição. Para não ter que passar esse dado sensível, decidir usar o token para tornar essa identificação mais segura.
