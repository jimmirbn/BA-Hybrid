$(document).on("click", ".getPatientList", function() {
    var roomnr = this.id;
    var type = "patientListData";
    $.post("api.php", {"type": type, 'roomnr' : roomnr}, function (data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {

            var name = result[i].fullname;
            var id = result[i].id;
            $('.patientList').append('<li>'+
            '<a id="'+id+'" href="" class="item-link getPatientInfo">'+
              '<div class="item-content">'+
                '<div class="item-inner">'+
                  '<div class="item-title">'+name+'</div>'+
                '</div>'+
              '</div>'+
            '</a>'+
          '</li>'
          );
        }
    });
});