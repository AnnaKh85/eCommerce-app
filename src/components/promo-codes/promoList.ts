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

    for (let i = 0; i < responseData.total; i++) {
      console.log(responseData.results[i].code);
      if (responseData.results[i].description) {
        console.log(responseData.results[i].description['en-GB']);
      } else {
        console.log('no description');
      }
      if (responseData.results[i].name) {
        console.log(responseData.results[i].name['en-GB']);
      } else {
        console.log('no name');
      }
    }
    return responseData;
  } catch (error) {
    console.debug('Discount Codes Error');
    throw error;
  }
}
