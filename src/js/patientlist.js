// $$(document).on("click", ".getPatientList", function() {
//     $$('.loading--leftview').show();

//     var roomnr = this.id;
//     var patientListData = "patientListData";
//     $$.post(connection, {
//         "patientListData": patientListData,
//         'roomnr': roomnr
//     }, function(data) {
//         var result = JSON.parse(data);
//         if (result == '') {
//             $('#patientHeader').text('Ingen patienter');
//         } else {
//             for (var i = 0; i < result.length; i++) {
//                 var name = result[i].fullname;
//                 var id = result[i].id;
//                 $('.patientList').append('<li>' +
//                     '<a id="' + id + '" href="" class="item-link getPatientInfo">' +
//                     '<div class="item-content">' +
//                     '<div class="item-inner">' +
//                     '<div class="item-title">' + name + '</div>' +
//                     '</div>' +
//                     '</div>' +
//                     '</a>' +
//                     '</li>'
//                 );
//             }
//         }
//         $$('.loading--leftview').hide();
//     });
// });
