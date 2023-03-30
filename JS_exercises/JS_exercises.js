// ----==== JS School - Lecture 4 HW ====---- 

/**
 * РЎriteria for assessment
 * 
 * 5 - All tasks are correctly solved (23 items), the code is clean, the solutions are optimal;
 * 4 - Correctly solved all the tasks of the base block (15 tasks), the code is clean;
 * 3 - At least 10 problems are correctly solved, the code is clean;
 * 2 - Correctly solved at least 10 problems;
 * 1 - At least 5 problems solved correctly.
 */

/**
 * Warning
 * 
 * Do not rename function names or change arguments.
 */

// ----==== Basic exercises (15 items) ====---- 
/** Exercise 1
  *
  * Write a function that returns odd array values.
  * [1,2,3,4] => [1,3]   */
const getOddValues = numbers => numbers.filter(num => num%2 !== 0);
/** Exercise 2
  *
  * Write a function that returns the smallest value of an array
  * [4,2,10,27] => 2      */
const getSmallestValue = numbers => {
    let minimalValue = numbers[0];
    for (let number of numbers) {
        if (number < minimalValue) {
            minimalValue = number;
        }
    }
    return minimalValue;
};
/** Exercise 3
  *
  * Write a function that returns the biggest value of an array
  * [5,22,9,43] => 43     */
const getBiggestValue = numbers => Math.max(...numbers);
/** Exercise 4
  *
  * Write a function that takes an array of strings as input and returns only those shorter than 20 characters
  *
  *[
  * 'I am a short string',
  * 'I seem to be short too',
  * 'And I am a long string'
  *] => [
  * 'I am a short string',
  * 'And I am a long string'
  *]
  *
  * Use: filter    */
const getShorterStrings = (strings, characters = 20) => strings.filter(string => string.length < characters);
/** Exercise 5
  *
  * Write a function that takes the following data as input:
  *
  *[
  * { name: 'shark', likes: 'ocean' },
  * { name: 'turtle', likes: 'pond' },
  * { name: 'otter', likes: 'fish biscuits' }
  *]
  *
  * And returns an array of strings:  [ 'shark likes ocean', 'turtle likes pond', 'otter likes fish biscuits' ]
  *
  * Use: map    */
const getComputedStrings = fish => fish.map(aDict => `${aDict['name']} likes ${aDict['likes']}`);
/** Exercise 6
  *
  * Write a function that takes 2 objects as input and returns 1 with  
  * common properties. If properties have the same keys use the latter.
  *
  * [{ name: 'Alice' }, { age: 11 }] => { name: 'Alice', age: 11 }
  *
  * We use: ...    */
const mergeObjects = objects => Object.assign({}, ...objects);
/** Exercise 7
  *
  * Write a function that returns the smallest value of an array [5,200,-5,41] => -5
  *
  * Use: operator ... and Math.min  */
const getSmallestValue2 = numbers => Math.min(...numbers);
/** Exercise 8
  *
  * Write a function that returns odd array values.
  * [77,2,30,51] => [77,51]
  *
  * Use: reduce    */
const getOddValues2 = numbers => {
    const condition = (result, elem) => elem % 2 === 0 ? result : result.concat(elem);
    return numbers.reduce(condition, []);
};
/**   Exercise 9
  *
  * Write a function that accepts data from the basket as input in the following form:
  *
  *[
  * {price: 10, count: 2},
  * {price: 100, count: 1},
  * {price: 2, count: 5},
  * {price: 15, count: 6},
  *]
  * where price is the price of the item and count is the quantity.
  *
  * The function should return the total price for this order.
  *
  * Use: reduce    */
const calculateTotal = products => {
    const reducer = (previousSum, currentDict) => previousSum + currentDict['price']*currentDict['count'];
    return products.reduce(reducer, 0);
};
/**   Exercise 10
  *
  * Implement a function that has an array of numbers as input and an array of unique values as output
  * [1, 2, 2, 4, 5, 5] => [1, 2, 4, 5]
  *
  * Use: reduce and indexOf     */
const getUniqueValues = numbers => {
    const reducer = (result, currElem) => result.indexOf(currElem) === -1 ? result.concat(currElem) : result;
    return numbers.reduce(reducer, []);
};
/** Exercise 11
  *
  * Implement a function whose input is a numeric code of an error, the output is a string with a message
  * 500 => Server Error
  * 401 => Authorization failed
  * 402 => Server Error
  * 403 => Access denied
  * 404 => Not found
  *
  * Use: switch case or object like a map structure    */
const getErrorMessage = code => {
    const errorDict = {
        500: 'Server Error', 
        401: 'Authorization failed',
        402: "Server Error",
        403: "Access denied",
        404: "Not found",
    }
    return errorDict[code];
};
/** Exercise 12
  *
  * Write a function that returns the 2 smallest values of an array
  * [4,3,2,1] => [1,2]
  *
  * Use: .sort()      */
