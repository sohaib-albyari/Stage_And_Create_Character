var layout = document.querySelector(".layout");
var showFaceCreate = document.getElementById("showFaceCreate");
var human = document.querySelectorAll(".human");
var nameinput = document.querySelector(".input");
var imgs = showFaceCreate.querySelectorAll("img");
var sideImges = document.querySelector(".sideImges");
var sideCenterImge = document.querySelectorAll(".sideCenterImge");
var bothImage = document.getElementById("sideImges3");
var centerImgerChange = document.getElementById("centerImage");
var alertMasseges = document.getElementById("alertMasseges");
var alertMasseges2 = document.getElementById("alertMasseges2");
var dropdown = document.querySelector(".dropdown-content");
var mainDropdown = document.querySelector(".dropdown");
var mainNameinput = document.querySelector(".nameinput");
var clearData = document.querySelector(".clearData");
var btnBack = document.querySelectorAll("#btnBack");
var checker = [];
var n = {
  gender: "",
  custum_url: "",
};
var custum_img_index = 3;

btnBack.forEach((e, i) => {
  e.addEventListener("click", () => {
    switch (i) {
      case 0:
        window.location.href = "../index.html";
        break;

      case 1:
        window.location.href = "../creat/index.html";
        break;

      default:
        break;
    }
    console.log(i);
    // window.location.href = "../index.html";
  });
});

function saveName() {
  var nameInput = document.getElementById("nameInput").value;
  if (nameInput.trim() !== "") {
    localStorage.setItem("user_name", nameInput);
    return 1;
  } else {
    nameinput.style.border = "1px solid rgb(210 111 111)";
    nameinput.style.background = "#bb6b72";
    alertMasseges.style.display = "inline-block";
    return 0;
  }
}
human.forEach((h) => {
  h.onclick = () => {
    n.gender = h.id;
    n.custum_url = `imges/${n.gender}/${n.gender}${custum_img_index}.png`;
    if (!saveName()) return;
    if (checkname()) return;
    localStorage.removeItem("imagePositions");
    localStorage.setItem("choiseGender", n.gender);
    saveName();
    alertMasseges.style.display = "none";
    mainDropdown.style.display = "none";
    btnBack[0].style.display = "none";
    mainNameinput.style.display = "none";
    clearData.style.display = "none";
    imgs.forEach((img, i) => {
      switch (i) {
        case 0:
          img.src = `imges/${n.gender}/RightEye.png`;
          break;
        case 1:
          img.src = `imges/${n.gender}/LeftEye.png`;
          break;
        case 2:
          img.src = `imges/${n.gender}/Mouth.png`;
          break;
        case 3:
          img.src = `imges/${n.gender}/Nose.png`;
          break;
        case 4:
          img.src = `imges/${n.gender}/mouth1.png`;
          break;
        case 5:
          img.src = `imges/${n.gender}/mouth2.png`;
          break;
        case 6:
          img.src = `imges/${n.gender}/happyEyeleft.png`;
          break;
        case 7:
          img.src = `imges/${n.gender}/happyEyeright.png`;
          break;
        case 8:
          img.src = `imges/${n.gender}/engryeye1.png`;
          break;
        case 9:
          img.src = `imges/${n.gender}/engryeye2.png`;
          break;
        case 10:
          img.src = n.custum_url;
          break;
        default:
          break;
      }
      bothImage.src = n.custum_url;
    });
    mainDropdown.style.display = "none";
    layout.style.display = "none";
    showFaceCreate.style.display = "block";
    nameInput.style.display = "none";
    konva();
  };
});

