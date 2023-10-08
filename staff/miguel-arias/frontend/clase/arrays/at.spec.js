console.log('TEST at')

console.log('CASE for array ["peter pan", "wendy", "james hook", "tinkerbell"] at 2 should return "james hook"')
console.log(at(["peter pan", "wendy", "james hook", "tinkerbell"], 2))
//james hook

console.log('CASE for array ["peter pan", "wendy", "james hook", "tinkerbell"] at 0 should return "peter pan"')
console.log(at(["peter pan", "wendy", "james hook", "tinkerbell"], 0))
//peter pan

console.log('CASE for array ["peter pan", "wendy", "james hook", "tinkerbell"] at -1 should return "tinkerbell"')
console.log(at(["peter pan", "wendy", "james hook", "tinkerbell"], -1))
//tinkerbell

console.log('CASE for array ["peter pan", "wendy", "james hook", "tinkerbell"] at -3 should return "wendy"')
console.log(at(["peter pan", "wendy", "james hook", "tinkerbell"], -3))
//wendy

console.log('CASE for array ["peter pan", "wendy", "james hook", "tinkerbell"] at 75 should return "undefined"')
console.log(at(["peter pan", "wendy", "james hook", "tinkerbell"], 75))
//undefined