const get2SmallestValues = numbers => numbers.sort().slice(0, 2);
/** Exercise 13
  *
  * Implement a function, at the input of which an object of the following form:
  * {
  * firstName: 'Peter',
  * secondName: 'Vasiliev',
  * patronymic: 'Ivanovich'
  *}
  * output line with the message 'Name: Petr Ivanovich Vasiliev'   */
const getFullName = user => `Name: ${user['firstName']} ${user['patronymic']} ${user['secondName']}`;
/** Exercise 14
  *
  * Implement a function that takes 2 arguments as input: an array of numbers and a multiplier,
  * a returns an array of the original array, each element of which has been multiplied by a factor:
  *
  * [1,2,3,4], 5 => [5,10,15,20]
  *
  * Use: map   */
const multiplyTo = (numbers, multiplier) => numbers.map((number) => number*multiplier);
/**  Exercise 15
  *
  * Implement a function that takes 2 arguments as input: an array and a franchise,
  * and returns a string with the names of the heroes separated by a comma:
  *
  *[
  * {name: "Batman", franchise: "DC"},
  * {name: "Ironman", franchise: "Marvel"},
  * {name: "Thor", franchise: "Marvel"},
  * {name: "Superman", franchise: "DC"}
  *],
  * Marvel
  * => Ironman, Thor
  *
  * Use: filter, map, join   */
const getCharacterNames = (characters, franchise) => characters.filter(character => character['franchise']===franchise)
                                                                .map(aDict => aDict['name'])
                                                                .join(', ');

// ----==== Advanced exercises (8 items) ====----
/**   Exercise 16
  *
  * Write a function that returns an array of the smallest row values of a two-dimensional array
  *[
  * [10,1,300,4],
  * [20,2,300,400],
  * [30,3,300,4],
  * [40,4,300,4],
  *]
  * => [1,2,3,4]    */
const getSmallestRow = numbers =>  numbers.map(numArray => Math.min(...numArray));
  /**   Exercise 17
  *
  * Write a function that returns an array of the smallest column values of a two-dimensional array
  *[
  * [1,2,3,4],
  * [1,2,3,4],
  * [1,2,30,4],
  * [1,2,3,40],
  *]
  * => [1,2,3,4]    */
const getSmallestColumn = numbers => getSmallestRow(numbers[0].map((_, colIndex) => number.map(row => row[colIndex])));
/**
  * Exercise 18
  *
  * Write a function that returns the 2 biggest value of an array
  * [4,3,2,1] => [4,3]
  */
//const get2BiggestValues = numbers => numbers.sort().reverse().slice(0, 2);
const get2BiggestValues = numbers => numbers.sort((a, b) => b - a).slice(0, 2);
/** Exercise 19
  *
  * Write a function that returns the number of vowels in a string in English
  * ( a, e, i, o, u ).
  *
  * 'Return the number (count) of vowels in the given string.' => 15 */
/* Solution without Regex
    const getNumberOfVowels = string => {
    let stringArray = [...string.toLowerCase()]
    let vowelsArray = ['a', 'e', 'i', 'o', 'u'];
    let numVowelsArray = vowelsArray.map(vowel => [stringArray].reduce((total, letter) => total+ (letter==vowel), 0));
    return numVowelsArray.reduce((a,b) => a+b, 0);
};
*/
const getNumberOfVowels = string =>  string.match(/[aeiouAEIOU]/ig).length;
/** Exercise 20
  *
  * Write a function that returns an array of two strings where the first element
  * is the original string with uppercase even letters, and the second
  * with capital odd.
  * 'abcdef' => ['AbCdEf', 'aBcDeF']   */
const getCapitalizedStrings = string => {
};
/**
  * Exercise 21
  *
  * Write a function that satisfies the following conditions:
  *
  * the function takes a string S, consisting of N letters of the English alphabet in lowercase [a-z]
  * the function returns a string that does not contain three identical letters in a row
  * the function removes the minimum number of letters from the string S
  *
  * Examples:
  * S = "eedaaad", the function returns "eedaad". One "a" has been removed.
  * S = "xxxtxxx", the function returns "xxtxx". The same letters can occur more than three times in a string, but not in a row.
  * S = "uuuuxaaaaxuuu", the function returns "uuxaaxuu".
  *
  * Assumptions:
  * N is an integer in the range [1..200,000]
  * S consists only of lowercase letters [a-z]
  */
const getCorrectString = string => {
};
/**
 * Exercise 22
 *
 * Implement a flatten function that takes an array of arbitrary nesting arrays as input
 * and returns an array of all their elements without nesting.
 * [1, 2, [3, 4], 5, [[6, 7], 8], 9] => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
const getFlattenedArray = numbers => {
};
  /**
  * Exercise 23
  *
  * Implement a function that has an array of numbers as input and an array of not unique values as output.
  * 
  * [1, 2, 2, 4, 5, 5] => [2, 5]
  */
const getNotUniqueValues = numbers => {
};