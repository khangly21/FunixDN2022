// first action type list with the same pattern
// when exporting multiple constants, each is which is a string constant that specifies a corresponding action (in Reducer's switch action_type)
export const ADD_COMMENT='ADD_COMMENT'; ///được dùng lúc state comment.js còn lưu mảng COMMENTS
//Reducer is a pure function which is used to return a new state from the initial state. It reads the payloads from the actions. The reducer then updates the store via the state accordingly.
//export this action type to the Reducer function
export const DISHES_LOADING='DISHES_LOADING'; //dishes are currently being fetched, perhaps from a server thông qua 1 API hoặc không
export const DISHES_FAILED='DISHES_FAILED'; //you failed to fetch dishes from server. TẠI SAO KHÔNG CÓ DISHES_SUCCEEDED?
export const ADD_DISHES='ADD_DISHES'; //you wanna add dishes into your store


//Lab10_2
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';
//Why I don't have COMMENTS_LOADING ? The comments will be loaded behind the scene, but When?
//Khi HomeComponent được rendered, comments sẽ được fetched in ngay lúc đó. Do đó lúc người dùng navigate tới DishDetailsComponent thì comments đã có sẵn rồi
//Đó là lý do tôi không dùng comment loading


export const PROMOS_LOADING = 'PROMOS_LOADING';
export const ADD_PROMOS = 'ADD_PROMOS';
export const PROMOS_FAILED = 'PROMOS_FAILED';
