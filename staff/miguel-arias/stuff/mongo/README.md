# Mongo

## server

* En la carpeta users/Usuario/mongodb

```sh
$ ./bin/mongod --dbpath data
```

## shell

* En la carpeta users/Usuario/mongodb

```sh
$ ./bin/mongosh
```

### Commands

#### Mostrar las bases de datos que tengo

```sh
test> show databases
admin   40.00 KiB
config  60.00 KiB
local   40.00 KiB
```

#### Mostrar las colecciones que tengo (ninguna por ahora)

```sh
test> show collections

```

#### En la base de datos en la que estoy, en usuarios, crear un nuevo usuario

```sh
test> db.users.insertOne({ name: 'Peter Pan', email: 'peter@pan.com', password: '123123123', favs: []})
{
  acknowledged: true,
  insertedId: ObjectId('658849c3f9bb9a3a23ed54bf')
}
```

#### Ahora si aparece algo nuevo

```sh
test> show collections
users
```

```sh
test> db.users.find()
[  
  {
    _id: ObjectId('658849c3f9bb9a3a23ed54bf'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
  }
]
```

```sh
test> db.users.updateOne({ _id: ObjectId('658849c3f9bb9a3a23ed54bf')}, {$set:{ password: '456456456'}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```

```sh
test> db.users.findOne({ _id:ObjectId('658849c3f9bb9a3a23ed54bf')})
{
  _id: ObjectId('658849c3f9bb9a3a23ed54bf'),
  name: 'Peter Pan',
  email: 'peter@pan.com',
  password: '456456456'
}
```

```sh
test> db.users.deleteOne({ _id: ObjectId('658849c3f9bb9a3a23ed54bf')})
{ acknowledged: true, deletedCount: 1 }
```

```sh
test> db.users.deleteMany({})
{ acknowledged: true, deletedCount: 1 }
```

```sh
test> db.users.renameCollection('NewName')
{ ok: 1}

```

```sh
test> db.posts.insertOne({author: ObjectId('658956f7eed889536efe91d7'), image: 'https://cdn.vox-cdn.com/thumbor/G2_YBEGrXr_RKul6RoSoPz5eE2A=/0x0:937x703/1400x1400/filters:focal(395x278:543x426):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/55923535/Peter_Pan.0.jpeg', text: 'Me doing cozitash malash', likes: []})
{
  acknowledged: true,
  insertedId: ObjectId('658958dceed889536efe91d9')
}

test> db.posts.insertOne({author: ObjectId('658956fbeed889536efe91d8'), image: 'https://i.ebayimg.com/images/g/lhAAAOSw-itXtT-7/s-l1200.webp', text: 'Goodbye World!', likes: []})
{
  acknowledged: true,
  insertedId: ObjectId('65895a08eed889536efe91da')
}
```

```sh
test> 

```

```sh
test> 

```

```sh
test> 

```
