    let latitude = 55.753340;
    let longitude = 48.743858;
    let myCollection;

 



 //list workers in dialog window
window.onload = function() {
    let DataNew = {};
    let DataNewCoord = {};
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

 else if (e.data.split("-")[0] == "USERCOORD") {
        DataNewCoord = JSON.parse(e.data.split("-")[1]);

 }

else if (e.data.split("-")[0] == "Notification") {
        DataNotification = JSON.parse(e.data.split("-")[1]);

            for (cnt = 0; cnt < Object.keys(DataNotification).length; cnt++)
     {
        
      document.getElementById("dialogNotify").innerHTML +="Id: "+DataNotification[cnt].id + "</br>"+ "TaskId: "+DataNotification[cnt].task_id+ "</br>"+"UserId: "+DataNotification[cnt].user_id+"</br>"+"Text: "+DataNotification[cnt].text+"</br>"+"Time: "+DataNotification[cnt].time+"</br>"+"</br>"; 
 
     
 }
 }



 else if (e.data.split("-")[0] == "TASK") {


    DataNewTask = JSON.parse(e.data.split("-")[1]);
   
    

   function getTask(idsk) {

    console.log("IDSK VNUTRI" + idsk);

    $('#dialogTask').dialog({
        autoOpen: false,
        position: { my: 'center', at: 'top+180' },
        title: 'Задание!'
    });

 

        document.getElementById("dialogTask").innerHTML = ""; 
        document.getElementById("dialogTask").innerHTML ="<div class = \"task_send\"><input class = \"taskval\" type=\"text\">"+"<button id = \"task_send\" class = \"task_send\">PUSH</button></div>";

    for (let tasks_counter = 0; tasks_counter < Object.keys(DataNewTask).length; tasks_counter++) {

        document.getElementById("dialogTask").innerHTML +="<li>" +DataNewTask[tasks_counter].text+"</li>";
    }



 

    $('#task_send').on( 'click', sayHello );

function sayHello(idsk) {

         let x =document.getElementById("buffer").innerHTML;

     let xxx = $(".taskval").val();
    
    console.log(x);
    console.log(xxx);
    



    conn.send("task_admin:"+x+":"+xxx);

}

 
 


        /*console.log("KOL-VO: "+Object.keys(DataNewTask).length);*/
    
     
     
      $('#dialogTask').dialog('open');
     /*}*/
/*     
    //for one task
    $('#dialogTask').dialog('open');
     document.getElementById("dialogTask").innerHTML = ""; 
     document.getElementById("dialogTask").innerHTML += DataNewTask[0].deadline;*/
};


      // Вешаем обработчик клика на UL, не LI


    $(".shwr").on('click', getTask(0));
    //alert("VVERHU")
 
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







        var timerId = setInterval(function(ids) {
        
        
 console.log(DataNewCoord[1].latitude);
showWorker(1);

myMap.geoObjects
        .add(myCollection);
        }, 1000);





    let latworker = 0;
    let longworker = 0;

 
function showWorker(ids) {

    myCollection.removeAll();

    latworker = DataNewCoord[ids].latitude;

    longworker = DataNewCoord[ids].longitude;

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
     ids = e.target.id; // Получили ID, т.к. в e.target содержится элемент по которому кликнули
     document.getElementById("buffer").innerHTML =ids;


     conn.send("id_from_admin:"+ids);
     for (let cn in DataNew) {
         
        if (DataNew[cn].id == ids) {
            ids = cn;
            console.log("ITOG: "+ids);
            console.log(DataNew[cn].id)
        }
    }

    $(".shwr").on('click', showWorker(ids));
    //alert("vniz")
 });
 

conn.onopen = () => {
 
 conn.send('hello');

}

    
    }



    

  };
