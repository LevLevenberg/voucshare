const filtersReducerDefaultState = {
    category:'',
    subcategory:'',
    location:'',
    searchText:'',
    sortBy:'lower-price'
}

const filtersReducer = (state = filtersReducerDefaultState, action )=>{
    switch(action.type){
        case 'SET_CATEGORY_FILTER':
            return{
                ...state,
                category:action.category
            };
        case 'SET_SUBCATEGORY_FILTER':
            return {
                ...state,
                subcategory:action.subcategory
            }
        case 'SET_LOCATION_FILTER':
            return{
                ...state,
                location:action.location
            }
        case 'SET_SEARCH_TEXT_FILTER':
            return{
                ...state,
                searchText:action.searchText
            }
        case 'SORT_BY_LOWER_PRICE':
            return{
                ...state,
                sortBy:'lower-price'
            }
        case 'SORT_BY_HIGHER_PRICE':
            return{
                ...state,
                sortBy:'higher-price'
            }
        case 'RESET_FILTERS':
            return {
                ...state,
                ...filtersReducerDefaultState
            }
        default:
            return state;
    }
}
export default filtersReducer;