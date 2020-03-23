var title = document.querySelector("#title");
var button = document.querySelector(".button");

title.addEventListener("click", function (event) {
    var element = title;
    var currentColor = element.getAttribute("textColor");

    if (currentColor === "black") {
        element.setAttribute("textColor", "red");
        element.style.color = "red";
    }
    else if (currentColor === "red") {
        element.setAttribute("textColor", "black");
        element.style.color = "black";
    }
});

button.addEventListener("click", function (event) {
    var element = title;
    var currentColor = element.getAttribute("textColor");

    if (currentColor === "black") {
        element.setAttribute("textColor", "red");
        element.style.color = "red";
    }
    else if (currentColor === "red") {
        element.setAttribute("textColor", "black");
        element.style.color = "black";
    }
});