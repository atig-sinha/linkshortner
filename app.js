const shortlyBtn = document.querySelector(".submit-button");
const shortlyInput = document.querySelector(".input");
const qrcode = document.querySelector(".qr-code");
let shorturl = document.querySelector('input[name="short-url"]');
let button_name = document.querySelector('input[name="submit-button"]');


function urlValidation(defaultUrl) {
    const urlRule =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (defaultUrl.match(urlRule)) {
      return true;
    } else {
      return false;
    }
  }

  shortlyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = shortlyInput.value;
    if (!urlValidation(inputValue) && button_name.type == "reset") {
        shorturl.value = "Please enter a valid link";
      } else {
        //Passed Validation - init API
        fetch(`https://api.shrtco.de/v2/shorten?url=` + inputValue)
          .then((response) => response.json())
          .then((response) => {
            if (response.ok) {
              let shortlyCode = response.result.code;
              //shorturl.innerHTML = `<a href="https://www.shrtco.de/${shortlyCode}" target="_blank"class="shortened-url">shrtco.de/${shortlyCode}</a>`;
              //shorturl.innerHTML = `<input type="text" value="www.shrtco.de/${shortlyCode}">`;
              shorturl.value = "www.shrtco.de/"+shortlyCode;
            }
        });

        fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=`+inputValue)
        .then(response => response.blob())
        .then(blob => {
          const imageUrl = URL.createObjectURL(blob);
          qrcode.innerHTML = `<img src="${imageUrl}">`;
        });
    }
});

  function changeButtonName(){
    //let button_name = document.querySelector('input[name="submit-button"]');
    if(button_name.type == "submit" ){
      button_name.value = "Shorten another";
      button_name.type = "reset";
    }else if(button_name.type == "reset"){
      document.getElementById("shortner-form").reset();
      button_name.value = "Shorten URL";
      qrcode.innerHTML = ``;
      shorturl.value = "";
      button_name.type = "submit";
    }
  }