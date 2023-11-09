var imageurls = [
  "https://logicface.co.uk/wp-content/uploads/2021/12/santa-coding.jpeg",
  "http://pngimg.com/uploads/christmas/christmas_PNG3748.png",
  "http://mreliot.com/wp-content/uploads/2014/12/christmas-tree-in-the-snow-holiday-hd-wallpaper-1920x1080-5401.jpg",
];



function randomColor1() {
  for (let i = 0; i < 30; i++) {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var j = 0; j < 6; j++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  }
  return color;
}


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
createBulbs(20);
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

function createBulbs(number) {
  for (i = 0; i < number; i++) {
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

function generatePresents(xPosition) {
  console.log("generating presents")
  console.log(xPosition)
  var randNumber = Math.floor(Math.random() * 5 + 1);
  console.log(randNumber)
  for (i = 0; i < randNumber; i++) {
    let box = $("<div>");
    $(box).addClass("present");
    let randNumber2 = Math.floor(Math.random()*6)
    let randNumberHeight = Math.random() * 50+20;

    let randNumberWidth = Math.random() * 50+20;


    switch (randNumber2) {
      case 0:
        $(box).css("animation", "box0 .3s both");
        break;
      case 1:
        $(box).css("animation", "box1 .3s both");
        break;
      case 2:
        $(box).css("animation", "box2 .3s both");
        break;
      case 3:
        $(box).css("animation", "box3 .3s both");
        break;
      case 4:
        $(box).css("animation", "box4 .3s both");
        break;
      case 5:
        $(box).css("animation", "box5 .3s both");
        break;

      default:
        $(box).css("animation", "box5 .3s both");

        break;
    }
    var treecontainHeight =  $(".treeContainer")[0].getBoundingClientRect().height / 2;
    var presentHeight = treecontainHeight - randNumberHeight

    $(box).css("left", xPosition);
    $(box).css("top", presentHeight);
    $(box).css("height", randNumberHeight+"px")
    $(box).css("width", randNumberWidth + "px");
    $(box).css("background-color",randomColor1())
    var ribbon1 = $("<div>")
    $(ribbon1).addClass("ribbon1")
    $(ribbon1).css("left", Math.random()*60+20+"%")
    $(ribbon1).css("background-color", randomColor1());

    var ribbon2 = $("<div>");
    $(ribbon2).addClass("ribbon2");
    $(ribbon2).css("top", Math.random() * 60 + 20 + "%");
    $(ribbon2).css("background-color", randomColor1());

    $(box).append(ribbon1)
    $(box).append(ribbon2)
    $(".treeContainer").append(box)


  }
}

$('body').on("click",".bulb", (e) => {
  e.stopPropagation();
  e.preventDefault();
  $(e.target).addClass("ballDrop");
});

function ballDropHelper(ball) {
  var treeBoxHeight =
    $(".treeContainer")[0].getBoundingClientRect().height / 2;

  let tempHeight = parseFloat($(ball).css("top").split("%")[0]);
  if (tempHeight <= treeBoxHeight) {
    tempHeight+=15;
    // console.log(tempHeight)
    $(ball).css("top", tempHeight + "px");
  } else {
    $(ball).addClass("explode");
    new Audio("./shatter.mp3").play();

    $(ball).removeClass("ballDrop");
    setTimeout(() => {
      $(ball).remove();
    }, 200);

    generatePresents($(ball).css("left"));
  }
}

function ballDrop() {
  var cards = $(".ballDrop");
  // console.log(cards)
  cards.each(function (index, value) {
    ballDropHelper(value)
  });
}


var bulbInterval = setInterval(() => {
  // console.log("raining interval")
  ballDrop();
}, 30);

$("body").on("click", ".present", (e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log("present click")

  $(e.target).addClass("explode");
      setTimeout(() => {
          if ($(e.target).hasClass("present")) {
            explodePresent(
              parseInt(e.clientX),
              parseInt(e.clientY),
              $(e.target).css("background-color")
            );
          }
        $(e.target).remove();
        createBulbs(1)
      }, 200);

});

function explodePresent(positionX, positionY, color){
      new Audio("./pop.mp3").play();

  console.log("explode present")
  console.log(positionX)
  console.log(positionY)

for(i=0; i<6; i++){
  var sparkle = $("<div>");
  sparkle.addClass("sparkle")
    sparkle.addClass("explode");

  let randHeight = Math.random()*100-50;
  let randWidth = Math.random()*100-50;
  $(sparkle).css("top", positionY+randHeight + "px")
    $(sparkle).css("left", positionX + randWidth + "px");
    $(sparkle).css("background-color",color)
$("body").append(sparkle);
setTimeout(() => {
  $(".sparkle").remove()
}, 200);


}

}