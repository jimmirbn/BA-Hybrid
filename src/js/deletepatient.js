$$('.btn--delete').on('click', function() {
	localStorage.clear();
	emptyPatientInfo();
    $$('.noPatient').show();

	id = this.id;
	var deletePatient = 'deletePatient';
	$$.post(connection, {
        "type": deletePatient,
        'id': id
    }, function(data) {
        	console.log(data);
    });
});