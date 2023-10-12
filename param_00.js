import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,  // Number of virtual users
  duration: '30s', // Duration of the test
};

// List of URLs to navigate
const urls = [
  'https://petstore.octoperf.com/actions/Catalog.action',
  'https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH',
  'https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=DOGS',
  'https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=REPTILES',
  'https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=CATS',
];

export default function () {
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i];
    
    // Start a new transaction
    let transactionName = `Visit Page ${i+1}`;
    let startTime = new Date();

    let res = http.get(url);

    check(res, {
      'status is 200': (r) => r.status === 200,
    });

    // End the transaction
    let endTime = new Date();
    let duration = endTime - startTime;

    console.log(`Transaction '${transactionName}' took ${duration} ms`);

    // Add a 5-second pacing
    sleep(5);

    // Add a 5-second think time (except for the last iteration)
    if (i !== urls.length - 1) {
      sleep(5);
    }
  }
}
