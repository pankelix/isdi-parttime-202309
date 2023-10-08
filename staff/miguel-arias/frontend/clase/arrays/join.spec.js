console.log('TEST join')

console.log('CASE for array ["Ghost"] and separator "," join should return "Ghost"')
console.log(join(["Ghost"], ","))
//"Ghost"

console.log('CASE for array ["Fire", "Air", "Water", "Earth"] and separator "*" join should return "Fire*Air*Water*Earth"')
console.log(join(["Fire", "Air", "Water", "Earth"], "*"))
//"Fire*Air*Water*Earth"