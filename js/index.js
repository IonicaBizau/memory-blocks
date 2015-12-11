(function () {
    var game = new Match(".game", {
        templateElm: ".templates > div"
      , autoremove: false
      , size: {
            x: 6
          , y: 5
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

    function showHighscores() {
        var hScores = Highscores.get();

        function forTable(selector, scores) {
            var elms = document.querySelectorAll(selector + " table tbody tr");
            for (var i = 0; i < elms.length; ++i) {
                var cRow = elms[i];
                var tds = cRow.querySelectorAll("td");
                scores[i] = scores[i] || { name: "", time: "", pairs: "", timestamp: "" };
                tds[1].textContent = scores[i].name;
                tds[2].textContent = scores[i].time;
                tds[4].textContent = scores[i].pairs;
                cRow.setAttribute("data-timestamp", scores[i].timestamp.toString());
                cRow.classList.remove("selected");
            }
        }

        forTable(".fastest-times", hScores.fastestTimes);
        forTable(".fewest-pairs", hScores.fewestPairs);
        document.querySelector(".highscores").style.display = "block";
    }

    document.querySelector(".highscores .ok-btn").addEventListener("click", function () {
        document.querySelector(".highscores").style.display = "none";
    });

    game.on("win", function () {
        setTimeout(function () {
            var time = game.passedTime
              , pairs = game.flippedPairs
              , gameEl = document.querySelector(".game-info")
              ;

            gameEl.classList.add("bg-win");
            setInterval(function () {
                gameEl.classList.toggle("bg-win-purple");
            }, 500);

            var enterNameEl = document.querySelector(".enter-name");
            var congratsEl = document.querySelector(".congrats");
            if (Highscores.check(pairs, time)) {
                enterNameEl.classList.remove("hide");
                setTimeout(function() {
                    document.querySelector("form input").focus();
                }, 10);
            } else {
                enterNameEl.classList.add("hide");
            }
            congratsEl.classList.remove("hide");
        }, 1500);
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
        game.passedTime = timeEl.innerHTML = Math.floor(time / 1000);
    });

    var pairsCountEl = document.getElementsByClassName("pairs-count")[0];
    game.start();
    game.on("pair-flip", function () {
        pairsCountEl.innerHTML = game.flippedPairs;
    });

    // Restart game
    document.querySelector(".restart").addEventListener("click", function () {
        location.reload();
    });

    // Toggle colors
    document.querySelector(".toggle-colors").addEventListener("click", function () {
        document.body.classList.toggle("grayscale");
    });

    // Show highscores
    document.querySelector(".show-highscores").addEventListener("click", function () {
        showHighscores();
    });

    // Reset highscores
    document.querySelector(".reset-btn").addEventListener("click", function () {
        Highscores.reset();
        showHighscores();
    });

    // View on GitHub
    document.querySelector(".view-on-github").addEventListener("click", function () {
        location = "https://github.com/IonicaBizau/blocks";
    });

    // Form submit
    document.querySelector("form").addEventListener("submit", function (e) {
        var name = document.querySelector(".user-name").value
          , inserted = Highscores.insert(name, game.passedTime, game.flippedPairs)
          ;

        document.querySelector(".enter-name").classList.add("hide");
        showHighscores();

        var toSelect = document.querySelectorAll("[data-timestamp='" + inserted.timestamp + "']");
        toSelect[0].classList.add("selected");
        if (toSelect[1]) {
            toSelect[1].classList.add("selected");
        }

        e.preventDefault();
    });
})();

