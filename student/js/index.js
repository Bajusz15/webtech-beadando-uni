
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
    $(".wrapper").show();
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
    $(".wrapper").show();
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
                        <td>${value.manufacturer} <img src="images/${value.manufacturer}.jpg" height="20" width="20" alt=""></td>
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
    $(".wrapper").hide();
    let cards = $(".cards");
    cards.empty();
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

function DrawManufacturerNames() {
    $(".checkboxes").hide();
    $(".content").hide();
    $(".wrapper").hide();
    let cards = $(".cards");
    cards.empty();
    cards.show();
    getManufacturerNames().done(() => {
        manufacturerNames.forEach((value, index) => {
            cards.append(`
                <div class="card">
                <h3>${value}</h3>
                <p><button id="showCars" onclick="DrawManufacturerCars('${value}')" >Show cars from this manufacturer</button></p>
                </div>`);
        })
    });
}

function DrawManufacturerCars(manufacturer) {
    document.cookie = "name=" + manufacturer;
    $(".checkboxes").hide();
    $(".content").hide();
    $(".wrapper").hide();
    let cards = $(".cards");
    cards.empty();
    cards.show();

    $.get( "/manufacturer", function( data ) {
        data.forEach((value) => {

            cards.append(`
                <div class="card">
                <h3>${value.name}</h3>
                <p>${value.consumption}</p>
                <p>${value.color}</p>
                <p>${value.manufacturer}</p>
                <p>${value.available}</p>
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
function removeCheckedBoxes(manufacturer) {
    $("input[type=checkbox]").prop('checked', false);
    let toCheck = $("input[type=checkbox]").filter((i, e) => {
        return e.value === manufacturer;
    });
    toCheck.prop('checked', true);
    DrawCarTable();
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




function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}
function openCarForm() {
    $(".form-container").html(`
        <h2>Add new Car</h2>
        <label for="name">
            <strong>name</strong>
        </label>
        <input type="text" placeholder="ford" name="name" required>
        <label for="consumption">
            <strong>consumption</strong>
        </label>
        <input type="text" placeholder="6.5 l" name="consumption" required>
        <label for="color">
            <strong>color</strong>
        </label>
        <input type="text" placeholder="red" name="color" required>
        <label for="year">
            <strong>year</strong>
        </label>
        <input type="text" placeholder="1999" name="year" required>
        <label for="manufacturer">
            <strong>manufacturer</strong>
        </label>
        <input type="text" placeholder="Skoda" name="manufacturer" required>
        <label for="available">
            <strong>available</strong>
        </label>
        <input type="number" placeholder="2" name="available" required>
        <label for="horsepower">
            <strong>horsepower</strong>
        </label>
        <input type="number" placeholder="50" name="horsepower" required>
        <button type="submit" class="btn" onclick="submitCarForm()">Submit</button>
        <button type="submit" class="btn cancel" onclick="closeForm()">Cancel</button>
        `);
    openForm();
}

function submitCarForm() {
    $.post("/addCar", {
        name : $( "input[name='name']" ).val(),
        color:  $( "input[name='color']" ).val(),
        consumption: $( "input[name='consumption']" ).val(),
        year: $( "input[name='year']" ).val(),
        manufacturer: $( "input[name='manufacturer']" ).val(),
        available: $( "input[name='available']" ).val(),
        horsepower: $( "input[name='horsepower']" ).val()
    }).done(DrawCarTable());
}

function openManufacturerForm() {
    $(".form-container").html(`
        <h2>Add new Manufacturer</h2>
        <label for="name">
            <strong>name</strong>
        </label>
        <input type="text" placeholder="Mclaren" name="name" required>
        <label for="country">
            <strong>country</strong>
        </label>
        <input type="text" placeholder="UK" name="country" required>
        <label for="founded">
            <strong>founded</strong>
        </label>
        <input type="text" placeholder="1999" name="founded" required>
        
      
        <button type="submit" class="btn" onclick="submitManufacturerForm()">Submit</button>
        <button type="submit" class="btn cancel" onclick="closeForm()">Cancel</button>
        `);
    openForm();
}
function submitManufacturerForm() {
    $.post("/addManufacturers", {
        name : $( "input[name='name']" ).val(),
        country: $( "input[name='country']" ).val(),
        founded: $( "input[name='founded']" ).val(),
    }).done(DrawManufacturers());
}
