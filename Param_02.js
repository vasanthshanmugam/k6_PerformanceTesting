import http from 'k6/http';
import { check, sleep } from 'k6';

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
    let startTime = new Date();
    let res = http.get(url);
    let endTime = new Date();

    check(res, {
      'status is 200': (r) => r.status === 200,
    });

    let duration = endTime - startTime;

    console.log(`Transaction ${i + 1} took ${duration} ms`);

    // Add a 20-second pacing
    sleep(20);

    // Add a 10-second think time
    if (i !== categoryCodes.length - 1) {
      sleep(10);
    }
  }
}
