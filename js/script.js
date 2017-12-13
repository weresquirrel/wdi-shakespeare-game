$(() => {
/////////
// Some global variables
  let currentScore = 0;

  const $h2 = $('h2');
  const $options = $('#options');
  const $score = $('#score').find('p').find('span');
  const $happyMask = $('#happy');
  const $sadMask = $('#sad');
  const $hintText = $('#hint');
  const $hintBtn = $('button');
  $score.text(currentScore);
  const challengesLevel1 = [];

  // THE PROTOTYPE
  function Sentence(sentenceStart, sentenceFinish, rightAnswer, wrongAnswers, hint, worth){
    this.sentenceStart = sentenceStart;
    this.sentenceFinish = sentenceFinish;
    this.rightAnswer = rightAnswer;
    this.wrongAnswers = wrongAnswers;
    this.hint = hint;
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
  // `It's in Hamlet, you artless boar-pig!`
  const sentence1 = new Sentence('"To be,', 'not to be"', 'or',['and', 'by'], `It's in Hamlet, you artless boar-pig!`, 1);
  challengesLevel1.push(sentence1);

  // SENTENCE 2 My kingdom for a horse!
  const sentence2 = new Sentence('"My kingdom for', '!"', 'a horse', ['a flamingo', 'an idiot', 'a spaniel'], `It's in Richard III, you fool-born malt-worm!`, 1);
  challengesLevel1.push(sentence2);

  // SENTENCE 3 That which we call a rose By any other name would smell as sweet;
  const sentence3 = new Sentence('"That which we call', '<br/>By any other name would smell as sweet"', 'a rose',['a chicken', 'a daffodil', 'a fennel'], `It's in Romeo And Juliet, you puking flap-dragon!`, 1);
  challengesLevel1.push(sentence3);

  // ////I need a function to decide if the answer the user chose is or not the right one
  function checkTheAnswer(userChoice, currentChallenge, id, target) {
    // console.log("t", target);
    if(userChoice === currentChallenge.rightAnswer) {
      caseCorrect(currentChallenge, id, target);
    } else {
      caseIncorrect(target);
    }
  }

  //// The End of the startGame
  function theEnd() {
    // console.log('the end');
    $options.find('button').remove();
    $hintBtn.css('display', 'none');
    sentenceDisplay(`All's Well That Ends Well`);
  }

  //// If the user clicked the RIGHT answer
  // - the correct, completed sentence becomes visible in the <h2>
  // - all options fading out/become 'disabled'/disappear - I don't know yet, I think I should see this case and see what would be the nice to experience as a user
  // - The happy mask is 'active'
  // - scores increased by the worth of the current sentence
  // - the next sentence becomes available
  function caseCorrect(currentChallenge, id, target) {
    // console.log('correct');
    currentScore = ++currentScore;
    $(target).attr('disabled', 'disabled');
    $score.text(currentScore);
    sentenceDisplay(currentChallenge.complete());
    $happyMask.addClass('active');
    setTimeout(() => {
      // next(currentChallenge);
      id = ++id;
      // I should check here if the id is greater than it would be possible in the array
      if(id > challengesLevel1.length - 1) {
        theEnd();
      } else {
        startGame(id);
      }
      $hintText.text('');
      $happyMask.removeClass('active');
    }, 3000);
  }

  //// If the user clicked a WRONG answer
  // - The sad mask is 'active'
  // - scores decreased by the worth of the current sentence
  // - the hint button is 'waving' like: 'hey, I'm here, use me'
  // - next sentence is not available until the click on the right answer
  // - the already chosen wrong answer is not clickable anymore, it's still there but disabled.
  function caseIncorrect(target) {
    // console.log('incorrect');
    $(target).attr('disabled', 'disabled');
    currentScore = --currentScore;
    $score.text(currentScore);
    $sadMask.addClass('active');
    $hintBtn.addClass('active');
    setTimeout(() => {
      $sadMask.removeClass('active');
      $hintBtn.removeClass('active');
    }, 2000);
  }

  //// If the user clicked the HINT button
  // - scores decreased by 1 (always by 1) for using help. Negative scores are possible.
  // - the hint information becomes visible on screen
  // - maybe the prompt not only gives helping info but insults the player (with shakespeare's words) for his lack of knowledge. Ex.: This is in Richard III, you puking flap-dragon!
  function hintCase(hint) {
    $hintText.text('');
    currentScore = --currentScore;
    $score.text(currentScore);
    $hintText.text(hint);
  }

  // RANDOM
  // I need the options in a random order, it's coming hopefully soon
  function randomInt(array) {
    return Math.floor(Math.random() * array.length);
  }
  function randomizeArray(array) {
    const tempArray = [];
    function copyArrayElement(Int) {
      tempArray.push(array[Int]);
    }
    function deleteArrayElement(delInt) {
      array.splice(delInt, 1);
    }
    while (array.length > 0) {
      const randomInteger = randomInt(array);
      copyArrayElement(randomInteger);
      deleteArrayElement(randomInteger);
    }
    return tempArray;
  }

  // DISPLAY
  function sentenceDisplay(incomplete) {
    $h2.html(incomplete);
  }

  function optionsDisplay(array) {
    $options.find('button').remove();
    for(let i = 0; i < array.length; i++) {
      const $listElement = $('<button/>');
      $listElement.text(array[i]);
      $options.append($listElement);
    }
  }

  function startGame(id) {
    console.log(id);
    const currentChallenge = challengesLevel1[id];
    sentenceDisplay(currentChallenge.incomplete());
    // here supposed to be randomised the original array
    const tempArray = randomizeArray(currentChallenge.options);
    optionsDisplay(tempArray);
    // optionsDisplay(currentChallenge.options);
    $options.children().on('click', function(e) {
      const userChoice = this.innerHTML;
      checkTheAnswer(userChoice, currentChallenge, id, e.target);
    });
    $hintBtn.on('click', () => {
      hintCase(currentChallenge.hint);
      // console.log(currentChallenge.hint);
    });
  }

  startGame(0);
///////////
});
