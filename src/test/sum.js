const sum = require('../views/examples/sum');

test('sums two numbers', () => {
 expect(sum(1, 2)).toBe(3);
});