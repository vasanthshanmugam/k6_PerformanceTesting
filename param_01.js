import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10, // Number of virtual users
  duration: '30s', // Duration of the test
};

const baseUrl = 'https://petstore.octoperf.com/actions/Catalog.action';

const categoryCodes = ['FISH', 'DOGS', 'REPTILES', 'CATS'];

export default function () {
  for (let i = 0; i < categoryCodes.length; i++) {
    let categoryId = categoryCodes[i];
    
    let url = `${baseUrl}?viewCategory=&categoryId=${categoryId}`;
    let res = http.get(url);

    check(res, {
      'status is 200': (r) => r.status === 200,
    });
  }
}
