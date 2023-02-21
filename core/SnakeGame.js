
/* Copyright 2023 The SnakeGame Authors. All Rights Reserved.
==============================================================================
* 貪吃蛇核心函式庫 powered by Dalufishe & YangyangXD 
* The SnakeGame Core Libaray powered by Dalufishe & YangyangXD 

貪吃蛇核心函式庫 (The Snake Game Core Libaray) 是一款開放原始碼的函式庫，提供貪吃蛇遊戲玩法的運算及統計。
  - 坐標系統
  - 貪吃蛇主體的存取及設置
  - 自訂義按鍵配置
  - 物品掉落系統
  - 等級及得分系統
  - 本地存儲歷史紀錄

注意 : 此函式庫僅提供遊戲核心玩法和遊戲數據運算及統計 (o), 並不包含渲染 (x).

支持 : 
 - 可配置的遊戲數據庫 (game-state)
 - 完全自訂義的渲染支持 (custom-display)

*/

export default class SnakeGame {

    #move_loop_itv;
    #drop_loop_itv;

    constructor({
        mode = "spd",
        width = 13,
        height = 13,
        speed = 1000,
        dropSpeed = 500,
        keys = {
            up: ["w", "W"],
            down: ["s", "S"],
            left: ["a", "A"],
            right: ["d", "D"],
        }
    } = {}) {
        //* init
        // mode: speed | score
        this.mode = mode;
        // width & height for coordinate system
        this.width = width;
        this.height = height;
        // x & y for setting snake's position
        // workflow: x, y -> snake position -> handle others

        // snake object
        this.snake = SnakeGame.createSnake()
        // drop list
        this.drops = [];
        // move speed
        this.speed = speed;
        // drop speed
        this.dropSpeed = dropSpeed;
        // keys for control snake
        this.keys = keys;
        // the move which is going to be
        this.move = ["UP", "LEFT", "DOWN", "RIGHT"][Math.floor(Math.random() * 4)]
        // prevMove move
        this.prevMove = null;
        this.score = 0;
        this.level = 1;
        this.startTime = null;
        this.moveCallback;
        this.endCallback;

        //* register event listener
        document.addEventListener("keydown", (evt) => {
            const up = this.keys.up;
            const down = this.keys.down;
            const left = this.keys.left;
            const right = this.keys.right;
            if (Array.isArray(up)) {
                for (let key of up) {
                    if (evt.key === key) {
                        //* set "UP" (cant return)
                        if (this.prevMove != "DOWN" || this.snake.length === 1) {
                            this.move = "UP"
                        }
                    }
                }
            } else {
                if (evt.key === up) {
                    //* set "UP"
                    if (this.prevMove != "DOWN" || this.snake.length === 1) {
                        this.move = "UP"
                    }
                }
            }
            if (Array.isArray(down)) {
                for (let key of down) {
                    if (evt.key === key) {
                        //* set "DONW"
                        if (this.prevMove != "UP" || this.snake.length === 1) {
                            this.move = "DOWN"
                        }
                    }
                }
            } else {
                if (evt.key === down) {
                    //* set "DONW"
                    if (this.prevMove != "UP" || this.snake.length === 1) {
                        this.move = "DOWN"
                    }
                }
            }

            if (Array.isArray(left)) {
                for (let key of left) {
                    if (evt.key === key) {
                        //* set "LEFT"
                        if (this.prevMove != "RIGHT" || this.snake.length === 1) {
                            this.move = "LEFT"
                        }
                    }
                }
            } else {
                if (evt.key === left) {
                    //* set "LEFT"
                    if (this.prevMove != "RIGHT" || this.snake.length === 1) {
                        this.move = "LEFT"
                    }
                }
            }

            if (Array.isArray(right)) {
                for (let key of right) {
                    if (evt.key === key) {
                        //* set "RIGHT"
                        if (this.prevMove != "LEFT" || this.snake.length === 1) {
                            this.move = "RIGHT"
                        }
                    }
                }
            } else {
                if (evt.key === right) {
                    //* set "RIGHT"
                    if (this.prevMove != "LEFT" || this.snake.length === 1) {
                        this.move = "RIGHT"
                    }
                }
            }
        })
    }
    static init(init = {}) {
        return new SnakeGame(init);
    }

