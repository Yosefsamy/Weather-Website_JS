                                        "use strict"

//~  Declare Global Variable ~//
let searchInput=document.getElementById("search");
let btnFind=document.getElementById("btnFind");

let dateToday=document.querySelector(".forcast-today .date .dayDate");
let month=document.querySelector(".forcast-today .date .month");
let cityLocationToday=document.querySelector(".forcast-today .location");
let cityTempToday=document.querySelector(".forcast-today .degree .number .number-inner");
let cityIconToday=document.querySelector(".forcast-today .degree .forcast-icon img");
let cityConditionToday=document.querySelector(".forcast-today .custom");
let cityHumidityToday=document.querySelector(".forcast-today .forcast-information .first span");
let cityWindToday=document.querySelector(".forcast-today .forcast-information .second span");
let cityWindDirToday=document.querySelector(".forcast-today .forcast-information .third span");

let day=document.getElementsByClassName("day");

let cityTempMax=document.querySelectorAll(".forcast .degree span")
let cityTempMin=document.querySelectorAll(".forcast small span")
let cityIconNext=document.querySelectorAll(".forcast .forcast-icon img")
let cityConditionNext=document.querySelectorAll(".forcast .custom")

// const date=new Date();
// console.log(date);

// let weekDay=date.toLocaleString("en-US",{weekday:"long"})
// let month=date.toLocaleString("en-US",{month:"long"})
// let dateDay=date.getDate()

// console.log(weekDay);
// console.log(month);
// console.log(dateDay);

// searchInput.addEventListener("input",function(){

// })

async function search(item){
    let data=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=599df961d7f14d2fa9e161500231208&q=${item}&days=3`);
    let result =await data.json();
    return result;
}

//& Declare function getData() ====== Get Data From API &//
// async function getData(){
//     let data=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=599df961d7f14d2fa9e161500231208&q=lond&days=3`);
//     let result =await data.json();
//     return result;
// }


//& Declare displayToday(data) ==== Display Today Data &//
function displayToday(data){

    let date =new Date(data.forecast.forecastday[0].date);
    day[0].innerHTML=date.toLocaleString("en-US",{weekday:"long"})
    dateToday.innerHTML=date.getDate();
    month.innerHTML=date.toLocaleString("en-US",{month:"long"})
    cityLocationToday.innerHTML=data.location.name;

    cityTempToday.innerHTML=data.current.temp_c;
    cityIconToday.setAttribute("src",data.current.condition.icon);
    cityConditionToday.innerHTML=data.current.condition.text;
    cityHumidityToday.innerHTML=data.current.humidity+'%';
    cityWindToday.innerHTML=data.current.wind_kph+'%';
    cityWindDirToday.innerHTML=data.current.wind_dir;
}


//& Declare displayToday(data) ==== Display Tomorrow Data and After Tomorrow Data &//
function displayNext(data){
    let {forecastday : allData} = data.forecast;
    // console.log(allData);
    for(let i=0;i<allData.length-1;i++){
        let dateNext=new Date(allData[i+1].date);
        day[i+1].innerHTML=dateNext.toLocaleString("en-US",{weekday:"long"});

        //* in image not write .innerHTML because i want to capture img tag
        cityIconNext[i].setAttribute("src",allData[i+1].day.condition.icon);
        cityTempMax[i].innerHTML=allData[i+1].day.maxtemp_c;
        cityTempMin[i].innerHTML=allData[i+1].day.mintemp_c;
        cityConditionNext[i].innerHTML=allData[i+1].day.condition.text;
    }

}


//& Declare function display() &//
//! This function is async because it return promise !//
async function display(term){
    //* Store data return from api in variable *//
    let displayData=await search(term ? term : searchInput.value)
    //? if you got parameter put it argument in search() function ?//
    //? , else put searchInput.value argument in search() function ?//
    console.log(displayData);
    displayToday(displayData);
    displayNext(displayData);
}

btnFind.addEventListener("click",function(){
    display();
})

searchInput.addEventListener("input",function(){
    if(searchInput.value.length>=3){
        display();
    }
})


//& Declare function Success &//
 function suc(pos){
    const position = (pos.coords.latitude) + ',' + (pos.coords.longitude);
    // console.log(pos.coords);
    // console.log(position);
    display(position); //* Pass parameter to display() function *//

}


//& Declare function Error &//
function error(){
    window.alert("Accessed Denny")
}

//& Declare function currentLocation() ==== Get Current Location &//
function currentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(suc,error);
        // console.log(navigator.geolocation);
    }
    else {
         window.alert("Geolocation is not supported by this browser.");
    }
}

currentLocation();
