export const actionType = {
  SET_USER: 'SET_USER',
  SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CART_OPEN: 'SET_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };

    case actionType.SET_CART_OPEN:
      return {
        ...state,
        cartOpen: action.cartOpen,
      };

    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
}

export default reducer;