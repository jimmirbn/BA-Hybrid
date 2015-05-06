$(document).on("click", ".team", function() {
    var teamnr = this.id;
    var type = "roomdata";
    $.post("http://www.digitaljimmi.com/api.php", {"type": type, 'teamnr' : teamnr}, function (data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {

            var stuenr = result[i].stuenr;
            $('.roomData').append('<li>'+
            '<a id="'+stuenr+'" href="left-page-2.html" class="item-link getPatientList">'+
              '<div class="item-content">'+
                '<div class="item-inner">'+
                  '<div class="item-title">Stue '+stuenr+'</div>'+
                '</div>'+
              '</div>'+
            '</a>'+
          '</li>'
          );
        }
    });
});