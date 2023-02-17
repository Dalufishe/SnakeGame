export default class Game {
    /**
     * Copyright 2022 The SnakeGame Authors. All Rights Reserved.
     * 
     * 貪吃蛇函式庫 by Dalufishe
     * 
     * 支持 : 
     * - 可配置的遊戲數據庫 (game-state)
     * - 完全可自訂義的渲染支持 (custom-display)
     * 
     **/
    constructor({
        width,
        height,
        positionX,
        positionY,
        speed,
        dropSpeed,
        keys
    } = {}) {
        //* init
        this.width = width || 4;
        this.height = height || 4;
        this.positionX = positionX < 0 ? 2 : positionX;
        this.positionY = positionY < 0 ? 2 : positionY;
        this.snake = {
            length: 1,
            head: `${this.positionX}_${this.positionY}`,
            body: [],
            entire: [`${this.positionX}_${this.positionY}`],
        };
        this.drops = [];
        this.speed = speed;
        this.dropSpeed = dropSpeed;
        this.keys = keys;
        this.move = "LEFT";
        this.score = 0;
        this.move_loop_itv;
        this.drop_loop_itv;
        //* register event listener
        document.addEventListener("keydown", (evt) => {
            const up = this.keys.up || ["w", "W"];
            const down = this.keys.down || ["s", "S"];
            const left = this.keys.left || ["a", "A"];
            const right = this.keys.right || ["d", "D"];
            if (Array.isArray(up)) {
                for (let key of up) {
                    if (evt.key === key) {
                        //* set "UP"
                        this.move = "UP";
                    }
                }
            } else {
                if (evt.key === up) {
                    //* set "UP"
                    this.move = "UP";
                }
            }
            if (Array.isArray(down)) {
                for (let key of down) {
                    if (evt.key === key) {
                        //* set "DONW"
                        this.move = "DOWN";
                    }
                }
            } else {
                if (evt.key === down) {
                    //* set "DONW"
                    this.move = "DOWN";
                }
            }

            if (Array.isArray(left)) {
                for (let key of left) {
                    if (evt.key === key) {
                        //* set "LEFT"
                        this.move = "LEFT";
                    }
                }
            } else {
                if (evt.key === left) {
                    //* set "LEFT"
                    this.move = "LEFT";
                }
            }

            if (Array.isArray(right)) {
                for (let key of right) {
                    if (evt.key === key) {
                        //* set "RIGHT"
                        this.move = "RIGHT";
                    }
                }
            } else {
                if (evt.key === right) {
                    //* set "RIGHT"
                    this.move = "RIGHT";

                }
            }
        })
    }
    static init(init = {}) {
        return new Game(init);
    }
    register({
        moveCallback,
        endCallback,
    }) {
        this.moveCallback = moveCallback;
        this.endCallback = endCallback;
    }
    //* set snake
    setSnake(head, body) {
        this.snake.head = head
        this.snake.body = body
        this.snake.entire = [...body, head]
    }
    //* set drop
    setDrop(drop) {
        this.drops.push(drop)
    }
    //* delete drop
    deleteDrop(drop) {
        this.drops = this.drops.filter(item => item != drop)
    }
    //* handleMove
    handleMove(callback) {
        // handle move
        switch (this.move) {
            case "UP":
                this.positionY -= 1
                this.setSnake(`${this.positionX}_${this.positionY}`,
                    this.snake.entire.slice(1))

                break
            case "DOWN":
                this.positionY += 1
                this.setSnake(`${this.positionX}_${this.positionY}`,
                    this.snake.entire.slice(1))

                break
            case "LEFT":
                this.positionX -= 1
                this.setSnake(`${this.positionX}_${this.positionY}`,
                    this.snake.entire.slice(1))

                break
            case "RIGHT":
                this.positionX += 1
                this.setSnake(`${this.positionX}_${this.positionY}`,
                    this.snake.entire.slice(1))

                break
            default:
                break
        }

        // handle meet
        this.handleMeet();

        // game-lose
        if (this.snake.body.find(s => s === this.snake.head) ||
            this.positionY < 0 ||
            this.positionY > this.height - 1 ||
            this.positionX < 0 ||
            this.positionX > this.width - 1) {
            this.end();
            return
        }




        callback(this);
    }

    handleMeet() {
        if (this.drops.find(drop => drop === this.snake.head)) {
            this.deleteDrop(this.snake.head)
            this.setSnake(this.snake.head, [this.snake.body[0], ...this.snake.body])
        }
    }
    //* handleDrop
    handleDrop() {
        const ramdomX = Math.floor(Math.random() * this.width);
        const ramdomY = Math.floor(Math.random() * this.height);
        const randomPosition = ramdomX + "_" + ramdomY
        this.setDrop(randomPosition)
    }
    start() {
        // init
        const startTime = Date.now();

        // loops
        // move-loop
        this.move_loop_itv = setInterval(() => {
            // score count
            this.score = ((Date.now() - startTime) * 9 / 100).toFixed(0)

            // move snake
            this.handleMove(this.moveCallback);
        }, this.speed)

        // drop-loop
        this.drop_loop_itv = setInterval(() => {
            this.handleDrop()
        }, this.dropSpeed)
    }

    end() {
        clearInterval(this.move_loop_itv)
        clearInterval(this.drop_loop_itv)
        if (this.endCallback) {
            this.endCallback()
        }
        else {
            throw new Error("end game");
        }
    }
}