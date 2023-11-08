var imageurls = [
  "https://logicface.co.uk/wp-content/uploads/2021/12/santa-coding.jpeg",
  "http://pngimg.com/uploads/christmas/christmas_PNG3748.png",
  "http://mreliot.com/wp-content/uploads/2014/12/christmas-tree-in-the-snow-holiday-hd-wallpaper-1920x1080-5401.jpg",
];

var chosenUrl;
function rainCards() {
  for (i = 0; i < imageurls.length; i++) {
    let randnumber = Math.floor(Math.random() * 80 + 10);
    let randnumber2 = Math.floor(Math.random() * 800);

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

for (i = 0; i < 20; i++) {
  createSnow();
}
rainCards();
createBulbs();
var rainInterval;

rainInterval = setInterval(() => {
  // console.log("raining interval")
  rainCards2();
}, 30);

// clearInterval(rainInterval)
function rainCards2() {
  var rainBoxHeight = $(".rainContainer")[0].getBoundingClientRect().height;
  // console.log(rainBoxHeight);
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

function rainSnow() {
  var rainBoxHeight = $(".window")[0].getBoundingClientRect().height;
  // console.log(rainBoxHeight);
  var cards = $(".snow");
  // console.log(cards)
  cards.each(function (index, value) {
    let tempTop = $(value).css("top");
    // console.log(tempTop)

    tempTop = parseFloat(tempTop.split("px")[0]);
    // console.log(tempTop)
    let newTop = 0;

    if (tempTop <= rainBoxHeight) {
      // console.log("eat 1")
      newTop = tempTop + 1;
    } else {
      newTop = 0;
    }
    $(value).css("top", newTop + "px");
  });
}

$("#submission").on("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  var newUrl = $("#imageUrl").val();
  if (newUrl.length > 5) {
    addCard(newUrl);
    $("#imageUrl").val("");
  }
});
//add the new card to the rain group
function addCard(url) {
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
  imageurls.push(url);
}

var snowInterval;

$("body").on("click", ".cardFront", (e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log("clicked card");
  chosenUrl = $(e.target).css("background-image");
  // $(e.target).parent().remove()
  $(".rainContainer").addClass("rainHide");
  setTimeout(() => {
    createFrame(chosenUrl);
    $(".floatingCard").remove();

    snowInterval = setInterval(() => {
      rainSnow();
    }, 30);
    clearInterval(rainInterval);
  }, 500);
});

$("body").on("click", ".frameFollow", (e) => {
  e.preventDefault();
  e.stopPropagation();
  $(e.target).removeClass("frameFollow");
  $(e.target).addClass("framePinned");
});

$("body").on("click", ".framePinned", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!$(e.target).hasClass("frameFollow")) {
    $(e.target).removeClass("framePinned");
    $(e.target).addClass("frameFollow");
  }
});
$(".wall").mousemove((e) => {
  e.preventDefault();
  e.stopPropagation();
  var frame = $(".frameFollow");
  frame.css("top", e.clientY - 50);
  frame.css("left", e.clientX - 50);
});

function createFrame() {
  console.log(chosenUrl);
  console.log("creating frame");
  var frame = $("<div>");
  $(frame).addClass("frame");
  $(frame).addClass("frameFollow");
  $(frame).css("background-image", chosenUrl);
  $(".houseContainer").append(frame);
}

$(".window").click((e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log("window");
  $(".rainContainer").removeClass("rainHide");
  rainCards();
  clearInterval(snowInterval);
  rainInterval = setInterval(() => {
    // console.log("raining interval")
    rainCards2();
  }, 30);
});

function createSnow() {
  var snow = $("<div>");
  snow.addClass("snow");
  let randomSize = Math.random() * 10 + 5;
  snow.css("left", Math.random() * 100 + "%");
  snow.css("top", Math.random() * 100 + "%");

  snow.css("height", randomSize);
  snow.css("width", randomSize);
  $(".window").prepend(snow);
}

function createBulbs() {
  for (i = 0; i < 20; i++) {
    let randHeight = Math.random() * 50 + 15;
    let randLeft = Math.random() * 30 - 15;
    let randColor = Math.floor(Math.random() * 3);
    let bulb = $("<div>");
    bulb.addClass("bulb");
    switch (randColor) {
      case 0:
        bulb.css("background-color", "red");
        break;
      case 1:
        bulb.css("background-color", "green");
        break;
      case 2:
        bulb.css("background-color", "gold");
        break;

      default:
        bulb.css("background-color", "gold");
        break;
    }

    bulb.css("top", randHeight + "%");
    bulb.css("left", 50 + randLeft + "%");
    $(".treeContainer").append(bulb);
  }
}

function generatePresents(xPosition){
  var randNumber = Math.floor(Math.random*5+1)
  for(i=0;i<randNumber;i++){
    let box = $("<div>");
    $(box).addClass("present");
    
  }

}


$(document).on("click",".bulb",e=>{
  e.stopPropagation();
  e.preventDefault();
  $(e.target).addClass("ballDrop");
})

function ballDrop(ball){
  let tempHeight = parseFloat($(ball).css("top").split("%"));
  if(tempHeight<=100){
    tempHeight++;
    $(ball).css("top",tempHeight+"%");
     }
     else{
      $(ball).addClass("explode");
      $(ball).removeClass("ballDrop");
      setTimeout(() => {

        $(ball).remove()
      }, 200);

      generatePresents()

     }
  

}