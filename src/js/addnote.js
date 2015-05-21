$$('.popupType').on('click', function(){
    type = this.id;
    $('#type').val('');
    $('#type').val(type);
});

$$('.addNote').on('click', function(){
    var type = 'addNote';
    var patientID = $('#patientID').val();
    var theType = $('#type').val();
    var note = $('textarea[name="note"]').val();

        var notedate = moment().format('DD-MM-YYYY, H:mm');
        $$.post(connection, {'date':notedate,"type": type, "id": patientID,"note": note,"theType":theType}, function (data) {
        var result = JSON.parse(data);

        if(result === "success"){
            if(theType == 'transfer'){

                transfersNotes.prepend('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                var dots = transfersNotes.siblings()[0];
                $$(dots).show();
            }
            if(theType == 'process'){

                processNotes.prepend('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                var dots = processNotes.siblings()[0];
                $$(dots).show();
            }
            if(theType == 'positioning'){

                positioningNotes.prepend('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                var dots = positioningNotes.siblings()[0];
                $$(dots).show();
            }

            myApp.closeModal('.popup-addNote');

            $('textarea[name="note"]').val('');

        } else{
            myApp.alert('Sorry, something went wrong, try again '+result);
        }
    });
}); 