import { factorize } from './index';
import { expect } from 'chai';

describe('Factorize unity', () => {

    it('should return empty string on empty array', () => {
        expect(factorize([])).to.equals('');
    });

    it('should return element as it if their is only one element', () => {
        expect(factorize(['a'])).to.equals('a');
    });

});

describe('Factorize character class', () => {

    it('should return class of elements if only two single char element', () => {
        expect(factorize(['a', 'b'])).to.equals('[ab]');
    });

    it('should return class of elements if sequence of 3 elements', () => {
        expect(factorize(['a', 'b', 'c'])).to.equals('[a-c]');
    });

    it('should return class of elements if sequence of 4 elements', () => {
        expect(factorize(['a', 'b', 'c', 'd'])).to.equals('[a-d]');
    });

    it('should return class of elements if sequence and an other element', () => {
        expect(factorize(['a', 'b', 'c', 'e'])).to.equals('[a-ce]');
    });

    it('should return class of elements if single element + sequence', () => {
        expect(factorize(['a', 'c', 'd', 'e'])).to.equals('[ac-e]');
    });

});

describe('Factorize with OR', () => {

    it('should return all chain separed by pipe', () => {
        expect(factorize(['ab', 'ba'])).to.equals('(ab|ba)');
    });

});

describe('Factorize complex', () => {

    it('should return factor of 2 strings', () => {
        expect(factorize(['ab', 'ac'])).to.equals('a[bc]');
    });

    it('should return factor of 3 strings', () => {
        expect(factorize(['ab', 'ac', 'ad'])).to.equals('a[b-d]');
    });

    it('should return factor of 3 strings of 3 chars length', () => {
        expect(factorize(['abc', 'abd', 'ade'])).to.equals('a(b[cd]|e)');
    });



});