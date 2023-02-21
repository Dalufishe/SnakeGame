import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import SnakeGame from "../../lib/SnakeGame";
import styles from "./game.module.css";
import { connect } from "react-redux";
import { setGameData } from "../../redux/action/gameAction";
import { setHistoryGameData } from "../../redux/action/historyGameAction";

function Game(props) {
  const GAME_CONFIG = useRef({
    width: 33,
    height: 33,
    snake: SnakeGame.createSnake({
      positionX: 16,
      positionY: 16,
    }),
    speed: 200,
    dropSpeed: 500,
    keys: {
      up: ["w", "W", "ArrowUp", "k", "K"],
      down: ["s", "S", "ArrowDown", "j", "J"],
      left: ["a", "A", "ArrowLeft", "h", "H"],
      right: ["d", "D", "ArrowRight", "l", "L"],
    },
    addons: [],
  });

  const [coordinate, setCoordinate] = useState([]);

  const { setGameData, setHistoryGameData } = props;

  useEffect(() => {
    // init coordinate
    const r = [];
    for (let y = 0; y < GAME_CONFIG.current.height; y++) {
      r.push([]);
      for (let x = 0; x < GAME_CONFIG.current.width; x++) {
        r[y].push({
          head: false,
          snake: false,
          drop: false,
        });
      }
    }
    setCoordinate(r);

    // init game
    const game = SnakeGame.init(GAME_CONFIG.current);
    // dispatch redux
    setGameData(game);

    // loop
    game.start(
      // looping cb
      (game) => {
        setGameData(game);

        const head = game.snake.head;
        const snake = game.snake.entire;
        const drops = game.drops;
        // create coordinate
        const r = [];
        for (let y = 0; y < GAME_CONFIG.current.height; y++) {
          r.push([]);
          for (let x = 0; x < GAME_CONFIG.current.width; x++) {
            r[y].push({
              head: `${x}_${y}` === head,
              snake: snake.find((item) => item === `${x}_${y}`),
              drop: drops.find((item) => item === `${x}_${y}`),
            });
          }
        }

        setCoordinate(r);
      },
      // endgame cb
      (game) => {
        setGameData(game);
        setHistoryGameData(game);
        const head = game.snake.head;
        const snake = game.snake.entire;
        const drops = game.drops;
        // create coordinate
        const r = [];
        for (let y = 0; y < GAME_CONFIG.current.height; y++) {
          r.push([]);
          for (let x = 0; x < GAME_CONFIG.current.width; x++) {
            r[y].push({
              lose: `${x}_${y}` === head,
              snake: snake.find((item) => item === `${x}_${y}`),
              drop: drops.find((item) => item === `${x}_${y}`),
            });
          }
        }

        setCoordinate(r);
      }
    );
  }, []);

  return (
    <Box className={styles.game}>
      {coordinate.map((row, y) => (
        <Box
          key={y}
          className={styles.row}
          width="100%"
          height={`${80 / GAME_CONFIG.current.height + "vh"}`}
        >
          {row.map((block, x) => (
            <Box
              key={x}
              className={
                styles.block +
                ` block_${x}_${y}` +
                (block.head ? ` ${styles.head}` : "") +
                (block.snake ? ` ${styles.snake}` : "") +
                (block.drop ? ` ${styles.drop}` : "") +
                (block.lose ? ` ${styles.lose}` : "")
              }
              width={`${80 / GAME_CONFIG.current.width + "vh"}`}
              height={`${80 / GAME_CONFIG.current.height + "vh"}`}
            ></Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

const mapDispatchToProps = {
  setHistoryGameData,
  setGameData,
};

export default connect(null, mapDispatchToProps)(Game);
