$(document).on("click", ".team", function() {
    var teamnr = this.id;
    var type = "roomdata";
    $.post("http://www.digitaljimmi.com/api.php", {"type": type, 'teamnr' : teamnr}, function (data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {

            var roomnr = result[i].roomnr;
            $('.roomData').append('<li>'+
            '<a id="'+roomnr+'" href="left-page-2.html" class="item-link getPatientList">'+
              '<div class="item-content">'+
                '<div class="item-inner">'+
                  '<div class="item-title">Stue '+roomnr+'</div>'+
                '</div>'+
              '</div>'+
            '</a>'+
          '</li>'
          );
        }
    });
});