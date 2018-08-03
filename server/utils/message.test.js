let expect = require ('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'dzejo';
        var text = 'this is my text';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
    })
});

describe('generateLocationMessage', () => {
    it ('should generate correct location object', () => {
        let from = 'dzejo';
        let latitude = 15;
        let longitude = 19;
        let message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    })
});