let langOption = document.querySelectorAll('select');
let forminput = document.querySelector('.forminput');
exchageIcon = document.querySelector(".exchange");
let translate = document.querySelector('.totranslate');
icons = document.querySelectorAll(".volume i");


// select language from the select box
langOption.forEach((selectElement, index) => {
  for (let countryCode in language) {

   let selected;
   if(index==0  && countryCode=="en-GB")
   {
        selected="selected";
   }else if(index ==1  && countryCode=="mr")
   {
    selected="selected";
   }

    let object = `<option value="${countryCode}"${selected}>${language[countryCode]}</option>`;
    console.log(object);
    selectElement.insertAdjacentHTML('beforeend' , object);
    // Here, you can append the option elements to the selectElement or do any other processing as required.
  }
});

// Clear inputText values when the page is loaded or refreshed
window.addEventListener('load', () => {
  forminput.value = '';
  translate.value = '';
  localStorage.removeItem('forminput');
  localStorage.removeItem('translate');
});



// translate language 
forminput.addEventListener('input' , function(){
    let content = forminput.value;
    formcontet = langOption[0].value;
    transContent = langOption[1].value;

    let Translatelink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${formcontet}|${transContent}`;

    fetch(Translatelink)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      translate.value=data.responseData.translatedText;

    //   
    })
    
})


// exchange language 
exchageIcon.addEventListener("click", () => {
  let tempText = forminput.value,
    tempLang = langOption[0].value;
    forminput.value = translate.value;
    translate.value = tempText;
  langOption[0].value = langOption[1].value;
  langOption[1].value = tempLang;
});


forminput.addEventListener("keyup", () => {
  if (!forminput.value) {
    translate.value = "";
  }
});

//  to voice logic
icons.forEach(icon => {
  icon.addEventListener("click", ({ target }) => {
    let utterance;

    if (target.id === "form") {
      utterance = new SpeechSynthesisUtterance(forminput.value);
      utterance.lang = langOption[0].value;
    } else {
      utterance = new SpeechSynthesisUtterance(translate.value);
      utterance.lang = langOption[1].value;
    }

  

    speechSynthesis.speak(utterance);
  });
});