    // class SnakeGame.Snake
    static Snake = class Snake {
        constructor(
            {
                _id = null,
                positionX = 5,
                positionY = 5
            } = {}
        ) {
            this._id = _id;
            this.length = 1;
            this.head = `${positionX}_${positionY}`;
            this.body = [];
            this.entire = [`${positionX}_${positionY}`];
        }
    }
    static createSnake(init = {}) {
        return new SnakeGame.Snake(init);
    }

    register({
        moveCallback,
        endCallback,
    }) {
        this.moveCallback = moveCallback;
        this.endCallback = endCallback;
    }
    // set snake
    setSnake(head, body) {
        this.snake.head = head
        this.snake.body = body
        this.snake.entire = [...body, head]
        this.snake.length = this.snake.entire.length
    }
    // set drop
    setDrop(drop) {
        this.drops.push(drop)
    }
    // delete drop
    deleteDrop(drop) {
        this.drops = this.drops.filter(item => item != drop)
    }
    // handle move
    handleMove(callback) {

        const [positionX, positionY] = this.snake.head.split("_").map(item => Number(item))

        // judge and set the move
        switch (this.move) {
            case "UP":
                this.setSnake(`${positionX}_${positionY - 1}`,
                    this.snake.entire.slice(1))
                this.prevMove = "UP";
                break
            case "DOWN":
                this.setSnake(`${positionX}_${positionY + 1}`,
                    this.snake.entire.slice(1))
                this.prevMove = "DOWN"
                break
            case "LEFT":
                this.setSnake(`${positionX - 1}_${positionY}`,
                    this.snake.entire.slice(1))
                this.prevMove = "LEFT"
                break
            case "RIGHT":
                this.setSnake(`${positionX + 1}_${positionY}`,
                    this.snake.entire.slice(1))
                this.prevMove = "RIGHT"
                break
            default:
                break
        }

        // handle meet (drops)
        this.handleMeet();

        // game-lose

        this.handleLose();

        callback(this);
    }

    // handle meet (drops)
    handleMeet() {
        if (this.drops.find(drop => drop === this.snake.head)) {
            this.deleteDrop(this.snake.head)
            this.setSnake(this.snake.head, [this.snake.body[0], ...this.snake.body])
        }
    }
    // handle drop 
    handleDrop() {
        const ramdomX = Math.floor(Math.random() * this.width);
        const ramdomY = Math.floor(Math.random() * this.height);
        const randomPosition = ramdomX + "_" + ramdomY
        this.setDrop(randomPosition)
    }

    // handle Lose
    handleLose() {

        const [positionX, positionY] = this.snake.head.split("_").map(item => Number(item))

        if (this.snake.body.find(s => s === this.snake.head) ||
            positionY < 0 ||
            positionY > this.height - 1 ||
            positionX < 0 ||
            positionX > this.width - 1) {
            this.end(true);
            return
        }
    }

    // start
    start(moveCallback, endCallback) {
        if (this.mode === "spd") {
            // init
            this.startTime = this.startTime || Date.now();
            this.moveCallback = moveCallback || this.moveCallback
            this.endCallback = endCallback || this.endCallback
            // loops
            // move-loop
            this.#move_loop_itv = setInterval(() => {
                // score count
                this.score = ((Date.now() - this.startTime) * 9 / 100).toFixed(0)
                // level count
                const oldLevel = this.level;
                this.level = Number(Math.floor((this.score / 1000)).toFixed(0)) + 1
                // speed up
                const oldSpeed = this.speed
                this.speed = this.speed * (2 * (oldLevel - this.level) + 11) / 11
                if (oldSpeed != this.speed) {
                    // end but no callback (stop but not lose)
                    this.end(false);
                    // keep going
                    this.start();
                }

                // move snake
                this.handleMove(this.moveCallback);
            }, this.speed)

            // drop-loop
            this.#drop_loop_itv = setInterval(() => {
                this.handleDrop()
            }, this.dropSpeed)
        }
    }

    // end
    end(shouldCb) {
        clearInterval(this.#move_loop_itv)
        clearInterval(this.#drop_loop_itv)
        if (this.endCallback && shouldCb) {
            this.endCallback(this)
        }
    }



}

