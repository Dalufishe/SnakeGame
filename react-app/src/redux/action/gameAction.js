
export const setGameData = (payload) => {
    return {
        type: "game",
        payload: payload,
        id: Math.random()
    }
}

