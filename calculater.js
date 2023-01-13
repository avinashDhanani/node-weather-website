let MainString = [];
let currentNum = "emp";

function buttonClick(num) {
  switch (true) {
    case num == "AC": {
      console.log("AC");
      MainString = [];
      currentNum = "emp";
      document.getElementById("screen-ans").innerHTML = "= 0";
      break;
    }
    case num == "ers": {
      console.log("ers");
      if (currentNum != "emp") {
        currentNum = Math.floor(currentNum / 10);
      } else {
        let popNumber = MainString.pop();
        console.log("pop :- ", popNumber);
      }
      break;
    }
    case num == "+" || num == "-" || num == "*" || num == "/" || num == "^": {
      if (currentNum != "emp") {
        MainString.push(currentNum);
      }
      MainString.push(num);
      currentNum = "emp";
      console.log("sign :- ", num);
      console.log(MainString);
      break;
    }
    case num == "opBracket": {
      if (currentNum != "emp") {
        MainString.push(currentNum);
        currentNum = "emp";
        MainString.push("*");
      }
      MainString.push("(");
      break;
    }
    case num == "closingBracket": {
      if (currentNum != "emp") {
        MainString.push(currentNum);
        currentNum = "emp";
      }
      MainString.push(")");
      break;
    }
    case num == 0 ||
      num == 1 ||
      num == 2 ||
      num == 3 ||
      num == 4 ||
      num == 5 ||
      num == 6 ||
      num == 7 ||
      num == 8 ||
      num == 9: {
      if (currentNum == "emp") {
        currentNum = 0;
      }
      currentNum = currentNum * 10 + num;
      console.log("num :- " + currentNum);
      break;
    }
    case num == "eq": {
      if (currentNum != "emp") {
        MainString.push(currentNum);
        currentNum = "emp";
      }
      InfixtoPostfix();
      break;
    }
    default:
      console.log("enter valid fild");
  }
  printOnScreen();
}

function printOnScreen() {
  let inputStr = "";
  for (let i of MainString) {
    console.log(i);
    inputStr += i;
  }
  if (currentNum != "emp") {
    inputStr += currentNum;
  }
  if (inputStr == "") {
    inputStr = 0;
  }
  document.getElementById("input-screen").innerHTML = inputStr;
  console.log(inputStr);
}

class Stack {
  constructor() {
    this.arr = [];
    this.top = -1;
  }
  push(e) {
    this.top++;
    this.arr[this.top] = e;
  }
  pop() {
    if (this.top == -1) return -1;
    else {
      var popped_ele = this.arr[this.top];
      this.top--;
      return popped_ele;
    }
  }
  top1() {
    return this.arr[this.top];
  }
  isEmpty() {
    return this.top == -1 ? true : false;
  }
}

// Function to return the precedency of operator
function precedency(pre) {
  if (pre == "@" || pre == "(" || pre == ")") {
    return 1;
  } else if (pre == "+" || pre == "-") {
    return 2;
  } else if (pre == "/" || pre == "*") {
    return 3;
  } else if (pre == "^") {
    return 4;
  } else return 0;
}

// Function to convert Infix to Postfix
function InfixtoPostfix() {
  let stack1 = new Stack();
  const ansArray = [];
  let errorMessage = "";
  for (let i of MainString) {
    console.log(i);
    if (!isNaN(i)) {
      console.log("it is number");
      ansArray.push(i);
    } else {
      console.log("it is not number");
      let prece = precedency(i);
      if (i == ")") {
        while (!stack1.isEmpty() && stack1.top1() != "(") {
          ansArray.push(stack1.pop());
        }
        if (stack1.isEmpty()) {
          errorMessage = "invalid input";
          break;
        }
        if (stack1.top1() == "(") {
          stack1.pop();
        }
      } else if (i == "(") {
        stack1.push(i);
      } else {
        if (stack1.isEmpty()) {
          stack1.push(i);
        } else {
          while (!stack1.isEmpty() && prece <= precedency(stack1.top1())) {
            ansArray.push(stack1.pop());
          }
          stack1.push(i);
        }
      }
    }
  }
  while (!stack1.isEmpty()) {
    if (stack1.top == "(") {
      errorMessage = "invalid input";
    }
    ansArray.push(stack1.pop());
  }
  if (errorMessage == "") solveInfix(ansArray);
  else console.log("error in infix to postfix");
}

const solveInfix = (ansArray) => {
  let stack = new Stack();
  let ans = 0;
  let errorMessage = "";
  for (let i of ansArray) {
    if (!isNaN(i)) {
      stack.push(i);
    } else if (stack.isEmpty()) {
      errorMessage = "Invalid input";
    } else {
      let ele1 = stack.pop();
      if (stack.isEmpty()) {
        errorMessage = "Invalid input";
        break;
      }
      let ele2 = stack.pop();
      switch (i) {
        case "+":
          ans = ele2 + ele1;
          stack.push(ans);
          break;
        case "-":
          ans = ele2 - ele1;
          stack.push(ans);
          break;
        case "*":
          ans = ele2 * ele1;
          stack.push(ans);
          break;
        case "/":
          ans = ele2 / ele1;
          stack.push(ans);
          break;
        case "^":
          ans = Math.pow(ele2, ele1);
          stack.push(ans);
          break;
      }
    }
  }
  if (errorMessage != "") {
    document.getElementById("screen-ans").innerHTML = '= ' + errorMessage;
    console.log(errorMessage);
  } else if (!stack.isEmpty()) {
    let val =  stack.pop();
    document.getElementById("screen-ans").innerHTML = '= ' + val;
  } else {
    document.getElementById("screen-ans").innerHTML ='= ' + " =errorMessage";
  }
};
