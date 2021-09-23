# Cadastro de carro

**Requisitos Funcionais** 
Deve ser possível cadastrar um carro novo.
Deve ser possível listar todas as categorias.

**Regras de negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível allterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com disponibilidade por padrão.
O cadastro só deverá ser possível por um usuário administrador.

# Listagem de carros

**Requisitos Funcionais**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de negócio**
O usuário não precisa estar logado no sistema.


# Cadastro de especificação no carro

**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação de um carro.
Deve ser possível listar todas as especificações do carro.
Deve ser possível listar todos os carros.

**Regras de negócio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O cadastro só deverá ser possível por um usuário administrador.



# Cadastro de imagens do carro

**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do carro.

**Requisitos não funcionais**
Utilizar o multer para upload de arquivo.

**Regra de Negócio**
O usuário deve poder cadastrar mais de uma imagem para o carro.

# Aluguel de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel.

**Regras de negócio**
O aluguel deve ter duração mínima de 24h.
Não deve ser possível cadastrar um aluguel caso já exista para o mesmo carro.


