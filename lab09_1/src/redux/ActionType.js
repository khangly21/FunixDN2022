// first action type list with the same pattern
// when exporting multiple constants, each is which is a string constant that specifies a corresponding action (in Reducer's switch action_type)
export const ADD_COMMENT='ADD_COMMENT';
//Reducer is a pure function which is used to return a new state from the initial state. It reads the payloads from the actions. The reducer then updates the store via the state accordingly.
//export this action type to the Reducer function
export const DISHES_LOADING='DISHES_LOADING'; //dishes are currently being fetched, perhaps from a server thông qua 1 API hoặc không
export const DISHES_FAILED='DISHES_FAILED'; //you failed to fetch dishes from server
export const ADD_DISHES='ADD_DISHES'; //you wanna add dishes into your store
