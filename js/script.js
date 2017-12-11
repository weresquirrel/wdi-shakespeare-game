$(() => {
/////////
  // THE PROTOTYPE
  function Sentence(sentenceStart, sentenceFinish, rightAnswer, worth){
    this.sentenceStart = sentenceStart;
    this.sentenceFinish = sentenceFinish;
    this.rightAnswer = rightAnswer;
    this.options = [rightAnswer, 'a flamingo', 'an idiot', 'a spaniel'];
    this.worth = worth;
    this.incomplete = function() {
      return `${this.sentenceStart} _______ ${this.sentenceFinish}`;
    };
  }
  // the instances
  // SENTENCE 1
  const sentence1 = new Sentence('"My kingdom for', '!"', 'a horse', 1);
  console.log(sentence1.incomplete());
  // SENTENCE 2
  const sentence2 = new Sentence('"To be,', 'not to be"', 'or', 1);
  console.log(sentence2.incomplete());
  // I need to define the wrong answers individually!
  sentence2.wrongAnswers = ['and', 'by'];
  sentence1.wrongAnswers = ['a flamingo', 'an idiot', 'a spaniel'];
  console.log(sentence2.wrongAnswers);

  //// If the user clicked the RIGHT answer
  // - the correct, completed sentence becomes visible in the <h2>
  // - all options fading out/become 'disabled'/disappear - I don't know yet, I think I should see this case and see what would be the nice to experience as a user
  // - The happy mask is 'active'
  // - scores increased by the worth of the current sentence
  // - the next sentence becomes available





  //// If the user clicked a WRONG answer
  // - The sad mask is 'active'
  // - scores decreased by the worth of the current sentence
  // - the hint button is 'waving' like: 'hey, I'm here, use me'
  // - next sentence is not available until the click on the right answer
  // - the already chosen wrong answer is not clickable anymore, it's still there but disabled.

  //// If the user clicked the HINT button
  // - scores decreased by 1 (always by 1) for using help. Negative scores are possible.
  // - the hint information becomes visible on screen

  // RANDOM
  // I need the options in a random order

  // DISPLAY
  const $h2 = $('h2');
  const $options = $('#options');

  function sentenceDisplay(incomplete) {
    $h2.text(incomplete);
  }

  function optionsDisplay(array) {
    for(let i = 0; i < array.length; i++) {
      const listElement = document.createElement('li');
      listElement.innerHTML = array[i];
      $options.append(listElement);
    }
  }

  sentenceDisplay(sentence1.incomplete());
  optionsDisplay(sentence1.options);

  // const $form = $('#subscribe');
  // const $submit = $('.submit');
  //
  // $form.on('submit', (e) => {
  //   e.preventDefault();
  //   <<<<<<< HEAD
  //   $submit.text('Submitted!');

///////////
});
