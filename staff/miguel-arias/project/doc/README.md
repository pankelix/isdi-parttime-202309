# Pepito App

## Intro

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjk5ZXEzejNiam91aDd0N3g4YXdkYjNodHcwOWllaXhxMTk2dXRidCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NV4cSrRYXXwfUcYnua/giphy.gif)

#### Una aplicación para facilitar la organización de las tareas del hogar

## Functional Description

### Use Cases

* Reunir varios usuarios en un hogar
* Distintos permisos
* Invitación sencilla
* Ver y filtrar tareas
* Crear nuevas tareas y asignarlas a distintos usuarios
* Notificaciones push con recordatorios
* Listas de la compra lógicas
<!-- Cosas que el usuario podrá hacer en la aplicación (cosas que aporten valor, cosas tipo Login, Register... sobran)
* search socks
* add socks to cart
* view cart
* add / remove items
* checkout cart
* view orders
* view order status
* ...
* ... -->

##### Tareas del hogar

* Crear un grupo de hogar, con varios usuarios que habiten dentro de la misma vivienda

* Poder otorgar distintos perfiles con distintos permisos (admin/user/hogar). (Hogar es la tablet que tiene la familia para que los niños actuen, con muy pocos permisos, ya que los niños no tienen móviles)

#### Vista 1 manejo usuarios

* Crear código de invitación admin/user/hogar (botón rápido de copia)
    - Primera vez en la app
        - Nombre
        - Elegir foto
        - Elegir color de asignación (mostrar los ya usados tachados)
        - Me gustaría no pedir email ni contraseña, ¿es posible?

* Lista con los usuarios de la vivienda
    - Eliminar usuario
    - Editar usuario
        - Cambiar foto
        - Cambiar color de asignación

##### Vista 2 principal

* Ver todas las tareas
    - Default: Calendario desde actual (scroll infinito vertical)
    - Filtrado
        - Por rango de fechas
        - Por habitación
        - Por persona asignada
    - Proponer tarea (+)
        - Elegir una tarea de las creadas
        - Crear una nueva (lleva a vista 3)
        - Asignar tarea (opcional)

* Reaccionar a tarea creada
    - Asignar esta tarea
        - Admin: asigna a propio, a admin y a user
        - User: asigna a propio
        - Hogar: no asigna nada
    - Completar esta tarea
        - Fecha de compleción (de base hoy)
        - Si es periódica, se recalcula el nuevo deadline
        - Se entregan puntos (si los tiene)
    - Editar esta tarea
    - Eliminar esta tarea

##### Vista 3 tareas

* Habitación
    - Crear tarea
        - Nombre de la tarea
        - Temporalidad: puntual, diaria, semanal (cada miércoles), mensual (cada día 23) o elegir (cada x días)
        - Habitación a la que pertenece (de base en la que estás)
        - Puntos que vale completarla (opcional)
    - Editar tarea
    - Archivar tarea
    - Eliminar tarea

* Notificaciones push diarias:
    - Tareas de hoy asignadas
    - Tareas de hoy aun libres

##### Vista 4 Lista de la compra

* Ver distintas listas creadas

* Crear nueva lista (+)
    - Lista en blanco / Elegir entre las plantillas
    - Todos los usuarios pueden añadir a estas listas
    - Asignar a una tarea (opcional)

* En la lista
    - Guardar como plantilla
    - Activar modo comprar
        - Ya no se puede añadir nada
        - Aparece el modo check y el modo "no encontrado"
        - Los objetos que no se han encontrado pasan directamente a la siguiente lista
        - Lógica para el orden en que se hace check (las próximas veces se propondrá este orden para facilitar la compra)
        - Opción de finalizar, donde se puede añadir el ticket





## A futuro (proximas versiones):

* Compatibilidad con asistentes como Siri, Google assistant o Alexa
* Cada habitación que tenga un % de limpieza, según las tareas por hacer vs las tareas hechas

* Transformador de foto de ticket en ticket digital de texto para ahorro de datos y para manejar "presupuestos"

##### Vista nueva: puntuación (opcional)

* Ranking de puntos
* Estadísticas
* Crear premios

##### Vista nueva: citas

* Citas (médico tal dia para user1, cena tal otro dia para users 1 y 2)
* Sugerencias de tareas prehechas según la cita (por ejemplo si hay cena en casa, recoger salón / limpiar cocina / hacer compra)
* Opción de adjuntar tickets

* Notificaciones push diarias:
    - citas de hoy

## Technical Description

### Data Model

User
* id (string)
* name (string)
* email (string)
* password (string)

Task
* id (string)
* name (string)
* periodical (string)
* done (boolean)
* points?? (number)
* Comments

Shopping list
* id (string)
* items (array)

...

<!-- Sock
* id (string)
* name (string)
* size (string)
* theme (string)
* brand (string)
* price (number)

Cart
* id (string)
* user (user.id)
* items ([socks.id])

Order
* id (string)
* date (Date
* items ([socks.id])) -->
