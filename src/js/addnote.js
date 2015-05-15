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

  $$.post(connection, {"type": type, "id": patientID,"note": note,"theType":theType}, function (data) {
        var result = JSON.parse(data);
        var notedate = moment().format('DD-MM-YYYY');

        if(result === "success"){
            if(theType == 'transfer'){

                transfersNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
            }
            if(theType == 'process'){

                processNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
            }
            if(theType == 'positioning'){

                positioningNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
            }

            myApp.closeModal('.popup-addNote');

            $('textarea[name="note"]').val('');

        } else{
            myApp.alert('Sorry, something went wrong, try again '+result);
        }
    });
}); 