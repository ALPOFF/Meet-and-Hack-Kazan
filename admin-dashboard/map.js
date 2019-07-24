    let latitude = 55.753340;
    let longitude = 48.743858;



    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){ 
        // Создание карты.    
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.753340, 48.743858],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 16,
            //controls: [] убрать лишние значки с карты
        },
        {
            searchControlProvider: 'yandex#search'
        }),




 

    // Создаем геообъект с типом геометрии "Точка".
      
        myPieChart = new ymaps.Placemark([
            55.847, 37.6
        ], {
            // Данные для построения диаграммы.
            data: [
                {weight: 8, color: '#0E4779'},
                {weight: 6, color: '#1E98FF'},
                {weight: 4, color: '#82CDFF'}
            ],
            iconCaption: "Диаграмма"
        });


/*        var timerId = setInterval(function() {
        */
    
        myMap.geoObjects
        .add(new ymaps.Placemark([latitude, longitude], {
            balloonContent: '<strong>ТУТ ЦЕНТР</strong>'
        }, {
            preset: 'islands#circleDotIcon',
            iconColor: 'yellow'
        }));

        latitude += 0.000060;
        console.log(latitude);
        longitude += 0.000060;
        console.log(longitude);

   /*     }, 2000);
*/
    }




//list workers in dialog window
window.onload = function() {
                    const countries = ['Петров А.С.', 'Иванов С.А.', 'Сидоров Д.В.', 'Иванов П.Р.'];;
                    countries.forEach(myFunction);

                    function myFunction(item, index) {
                      document.getElementById("work").innerHTML += "id" + index + ": " + item + "<button id="+index+">Показать на карте</button>"+ "<button id="+index+">Задачи</button>"+"<br>"; 
                    }
                };



//show worker on map
let showWorker = function(id, ) {

}