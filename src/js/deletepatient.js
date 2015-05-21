$$('.btn--delete').on('click', function() {
        id = this.id;

    myApp.confirm('Dette vil slette patient og alt tilhørende', function() {
        localStorage.clear();
        emptyPatientInfo();
        $$('.noPatient').show();

        var deletePatient = 'deletePatient';
        $$.post(connection, {
            "type": deletePatient,
            'id': id
        }, function(data) {
            console.log(data);
        });
    });
});
