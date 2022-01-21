import { factorizeOr } from './index';
import { expect } from 'chai';

describe('Factorize unity', () => {

    it('[] => ""', () => {
        expect(factorizeOr([])).to.equals('');
    });

    it('[a] => a', () => {
        expect(factorizeOr(['a'])).to.equals('a');
    });

});

describe('Factorize character class', () => {

    it('[a, b] => [ab]', () => {
        expect(factorizeOr(['a', 'b'])).to.equals('[ab]');
    });

    it('[a, b, c] => [a-c]', () => {
        expect(factorizeOr(['a', 'b', 'c'])).to.equals('[a-c]');
    });

    it('[a, b, c, d] => [a-d]', () => {
        expect(factorizeOr(['a', 'b', 'c', 'd'])).to.equals('[a-d]');
    });

    it('[a, b, c, e] => [a-ce]', () => {
        expect(factorizeOr(['a', 'b', 'c', 'e'])).to.equals('[a-ce]');
    });

    it('[a, c, d, e] => [ac-e]', () => {
        expect(factorizeOr(['a', 'c', 'd', 'e'])).to.equals('[ac-e]');
    });

});

describe('Factorize OR set ', () => {

    it('[ab, ba] => (?:ab|ba)', () => {
        expect(factorizeOr(['ab', 'ba'])).to.equals('(?:ab|ba)');
    });

});

describe('Factorize complex', () => {

    it('[ab, ac] => a[bc]', () => {
        expect(factorizeOr(['ab', 'ac'])).to.equals('a[bc]');
    });

    it('[ab, ac, ad] => a[b-d]', () => {
        expect(factorizeOr(['ab', 'ac', 'ad'])).to.equals('a[b-d]');
    });

    it('[abc, abd, abe] => ab[c-e]', () => {
        expect(factorizeOr(['abc', 'abd', 'abe'])).to.equals('ab[c-e]');
    });

    it('[abc, abd, ade] => a(?:b[cd]|de)', () => {
        expect(factorizeOr(['abc', 'abd', 'ade'])).to.equals('a(?:b[cd]|de)');
    });

    it('[abc, abd, a] => a(?:b[cd]|)', () => {
        expect(factorizeOr(['abc', 'abd', 'a'])).to.equals('a(?:b[cd]|)');
    });

});
