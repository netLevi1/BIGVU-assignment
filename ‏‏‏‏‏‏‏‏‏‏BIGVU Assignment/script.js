   //global vars:
    var backColor = "white"
    var layout = "full"
    //

 
    // I tried to access the json file via the url, but due to CORS problem I was not able to get it.
    // so i copied the data to the script.
    var json = [
      { "name": "Daisi", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Daisi.png" },
      { "name": "Shiri", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Shiri.png" },
      { "name": "Sarha", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Sarha.png" },
      { "name": "Rivka", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Rivka.png" },
      { "name": "Noa", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Noa.png" },
      { "name": "Erika", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Erika.png" },
      { "name": "Eli", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Eli.png" }
    ];

  ////////////////////////////////////////////
  window.onload = function () {
    for (var i = 0; i < json.length; i++) {
      addOption(json[i]);
    }
    //draw("https://bigvu-interviews-assets.s3.amazonaws.com/images/Daisi.png", "Welcome to BIGVU");
    document.getElementById("inputText").addEventListener("input", debounce(updateTextAndPhoto, 400))
  }
  //////////////////////////////////////////////

//adding the options to the select menu
  function addOption(option) {
    var select = document.getElementById("names");
    element = document.createElement("option");
    element.textContent = option.name;
    element.value = option.value;
    select.appendChild(element);
  }

    function backgroung(color) {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    //chnge photo when select menu changed
    function changePhoto() {
      var imgPath = document.getElementById("names").value;
      document.getElementById("pic").src = imgPath
      updateTextAndPhoto();
      //ctx.drawImage(img, 10, 10, 600, 320, 20, 20, 600, 320);
    }

    function debounce(callbackFunc, delayTime) {
      let timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(callbackFunc, delayTime);
      }
    }


    function changeLayout() {
      if (layout == "full")
        layout = "divided";
      else
        layout = "full";
      updateTextAndPhoto();
    }

    function turnBlue() {
      backgroung("#4287f5");
      backColor = "#4287f5"
      document.getElementById("inputText").value = '';

    }

    function turnWhite() {
      backgroung("white");
      backColor = "white";
      document.getElementById("inputText").value = '';
    }

    //slice string to array proportional to the width drawn on canvas
    function sliceString(strToSlice, px) {   
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.font = 'bold 50px Inter';
      var arrSize = Math.floor((ctx.measureText(strToSlice).width) / px) + 1;
      var index = 0;
      var startIndex = 0;
      var lines = new Array(arrSize);
      for (var i = 0; i <= strToSlice.length; i++) {
        var subStr = strToSlice.slice(startIndex, i);
        var len = ctx.measureText(subStr).width;
        if (len > px - 20) {
          lines[index] = subStr;
          index++;
          startIndex = i;
        }
        if (index == arrSize - 1) {
          lines[index] = subStr;
        }
      }
      console.log(lines);
      return lines;
    }
    
//update text and photo for the full layout
function updateTextAndPhotoFull() {
      color = document.getElementById("colorpicker").value;
      var strToPrint = document.getElementById("inputText").value;
      var imgPath = document.getElementById("names").value;
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.font = 'bold 50px Inter';
      if (ctx.measureText(strToPrint).width > 600) {
        var lines = sliceString(strToPrint, 600);
        var yOffset = -75;
        var i;
        backgroung(backColor);
        var img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 10, 10);
          ctx.fillStyle = color;
          ctx.font = 'bold 50px Inter';
          ctx.textAlign = 'center';
          for (i = 0; i < lines.length; i++) {
            var str = lines[i];
            console.log(str)
            ctx.fillText(str, canvas.width / 2, (canvas.height / 2) + yOffset);
            yOffset = yOffset + 60;
          }
        };
        img.src = imgPath;
      }
      else {
        backgroung(backColor);
        var img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 10, 10);
          ctx.fillStyle = color;
          ctx.font = 'bold 50px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(strToPrint, canvas.width / 2, canvas.height / 2);
        };
        img.src = imgPath;
      }
    }

//update text and photo for the divided layout
function updateTextAndPhotoDivided() {
      color = document.getElementById("colorpicker").value;
      var strToPrint = document.getElementById("inputText").value;
      var imgPath = document.getElementById("names").value;
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.font = 'bold 50px Inter';
      if (ctx.measureText(strToPrint).width > 200) {
        var lines = sliceString(strToPrint, 200);
        var yOffset = -75;
        var i;
        backgroung(backColor);
        var img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 0, 0, 400, 340, 10, 10, 400, 340);
          ctx.fillStyle = color;
          ctx.font = 'bold 50px Inter';
          ctx.textAlign = 'center';
          for (i = 0; i < lines.length; i++) {
            var str = lines[i];
            ctx.fillText(str, 530, canvas.height / 2 + yOffset);
            yOffset = yOffset + 60;
          }
        };
        img.src = imgPath;
      }
      else {
        backgroung(backColor);
        var img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 0, 0, 400, 340, 10, 10, 400, 340);
          ctx.fillStyle = color;
          ctx.font = 'bold 50px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(strToPrint, 530, canvas.height / 2);;
        };
        img.src = imgPath;
      }
    }

    
    function updateTextAndPhoto() {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (layout == "full") {
        updateTextAndPhotoFull();
      }
      else { //layout = "divided"
        updateTextAndPhotoDivided();
      }
    }