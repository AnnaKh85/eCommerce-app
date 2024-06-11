import { BASE_URL, PRODUCT_KEY } from '../../services/constants';

export default async function getPromoList() {
  try {
    const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/discount-codes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-type': 'application/json',
      },
      method: 'GET',
    });
    const responseData = await response.json();
    // console.log(`TEST Promo Data: ${responseData.results[0].code}`);
    console.log(`TEST Promo Data: ${responseData.total}`);
    // for (let i = 0; i < responseData.count; i++) {
    //   console.log(responseData[i].results);
    //   console.log(`i: `, i);
    // }
    // console.log(`Total PromoCodeList: `, responseData.total);
    return responseData;
  } catch (error) {
    console.debug('Discount Codes Error');
    throw error;
  }
}
