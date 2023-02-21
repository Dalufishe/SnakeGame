//$ game import 
import Game from "../../core/SnakeGame.js"
//$ config 
const GAME_CONFIG = {
    width: 33,
    height: 33,
    speed: 200,
    dropSpeed: 500,
    keys: {
        up: ["w", "W", "ArrowUp", "k"],
        down: ["s", "S", "ArrowDown", "j"],
        left: ["a", "A", "ArrowLeft", "h"],
        right: ["d", "D", "ArrowRight", "l"]
    }
}

//$ init
//* core
const game = Game.init(GAME_CONFIG);

//* display
// root
const root = $("#root");
const history = window.localStorage.getItem("history") || "";

for (let i = 0; i < GAME_CONFIG.height; i++) {
    // row
    const row = $("<div></div>")
        .addClass("row")
        .css({
            width: root.width() + "px",
            height: root.height() / GAME_CONFIG.height + "px"
        })
        .appendTo(root)
    for (let j = 0; j < GAME_CONFIG.width; j++) {
        // block
        const block = $("<div></div>")
            .addClass("block")
            .attr("id", `block_${j}_${i}`)
            .css({
                width: root.width() / GAME_CONFIG.width + "px",
                height: root.height() / GAME_CONFIG.height + "px",
            })
            .appendTo(row)
    }
    // init-snake
    $(".block").removeClass("snake");
    $("#block_" + game.snake.head).addClass("snake")

}

$("#score h3").text(`${game.score}`)
$("#level h4").text(`Lv. ${game.level} / Spd. ${game.speed.toFixed(0)}`)

//history
for (let i of history?.split("-").slice(0, history.split("-").length - 1)) {
    $("#history ul").append(`<li>${i}</li>`)
}

game.register({
    moveCallback: (game) => {
        //* init
        $(".block").removeClass("snake");
        $(".block").removeClass("drop");
        $(".block").removeClass("head");

        //* display 
        // snake
        game.snake.entire.forEach(s => {
            $("#block_" + s).addClass("snake")
        })
        // head
        $("#block_" + game.snake.head).addClass("head")

        // score && level
        $("#score h3").text(`${game.score}`);
        $("#level h4").text(`Lv ${game.level}  / Spd. ${game.speed.toFixed(0)}`)

        // drops
        game.drops.forEach(drop => {
            $("#block_" + drop).addClass("drop")
        })
    },
    endCallback: (game) => {
        // $("#score h3").text(`You Lose`)
        $(".block").removeClass("head");
        $("#block_" + game.snake.head).addClass("lose")
        $("#score h3").text(`${game.score}`)
        $("#level h4").text(`Lv ${game.level}`)

        // set history
        window.localStorage.setItem("history", history + `${game.score}-`)
    }
})

// $ loop
game.start()