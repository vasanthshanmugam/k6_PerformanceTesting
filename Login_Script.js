import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  // Define the form data
  let formData = {
    username: 'one', // Replace with your actual username
    password: 'one', // Replace with your actual password
    signon: 'Login',
    _sourcePage: 'f2OvuaxWhEIZTh0VHEv7Qc0reOyRW5qFaS0Y0SRoSgHtzpUTD5uDNyDj6aTLr_onQ4lrH9FO89XXwBi3UODb5Id4soOHcZw8dOSag-Igcb0=',
    __fp: 'rx1ZouQ0Vmnv7060XkniiONaiI8JqbWSfStXt2fFvk20Woc5G3sc77s2I2vGvmoo',
  };

  // Define the headers
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // Send the POST request
  let res = http.post('https://petstore.octoperf.com/actions/Account.action', formData, { headers: headers });

  console.log(res.body);
  
  check(res, {
    'Logged in successfully': (r) => r.body.includes('Welcome one!'), // Adjust the string as per your page content
  });


  sleep(3);
}
