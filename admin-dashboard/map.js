    let latitude = 55.753340;
    let longitude = 48.743858;

    const Data = { 
        "0": {
            "surname": "Иванов",
            "latitude": 55.753141,
            "longitude": 48.743111 
        },
        "1": {
            "surname": "Петров",
            "latitude": 55.752676,
            "longitude": 48.741427 
        },
        "2": {
            "surname": "Сидоров",
            "latitude": 55.753769,
            "longitude": 48.739904 
        },
        "3": {
            "surname": "Смирнов",
            "latitude": 55.749261,
            "longitude": 48.743895 
        },
        "4": {
            "surname": "Ваньков",
            "latitude": 55.748204,
            "longitude": 48.741706 
        },
        "5": {
            "surname": "Костылев",
            "latitude": 55.749092,
            "longitude": 48.739571 
        },
      }


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





let showWorker = function(id) {
    let latworker = 0;
    let longworker = 0;
    console.log("NAZHAL");

    latworker = Data[id].latitude;
    longworker = Data[id].longitude;

    myMap.geoObjects
        .add(new ymaps.Placemark([latitude, longitude], {
            balloonContent: '<strong>ТУТ WORKER</strong>'
        }, {
            preset: 'islands#circleDotIcon',
            iconColor: 'blue'
        }));
}


//show worker on map
$('.shwr').on('click', showWorker(0));




    }




//list workers in dialog window
window.onload = function() {
                    const countries = ['Петров А.С.', 'Иванов С.А.', 'Сидоров Д.В.', 'Иванов П.Р.'];;
                    countries.forEach(myFunction);

                    function myFunction(item, index) {
                      document.getElementById("work").innerHTML += "id" + index + ": " + item + "<button style=\"shwr\" id="+index+">Показать на карте</button>"+ "<button id="+index+">Задачи</button>"+"<br>"; 
                    }
                };



