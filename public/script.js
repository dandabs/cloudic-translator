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
    var present = false;
    
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
    
    // present tense
    if (word.charAt(word.length - 3) == "g" || word.charAt(word.length - 2) == "n" || word.charAt(word.length - 1) == "i") {
 
              present = true;
              word = word.split("ing")[0];
      
    }
    
    // articles
    if (word.toLowerCase() == "the") return;
    if (word.toLowerCase() == "a") return;
    if (word.toLowerCase() == "an") return;
    
    // translate
    await fetch('/translate/' + word)
    .then(response => response.json())
    .then(data => {
      
      console.log(data);
      if (JSON.stringify(data) != "{}") word = data.cloudic;
      if (JSON.stringify(data) == "{}") word = word;
      
      // don't (verb present)
      
      
      // verb [TO]
      if (tempArray.length != 0 && data.type == "VERB") {
        if (tempArray[tempArray.length - 1].toLowerCase() == "to") {
          tempArray.pop(tempArray.length - 1);
          word = "õ " + word;
        }
      }
      
      // verb [PRESENT]
      if (tempArray.length != 0 && data.type == "VERB") {
        if (["aini", "eni", "heð", "ainiti", "eniti", "heði"].includes(tempArray[tempArray.length - 1].toLowerCase())) {
          word = word + "õni";
        }
        if (tempArray[tempArray.length - 1].toLowerCase() == "iði" && present) {
          word = word + "õni";
        }
      }
      
      // genitive [OF]
      if (tempArray.length != 0) {
        if (tempArray[tempArray.length - 1].toLowerCase()  == "of") {
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "vi";
        }
      }
      
      // illative [welcome to, into]
      if (tempArray.length != 0) {
        if (tempArray[tempArray.length - 1].toLowerCase()  == "into") {
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "ni";
        }
        if (tempArray[tempArray.length - 1].toLowerCase()  == "to" && tempArray[tempArray.length - 2].toLowerCase()  == "welcome") {
          tempArray.pop(tempArray.length - 1);
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "ni";
        }
      }
      
      // Inessive [in, inside]
      if (tempArray.length != 0) {
        if (tempArray[tempArray.length - 1].toLowerCase()  == "in") {
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "sai";
        }
        if (tempArray[tempArray.length - 1].toLowerCase()  == "inside") {
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "sai";
        }
      }
      
      // Allative [to, for]
      if (tempArray.length != 0) {
        if (tempArray[tempArray.length - 1].toLowerCase()  == "to") {
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "lei";
        }
        if (tempArray[tempArray.length - 1].toLowerCase()  == "for") {
          tempArray.pop(tempArray.length - 1);
          if (word.charAt(word.length - 1) != "i") word = word + "i";
          word = word + "lei";
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
