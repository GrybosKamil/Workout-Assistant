$(document).ready(function () {
    $("#accordion").accordion({
        animate: 200,
        collapsible: true,
        activate: function (event, ui) {
            console.log(event);
            console.log(ui);
        }
    });
});