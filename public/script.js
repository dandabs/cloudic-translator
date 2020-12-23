// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

function setTemp(value) {
  document.getElementById('tempbox').value = value;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateInto() {
  const toTranslate = document.getElementById('englishbox').value;
  
  setTemp(toTranslate);
  
  const transArray = toTranslate.split(" ");
  
  const tempArray = [];
  
  await transArray.reduce(async (memo, i) => {
	  await memo;
	  await sleep(10 - i);
    var word = i;
    
    // case changes
    if (word.toLowerCase() == "me") word = "I";
    
    // possessive pronouns
    if (word.toLowerCase() == "my") word = "I's";
    if (word.toLowerCase() == "your") word = "you's";
    if (word.toLowerCase() == "his") word = "he's";
    if (word.toLowerCase() == "her") word = "she's";
    if (word.toLowerCase() == "their") word = "they's";
    if (word.toLowerCase() == "our") word = "we's";
    
    // translate
    
    fetch('/translate/' + word)
    .then(response => response.json())
    .then(data => {
      
      console.log(data);
      if (data != undefined) word = data.cloudic;
      
    });
    
    tempArray.push(word);
    console.log(i + " => " + word);
}, undefined);
  
  setTemp(tempArray.join(' '));
  
}
