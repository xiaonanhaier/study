const initialState = {"plate":0};

export default function user(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE':
            return {"plate":action.data};
        case "DELTET":
            return {"plate":0};
        default:
            return state;
    }
}