/*
Look:

https://jsfiddle.net/KooiInc/h4cwrtbk/
http://jsfiddle.net/loktar/63QZz/



self.onmessage = function (msg) {
    switch (msg.data.action) {
        case 'convertEmojiToImageData':
                convertEmojiToImageData(msg.data.unicode)
            break
        default:
            throw 'No action defined'
    }
}

function convertEmojiToImageData(unicode) {
    const canvas = new OffscreenCanvas(100, 1)
    const ctx = canvas.getContext('2d')

    ctx.fillText(unicode, 0, 10)
    const imageData = ctx.canvas.getImageData(0, 0, 32, 32)
    const imagePixData = imageData.data

    return imagePixData
}
*/