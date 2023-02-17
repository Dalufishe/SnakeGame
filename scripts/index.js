//$ game import 
import Game from "../core/index.js"
//$ config 
const GAME_CONFIG = {
    width: 13,
    height: 13,
    positionX: 6,
    positionY: 6,
    speed: 200,
    dropSpeed: 500,
    keys: {
        up: ["w", "W", "ArrowUp"],
        down: ["s", "S", "ArrowDown"],
        left: ["a", "A", "ArrowLeft"],
        right: ["d", "D", "ArrowRight"]
    }
}

//$ init
//* core
const game = Game.init({
    width: GAME_CONFIG.width,
    height: GAME_CONFIG.height,
    positionX: GAME_CONFIG.positionX,
    positionY: GAME_CONFIG.positionY,
    speed: GAME_CONFIG.speed,
    dropSpeed: GAME_CONFIG.dropSpeed,
    keys: GAME_CONFIG.keys
});

//* display
// root
const root = $("#root");

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
    $("#score").html(`
        <h1>
        ${game.score}
        </h1>
        `)
}

game.register({
    moveCallback: (game) => {
        //* init
        $(".block").removeClass("snake");
        $(".block").removeClass("drop");
        $(".block").removeClass("head");

        //* display
        game.snake.entire.forEach(s => {
            $("#block_" + s).addClass("snake")
        })

        $("#block_" + game.snake.head).addClass("head")

        $("#score").html(`
        <h1>
        ${game.score}
        </h1>
        `);

        game.drops.forEach(drop => {
            $("#block_" + drop).addClass("drop")
        })
    },
    endCallback: () => {
        $("#score").html(`
        <h1>
            You Lose
        <h1>`)

    }
})

// $ loop
game.start()