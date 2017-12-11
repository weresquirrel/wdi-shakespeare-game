$(() => {
/////////
// Some global variables
  let currentScore = 0;

  const $h2 = $('h2');
  const $options = $('#options');
  const $score = $('#score').find('p').find('span');
  const $happyMask = $('#happy');
  const $sadMask = $('#sad');
  $score.text(currentScore);
  let challengesLevel1 = [];

  // THE PROTOTYPE
  function Sentence(sentenceStart, sentenceFinish, rightAnswer, wrongAnswers, worth){
    this.sentenceStart = sentenceStart;
    this.sentenceFinish = sentenceFinish;
    this.rightAnswer = rightAnswer;
    this.wrongAnswers = wrongAnswers;
    this.worth = worth;
    this.options = this.wrongAnswers;
    this.options.push(rightAnswer);
    this.incomplete = function() {
      return `${this.sentenceStart} _______ ${this.sentenceFinish}`;
    };
    this.complete = function() {
      return `${this.sentenceStart} ${this.rightAnswer} ${this.sentenceFinish}`;
    };
  }
  // the instances
  // SENTENCE 1
  const sentence1 = new Sentence('"My kingdom for', '!"', 'a horse', ['a flamingo', 'an idiot', 'a spaniel'], 1);
  challengesLevel1.push(sentence1);

  // SENTENCE 2
  const sentence2 = new Sentence('"To be,', 'not to be"', 'or',['and', 'by'], 1);
  challengesLevel1.push(sentence2);

  // ////I need a function to decide if the answer the user chose is or not the right one
  function checkTheAnswer(userChoice) {
    if(userChoice === sentence1.rightAnswer) {
      caseCorrect();
    } else {
      caseIncorrect();
    }
  }

  function next() {
    console.log('next');
    sentenceDisplay(challengesLevel1[1].incomplete());
    optionsDisplay(challengesLevel1[1].options);
  }

  //// If the user clicked the RIGHT answer
  // - the correct, completed sentence becomes visible in the <h2>
  // - all options fading out/become 'disabled'/disappear - I don't know yet, I think I should see this case and see what would be the nice to experience as a user
  // - The happy mask is 'active'
  // - scores increased by the worth of the current sentence
  // - the next sentence becomes available
  function caseCorrect() {
    // console.log('correct');
    currentScore = currentScore + 1;
    $score.text(currentScore);
    sentenceDisplay(challengesLevel1[0].complete());
    $happyMask.addClass('active');
    setTimeout(() => {
      next();
      $happyMask.removeClass('active');
    }, 3000);
  }

  //// If the user clicked a WRONG answer
  // - The sad mask is 'active'
  // - scores decreased by the worth of the current sentence
  // - the hint button is 'waving' like: 'hey, I'm here, use me'
  // - next sentence is not available until the click on the right answer
  // - the already chosen wrong answer is not clickable anymore, it's still there but disabled.
  function caseIncorrect() {
    console.log('incorrect');
    currentScore = currentScore - 1;
    $score.text(currentScore);
    $sadMask.addClass('active');
    setTimeout(() => {
      $sadMask.removeClass('active');
    }, 2000);
  }

  //// If the user clicked the HINT button
  // - scores decreased by 1 (always by 1) for using help. Negative scores are possible.
  // - the hint information becomes visible on screen

  // RANDOM
  // I need the options in a random order, it's coming hopefully soon

  // DISPLAY
  function sentenceDisplay(incomplete) {
    $h2.text(incomplete);
  }

  function optionsDisplay(array) {
    $options.find('li').remove();
    for(let i = 0; i < array.length; i++) {
      const listElement = document.createElement('li');
      listElement.innerHTML = array[i];
      $options.append(listElement);
    }
  }

  sentenceDisplay(challengesLevel1[0].incomplete());
  optionsDisplay(challengesLevel1[0].options);

  $options.children().on('click', function() {
    const userChioce = this.innerHTML;
    checkTheAnswer(userChioce);
    // console.log(`${userChioce} was clicked`);
  });


///////////
});
