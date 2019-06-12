/* buttons */
var addBtn = document.getElementById('addBtn');
var clearBtn = document.getElementById('clearBtn');
var deleteBtn = document.getElementById('deleteBtn');

var movieInput = document.getElementById('movieInput');
var movieList = document.getElementById('movieList');

var container = document.getElementById("container");
var movieDiv = document.getElementById('movieDiv');

var alertDiv = document.getElementById('alertDiv');
var alertList = document.getElementById('alertList');

/* Add with enter key */
movieInput.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        addBtn.click();
    }
});

/* event listeners for add and clear button */
addBtn.addEventListener('click', function() {
    if (movieInput.value == '') {
        alertDiv.style.display = 'inline';
        var alertElement = createAlert('Enter a movie to add!');
        alertList.appendChild(alertElement);
        setTimeout(function() {
            alertElement.remove()
        }, 3000);
        return;
    }

    movieList.innerHTML += '<li id="unchecked" class="movie" onclick="checkListItem(this)">' + movieInput.value + '<span id="deleteBtn" type="button" onclick="removeListItem(this)">x</span></li>';
    movieInput.value = '';
    store();
});

// clearBtn.addEventListener('click', function() {
//     if (movieList.innerHTML == '') {
//             var alertDiv = createAlertDiv('Nothing to delete!');
//             container.insertBefore(alertDiv, movieDiv);
//             setTimeout(function() {
//                 var alertItem = document.getElementById('alert');
//                 alertItem.remove();
//             }, 3000);
//             return;
//     } else {
//         result = confirm("Do you really want to clear your list?");
//     }
//     if (result == true) {
//         movieList.innerHTML = '';
//         clear();
//     }
// });

function clearList() {
    movieList.innerHTML = '';
    clear();
}

function customComfirm() {
    if (movieList.innerHTML == '') {
        alertDiv.style.display = 'inline';
        var alertElement = createAlert('Nothing to delete!');
        alertList.appendChild(alertElement);
        setTimeout(function() {
            alertElement.remove();
        }, 3000);
        return;
    }
    // var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "flex";
    dialogoverlay.style.height = winH + "px";
    // dialogbox.style.left = (winW/2) - (550*.5) + "px";
    // dialogbox.style.right = (winW/2) - (550*.5) + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "flex";
    document.getElementById('dialogboxhead').innerHTML = 'Do you really want to clear your list?';
    document.getElementById('dialogboxbody').innerHTML = 'This operation cannot be undone!';
    document.getElementById('dialogboxfoot').innerHTML = '<button id="yes" class="dialogBtns" onclick="yes()">Yes</button><button id="no" class="dialogBtns" onclick="no()">No</button>';
}

function no() {
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
}

function yes() {
    clearList();
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
}

// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.fontSize = "15px";
  } else {
    document.getElementById("header").style.fontSize = "22.5px";
  }
}

/* functions to remove list item and to check list */
function removeListItem(e) {
    e.parentElement.remove();
    store();
}

function checkListItem(e) {
    if (e.getAttribute('id') == 'checked') {
        e.setAttribute('id', 'unchecked');
        store();
        return;
    }
    e.setAttribute('id', 'checked');
    store();
}

function createAlert(alertText) {
        var alertElement = document.createElement('LI');
        alertElement.setAttribute('class', 'alertBox');
        alertElement.innerHTML = alertText + '<span id="deleteBtn" type="button" onclick="removeListItem(this)">x</span>';
        return alertElement;
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

if(!alertList.hasChildNodes) {alertDiv.style.display = 'none';}

retrieve();