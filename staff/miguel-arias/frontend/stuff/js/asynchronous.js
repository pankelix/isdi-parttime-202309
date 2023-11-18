setTimeout(() => console.log('A'), 100)
setTimeout(() => console.log('B'), 10)
setTimeout(() => console.log('C'), 1)

console.log('continue')

var before = Date.now()
while (Date.now() - before < 3000);

console.log('with')

var before = Date.now()
while(Date.now() - before < 2000);

console.log('more things')

//continue
//with
//more things
//undefined
//C (porque "se ejecutó" primero, al tener menos tiempo de espera (0.001s), llegó antes la orden de ejecución)
//B
//A