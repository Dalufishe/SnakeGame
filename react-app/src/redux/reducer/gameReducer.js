
const gameReducer = (prevState = {
    game: {},
}, action) => {
    const newState = { ...prevState }
    switch (action.type) {
        case "game":
            newState.game = action.payload;
            newState.id = action.id;
            return newState
        default:
            return prevState
    }
}

export default gameReducer