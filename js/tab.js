// script for tab
function openmain(evt, main) {
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
    
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("text-teal-800", "border-b", "border-teal-800");
    }
    
    document.getElementById(main).style.display = "block";
    
    evt.currentTarget.classList.add("text-teal-800", "border-b", "border-teal-800");
    }
    
    document.getElementById("Activity-tab").click();