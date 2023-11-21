# Pepito App

## Intro

<!-- ![](html del gif x) -->

Blah blah blah...

## Functional Description

### Use Cases

<!-- Cosas que el usuario podrá hacer en la aplicación (cosas que aporten valor, cosas tipo Login, Register... sobran)
- search socks
- add socks to cart
- view cart
- add / remove items
- checkout cart
- view orders
- view order status
- ...
- ... -->

- Crear tareas del hogar
- Asignar periodicidad a estas tareas (por ejemplo, pasar polvo salón 1 vez/semana, limpiar ventanas dormitorio 1 vez/mes)
- El usuario podrá asignarse una tarea
- Controlar cuantas tareas ha realizado cada usuario y hacer estadísticas
- Lista de la compra
- Guardar listas de la compra genéricas (plantillas)
- Citas (médico tal dia para user1, cena tal otro dia para users 1 y 2)

## Technical Description

### Data Model

User
- id (string)
- name (string)
- email (string)
- password (string)

Task
- id (string)
- name (string)
- periodical (string)
- done (boolean)
- points?? (number)

Shopping list
- id (string)
- items (array)

...

<!-- Sock
- id (string)
- name (string)
- size (string)
- theme (string)
- brand (string)
- price (number)

Cart
- id (string)
- user (user.id)
- items ([socks.id])

Order
- id (string)
- date (Date
- items ([socks.id])) -->
