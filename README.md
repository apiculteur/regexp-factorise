# Regexp Factorize

## install
`npm i regexp-factorize`

## Sample
```javascript
import { factorizeOr } from 'regexp-factorize';

const keywords = ['ant', 'antelope', 'albatross', 'alligator'];
const regexpString = factorizeOr(keywords); // a(?:nt(?:|elope)|l(?:batross|ligator))
const regexp = new RegExp(regexpString);

const document = "There's an alligator in my house";

console.log(regexp.test(document)); // true
```
