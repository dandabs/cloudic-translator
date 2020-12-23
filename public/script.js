// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

function setTemp(value) {
  document.getElementById('tempbox').value = value;
}

function translateInto() {
  const toTranslate = document.getElementById('englishbox').value;
  console.log(toTranslate);
  
  setTemp(toTranslate);
  
  const transArray = toTranslate.split(" ");
  
  
  
}
