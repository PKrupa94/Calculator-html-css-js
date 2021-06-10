//variables
let valueStrInMemory = null; //store previous result of the operation
let operatorInMemory = null; //store the operator which last clicked
let isOperatorClick = false; //till next value it will display current value(2 + )
let lastClickNumInMemory = null;

const displayResult = document.querySelector(".display-result")

document.querySelector('.calculator-buttons').addEventListener('click', function(event) {
    if(event.target.target = "BUTTON"){
        calButtonClick(event.target.innerHTML)
    }
});

//this function check whether btnValue is number or operator
function calButtonClick(btnValue){
    //check for symbol 
    if (isNaN(parseInt(btnValue))) {
        handleOpetatorClick(btnValue)
    } else {
        handleNumberClick(btnValue.toString())
    }
    
}

//display result on screen
function setStrAsValue(strValue){
    if(strValue[strValue.length - 1] === '.'){
        displayResult.value += '.';
        return
    }
    const [strWholeNum,strDecimalNum] = strValue.split('.')
    if(strDecimalNum){
        displayResult.value = parseFloat(strWholeNum).toLocaleString() + "." + strDecimalNum;
    }else{
        displayResult.value = parseFloat(strWholeNum).toLocaleString();
    }
}

const getStrAsValue = () => displayResult.value.split(',').join('');

const getNumAsValue = () => parseFloat(getStrAsValue());


function handleNumberClick(numStr) {
    if(isOperatorClick) {
        setStrAsValue('0')
        isOperatorClick = false
    }
    const strCurrentDisplayResult = getStrAsValue();
    if(strCurrentDisplayResult === '0' && !isOperatorClick){
        //remove the 0 from the beginning of the screen
        setStrAsValue(numStr)
    }else{
        //append the string with current display string
        setStrAsValue(strCurrentDisplayResult + numStr)
    }
}

function handleOpetatorClick(inputOperator){
    switch (inputOperator){
        //clear everything on display
        case "AC":
            setStrAsValue('0');
            valueStrInMemory = null;
            operatorInMemory = null;
            lastClickNumInMemory = null;
            isOperatorClick = false;
            break;
        case ".":
            const strCurrentDisplayResult = getStrAsValue();
            //only allow to add one . in input
            if (!strCurrentDisplayResult.includes('.')) {
                setStrAsValue(strCurrentDisplayResult + ".");
            }
            break;
        //calculate percentage
        case "%":
            const currentResultValue = getNumAsValue();
            const newValueNum = currentResultValue/100;
            setStrAsValue(newValueNum.toString());
            valueStrInMemory = null;
            operatorInMemory = null;
            break;
        //display final result
        case "=":
            console.log(getStrAsValue())
            console.log(lastClickNumInMemory)
            console.log(operatorInMemory)

            if(valueStrInMemory){
                setStrAsValue(getMathOperationResultAsStr());
                valueStrInMemory = null;
                return
                // operatorInMemory = null;
            }
            if (lastClickNumInMemory){
                setStrAsValue(getMathOperationResultAsStr());
            }

            break;
        //remove one by one number from display
        case "←":
            if(getStrAsValue().length === 1){ //if the screen is any single number, always turn it to 0 when deleting
                setStrAsValue('0');
            }else{
                displayResult.value = getStrAsValue().substring(0,getStrAsValue().length-1)
            }
            break;
        default:
            handleOperatorClick(inputOperator);
            break;
    }
}

function handleOperatorClick(inputOperator){
    const currentResultStr = getStrAsValue();
    isOperatorClick = true
    //if there is noting in memory it will save here
    if(!valueStrInMemory){
        valueStrInMemory = currentResultStr;
        operatorInMemory = inputOperator;
        setStrAsValue(valueStrInMemory);
        return;
    }
    valueStrInMemory = getMathOperationResultAsStr();
    operatorInMemory = inputOperator;
    setStrAsValue(valueStrInMemory);
}

function getMathOperationResultAsStr(){
    let newResultAsNum;
    let valueInMemoryAsNum;
    let currentDisplayValue;
       
    if (valueStrInMemory) {
        currentDisplayValue = getNumAsValue();
        lastClickNumInMemory = currentDisplayValue
        valueInMemoryAsNum = parseFloat(valueStrInMemory);
    } else {
       valueInMemoryAsNum = getNumAsValue()
       currentDisplayValue = lastClickNumInMemory;
    }

    if(operatorInMemory === "+"){
        newResultAsNum = valueInMemoryAsNum + currentDisplayValue;
    }else if(operatorInMemory === "-"){
        newResultAsNum = valueInMemoryAsNum - currentDisplayValue;
    }else if(operatorInMemory === "x"){
        newResultAsNum = valueInMemoryAsNum * currentDisplayValue;
    }else{
        newResultAsNum = valueInMemoryAsNum/currentDisplayValue;
    }
    return newResultAsNum.toString()
}

