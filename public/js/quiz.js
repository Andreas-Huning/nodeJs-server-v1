"use strict";


let quizfragenArray = quizArr.slice();

let categoryContainer = document.querySelector("#categorySelect");
let numbersOfQuestionContainer = document.querySelector("#numbersSelect");
let questionContainer = document.querySelector(".questionContainer");
let answerContainer = document.querySelector(".answerContainer");
let resultContainer = document.querySelector(".resultContainer");
let statusContainer = document.querySelector(".statusContainer");
let newGameButton = document.querySelector(".newGameButton");
let category = new Set();
let optionIndex=2;
let categoryFragen;
let currentQuestion = 0;
let maxQuestions;
let correctAnswerCounter;

const quizStart = function(){
    // console.log("Quiz-Start");
    clearAll()
    loadCategory()
    setCategoryOption()
    categoryEvent()
    numberEvent()       
    hideNewGameButton()
    newGameEvent()
};

const loadQuestion = function (){
    if(currentQuestion==maxQuestions){
        hideNumbersOfQuestionContainer();
        statusContainer.innerHTML ="";
        questionContainer.innerHTML="";
        resultContainer.innerHTML=`Diese Runde ist beendet. ${correctAnswerCounter} von ${maxQuestions} Fragen wurden richtig beantwortet`
        showNewGameButton();
    }else{
        questionContainer.innerHTML="";
        questionContainer.innerHTML=categoryFragen[currentQuestion].question;
        loadAnswer()
        updateMassage()
    }

};
const loadAnswer = function(){
    answerContainer.innerHTML="";
   
    let answerArray = categoryFragen[currentQuestion].answer.split(",");
    let index=0
    answerArray.forEach(element=>{
        let newButton = createTag("div","answerButton",element);
        newButton.id = index;
        newButton.addEventListener("click",checkAnswer);
        answerContainer.append(newButton);
        index++
    })
       showButton()
};
const checkAnswer = function(){
    hideButton();
    let correctAnswer = categoryFragen[currentQuestion].correctanswer;
    let userAnswer = this.id;
    console.log("richtige antwort",correctAnswer);
    console.log("user antwort",userAnswer);

    if(userAnswer==correctAnswer){
        correctAnswerCounter++;
        currentQuestion++;
        updateMassage()
        statusContainer.innerHTML ="Super, die Antwort war richtig"
        setTimeout(loadQuestion, 1000);        
    }else{
        let correctAnswerArray = categoryFragen[currentQuestion].answer.split(",");
        let correctAnswerString=correctAnswerArray[correctAnswer]
        statusContainer.innerHTML = `Leider Falsch, die richtige Antwort wäre: <strong><i>${correctAnswerString}</i></strong>`
        currentQuestion++;
        setTimeout(loadQuestion, 3000);
    }
};

const newGameEvent = function(){
    newGameButton.addEventListener("click",quizStart)
}


const clearAll = function(){
    optionIndex=2
    categoryContainer.innerHTML="";
    questionContainer.innerHTML="";
    resultContainer.innerHTML="";
    statusContainer.innerHTML="";
    categoryFragen = [];
    correctAnswerCounter=0;
    currentQuestion=0;
    hideNumbersOfQuestionContainer()
};
const loadCategory = function(){
    quizfragenArray.forEach(element => {
        category.add(element.cat);
    });  
};
const setCategoryOption = function(){
    let firstOption=createTag("option","option-1 Kategorie-auswählen","Kategorie auswählen");
    categoryContainer.append(firstOption);
    category.forEach(element =>{    
        let newOption = createTag(`option`,`option-${optionIndex} ${element}`,element)
        newOption.value=element
        optionIndex++
        categoryContainer.append(newOption)
    })
};
const categoryEvent = function(){
    categoryContainer.addEventListener("change",function(){        
        if(categoryContainer.value=="Kategorie auswählen"){
            quizStart()
            return
        }else{
            categoryFragen = [];
            quizfragenArray.forEach(element =>{
               
                if(element.cat==categoryContainer.value){
                    categoryFragen.push(element)
                };
            })
            showNumbersOfQuestionContainer()
            numbersOfQuestions()
            mixQuestionsArray()
        };
       
    })
};
const hideNumbersOfQuestionContainer = function(){
    numbersOfQuestionContainer.style.display = "none"
};
const showNumbersOfQuestionContainer = function(){
    numbersOfQuestionContainer.style.display = "inherit"
};

const mixQuestionsArray = function(){
    categoryFragen = categoryFragen.sort(()=>0.5-Math.random());
    
}
const numbersOfQuestions = function(){
    numbersOfQuestionContainer.innerHTML="";
    let firstOption=createTag("option","option-1 Anzahl-auswählen","Wie viele Fragen?");
    numbersOfQuestionContainer.append(firstOption)
    if(categoryFragen.length >= 5){
        let selectOption2 = createTag("option","selectOption2","5");     
        selectOption2.value = 5;
        numbersOfQuestionContainer.append(selectOption2);
    }
    if(categoryFragen.length >= 10){
        let selectOption3 = createTag("option","selectOption3","10");     
        selectOption3.value = 10;
        numbersOfQuestionContainer.append(selectOption3);
    }
    let selectOptionAll =createTag("option","selectOptionAll","alle "+ categoryFragen.length +" Fragen");
    selectOptionAll.value = categoryFragen.length;
    numbersOfQuestionContainer.append(selectOptionAll);
    
    
};
const numberEvent = function (){
    numbersOfQuestionContainer.addEventListener("change", function (){
        if(numbersOfQuestionContainer.value=="Wie viele Fragen?"){
            maxQuestions = 0
            return
        }else{            
            maxQuestions = numbersOfQuestionContainer.value;
            console.log(maxQuestions);
            loadQuestion()
        }
    })
};
const hideButton = function(){
   
    answerContainer.style.display="none"
};
const showButton = function(){
   
    answerContainer.style.display="inherit"
};
const updateMassage = function(){
    resultContainer.innerHTML=`Frage ${currentQuestion} von ${maxQuestions} <br> Es wurden ${correctAnswerCounter} von ${maxQuestions} richtig beantwortet. `
    statusContainer.innerHTML="";
};
const hideNewGameButton = function(){    
    newGameButton.style.display="none"
};
const showNewGameButton = function(){   
    newGameButton.style.display="inherit"
};


function createTag(tag, klasse = "", content = "") {
    let newTag = document.createElement(tag);
    newTag.className = klasse;
    newTag.innerHTML = content;
    return newTag;
  }

quizStart()