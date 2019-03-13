const initialState = false;

export default function newposts(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE':
            return {"visible":action.data};
        case "DELTET":
            return {"visible":0};
        default:
            return state;
    }
}