const getVisibleVouchers = (vouchers, {category, subcategory, location, searchText, sortBy = 'lower-price'}) => {
    return vouchers.filter((voucher) => {
        const categoryMatch = category? voucher.category.match(category) : true;
        const subategoryMatch = subcategory? voucher.subcategory.match(subcategory) : true;
        const locationMatch = location? voucher.location.match(location) : true;
        const searchTextMatch = voucher.title.toLowerCase().includes(searchText.toLowerCase());

        return categoryMatch && subategoryMatch && locationMatch && searchTextMatch;
        
    }).sort((a,b)=>{
        if(sortBy === 'lower-price'){
            return a.price - b.price;
        }
        else if(sortBy === 'higher-price'){
            return b.price - a.price;
        }
        else return a.price - b.price;
        
    })
}

export default getVisibleVouchers;