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

## ToDo`s

- Mocks Iniciais (5 Colaboradores e 10 Recursos)
- Docker.compose
- Arquivo insomnia
- Video

---
