function toReversed(array) {
    reversedArray = []

    for (i = array.length -1; i > -1; i--)
        reversedArray[array.length -1 -i] = array[i] 
    
    return reversedArray
}
