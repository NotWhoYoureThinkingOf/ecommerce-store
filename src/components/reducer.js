// what the app looks like before we do anything to it
export const initialState = {
  user:null,
  article:[],
  basket:[],
  pulled_articles: [],
  loading: true,
  modal: {},
}

export const basketTotal = (basket) => basket?.reduce((total, item) => {
  total += item.price
  return total
}, 0)

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ARTICLES: "SET_ARTICLES",
  SET_LOGOUT: "SET_LOGOUT",
  SET_LOADING: "SET_LOADING",
  SET_MODAL: "SET_MODAL",
  REMOVE_MODAL: "REMOVE_MODAL"
}

const reducer = (state, action) => {
  console.log(action);
  switch(action.type){
    case actionTypes.SET_USER:
      return{
        ...state, 
        user: action.user
      };
    case actionTypes.SET_LOGOUT:
      return{
        ...state, 
        user: initialState.user
      };
    case actionTypes.SET_LOADING:
      return{
        ...state, 
        loading: false
      };
    case actionTypes.SET_MODAL:
      return{
        ...state,
        modal: action.item
      }
    case actionTypes.REMOVE_MODAL:
      return{
        ...state,
        modal: {}
      }
    case actionTypes.SET_ARTICLES:
      return{
        ...state,
        pulled_articles: action.pulled_articles
      };
    case 'ADD_TO_BASKET':
      return{
        ...state,
        basket:[...state.basket, action.item]
      }
    case 'EMPTY_BASKET':
      return{
        ...state,
        basket: []
      }
    case 'REMOVE_FROM_BASKET':
      // this goes through all of the basket items, asks "does any of these items match the action.id", finds first one and returns it to you
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )

      let newBasket = [...state.basket]

      // index will be greater than 0. findIndex will return -1 if nothing is found
      if (index >= 0){
        // goes to that index, cuts 1 item which is that index
        newBasket.splice(index, 1)
      } else {
        console.warn(`Can't remove product (id: ${action.id}) as it's not in basket`)
      }
      
      return{
        ...state,
        basket: newBasket
      }
    
    default:
      return state;
  }
};

export default reducer;