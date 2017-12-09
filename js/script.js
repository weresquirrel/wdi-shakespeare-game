$(() => {
/////////
  //PROTOTYPE
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

  //SENENCE 1
  const sentence1 = new Sentence('"My kingdom for', '!"', 'a horse', 1);
  console.log(sentence1.incomplete());
  // const suzanne = new Monkey('Susanne', 'baboon', '2015-03-25', 'banana');

  //DISPLAY
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
