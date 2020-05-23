const STORE = [
  {
    question: 'How many members make up the band BTS?',
    answers: [
      '3',
      '2',
      '7',
      '6'
    ],
    correctAnswer:
      '7'
  },
  {
    question:
      'Which member is the oldest?',
    answers: [
      'Suga',
      'Jin',
      'Jimin',
      'V'
    ],
    correctAnswer:
      'Jin'
  },
  {
    question:
      'Which member is Kim Namjoon? ',
    answers: [
      'J-Hope',
      'Jungkook',
      'RM',
      'V'
    ],
    correctAnswer: 'RM'
  },
  {
    question: 'Which member is the youngest?',
    answers: [
      'Jungkook',
      'Jimin',
      'V',
      'Suga'
    ],
    correctAnswer: 'Jungkook'
  },
  {
    question:
      'V once played in role in the historical television series: ',
    answers: [
      'Romance Is A Bonus Book',
      'Hotel Del Luna',
      'Hwarang',
      'Itaewon Class'
    ],
    correctAnswer:
      'Hwarang'
  }
];

let score = 0;
let questionNumber = 0;

//generate each question
function generateQuestion(){
  if (questionNumber < STORE.length) {
    return createForm(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(5);
  };
}

//increments 1 by 1, updates current score in header
function showScore(){
  score++;
  $('.score').text(score + "/5");
}

//increments 1 by 1, shows question "n out of 5"
function showQuestionNumber(){
   questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//updates question and score
function resetStats(){
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//utilize start button
function startQuiz(){
   $('.altBox').hide();
    $('.quiz').on('click', '.startButton', function (event) {
    event.preventDefault;
    $('.quiz').hide()
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits selected answer
//run answer functions - "correct", "wrong"
function answerQuestion(){
  $('.btsBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//html for question form
function createForm(questionIndex){
  let questionForm = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`);

  let fieldSelector = $(questionForm).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sized" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return questionForm;
}

function correctAnswer(){
  $('.response').html(
    `<h3>Your answer is correct!</h3>
    <img src="jungkook.gif" alt="jungkook finger hearts" class="images" width="200px">
      <p class="sized">Nice!</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  showScore();
}

function wrongAnswer(){
  $('.response').html(
    `<h3>Ah, better luck next time.</h3>
    <img src="sad-suga.jpg" alt="Suga sad face" class="images" width="200px">
    <p class="sized">The correct answer is:</p>
    <p class="sized">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//button click to go to next question
function nextQuestion(){
  $('.btsBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    showQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

function finalScore(){
  $('.final').show();
  return $('.final').html(
        `<h3>Your score is ${score} / 5</h3>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//resets everything, restarts quiz
function restart(){
  $('.btsBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.quiz').show();
  });
}

function doTheQuiz(){
  startQuiz();
  generateQuestion();
  answerQuestion();
  nextQuestion();
  restart();
}

$(doTheQuiz);
