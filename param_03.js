import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = new SharedArray('Categories', function() {
  return papaparse.parse(open('./categories.csv'), { header: true }).data;
});

export let options = {
  vus: 10,
  duration: '30s',
};

const baseUrl = 'https://petstore.octoperf.com/actions/Catalog.action';

export default function () {
  for (const category of csvData) {
    const categoryId = category.categoryCode.trim();
    
    const url = `${baseUrl}?viewCategory=&categoryId=${categoryId}`;
    const startTime = new Date();
    const res = http.get(url);
    const endTime = new Date();

    check(res, {
      'status is 200': (r) => r.status === 200,
    });

    const duration = endTime - startTime;

    console.log(`Transaction for category ${categoryId} took ${duration} ms`);

    sleep(5);
    if (category !== csvData[csvData.length - 1]) {
      sleep(5);
    }
  }
}
