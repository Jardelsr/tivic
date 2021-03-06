# Desafio Técnico TIVIC
O Banco TIVIC necessita criar uma API Rest para expor os seguintes serviços para seus clientes:
1) Serviço para verificar o saldo de uma conta corrente;
2) Serviço para realizar um depósito em uma determinada conta corrente;
3) Serviço para realizar um saque de uma determinada conta corrente.

# Endpoints criadas para a API
- `POST /login`, passando um parâmetro `accountNumber` com a numeração, de 1 até 10 da conta corrente.
  Caso a conta corrente passada como parâmentro no body não exista na base de dados, vai ser criado um novo registro na tabela de `accounts` com um saldo base de 500,00 e então será gerado e retornado um token jwt.
  Caso a conta corrente exista, será gerado e retornado um token jwt.
  
- `GET /accounts/balance`, passando o bearer token gerado no login
  É retornado o saldo da conta corrente retirada do token usado usado na requisição.
  
- `POST /accounts/deposit`, passando o bearer token gerado no login e um parâmentro numérico `value` no body
  Adicion ao saldo o valor passado em `value`.
  
- `POST /accounts/withdraw`, passando o bearer token gerado no login e um parâmentro numérico `value` no body
  Subtrai do saldo o valor passado em `value` caso o resultado da operação seja superior a 0.

# Sobre a implemetação
Foi utilizado o NodeJs para fazer a API por se tratar de uma framework de rápida implementação e bastante prática pra um projeto pequeno, como o apresentado no teste.

Para a organização das pastas, foi feita uma organização padrão, separando as classes nas pastas de controllers(onde fica o controller com os principais métodos usados nas endpoints), database(com o arquivo com as configurações de conexão com o banco de dados), middleware (com o arquivo que faz a autorização do token de login), models (onde ficam os arquivos com os metodos que fazem buscas e operações no banco de dados) e routes (com o arquivo de configuração das rotas das endpoints).

Sobre à regra de negócio. A identificação da conta ao qual à endpoint de `accounts/balance` vai retornar o saldo será feita usando um token jwt para não ter que passar o número da conta pela url da requisição. Por se tratar de um dado sensível, optei por usar o token dessa forma para tornar essa identificação mais segura.
