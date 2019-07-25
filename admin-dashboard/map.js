    let latitude = 55.753340;
    let longitude = 48.743858;
    let myCollection;


    const Data = { 
        "0": {
            "surname": "Иванов",
            "latitude": 55.753141,
            "longitude": 48.743111,
            "task": "PRIVET"
        },
        "1": {
            "surname": "Петров",
            "latitude": 55.752676,
            "longitude": 48.741427,
            "task": "POKA"
        },
        "2": {
            "surname": "Сидоров",
            "latitude": 55.753769,
            "longitude": 48.739904,
            "task": "ZDRASTE" 
        },
        "3": {
            "surname": "Смирнов",
            "latitude": 55.749261,
            "longitude": 48.743895,
            "task": "BYE"
        },
        "4": {
            "surname": "Ваньков",
            "latitude": 55.748204,
            "longitude": 48.741706,
            "task": "HOROSH"
        },
        "5": {
            "surname": "Костылев",
            "latitude": 55.749092,
            "longitude": 48.739571,
            "task": "ZHIZNENNO"
        },
      }



 //list workers in dialog window
window.onload = function() {
    let DataNew = {};
    let Names = [];
    let DataNewTask = {};
                        // создать подключение
    var conn = new WebSocket('ws://localhost:3000/echo');
    conn.onmessage = function(e){ console.log("POLUCHIL: "+ e.data);

    if (e.data.split("-")[0] == "USER") {
        DataNew = JSON.parse(e.data.split("-")[1]);
    console.log(DataNew[0].name);

    for (cnt = 0; cnt < Object.keys(DataNew).length; cnt++)
     {
        
      document.getElementById("dialog").innerHTML += "<button class=\"shwr\" id="+DataNew[cnt].id+">"+"id" + DataNew[cnt].id + ": " + DataNew[cnt].name + "</button>"+"<br>"; 

console.log(DataNew[cnt].name);
console.log(DataNew[cnt].id);
     
 }

 }


 else if (e.data.split("-")[0] == "TASK") {


    DataNewTask = JSON.parse(e.data.split("-")[1]);
    for (let tasks_counter = 0; tasks_counter < Object.keys(DataNewTask).length; tasks_counter++) {
        console.log("34 "+DataNewTask[tasks_counter].text);
    }
    

   function getTask(idsk) {
    console.log("IDSK VNUTRI" + idsk);

    $('#dialogTask').dialog({
        autoOpen: false,
        title: 'Задание!'
    });
       
                //for many tasks
/*       for (let tasks_counter = 0; tasks_counter < Object.keys(DataNewTask).length; tasks_counter++) {*/
        console.log("KOL-VO: "+Object.keys(DataNewTask).length);
    $('#dialogTask').dialog('open');
     document.getElementById("dialogTask").innerHTML = ""; 
     document.getElementById("dialogTask").innerHTML += DataNewTask[0].text;
     /*}*/
/*     
    //for one task
    $('#dialogTask').dialog('open');
     document.getElementById("dialogTask").innerHTML = ""; 
     document.getElementById("dialogTask").innerHTML += DataNewTask[0].deadline;*/
};


     document.querySelector('#dialog').addEventListener('click', function(event){ // Вешаем обработчик клика на UL, не LI
    let idsk = event.target.id;  
    console.log("IDS: "+idsk)

    $(".shwr").on('click', getTask(idsk));
    //alert("VVERHU")
})
 
 }

else {
    console.log("error")
}


    };
 

                   
               
//websocket


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
            controls: ["zoomControl", "typeSelector"]// убрать лишние значки с карты
        },
        {
            searchControlProvider: 'yandex#search'
        }),

      myCollection = new ymaps.GeoObjectCollection();

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
        .add(myCollection);

        latitude += 0.000060;
         longitude += 0.000060;
 
   /*     }, 2000);
*/

    let latworker = 0;
    let longworker = 0;

 
function showWorker(ids) {

    myCollection.removeAll();

    latworker = DataNew[ids].latitude;

    longworker = DataNew[ids].longitude;

    let placemark = new ymaps.Placemark([latworker, longworker], {
            balloonContent: '<strong>ТУТ WORKER'+latworker+":"+longworker+'</strong>'
        }, {
            preset: 'islands#circleDotIcon',
            iconColor: 'blue'
        });
    myCollection.add(placemark);

}






//show worker on map

document.querySelector('#dialog').addEventListener('click', function(e){ // Вешаем обработчик клика на UL, не LI
    let ids = e.target.id; // Получили ID, т.к. в e.target содержится элемент по которому кликнули
    conn.send("id_from_admin:"+ids);

    for (let cn in DataNew) {
         
        if (DataNew[cn].id == ids) {
            ids = cn;
            console.log("ITOG: "+ids);
            console.log(DataNew[cn].id)
        }
    }

    $(".shwr").on('click', showWorker(ids));
 });


conn.onopen = () => {
 
 conn.send('hello');

}
    }



    

  };