function updateCustem(newUrl) {
  var current_Record = JSON.parse(localStorage.getItem("imagePositions"));
  if (current_Record) {
    current_Record[0].custum_url = newUrl;
    localStorage.setItem("imagePositions", JSON.stringify(current_Record));
  }
}
updateCustem();
function konva() {
  var imagePositions = [];
  imagePositions.push(n);

  var layer = new Konva.Layer();
  var stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight,
  });
  function setSrcImge() {
    sideCenterImge.forEach((current, i) => {
      current.src = `imges/${n.gender}/Asset${i}.png`;
    });
  }
  localStorage.setItem("imagePositions", JSON.stringify(imagePositions));
  setSrcImge();
  for (var i = 0; i < 4; i++) {
    var sideImges = new Konva.Image({
      id: i,
      x: 50 + i * 100,
      y: 810,
      width: 100,
      height: 200,
      draggable: false,
      image: document.getElementById("sideImges" + i),
    });
    sideImges.shadowBlur(20);

    sideImges.on("touchstart", function (t) {
      t.target.attrs.image.src = `imges/${n.gender}/${n.gender}${
        t.target.index - 1
      }.png`;
      centerImgerChange.src = t.target.attrs.image.src;
      setSrcImge();
    });
    sideImges.on("click", function (t) {
      custum_img_index = t.target.attrs.id;
      n.custum_url = `imges/${n.gender}/${n.gender}${custum_img_index}.png`;
      updateCustem(n.custum_url);

      console.log(custum_img_index);

      t.target.attrs.image.src = `imges/${n.gender}/${n.gender}${
        t.target.index - 1
      }.png`;

      centerImgerChange.src = t.target.attrs.image.src;
      setSrcImge();
    });
    sideImges.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });
    sideImges.on("mouseout", function () {
      document.body.style.cursor = "default";
    });
    // sideImges.moveToTop();
    layer.add(sideImges);
  }
  for (var i = 0; i < 10; i++) {
    var image = new Konva.Image({
      id: document.getElementById("image" + i).className,
      x: i + 1 * 100,
      y: 400,
      // width: 45,
      //  height: 38,
      draggable: true,
      image: document.getElementById("image" + i),
    });

    if (i == 0) {
      image.attrs.y = 300;
      image.attrs.x = 140;
    }
    if (i == 1) {
      image.attrs.y = 300;
      image.attrs.x = 290;
    }
    // smiling mouth
    if (i == 2) {
      image.attrs.y = 680;
      image.attrs.x = 100;
    }
    // Nose
    if (i == 3) {
      image.attrs.y = 420;
      image.attrs.x = 360;
    }
    // happy mouth
    if (i == 4) {
      image.attrs.y = 680;
      image.attrs.x = 210;
    }
    // shouting mouth
    if (i == 5) {
      image.attrs.y = 680;
      image.attrs.x = 300;
    }
    // smiling eye 1
    if (i == 6) {
      image.attrs.y = 400;
      image.attrs.x = 140;
    }
    // smiling eye 2
    if (i == 7) {
      image.attrs.y = 400;
      image.attrs.x = 280;
    }

    if (i == 8) {
      image.attrs.y = 500;
      image.attrs.x = 140;
    }
    if (i == 9) {
      image.attrs.y = 500;
      image.attrs.x = 270;
    }
    image.on("dragend", function (e) {
      // Save the position of the image
      //  this.scaleX;
      if (imagePositions.length) {
        for (let i = 1; i < imagePositions.length + 1; i++) {
          if (e.target.attrs.image.className == imagePositions[i]?.id) {
            imagePositions.splice(i, 1);
          }
        }
        imagePositions.push({
          id: this.id(),
          x: this.x(),
          y: this.y(),
        });
        localStorage.setItem("imagePositions", JSON.stringify(imagePositions));
      } else {
        console.log("init");
        imagePositions.push(n.gender);
        imagePositions.push({
          id: this.id(),
          x: this.x(),
          y: this.y(),
        });
        localStorage.setItem("imagePositions", JSON.stringify(imagePositions));
      }
    });
    image.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });
    image.on("mouseout", function () {
      document.body.style.cursor = "default";
    });
    layer.add(image);
  }
  // Create one image in the center
  var centerImage = new Konva.Image({
    x: 820,
    y: 200,
    // width: 250,
    // height: 500,
    draggable: false,
    image: document.getElementById("centerImage"),
  });
  layer.add(centerImage);
  centerImage.moveToBottom();
  // Add the layer to the stage
  stage.add(layer);
  const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    window.location.href = "theaterReciver/index.html";
  });
}

