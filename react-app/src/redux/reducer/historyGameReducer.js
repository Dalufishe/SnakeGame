
const historyGameReducer = (prevState = {
    history: [],
}, action) => {
    const newState = { ...prevState }
    switch (action.type) {
        case "history":
            newState.history = [action.payload, ...newState.history];
            newState.id = action.id;
            return newState
        default:
            return prevState
    }
}

export default historyGameReducer 