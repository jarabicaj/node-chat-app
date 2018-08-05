var expect = require('expect');
var {isRealString} = require ('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var number = isRealString(3);
        expect(number).toBe(false);
        var boolean = isRealString(true);
        expect(boolean).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var spaces = isRealString(' ');
        expect(spaces).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var string = isRealString('    ahoj   ');
        expect(string).toBe(true);

    })

});


