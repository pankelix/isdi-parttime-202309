# House organization App

## Intro

An app to help with the organization of the house chores

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjk5ZXEzejNiam91aDd0N3g4YXdkYjNodHcwOWllaXhxMTk2dXRidCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NV4cSrRYXXwfUcYnua/giphy.gif)

Create a Home group, with several users that live inside the same house

Different profiles with different permissions (admin/user/home/child)

## Functional Description

### Use Cases

* Register House (all house members share account)
* Manage House
    - Create profile (basic role by default)
        - Assign name & pincode
    - Manage profiles
        - Assign role to profile (admin)
        - Delete own profile (admin can all profiles)
        - Change picture (gallery/photo)
        - Change color
* Manage tasks
    - See and filter tasks
    - Create new tasks
    - React to tasks
        - Assign this task (user to self, admin to all) (pincode needed)
        - Complete this task (pincode needed)
        - Delay this task (pincode needed)
        - Edit task (admin) (pincode needed)
        - Delete task (admin) (pincode needed)
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

### Views

#### House registration

* House creation
    - Name
    - Rooms
    - Email & password

#### Home view

* Tasks feed
    - Default: Calendar since actual day (vertical infinite scroll)
    - Filter
        - Date range (canceled)
        - Room
        - Assigned person
        - Points granted (canceled)
    - Tasks (go to **Task templates**)
    - Stats (go to **Stats**)
    - Profile (go to **Profile views**)
    - Click on task (go to **Task reaction**)
    - New task (+)
        - Create new task (goto **Task templates**)
        - Propose task (status active)

#### Profile views

* Profile creation
    - Admin
        - Change profile role
        - Delete all profiles
    - User
        - Change picture
        - Change color
        - Delete profile

#### Task reaction

* Assign this task
    - Pincode needed
    - To self (user), to another users (admin)
* Complete this task
    - Pincode needed
    - Completion date (today by default)
    - If it's a periodic task, it renovates automatically
    - Points assignation
* Delay task (delay counter)
* Edit this task (admin)
* Delete this task (admin)

#### Task templates

* See all task templates
* Filter task templates
    - By room
    - By points awarded (canceled)
* Edit task
* Store task
* Delete task
* Create task (status unactive)
    - Task name
    - Temporality: punctual, daily, weekly (every wednesday), monthly (every day 23) or choose (every x days)
    - Room
    - Points awarded for completion (optional)

#### Stats

* Ranking of points
* Stats about cleaning

## Technical Description

### Data Model

Home
* id (string)
* name (string)
* email (string)
* password (string)

Room
* id (string)
* home (Home.id)
* name (string)

Profile
* id (string)
* home (Home.id)
* name (string)
* pincode (string)
* color (object)
    - name (string)
    - code (string)
* role (string)
* points (number)

Template
* id (string)
* home (Home.id)
* name (string)
* rooms ([Room.id])
* periodicity (string)
* points (number)

Task
* id (string)
* home (Home.id)
* template (Template.id)
* assignee (Profile.id)
* done (boolean)
* date (Date)
* oldId (String)

## Future versions will include:

##### Store tasks (instead of deletion)

##### Alternatives to pincode (version 2)

* Fingerprint
* Face scan

##### Shopping list (version 2)

* See different shopping lists

* Create new list (+)
    - Blank list / Choose from templates
    - All users can add things to this list
    - Assign TO a task (optional)

* On the list
    - Save as a template
    - Activate shopping mode
        - No more additions
        - For every item choose between "checked" or "not found"
        - Not found items go directly to a new list
        - Lógica para el orden en que se hace check (las próximas veces se propondrá este orden para facilitar la compra)
        - Finalize (and add a picture of the ticket)

##### Push notifications (version 2)

* Today's assigned to me tasks
* Today's free tasks

##### Quality of life (version 2)

* Compatibility with assistants like Siri, Google assistant o Alexa
* Transform a picture of the ticket to text, this way budgets can be done

##### Appointments

* Addition of appointments (medical, travels, leisure...)
* Pre-made tasks according to the appointment (for example if there's a dinner at home clean living room / do groceries / clean kitchen ...)
* Ticket adding
* Notificaciones push diarias:
    - citas de hoy