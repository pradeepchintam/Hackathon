/**
 * Track the trade of a commodity from one trader to another
 * @param {com.amexgbt.blockchains.BookHotel} bookHotel - the trade to be processed
 * @transaction
 */
async function bookAHotel(bookHotel) {
    let assetRegistry = await getAssetRegistry('com.amexgbt.blockchains.HotelReservationResponse');
    await assetRegistry.update(bookHotel.hotelReservationResponse);
}

/**
 * Track the commission from one entity to another
 * @param {com.amexgbt.blockchains.CommissionTransaction} commission - the commission to be processed
 * @transaction
 */
async function requestComission(commission) {
    
    let assetRegistry = await getAssetRegistry('com.amexgbt.blockchains.HotelCommission');
    await assetRegistry.update(commission.hotelcommission);
}