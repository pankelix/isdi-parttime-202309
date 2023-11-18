setTimeout(() => {
    console.log('change color')

    document.body.style.backgroundColor = 'blue'
}, 1)

console.log('continue')

var before = Date.now()
//while(Date.now() - before < 3000);
for (; Date.now - before < 3000;);

console.log('with')

var before = Date.now()
//while(Date.now() - before < 2000);
for(; Date.now() - before < 2000;);

console.log('more things')

//continue
//with
//more things
//undefined
//change color