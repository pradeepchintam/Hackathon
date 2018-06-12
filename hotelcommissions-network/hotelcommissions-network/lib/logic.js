/**
 * Track the commission from one entity to another
 * @param {com.amexgbt.blockchains.CommissionTransaction} commission - the commission to be processed
 * @transaction
 */
async function requestComission(commission) {
    
    let assetRegistry = await getAssetRegistry('com.amexgbt.blockchains.HotelCommission');
    await assetRegistry.update(commission.hotelcommission);
}