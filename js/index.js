(function () {
    var game = new Match(".game", {
        templateElm: ".templates > div"
      , autoremove: false
      , size: {
            x: 1
          , y: 2
        }
      , step: {
            x: 125
          , y: 115
        }
    }, [
        {
            img: "images/1-star.png"
        }
      , {
            img: "images/10-musical-note.png"
        }
      , {
            img: "images/11-sun.png"
        }
      , {
            img: "images/12-peace-sign.png"
        }
      , {
            img: "images/13-moon.png"
        }
      , {
            img: "images/14-heart.png"
        }
      , {
            img: "images/15-zig-zag.png"
        }
      , {
            img: "images/16-colors.png"
        }
      , {
            img: "images/17-clover.png"
        }
      , {
            img: "images/17-star.png"
        }
      , {
            img: "images/18-apple.png"
        }
      , {
            img: "images/19-castle.png"
        }
      , {
            img: "images/2-butterfly.png"
        }
      , {
            img: "images/20-dolar.png"
        }
      , {
            img: "images/21-circles.png"
        }
      , {
            img: "images/22-bars.png"
        }
      , {
            img: "images/23-ball.png"
        }
      , {
            img: "images/24-carpet.png"
        }
      , {
            img: "images/25-rectangle.png"
        }
      , {
            img: "images/26-grey-park.png"
        }
      , {
            img: "images/27-question-mark.png"
        }
      , {
            img: "images/28-tree.png"
        }
      , {
            img: "images/29-sandtime.png"
        }
      , {
            img: "images/3-chinese.png"
        }
      , {
            img: "images/30-diode.png"
        }
      , {
            img: "images/4-potion.png"
        }
      , {
            img: "images/5-happy-face.png"
        }
      , {
            img: "images/6-stop.png"
        }
      , {
            img: "images/7-house.png"
        }
      , {
            img: "images/8-black-sign.png"
        }
      , {
            img: "images/8-chees.png"
        }
    ]);

    document.querySelector(".highscores .ok-btn").addEventListener("click", function () {
        document.querySelector(".highscores").style.display = "none";
    });

    game.on("win", function () {
        setTimeout(function () {
            window.location = "https://github.com/IonicaBizau/match.js";
        }, 1000);
    });

    game.on("activate", function (elm) {
      elm.classList.remove("unspin");
      elm.classList.add("spin");
    });

    game.on("deactivate", function (elm) {
      elm.classList.add("unspin");
      elm.classList.remove("spin");
    });

    game.on("success", function (elm1, elm2) {
        setTimeout(function() {
            elm1.classList.add("spinned-zoom-out");
            elm2.classList.add("spinned-zoom-out");
            setTimeout(function() {
                elm1.remove();
                elm2.remove();
            }, 900);
        }, 1000);
    });

    var timeEl = document.getElementsByClassName("time")[0];
    game.on("time", function (time) {
        timeEl.innerHTML = Math.floor(time / 1000);
    });

    var pairsCountEl = document.getElementsByClassName("pairs-count")[0];
    game.start();
    game.on("pair-flip", function () {
        pairsCountEl.innerHTML = game.flippedPairs;
    });
})();

