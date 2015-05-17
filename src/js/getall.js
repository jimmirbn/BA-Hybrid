$$(document).on("click", ".getAll", function() {
    $$('.loading--leftview').show();
    var type = this.id;

    $$.post(connection, {
        "type": type
    }, function(data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {

            if (type == 'allRooms') {
                if (result == '') {
                    $('#allHeader').text('Ingen stuer endnu');

                } else {
                    $('#allHeader').text('Alle stuer');
                }
                var roomnr = result[i].roomnr;
                $('.allData').append('<li>' +
                    '<a id="' + roomnr + '" href="left-page-2.html" class="item-link getPatientList">' +
                    '<div class="item-content">' +
                    '<div class="item-inner">' +
                    '<div class="item-title">Stue ' + roomnr + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                );
            }
            if (type == 'allPatients') {
                if (result == '') {
                    $('#allHeader').text('Ingen patienter endnu');

                } else {
                    $('#allHeader').text('Alle patienter');
                }
                var name = result[i].fullname;
                var id = result[i].id;
                $('.allData').append('<li>' +
                    '<a id="' + id + '" href="" class="item-link getPatientInfo">' +
                    '<div class="item-content">' +
                    '<div class="item-inner">' +
                    '<div class="item-title">' + name + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                );
            }

        }
        $$('.loading--leftview').hide();
    });
});
