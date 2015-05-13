$(document).on("click", ".team", function() {
    var teamnr = this.id;
    var roomdata = "roomdata";
    $.post("http://169.254.136.152/api.php", {"roomdata": roomdata, 'teamnr' : teamnr}, function (data) {
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