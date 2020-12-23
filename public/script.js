// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function setTemp(value) {
  document.getElementById('tempbox').value = value;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateInto() {
  
  const toTranslate = document.getElementById('englishbox').value;
  
  //if (toTranslate.charAt(toTranslate.length - 1) != "'") return;
  
  //setTemp(toTranslate);
  
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
    
    var genitive = false;
    
    // genitive
    if (word.charAt(word.length - 2) == "'" || word.charAt(word.length - 1) == "'") {
      
      if (word.charAt(word.length - 1) == "s") {
        
              genitive = true;
              word = word.split("'s")[0];
        
      }
      
      if (word.charAt(word.length - 1) == "'") {
        
        genitive = true;
        word = word.split("'")[0] + "s";
        
      }
      
    }
    
    // articles
    if (word.toLowerCase() == "the") return;
    if (word.toLowerCase() == "a") word = "";
    if (word.toLowerCase() == "an") word = "";
    
    // translate
    await fetch('/translate/' + word)
    .then(response => response.json())
    .then(data => {
      
      console.log(data);
      if (JSON.stringify(data) != "{}") word = data.cloudic;
      if (JSON.stringify(data) == "{}") word = word;
      
      // genitive [OF]
      if (tempArray.length != 0) {
        if (tempArray[tempArray.length - 1] == "of") {
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "vi";
        }
      }
      
      // inessive [welcome to, into]
      if (tempArray.length != 0) {
        if (tempArray[tempArray.length - 1] == "to" && tempArray[tempArray.length - 2] != "welcome") {
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "ni";
        }
        if (tempArray[tempArray.length - 1] == "to" && tempArray[tempArray.length - 2] == "welcome") {
          tempArray.pop(tempArray.length - 1);
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "ni";
        }
      }
      
      // genitive ['S]
      if (genitive) {
        if (word.charAt(word.length - 1) != "i") word = word + "i";
        word = word + "vi";
      }
      
    tempArray.push(word);
    console.log(i + " => " + word);
      
    });
    
}, undefined);
  
  setTemp(capitalize(tempArray.join(' ')));
  
}