function checkname() {
  checker = [];
  asAnchor.forEach((lop) => {
    if (nameInput.value == lop.innerText) {
      alertMasseges2.style.display = "inline-block";
      window.alert("تم انشاءه مسبقا");
      checker.push(true);
    } else checker.push(false);
  });
  if (checker.includes(true)) {
    return true;
  } else return false;
}

var loopIn = 0;
function repeted() {
  if (JSON.parse(localStorage.getItem("imagePositions" + loopIn))) {
    //  while (loopIn) {

    var anchorTag = document.createElement("a");
    var icon = document.createElement("i");
    var eyeIcon = document.createElement("i");
    {
      /* <i class="fa-regular fa-eye"></i> */
    }
    var inPostionnew = JSON.parse(
      localStorage.getItem("imagePositions" + loopIn)
    );
    var nameIndex = inPostionnew[inPostionnew.length - 2];
    dropdown.appendChild(anchorTag);

    anchorTag.innerHTML = nameIndex;
    anchorTag.href = "#";
    anchorTag.id = loopIn;
    anchorTag.className = "bad";
    anchorTag.appendChild(icon);
    anchorTag.appendChild(eyeIcon);

    icon.className = "fa-regular fa-circle-xmark fa-xl";
    icon.style.position = "absolute";
    icon.style.right = "10px";
    icon.style.marginTop = "16px";
    icon.style.zIndex = "2";
    icon.id = "delete";
    eyeIcon.className = "fa-regular fa-eye fa-xl";
    eyeIcon.style.position = "absolute";
    eyeIcon.style.right = "40px";
    eyeIcon.style.marginTop = "16px";
    eyeIcon.style.zIndex = "2";
    eyeIcon.id = "viwe";
    eyeIcon.style.h;
    loopIn++;
  } else {
    if (loopIn < localStorage.length) {
      loopIn++;
    } else {
      return;
    }
  }
}

for (let i = 0; i < localStorage.length; i++) {
  repeted();
}

var main = JSON.parse(localStorage.getItem("imagePositions"));
const asAnchor = dropdown.querySelectorAll("a");
asAnchor.forEach((a, i) => {
  var viwe = a.querySelector("#viwe");
  var pasrr = JSON.parse(localStorage.getItem("imagePositions" + a.id));
  viwe.addEventListener("click", () => {
    main = pasrr;
    localStorage.setItem("imagePositions", JSON.stringify(main));
    window.location.href = "theaterReciver/index.html";
  });

  var Iall = a.querySelector("#delete");
  Iall.addEventListener("click", () => {
    localStorage.removeItem("imagePositions" + a.id);
    window.location.href = ".../index.html";
    location.reload();
  });
});

function clearShapes() {
  window.alert("هل انت متاكد من حذف جميع الرسمات");

  localStorage.clear();
  location.reload();
}
var overlay = document.getElementById("overlay");
// Get emoji container element
var emojiContainer = document.getElementById("emojiContainer");
// Store the default emoji
var defaultEmoji = emojiContainer.innerHTML;

// Show overlay
function showOverlay() {
  overlay.style.display = "flex";
}

// Hide overlay
function hideOverlay() {
  overlay.style.display = "none";
  resetEmoji(); // Reset emoji when hiding overlay
}

// Show emoji
function showEmoji(emoji) {
  emojiContainer.innerHTML = emoji;
}

// Reset emoji to default
function resetEmoji() {
  emojiContainer.innerHTML = defaultEmoji;
}

// Handle "Okay" button click
function handleOkay() {
  console.log("Okay button clicked");
  localStorage.clear();
  location.reload();
  hideOverlay();
}

// Handle "Quit" button click
function handleQuit() {
  console.log("Quit button clicked");
  // Add your logic for the "Quit" button action
  hideOverlay();
}
