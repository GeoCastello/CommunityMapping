function send_form(f) {
	//Here you don't have the acces to 'this' because the event onClick is launched
	//from html; for that it receives f; this is the formular of the button from which
	//the event onClick is launched.
	//it can't be done from the initialize function because the formular is not created
	//yet, because it's created by ajax, after loading the main page
	var v=$(f).serialize() //It extracts the values of the formular and introduce them
						   //like an string on the variable v
						   //serialize has not into account the dissabled fields.
						   //serialize is a JQUERY method.
	$.ajax({
		type: "POST",
		url: url,
		//data: $(nombre_form).serialize(), //Add the fields of the sended formular.
		data: v, //Another way to do it
		success: create_tables,
		error:function (xhr, ajaxOptions, thrownError) {
		alert(xhr.status + '\n' + thrownError);
		}
		});
	return false; //Avoid to execute the submit of the formular
}
