const fetchData = document.querySelector('.fetchData'); // кнопка "Отправить"
const stringIn = document.querySelector('.csin'); // Поле, из которого отправляем данные
const stringOut = document.querySelector('.cont'); // Поле для получения результата с сервера
const emoj = '&#9193;';
const titles = [`cp1252 ${emoj} utf8`, `cp1252 ${emoj} cp1251`, `iso8859 ${emoj} utf8`, `cp1251 ${emoj} utf8`];

fetchData.onclick = sendData; // При клике выполняем функцию sendData 
stringIn.oninput = sendData; // При вводе выполняем ф-ю sendData

function sendData(e) {
    if(!stringIn.value) return 1;
    e.preventDefault(); // Отменяем перезагрузку страницы, шобы всё было современно, модно, молодёжно
    fetch('/processing', {
        method: 'POST', // Определяем тип запросы для отправки на сервак
        body: JSON.stringify({ stringIn: stringIn.value }), // Тело запроса
        headers: { // Определаем заголовки
            'Content-Type': 'application/json' // Тип содержимого -- JSON документа (Объект жс)
        }
    })
    .then( res => res.text())
    .then( data => {
        let obj = JSON.parse(data);
        let i = 0;

        stringOut.innerHTML = '';
        for (var key in obj) {
            stringOut.innerHTML = stringOut.innerHTML + `
            <div class="card bg-light mb-3" style="max-width: 50rem">
                <h5 class="card-header">${titles[i]}</h5>
                <div class="card-body">
                    <p class="card-text">${obj[key]}</p>
                </div>
            </div>`
            i++;
        }
    })
}
