export const setCategoryFilter =(category='')=>({
    type:'SET_CATEGORY_FILTER',
    category
});

export const setSubcategoryFilter =(subcategory = '')=>({
    type:'SET_SUBCATEGORY_FILTER',
    subcategory
});

export const setLocationFilter =(location='')=>({
    type:'SET_LOCATION_FILTER',
    location
});

export const setSearchTextFilter =(searchText='')=>({
    type:'SET_SEARCH_TEXT_FILTER',
    searchText
});

export const sortByLowerPrice = ()=>({
    type:'SORT_BY_LOWER_PRICE'
});

export const sortByHigherPrice = ()=>({
    type:'SORT_BY_HIGHER_PRICE'
});

export const resetFilters = () =>({
    type:'RESET_FILTERS'
})