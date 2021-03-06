$(() => {
/////////
// Some global variables

  // These 2 became global variables only because I had to move hintCase out of startGame and I got confused how to make these info available for every function that use them.
  let currentScore = 0;
  let currentChallengeNum = 0;

  const $h2 = $('h2');
  const $options = $('#options');
  // const $completed = $('#menu').find('ul');
  const $score = $('#score').find('p').find('span');
  const $happyMask = $('#happy');
  const $sadMask = $('#sad');
  const $hintText = $('#hint');
  const $hintBtn = $('button');
  const $hardness = $('#level').find('.level');
  $score.text(currentScore);
  const challengesLevel1 = [];
  const challengesLevel2 = [];
  const challengesLevel3 = [];

  let currentLevel = challengesLevel1;

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
  //LEVEL 01-----------------------------
  // SENTENCE 1 To be, or not to be
  // `It's in Hamlet, you artless boar-pig!`
  const sentence1 = new Sentence('"To be,', 'not to be"', 'or',['and', 'by'], `It's in Hamlet, you artless boar-pig!`, 1);
  challengesLevel1.push(sentence1);

  // SENTENCE 2 My kingdom for a horse!
  // `It's in Richard III, you fool-born malt-worm!`
  const sentence2 = new Sentence('"My kingdom for', '!"', 'a horse', ['a flamingo', 'an idiot', 'a spaniel'], `It's in Richard III, you fool-born malt-worm!`, 1);
  challengesLevel1.push(sentence2);

  // SENTENCE 3 That which we call a rose By any other name would smell as sweet;
  // `It's in Romeo And Juliet, you puking flap-dragon!`
  const sentence3 = new Sentence('"That which we call', '<br/>By any other name would smell as sweet"', 'a rose',['a chicken', 'a daffodil', 'a fennel'], `It's in Romeo And Juliet, you puking flap-dragon!`, 1);
  challengesLevel1.push(sentence3);

  //LEVEL 02------------------------------------
  // SENTENCE 4 When shall wee three meet again?
  // `It's in Macbeth, you rump-fed ronyon!`
  const sentence4 = new Sentence('"When shall wee three', 'again?"', 'meet',['pee', 'see', 'greet'], `It's in Macbeth, you rump-fed ronyon!`, 2);
  challengesLevel2.push(sentence4);

  // SENTENCE 5 All the world's a stage, And all the men and women merely players
  // `It's in As You Like It, you eater of broken meats!`
  const sentence5 = new Sentence(`"All the world's`, ', <br/>And all the men and women merely players"', 'a stage',['a tavern', 'a circus', 'a theatre'], `It's in As You Like It, you eater of broken meats!`, 2);
  challengesLevel2.push(sentence5);

  // SENTENCE 6 Lord, what fools these mortals be!
  // `It's in A Midsummer Night's Dream, you goatish whoreson!`
  const sentence6 = new Sentence(`"Lord, what`, ', these mortals be!"', 'fools',['cools', 'gallants', 'favoured'], `It's in A Midsummer Night's Dream, you goatish whoreson!`, 2);
  challengesLevel2.push(sentence6);

  //LEVEL 03------------------------------------
  // SENTENCE 7 The red plague rid you, For learning me your language!
  // `It's in The Tempest, you super-serviceable finical rouge!`
  const sentence7 = new Sentence('"The', 'plague rid you, <br/>For learning me your language!"', 'red',['black', 'green', 'pale'], `It's in The Tempest, you super-serviceable finical rouge!`, 3);
  challengesLevel3.push(sentence7);

  // SENTENCE 8 I love long life better than figs.
  // `It's in Anthony and Cleopatra, lily-livered knave!`
  const sentence8 = new Sentence('"I love long life better than', '."', 'figs',['unicorns', 'tokens'], `It's in Anthony and Cleopatra, you lily-livered knave!`, 3);
  challengesLevel3.push(sentence8);

  // SENTENCE 9 Alas, poor Yorick! I knew him, Horatio
  // `It's in Hamlet, you artless boar-pig!`
  const sentence9 = new Sentence('"Alas, poor Yorick! <br/>I knew him,', '"', 'Horatio',['well', 'slightly'], `It's in Hamlet, you artless boar-pig!`, 3);
  challengesLevel3.push(sentence9);

  // SENTENCE 10 This is a tale told by an idiot
  // `It's in Macbeth, you bloody rascal / rump-fed ronyon/ !`
  const sentence10 = new Sentence('"This is a tale told by', '"', 'an idiot',['a horse', 'a spaniel', 'a spirit'], `It's in Macbeth, you rump-fed ronyon!`, 3);
  challengesLevel3.push(sentence10);


  // ////I need a function to decide if the answer the user chose is or not the right one
  function checkTheAnswer(userChoice, currentArray, currentChallenge, target) {
    // console.log("t", target);
    if(userChoice === currentChallenge.rightAnswer) {
      caseCorrect(currentArray, currentChallenge);
    } else {
      caseIncorrect(currentArray, target);
    }
  }

  //// The End of the startGame
  function theEnd() {
    $options.find('button').remove();
    $hintBtn.attr('disabled', 'disabled');
    $hintBtn.html('');
    $hintText.text('Nothing can seem foul to those who win.');
    sentenceDisplay(`All's Well That Ends Well`);
  }

  ////Level completed
  function levelCompleted(num) {
    $options.find('button').remove();
    $hintBtn.attr('disabled', 'disabled');
    $hintBtn.html('');
    sentenceDisplay(`Level ${num} is done.`);
    if(num === 1) {
      $hintText.text('Thou art getting Bardish!');
      // console.log('Thou art getting Bardish!');
    } else if(num === 2) {
      $hintText.text('"What’s done cannot be undone"');
      // console.log('"What’s done cannot be undone"');
    }
  }

  //// If the user clicked the RIGHT answer
  // - the correct, completed sentence becomes visible in the <h2>
  // - all options fading out/become 'disabled'/disappear - I don't know yet, I think I should see this case and see what would be the nice to experience as a user
  // - The happy mask is 'active'
  // - scores increased by the worth of the current sentence
  // - the next sentence becomes available
  function caseCorrect(currentArray, currentChallenge) {
    currentScore += currentChallenge.worth;
    // $(target).attr('disabled', 'disabled');
    $options.children().attr('disabled', 'disabled');
    $hintBtn.attr('disabled', 'disabled');
    $score.text(currentScore);
    sentenceDisplay(currentChallenge.complete());
    $happyMask.addClass('active');
    currentChallengeNum += 1;
    setTimeout(() => {
      if(currentArray === challengesLevel3 && currentChallengeNum > currentArray.length - 1) {
        theEnd();
      } else if(currentArray === challengesLevel2 && currentChallengeNum > currentArray.length - 1) {
        // console.log('level 2 completed');
        levelCompleted(2);
        setTimeout(() => {
          currentChallengeNum = 0;
          currentLevel = challengesLevel3;
          $hintBtn.removeAttr('disabled');
          $hintBtn.html('Hint!');
          startGame(currentLevel, currentChallengeNum);
        }, 5000);
      } else if(currentArray === challengesLevel1 && currentChallengeNum > currentArray.length - 1) {
        // console.log('level 1 completed');
        levelCompleted(1);
        setTimeout(() => {
          currentChallengeNum = 0;
          currentLevel = challengesLevel2;
          $hintBtn.removeAttr('disabled');
          $hintBtn.html('Hint!');
          startGame(currentLevel, currentChallengeNum);
        }, 4000);
      } else {
        startGame(currentArray, currentChallengeNum);
        $hintBtn.removeAttr('disabled');
      }
      // $hintText.text('');
      $happyMask.removeClass('active');
    }, 3000);
  }

  //// If the user clicked a WRONG answer
  // - The sad mask is 'active'
  // - scores decreased by the worth of the current sentence
  // - the hint button is 'waving' like: 'hey, I'm here, use me'
  // - next sentence is not available until the click on the right answer
  // - the already chosen wrong answer is not clickable anymore, it's still there but disabled.
  function caseIncorrect(currentArray, target) {
    // console.log('incorrect');
    $(target).attr('disabled', 'disabled');
    // currentScore -= 1;
    currentScore -= currentArray[currentChallengeNum].worth;
    $score.text(currentScore);
    $sadMask.addClass('active');
    // $hintBtn.addClass('active');
    $('#hint-box').addClass('active');
    setTimeout(() => {
      $sadMask.removeClass('active');
      $('#hint-box').removeClass('active');
    }, 2000);
  }

  //// If the user clicked the HINT button
  // - scores decreased by 1 (always by 1) for using help. Negative scores are possible.
  // - the hint information becomes visible on screen
  // - maybe the prompt not only gives helping info but insults the player (with shakespeare's words) for his lack of knowledge. Ex.: This is in Richard III, you puking flap-dragon!
  function hintCase(hint) {
    // $hintText.text('');
    currentScore -= 1;
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

  // This below looks a bit awkward, because I put it inside the startGame first, but a bug was caused that way, so I had to move it out.
  $hintBtn.on('click', () => {
    // console.log(currentChallengeNum);
    hintCase(currentLevel[currentChallengeNum].hint);
    // console.log(challengesLevel1[currentChallengeNum].hint);
  });

  ///display the current level
  function levelDisplay() {
    // $completed.find('li').remove();
    if(currentLevel === challengesLevel1) {
      $hardness.text('easy');
    } else if(currentLevel === challengesLevel2) {
      $hardness.text('medium');
      // const $listE = $('<li>');
      // $listE.text('easy');
      // $completed.append($listE);
    } else if(currentLevel === challengesLevel3) {
      $hardness.text('challenging');
      // const $listE = $('<li>');
      // $listE.text('medium');
      // const $listE2 = $('<li>');
      // $listE.text('easy');
      // $completed.append($listE);
      // $completed.append($listE2);
    }
  }

  function startGame(currentArray, currentChallengeNum) {
    // console.log(currentArray);
    // console.log(currentChallengeNum);
    $hintText.text('');
    levelDisplay();
    const currentChallenge = currentArray[currentChallengeNum];
    sentenceDisplay(currentChallenge.incomplete());
    const tempArray = randomizeArray(currentChallenge.options);
    optionsDisplay(tempArray);
    $options.children().on('click', function(e) {
      const userChoice = this.innerHTML;
      checkTheAnswer(userChoice, currentArray, currentChallenge, e.target);
    });
  }

  // startGame(challengesLevel1, 0);
  startGame(currentLevel, currentChallengeNum);
///////////
});
