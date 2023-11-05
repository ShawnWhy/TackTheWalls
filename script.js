const imageurls = [
  "https://logicface.co.uk/wp-content/uploads/2021/12/santa-coding.jpeg",
  "http://pngimg.com/uploads/christmas/christmas_PNG3748.png",
  "http://mreliot.com/wp-content/uploads/2014/12/christmas-tree-in-the-snow-holiday-hd-wallpaper-1920x1080-5401.jpg",
];

function rainCards() {
  for (i = 0; i < imageurls.length; i++) {
    let randnumber = Math.floor(Math.random() * 80 + 10);
    let randnumber2 = Math.floor(Math.random() * 800 );

    var card = $("<div>");
    var cardFront = $("<div>");
    var cardBack = $("<div>");
    cardFront.addClass("cardFront");
    cardBack.addClass("cardBack");
    card.addClass("floatingCard");
    cardBack.css("background-image", "url('./images/cardback.jpg");
    cardFront.css("background-image", "url(" + imageurls[i] + ")");

    card.append(cardFront);
    card.append(cardBack);
    card.css("left", randnumber + "%");
    card.css("top", randnumber2 + "px");

    $(".rainContainer").append(card);
  }
}

rainCards();

var rainInterval = setInterval(() => {
  // console.log("raining interval")
  rainCards2();
}, 30);

clearInterval(rainInterval)
function rainCards2() {
  var rainBoxHeight = $(".rainContainer")[0].getBoundingClientRect().height;
  console.log(rainBoxHeight);
  var cards = $(".floatingCard");
  // console.log(cards)
  cards.each(function (index, value) {
    let tempTop = $(value).css("top");
    // console.log(tempTop)

    tempTop = parseFloat(tempTop.split("px")[0]);
    // console.log(tempTop)
    let newTop = 0;

    if (tempTop <= rainBoxHeight) {
      // console.log("eat 1")
      newTop = tempTop + 3;
    } else {
      newTop = 0;
    }
    $(value).css("top", newTop + "px");
  });
}

$("#submission").on("submit", e=>{
  e.preventDefault()
  e.stopPropagation()
  var newUrl = $("#imageUrl").val();
  if(newUrl.length>5){
    addCard(newUrl)
    $("#imageUrl").val('');

  }
})
//add the new card to the rain group
function addCard(url){
   let randnumber = Math.floor(Math.random() * 60 + 20);
   let randnumber2 = Math.floor(Math.random() * 800);

   var card = $("<div>");
   var cardFront = $("<div>");
   var cardBack = $("<div>");
   cardFront.addClass("cardFront");
   cardBack.addClass("cardBack");
   card.addClass("floatingCard");
   cardBack.css("background-image", "url('./images/cardback.jpg");
   cardFront.css("background-image", "url(" + url + ")");

   card.append(cardFront);
   card.append(cardBack);
   card.css("left", randnumber + "%");
   card.css("top", randnumber2 + "px");

   $(".rainContainer").append(card);

}
