const placeholder = document.querySelector(".placeholder");
const editableInput = document.querySelector(".editable");

const tweetButton = document.querySelector(".button");
const counter = document.getElementById("counter");
const readonly = document.querySelector(".readonly");

//Tiklama olayi
editableInput.addEventListener("click", () => {
  //placeholder span rengini degistiriroz
  placeholder.style.color = "#98a5b1";
});
//inputun odagini disariya tiklaninca kaldiriyor
editableInput.onblur = () => {
  placeholder.style.color = "#333";
};
//Klavyenin basilma olayini dinliuyor
editableInput.onkeypress = (e) => {
  placeholder.style.display = "none";
  inputValidate(e.target.innerText);
};

//Klavyeden parmagimizi cektigimiz ani dinliyor
editableInput.onkeyup = (e) => {
  placeholder.style.display = "none";
  inputValidate(e.target.innerText);
};
//Yazilan tweetin karakter kontrolu
const inputValidate = (tweet) => {
  //console.log(tweet);
  //Disaridan gelen input versinin uzunlugu

  const tweetLength = tweet.length;

  const tweetLimit = 140;
  //Kalan karakter limiti
  const currentLimit = tweetLimit - tweetLength;

  //Karakter var mi?
  if (tweetLength <= 0) {
    //Karakter Yoksa
    //place holder gorunur hale getirir
    placeholder.style.display = "block";
    //tweet butonu pasif yapma
    tweetButton.classList.remove("active");
    //Sayacin gorunurlugunu ortadan kaldirma
    counter.style.display = "none";
  } else {
    //Karakter varsa
    //Tweet butonunu aktif hale getirme
    tweetButton.classList.add("active");
    //Sayaci gorunur yapma
    counter.style.display = "block";

    //sayacin degerine hesaplanan degeri atama
    counter.innerText = currentLimit;
  }
  let newTweet;

  //Karakter sinrii asildi mi?
  if (tweetLength > tweetLimit) {
    //Karakter sinirinin asildigi durum
    //substr ile baslangic tweet limiti ve bitis girilen toplam karakter sayisi noktasi belirletyerek  tasan karakter sayisni bulma
    let overTweet = tweet.substr(tweetLimit, tweetLength);
    //tasan karakterleri arka planini kirmizi yapmak icin span olusturma
    let overTweetElement = `<span class="overTweet">${overTweet}</span>`;
    newTweet = tweet.substr(0, tweetLimit) + overTweetElement;
    readonly.style.zIndex = "1";
    counter.style.color = "red";
    tweetButton.classList.remove("active");
  } else {
    //Karakter sinirinin asilmadigi durum

    //sayacin kendi normal rengi
    counter.style.color = "#333";
    readonly.style.zIndex = "-5";
  }
  //olusan yeni tweeti gostermek icin html tarafina gonderme
  readonly.innerHTML = newTweet;
};
