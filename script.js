/* buttons */
var addBtn = document.getElementById('addBtn');
var clearBtn = document.getElementById('clearBtn');
var deleteBtn = document.getElementById('deleteBtn');

var movieInput = document.getElementById('movieInput');
var movieList = document.getElementById('movieList');

var container = document.getElementById("container");
var movieDiv = document.getElementById('movieDiv');

/* Add with enter key */
movieInput.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        addBtn.click();
    }
});

/* event listeners for add and clear button */
addBtn.addEventListener('click', function() {
    if (movieInput.value == '') {
        var alertDiv = createAlertDiv('Enter a movie to add!');
        container.insertBefore(alertDiv, movieDiv);
        setTimeout(function() {
            document.getElementById('alert').remove();
        }, 3000);
        return;
    }

    movieList.innerHTML += '<li class="movie" onclick="checkListItem(this)">' + movieInput.value + '<span id="deleteBtn" type="button" onclick="removeListItem(this)">x</span></li>';
    movieInput.value = '';
    store();
});

clearBtn.addEventListener('click', function() {
    if (movieList.innerHTML == '') {
        var alertDiv = createAlertDiv('Nothing to delete!');
        container.insertBefore(alertDiv, movieDiv);
        setTimeout(function() {
            document.getElementById('alert').remove();
        }, 3000);
        return;
    }
    movieList.innerHTML = '';
    clear();
});

/* functions to remove list item and to check list */
function removeListItem(e) {
    e.parentElement.remove();
    store();
}

function checkListItem(e) {
    if (e.getAttribute('id') == 'checked') {
        e.removeAttribute('id');
        store();
        return;
    }
    e.setAttribute('id', 'checked');
    store();
}

function createAlertDiv(alertText) {
        var alertDiv = document.createElement('div');
        alertDiv.setAttribute('id', 'alert');
        alertDiv.innerHTML = alertText + '<span id="alertBox"><span id="deleteBtn" type="button" onclick="removeListItem(this.parentNode)">x</span></span>'
        return alertDiv;
}

/* local storage functions */
function clear() {
    localStorage.clear();
}

function store() {
    localStorage.setItem('movieList', movieList.innerHTML);
}

function retrieve() {
    var saved = localStorage.getItem('movieList');

    if (saved) {
        movieList.innerHTML = saved;
    }
}

retrieve();