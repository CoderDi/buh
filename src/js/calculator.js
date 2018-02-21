//debug calc 
    var tarif = 2;
    var nalog_type = 2;
    var operations_amount = 2;
    var workers_amount = 3;
    var allowedPeople;  //разрешено сотрудников
    var morePeople; //превышено сотрудников
    var peopleTax;  //денег за сверх сотрудника
    var morePeopleAllTax; //сумма налога за превышение всех сотрудников
    var basePrice; //базовая стоимость 
    var finalPrice; //финальная стоимость 
    var inIP = false; //финальная стоимость 


    var priceTable = {
        1 :[ //Тариф ЛАЙТ
        //  Усн 6% | Усн 15% | ОСН | Каждый следующий работник 

            [1500, 2500, 3000, 500, 3],     //От 0 до 10 операций, не более 3 сотрудников
            [3000, 5000, 7000, 500, 3],     //От 11 до 20 операций, не более 3 сотрудников
            [6000, 8000, 10000, 500, 3],    //От 21 до 50 операций, не более 3 сотрудников
            [9000, 11000, 16000, 400, 5],   //От 51 до 100 операций, не более 5 сотрудников
            [14000, 17000, 25000, 300, 10], //От 101 до 200 операций, не более 10 сотрудников
            [19000, 23000, 30000, 300, 10], //От 201 до 300 операций, не более 10 сотрудников
            [24000, 29000, 35000, 300, 15], //От 301 до 400 операций, не более 15 сотрудников
            [29000, 35000, 50000, 300, 15]  //От 401 до 500 операций, не более 15 сотрудников
        ],

        2 :[ //Тариф ОПТИМАЛЬНЫЙ

        //  Усн 6% | Усн 15% | ОСН | Каждый следующий работник 

            [2600, 3000, 5000, 500, 3],     //От 0 до 10 операций, не более 3 сотрудников
            [5000, 7000, 10000, 500, 3],    //От 11 до 20 операций, не более 3 сотрудников
            [9000, 11500, 16000, 500, 3],   //От 21 до 50 операций, не более 3 сотрудников
            [15000, 18000, 27000, 400, 5],  //От 51 до 100 операций, не более 5 сотрудников
            [21000, 27000, 39000, 300, 10], //От 101 до 200 операций, не более 10 сотрудников
            [28000, 35000, 48000, 300, 10], //От 201 до 300 операций, не более 10 сотрудников
            [35000, 44000, 59000, 300, 15], //От 301 до 400 операций, не более 15 сотрудников
            [40000, 55000, 79000, 300, 15]  //От 401 до 500 операций, не более 15 сотрудников
        ],
        3 :[ //Тариф СТАТУС

        //  Усн 6% | Усн 15% | ОСН | Каждый следующий работник 

            [5000, 6000, 8000, 500, 3],     //От 0 до 10 операций, не более 3 сотрудников
            [9000, 12000, 15000, 500, 3],   //От 11 до 20 операций, не более 3 сотрудников
            [15000, 18000, 25000, 500, 3],  //От 21 до 50 операций, не более 3 сотрудников
            [25000, 27000, 38000, 400, 5],  //От 51 до 100 операций, не более 5 сотрудников
            [33000, 37000, 55000, 300, 10], //От 101 до 200 операций, не более 10 сотрудников
            [45000, 52000,70000, 300, 10],  //От 201 до 300 операций, не более 10 сотрудников
            [54000, 60000, 84000, 300, 15], //От 301 до 400 операций, не более 15 сотрудников
            [60000, 70000, 100000, 300, 15]  //От 401 до 500 операций, не более 15 сотрудников
        ],
        4 :[ //Тариф Лайт для ИП

        //  Усн 6% | Усн 15% | ОСН 

            [1500, 2500, 3000],    //От 0 до 10 операций
            [2500, 4000, 5500],    //От 11 до 20 операций
            [4500, 5500, 7500],    //От 21 до 50 операций
            [7500, 9000, 12000],   //От 51 до 100 операций
            [12000, 15000, 18000], //От 101 до 200 операций
            [17000, 20000,24000],  //От 201 до 300 операций
        ],
        5 :[ //Тариф Оптимальный для ИП

        //  Усн 6% | Усн 15% | ОСН 

            [2000, 3000, 4000],    //От 0 до 10 операций
            [3500, 5500, 7000],    //От 11 до 20 операций
            [6000, 8000, 10000],   //От 21 до 50 операций
            [9000, 11000, 17000],  //От 51 до 100 операций
            [15000, 18000, 23000], //От 101 до 200 операций
            [20000, 25000,28000],  //От 201 до 300 операций
        ],
    };


    //Особенности учета 
    var amountPercents = 0;
    var checksAmount = 0;
    var arraySum = [];
    var additionPercents = 0;
    
    $(".price-calculator .check-list .checkbox").change(function(){
        var currentPercent = parseInt($(this).attr("data-extra"));
        if($(this).is(":checked")){
           amountPercents += currentPercent; //amountPercents += percentMassive[1]
           checksAmount += 1;
            var addArray = arraySum.push(currentPercent)
           //если выделено больше 2 особенностей учета:
        }
        else{
           amountPercents -= currentPercent;   
           checksAmount -= 1;  
           var sum_index = find(arraySum, currentPercent);
           arraySum.splice(sum_index, 1);

        }

        var workedArray = arraySum.concat();
        if(checksAmount > 2){
            var insideAmountPercents = 0;
            var compiledArray = [];
            for (var i=1; i <= 2; i++){
                var max = Math.max.apply(null, workedArray);
                var workedMaxIndex = find(workedArray, max); 
                compiledArray.splice(-1,0,workedArray[workedMaxIndex]);
                insideAmountPercents += workedArray[workedMaxIndex];
                workedArray.splice(workedMaxIndex, 1); 
            }; 
            additionPercents  =  insideAmountPercents;
            //console.log("Складываем "+compiledArray)

        }
        else{
            additionPercents = amountPercents;
            //console.log("Складываем "+arraySum)
        }
        updateCalcValues();
    })

    //find massive function
    function find(array, value) {
        if (array.indexOf) { // если метод существует
            return array.indexOf(value);
        }

        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) return i;
        }
        return -1;
    }



    function updateCalcValues(){
        calculateValues ();
        translateLabels();
    };

    function translateLabels(){
        var lab_tarif = ["Лайт","Оптимальный","Статус"];
        var lab_nalog = ["Усн 6%","Усн 15%","ОСН"];
        var lab_opers = ["До 10","До 25","До 50","До 100","До 150"];

        var tarifLabel = lab_tarif[tarif - 1];
        var nalogLabel = lab_nalog[nalog_type - 1];
        var operLabel = lab_opers[operations_amount - 1];

        outputCalcValues(tarifLabel,nalogLabel,operLabel)
    }
    
    function calculateValues () {
        var realOperAmount = operations_amount - 1;
        var realNalogType = nalog_type - 1; 
        allowedPeople = priceTable[tarif][realOperAmount][4];
        peopleTax = priceTable[tarif][realOperAmount][3];
        
        morePeople = 0;
        morePeopleAllTax = 0;
        basePrice = priceTable[tarif][realOperAmount][realNalogType]; 

        //если количество сотрудников больше чем разрешено в данном сочетании (тариф + кол во операций)
        if(workers_amount > allowedPeople ){
            morePeople = workers_amount - allowedPeople;
            morePeopleAllTax = morePeople * peopleTax;
        }
        finalPrice = basePrice + (basePrice*additionPercents/100) + morePeopleAllTax;
    }
    


     //выводим значения
    function outputCalcValues(tarif,nalog,operations){
        $(".js_calcPrice").text(finalPrice)
        $(".debug_tarif").val(tarif)
        $(".debug_nalog").val(nalog)
        $(".debug_operations").val(operations)
        $(".debug_workers").val(workers_amount)
        $(".debug_allowedWorkers").val(allowedPeople)
        $(".debug_moreWorkers").val(morePeople)
        $(".debug_workerMoney").val(peopleTax)
        $(".debug_workerMoneyAll").val(morePeopleAllTax)
        $(".debug_calcPrice").val(finalPrice)
    }


    //nalog-slider
    var doubleLabels = [          
        "<span>УСН 6%</span>", 
        "<span>УСН 15%</span>", 
        "<span>ОСН</span>"                 
    ];
              
    if ($( ".nalogSlider" ).length) {             
        $(".nalogSlider")
            .slider({
                max: 3,
                min: 1,
                value: nalog_type,
                animate: 400,
                slide: function( event, ui ) {
                    nalog_type = ui.value; 
                    updateCalcValues();
                }
            })
            .slider("pips", {
                rest: "label",
                labels: doubleLabels
            }); 

        //oper-slider
         var operationsLabels = [          
            "<span>до 10</span>", 
            "<span>до 25</span>", 
            "<span>до 50</span>", 
            "<span>до 100</span>", 
            "<span>до 150</span>"               
        ];
    }
    if ($( ".operSlider" ).length) {
         $(".operSlider")
        .slider({
            max: 5,
            min: 1,
            value: operations_amount,
            animate: 400,
            slide: function( event, ui ) {
                operations_amount = ui.value; 
                updateCalcValues();
            },
            change: function( event, ui ) {
                operations_amount = ui.value; 
                updateCalcValues();
            }
        })
        .slider("pips", {
            rest: "label",
            labels: operationsLabels
        });
    }
    //workers-slider
    if ($( ".workersSlider" ).length) {
         $(".workersSlider")
        .slider({
            max: 20,
            min: 0,
            value: workers_amount,
            animate: 400,
            create: function( event, ui ) {
                $( ".calculator-workers-count" ).val(workers_amount);
            },
            slide: function( event, ui ) {
                $( ".calculator-workers-count" ).val(ui.value);
                workers_amount = ui.value; 
                updateCalcValues();
            },
            change: function( event, ui ) {
                $( ".calculator-workers-count" ).val(ui.value);
                workers_amount = ui.value; 
                updateCalcValues();
            }
        })
        .slider("pips", {
            rest: "label",
            step: 1
        });
    }

    //tarif-slider
     var tarifLabels = [          
        "<span>Лайт</span>", 
        "<span>Оптимальный</span>", 
        "<span>Статус</span>"
    ];
    if ($( ".tarifSlider" ).length) {
         $(".tarifSlider")
        .slider({
            max: 3,
            orientation: "vertical",
            min: 1,
            value: tarif,
            animate: 400,
            slide: function( event, ui ) {
                tarif = ui.value; 
                if(inIP){
                    if(ui.value == 1) tarif = 4;
                    if(ui.value == 2) tarif = 5;
                }
                updateCalcValues();
            },
            change: function( event, ui ) {
                tarif = ui.value; 
                if(inIP){
                    if(ui.value == 1) tarif = 4;
                    if(ui.value == 2) tarif = 5;
                }
                updateCalcValues();
            }
        })
        .slider("pips", {
            rest: "label",
            labels:tarifLabels
        })
    }


    // 
    //calculator
    //


    //галочка Индивидуальное предприятие без работников
    $("#checkboxIP").change(function(){
        //если ИП без работников - то отключаем тариф и кол во работников
        if($("#checkboxIP").is(":checked")){
            $(".workers-slider-row").fadeOut("fast");
            inIP = true;
            //если выбран тариф 3 (статус) то переключаем на другой принудительно
            if(tarif == 3){
                $(".tarifSlider").slider({
                    max: 2,
                    value:2
                })
                .slider("pips", "refresh");
                tarif = 5;
            }
            else{
                $(".tarifSlider").slider({
                    max: 2,
                })
                .slider("pips", "refresh");
                if(tarif == 1) tarif = 4;
                if(tarif == 2) tarif = 5;
            }

            if(operations_amount > 6){
                $(".operSlider").slider({
                    max: 6,
                    value:6
                })
                .slider("pips", "refresh");
            }
            else{
                $(".operSlider").slider({
                    max: 6,
                })
                .slider("pips", "refresh");
            }
            $(".workersSlider").slider({
                value: 0,
            })
        }
        //а если галка не стоит, то наоборот включаем, так то!
        else{
            $(".workers-slider-row").fadeIn("fast");
            inIP = false;
            $(".tarifSlider").slider({
                max: 3,
            })
            .slider("pips", "refresh");   

            $(".operSlider").slider({
                max: 9,
            })
            .slider("pips", "refresh");
            if(tarif == 4) tarif = 1;
            if(tarif == 5) tarif = 2;
        }
        updateCalcValues();
    })
    
    updateCalcValues();

