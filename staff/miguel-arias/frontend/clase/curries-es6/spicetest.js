console.log('%cSpiceTest %c v0.0', 'color: tomato; font-weight: bold', 'color: dodgerblue; font-size: .7rem;')

function TEST(what) {
    console.log(`%cTEST: ${what}`,'color: magenta; font-weight: bold, font-size: .75rem;')
}

function CASE(what) {
    console.log(`%cCASE: ${what}`, 'color: black; font-weight: bold;')
}

function expectedOutput(what) {
    console.log(`%cExpected output:
${what}`, 'color: tomato')
}