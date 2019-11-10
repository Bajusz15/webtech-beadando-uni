// create form to add cars
//create form to add manufacturers
//on index page, show manufacturers and their cars. manufacturers should be selected, and stored in cookies.
var manufacturers = [];
var manufacturerNames = [];
var cars = [];
var checkedBoxes = [];
jQuery(function ($) {
    $(window).on('load', function () {

    });
    //default
    DrawCheckBoxes();
    setTimeout(DrawCarTable, 100)
});


function DrawCheckBoxes() {
    let checkboxes = $(".checkboxes");
    checkboxes.show();
    checkboxes.empty();
    $(".content").show();
    $(".cards").hide();
    getManufacturerNames().done(() => {
        manufacturerNames.forEach((value, index) => {
            checkboxes.append(`
                <label for="m${index}" class="">
                    <input type="checkbox"  value="${value}"  checked onchange="DrawCarTable()" id="m${index}">${value}
                </label>
            `);
        });
    });

}

function DrawCarTable() {
    checkedBoxes = getCheckedBoxes();
    console.log(checkedBoxes);
    //let wrapper = $(".wrapper");
    $(".checkboxes").show();
    let content = $(".content");
    content.show();
    $(".cards").hide();
    content.empty();
        // wrapper.append(`<div class="content"></div>`);
    content.append(`
            <table id="carTable">
                <tr>
                    <th>Name</th>
                    <th>Consumption</th>
                    <th>Color</th>
                    <th>Manufacturer</th>
                    <th>Avalaible</th>
                    <th>Year</th>
                    <th>Horsepower</th>
                </tr>
            </table>
        `);
        getCars().done(() => {
            cars.forEach(((value) => {
                console.log(value.manufacturer);
                if (checkedBoxes.includes(value.manufacturer)){
                    $("#carTable").append(`
                    <tr>
                        <td>${value.name}</td>
                        <td>${value.consumption}</td>
                        <td>${value.color}</td>
                        <td>${value.manufacturer}</td>
                        <td>${value.available}</td>
                        <td>${value.year}</td>
                        <td>${value.horsepower}</td>
                    </tr>`);
                }
            }))
        });
    //if it none is checked

}

function DrawManufacturers() {
    
    //$(".wrapper").empty();
    $(".checkboxes").hide();
    $(".content").hide();
    let cards = $(".cards");
    cards.show();
    getManufacturers().done(() => {
        manufacturers.forEach((value) => {
            console.log(value);
            cards.append(`
                <div class="card">
                <h3>${value.name}</h3>
                <p>${value.country}</p>
                <p>${value.founded}</p>
                </div>`);
        })
    })
}

function getCheckedBoxes() {
    let cb = $("input[type=checkbox]").filter((i,e) => {
        console.log(e);
        return e.checked === true;
    }).map((i,e) => {
        return e.value;
    });
    return cb.get();
}

//get all cars from api
function getCars() {
    return $.get( "/cars", function( data ) {
        cars = data;
    });
}
//get all manufacturers
function getManufacturers() {
   return  $.get( "/manufacturers", function( data ) {
        manufacturers = data;
    });

}
//get the names of manufacturers
function getManufacturerNames() {
   return  $.get( "/manufacturerNames", function( data ) {
        manufacturerNames = data;
    });
}
