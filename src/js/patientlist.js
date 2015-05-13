$(document).on("click", ".getPatientList", function() {
    var roomnr = this.id;
    var patientListData = "patientListData";
    $.post("http://169.254.136.152/api.php", {"patientListData": patientListData, 'roomnr' : roomnr}, function (data) {
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