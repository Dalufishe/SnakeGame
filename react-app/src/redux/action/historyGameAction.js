
export  const setHistoryGameData = (payload) => {
    return {
        type: "history",
        payload: payload,
        id: Math.random()
    }
}
