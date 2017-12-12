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
  // SENTENCE 1 To be, or not to be
  const sentence1 = new Sentence('"To be,', 'not to be"', 'or',['and', 'by'], 1);
  challengesLevel1.push(sentence1);

  // SENTENCE 2 My kingdom for a horse!
  const sentence2 = new Sentence('"My kingdom for', '!"', 'a horse', ['a flamingo', 'an idiot', 'a spaniel'], 1);
  challengesLevel1.push(sentence2);

  // SENTENCE 3 That which we call a rose By any other name would smell as sweet;
  const sentence3 = new Sentence('"That which we call', 'By any other name would smell as sweet"', 'a rose',['a chicken', 'a daffodil', 'a fennel'], 1);
  challengesLevel1.push(sentence3);

  // ////I need a function to decide if the answer the user chose is or not the right one
  function checkTheAnswer(userChoice, currentChallenge, id) {
    if(userChoice === currentChallenge.rightAnswer) {
      caseCorrect(currentChallenge, id);
    } else {
      caseIncorrect();
    }
  }

  //// The End of the startGame
  function theEnd() {
    console.log('the end');
    $options.find('li').remove();
    sentenceDisplay(`All's Well That Ends Well`);
  }

  //// If the user clicked the RIGHT answer
  // - the correct, completed sentence becomes visible in the <h2>
  // - all options fading out/become 'disabled'/disappear - I don't know yet, I think I should see this case and see what would be the nice to experience as a user
  // - The happy mask is 'active'
  // - scores increased by the worth of the current sentence
  // - the next sentence becomes available
  function caseCorrect(currentChallenge, id) {
    // console.log('correct');
    currentScore = currentScore + 1;
    $score.text(currentScore);
    sentenceDisplay(currentChallenge.complete());
    $happyMask.addClass('active');
    setTimeout(() => {
      // next(currentChallenge);
      id = id + 1;
      // I should check here if the id is greater than it would be possible in the array
      if(id > challengesLevel1.length - 1) {
        theEnd();
      } else {
        startGame(id);
      }
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
  // - maybe the prompt not only gives helping info but insults the player (with shakespeare's words) for his lack of knowledge. Ex.: This is in Richard III, you puking flap-dragon!

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

  function startGame(id) {
    console.log(id);
    const currentChallenge = challengesLevel1[id];
    sentenceDisplay(currentChallenge.incomplete());
    optionsDisplay(currentChallenge.options);
    $options.children().on('click', function() {
      const userChioce = this.innerHTML;
      checkTheAnswer(userChioce, currentChallenge, id);
      // console.log(`${userChioce} was clicked`);
    });
  }

  startGame(0);
///////////
});
