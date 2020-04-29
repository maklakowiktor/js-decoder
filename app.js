const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const iconv = require('iconv-lite');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/processing', async (req, res) => {
    console.log(`Получено: ${req.body.stringIn}`);
    let data = req.body.stringIn;
    let newData = new ConvertData(data);
    let result = {
        cp1252ToUtf8: await newData.c1252ToUtf8(),
        cp1252To1251: await newData.c1252To1251(),
        iso8859ToUtf8: await newData.cIso8859ToUtf8(),
        cp1251ToUtf8: await newData.c1251ToUtf8()
    }
    console.log('Ответ сервера: ', Object.values(result));
    res.send(result);
})

app.get('/*', (req, res) => {
    res.redirect('/');
})

app.listen(5000, () => {
    console.log(`${Date()} Сервер был запущен. Порт: ${PORT}`);
})

class ConvertData {
    constructor(data) {
        this.data = data;
    }
    async c1251ToUtf8() {
        let buf = await iconv.encode(this.data, 'win1251');
        let str = await iconv.decode(Buffer.from(buf), 'utf8');
        return str
    }
    async c1252ToUtf8() {
        let buf = await iconv.encode(this.data, 'win1252');
        let str = await iconv.decode(Buffer.from(buf), 'utf8');
        return str
    }
    async c1252To1251() {
        let buf = await iconv.encode(this.data, 'win1252');
        let str = await iconv.decode(Buffer.from(buf), 'win1251');
        return str
    }
    async cIso8859ToUtf8() {
        let buf = await iconv.encode(this.data, 'ISO-8859-1');
        let str = await iconv.decode(Buffer.from(buf), 'utf8');
        return str
    }
}
