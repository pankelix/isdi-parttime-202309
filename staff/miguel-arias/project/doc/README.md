# Pepito App

## Intro

<!-- ![](html del gif x) -->

Blah blah blah...

## Functional Description

### Use Cases

<!-- Cosas que el usuario podrá hacer en la aplicación (cosas que aporten valor, cosas tipo Login, Register... sobran) -->
- search socks
- add socks to cart
- view cart
- add / remove items
- checkout cart
- view orders
- view order status
- ...
- ...

## Technical Description

### Data Model

User
- id (string)
- name (string)
- email (string)
-password (string)

Sock
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
- items ([socks.id]))

...