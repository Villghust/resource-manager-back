# Getting Started

**NECESSÁRIO O USO DO DOCKER**

Utilize o docker para subir a aplicação.

``` docker-compose up -d --build ```

Para testes manuais, disponibilizamos dentro da pasta raiz do projeto um arquivo `insomnia.json` que pode ser importado no software [Insomnia](https://insomnia.rest/). Neste arquivo deixamos vários exemplos de requisições pré-definidas.

Ao executar o comando `docker-compose` citado acima, o sistema já inicializa com os mocks iniciais de 5 usuários e 10 recursos, além de configurar globalmente o preço para os espaços físicos.

Ao reiniciar o container, o comando `docker-compose` citado acima apaga todas as collections do banco de dados e recria as já mockadas pelo grupo.

---

**APENAS EM AMBIENTE DE DESENVOLVIMENTO:**

**NECESSÁRIO O USO DO DOCKER E DO YARN**

Primeiro, inicie uma instância do banco de dados com seu docker:

```docker run --name resource-manager -p 27017:27017 -d -t mongo```

Clone este repositório em sua máquina instale as dependências:

```yarn install```

Para rodar os testes unitários, utilize o script:

```yarn test:unit```

Para rodar os testes de feature, utilize o script:

```yarn test:features```

Para rodar ambos testes unitários e de feature, utilize o script:

```yarn test```

# Entidades e rotas (Swagger wannabe)

## Cost

Entidade que define os valores globais para recursos do tipo PHYSICAL_SPACES.

### Funcionalidades

- *Store*: Método responsável por criar e/ou alterar o valor global para os espaços físicos e o valor por assento.

---

## User

Entidade que descreve o colaborador e suas informações dentro da plataforma.

### Funcionalidades

- *Store*: Método responsável pela criação do usuário/colaborador.
- *List*: Método responsável pela listagem de todos os usuários/colaboradores que tem acesso à reservas de equipamentos.
- *TotalCost*: Método responsável por trazer informações de custo total por usuário/colaborador.

---

## Resource

Entidade que descreve o recurso e suas informações dentro da plataforma.

### Funcionalidades

- *Store*: Método responsável pela criação de recursos.
- *List*: Método responsável pela listagem de todos os recursos.
- *TotalCost*: Método responsável por trazer informações de custo total por recurso.

---

## Reservation

Entidade que descreve a reserva de equipamentos e suas informações dentro da plataforma.

### Funcionalidades

- *Store*: Método responsável pela criação de reservas.
- *List*: Método responsável por trazer as informações de todas as reservas e reservas por período (Passado ou Futuro).
- *Available*: Método responsável por trazer informações de lacunas de reservas possíveis por tipo de recurso.
- *Delete*: Método responsável por cancelar uma reserva.

---
