//Homework 1: Exercise 1 - Part 1:
```typescript
var testEnv = "staging"; //no reason for a var type, const should be by default
let retries = 3;
const maxRetries = 5;

if (retries < maxRetries) {
  var attemptMessage = `Retry ${retries} of ${maxRetries}`; //var allows to be visible outside of the condition block...
}
console.log(attemptMessage); //...but if the above condition is FALSE then "undefined" will go to the console log
maxRetries = 10; //no sense to set a value to a const type
let userCount: number = "12"; //annotation type is number, but we have quotes here
```
//Homework 1: Exercise 1 - Part 2:
```typescript
const testEnv: string = "staging"; //const + annotation type is string
let retries: number = 3; //annotation type is number
const maxRetries: number = 5; //annotation type is number
let attemptMessage: string = ""; //declaration outside of condition block + annotation type is string with initialization

if (retries < maxRetries) {
  attemptMessage = `Retry ${retries} of ${maxRetries}`;
}
console.log(attemptMessage); //if the above condition is FALSE then empty string will be shown in console log, not undefined
let userCount: number = 12; //annotation type is number
```
//Homework 1: Exercise 2 - Solution:
```typescript
function classifyResponse(status: number): string
{
  //guard logic check first
  if(typeof status !== "number" || status < 0)
  {
    throw new Error(`Error! Unacceptable status code: ${status}​`);
  }
  //400-499 codes logic check
  if (status >= 400 && status <= 499)
  {
    return "Client Error";
  }
  //500+ codes logic check
  if (status >= 500)
  {
    return "Server Error";
  }
  //200 and 201 logic + all the rest codes 
  switch(status)
  {
    case 200:
    case 201:
      return "Success";
    default: 
      return "Unknown"; //logic for all the rest codes
  }
}
```
//Homework 1: Exercise 3 - Solution 1:
```typescript
const {name, status} = testResults[0];
console.log(`${name} ${status}`);
```
//Homework 1: Exercise 3 - Solution 2:
```typescript
for (const test of testResults)
{
  console.log(`${test.name} ${test.duration}`);
}
```
//Homework 1: Exercise 3 - Solution 3:
```typescript
const failedTests: string[] = [];
for(const test of testResults)
{
  if(test.status === "failed")
  {
    failedTests.push(test.name);
  }
}
```
//Homework 1: Exercise 3 - Solution 4:
```typescript
let totalDuration: number = 0;
for(const test of testResults)
{
  totalDuration += test.duration;
}
console.log(totalDuration);
```