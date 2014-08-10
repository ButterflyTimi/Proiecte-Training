$( document ).ready( function() {
	var tableClients = new Table ({
									indexTable : 0,
									nameHeader : 'Clients',
									nameColumns : ['Id' , 'Name' , 'Country'],
								 });
	tableClients.renderRows ( 'Clients' );
	tableClients.createButton ();
	var tableProjects = new Table({
									indexTable : 1,
									nameHeader : 'Projects',
									nameColumns : ['Id' , 'Name' , 'Client_Id'],
								 });
	tableProjects.renderRows ( 'Projects' );
	tableProjects.createButton ();
	var tableEmployees = new Table({
									indexTable : 2,
									nameHeader : 'Employees',
									nameColumns : ['Id' , 'First_Name' , 'Last_Name' , 'Gender' , 'Projects_Id'],
								 });
	tableEmployees.renderRows ( 'Employees' );
	tableEmployees.createButton ();

	$( "#button0" ).click( function() {
		var clientCollection = [$( "#Clients_Id" ).val() , $( "#Clients_Name" ).val() , $( "#Clients_Country" ).val()];
		tableClients.insertRowInTable( clientCollection , 'Clients' );
		$( "input" ).val( "" );
	})

	$( "#button1" ).click( function() {
		var projectCollection = [$( "#Projects_Id" ).val() , $( "#Projects_Name" ).val() , $( "#Projects_Client_Id" ).val()];
		tableProjects.insertRowInTable( projectCollection , 'Projects' );
		$( "input" ).val( "" );
	})

	$( "#button2" ).click( function() {
		var employeeCollection = [$( "#Employees_Id" ).val() , $( "#Employees_First_Name" ).val() , $( "#Employees_Last_Name" ).val() , $( "#Employees_Gender" ).val() , $( "#Employees_Projects_Id" ).val()];
		tableEmployees.insertRowInTable( employeeCollection , 'Employees' );
		$( "input" ).val( "" );
	})

	var buton = $( "<button id='buttonDelete'></button>" ).text( "Delete Tables" );
	$( "body" ).append( buton );

	$( "#buttonDelete" ).click( function() { 
        localStorage.clear(); 
    	alert( "Tabelele au fost sterse!" );
    	window.location.reload(); 
	})
});
