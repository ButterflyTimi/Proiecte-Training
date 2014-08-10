var clients = [""] , projects = [""] , employees = [""];
var currentData = [""];
var row , cell;
var dataController = {
						insertDataList : function ( value, data ) {
							if (localStorage.getItem( value ) == null ) {
								localStorage.setItem( value , JSON.stringify( [] ) );
								}
							currentData = JSON.parse( localStorage.getItem( value ) );
							currentData.push( data );
							localStorage.setItem( value , JSON.stringify( currentData ) );
						},
						getDataList: function( value ) {
							if ( localStorage.getItem( value ) != null ) {
								return JSON.parse ( localStorage.getItem ( value ) );
								} else {
								return [];
								}
						},
						getDataIds: function( value ) {
							arrayIds = this.getDataList( value );
							ids = [];
							for ( var i in arrayIds ) {
								ids.push( arrayIds[i].cId );
							}
							return ids;
						},
						checkIdUnique: function ( arrayIds , value ) {
							for (var i in arrayIds) {
								if (value == arrayIds[i]) {
									return false;
									}
								}
							return true;
						}
					};
var Table = function ( options ) {
 									this.indexTable = options.indexTable;
 									this.nameHeader = options.nameHeader;
 									this.columnNames = options.nameColumns;
 									this.numberOfRowsInserted = 0;
									$( "body" ).append( $( "<div id ='coloana"+this.indexTable+"'></div>" ) );
									$( "#coloana"+this.indexTable ).append( $( "<h2></h2>" ).text( this.nameHeader ) );
 									this.tabel = $( "<table></table" );
 									$( "#coloana"+this.indexTable ).append( this.tabel );
 								};
Table.prototype.addingHeadersTable = function ( nameHeader , columnNames , tabel) {
	row = $( "<tr id='"+nameHeader+"'></tr>" );
	for (var i in columnNames) {
		cell = $( "<th></th>" ).text( columnNames[i] );
		row.append( cell );
		}
	$( tabel ).append( row );
	};
Table.prototype.createInputsInTable = function ( nameHeader , columnNames , tabel ) {
	row = $( "<tr id='input_"+nameHeader+"' ></tr>" );
	for (var i in columnNames) {
		cell = $( "<td><input type='text' id='"+nameHeader+"_"+columnNames[i]+"'></td>" );
		row.append( cell );
		}
	$( tabel ).append( row );
	};
Table.prototype.createButton = function () {
	var buton = $( "<button id='button"+(this.indexTable)+"'></button>" ).text( "Add " + this.nameHeader );
	$( "#coloana"+this.indexTable ).append( buton );
	};
Table.prototype.renderRows = function ( name ) {
	this.tabel.empty ();
	this.addingHeadersTable( this.nameHeader , this.columnNames , this.tabel );
	currentData = dataController.getDataList ( name );
	if (currentData.length != null) {
		for ( var i in currentData ) {
			var arrayOfSavedData = [""];
			var k=0;
			for ( var j in currentData[i] ) {
    			arrayOfSavedData [k] = currentData[i][j];
    			k++;
    			}
    		if (name == 'Clients') {
    			this.insertDataInputsInTable ( "Clients" , arrayOfSavedData );
    			}
    		if (name == 'Projects') {
    			this.insertDataInputsInTable ( "Projects" , arrayOfSavedData );
    			}
    		if (name == 'Employees') {
    			this.insertDataInputsInTable ( "Employees" , arrayOfSavedData );
    			}
			}
		}
	this.createInputsInTable( this.nameHeader , this.columnNames , this.tabel );
	};
Table.prototype.insertDataInputsInTable = function ( name , arrayOfElements) {
	var row = $( "<tr></tr>" );
	row.insertAfter( "#"+name );
	for ( var i in arrayOfElements ) {
		row.append( $( "<td class='liniiNoi'>"+ arrayOfElements[i] +"</td>" ) );
		}
	};
Table.prototype.saveEntity = function ( nameHeader , numberOfRow ) {
	if ( nameHeader == 'Clients' ) {
		var clientRow = { cId: $( "#Clients_Id" ).val() , cName: $( "#Clients_Name" ).val() , cCountry: $( "#Clients_Country" ).val() };
		clients[numberOfRow] = clientRow ;
		dataController.insertDataList ( 'Clients' , clients[numberOfRow] );
		}
	if ( nameHeader == 'Projects' ) {
		var projectRow = { pId: $( "#Projects_Id" ).val() ,  pName: $( "#Projects_Name" ).val() , pClient_id: $( "#Projects_Client_Id" ).val()};
		projects[numberOfRow] = projectRow; 
		dataController.insertDataList ( 'Projects' , projects[numberOfRow] );
		}
	if ( nameHeader == 'Employees' ) {
		var employeeRow = { eId: $( "#Employees_Id" ).val() ,  eFirst_name: $( "#Employees_First_Name" ).val() , eLast_Name: $( "#Employees_Last_Name" ).val() , eGender: $( "#Employees_Gender" ).val() , eProjects_Id: $( "#Employees_Projects_Id" ).val()};
		employees[numberOfRow] = employeeRow; 
		dataController.insertDataList ( 'Employees' , employees[numberOfRow] );
		}
	};
Table.prototype.insertRowInTable = function ( arrayOfElements , nameHeader ) {
	var verificaCampuri = true;
	for ( var i in arrayOfElements ) {
		if ( arrayOfElements[i] == null ) {
			verificaCampuri = false;
			break;
			}	
		}
	if ( $.isNumeric( arrayOfElements[0] ) == false ) {
		verificaCampuri = false;
		}
	if ( nameHeader == "Clients" ) {
		if ( $.isNumeric( arrayOfElements[1] ) == true || $.isNumeric( arrayOfElements[2] ) == true ) {
			verificaCampuri = false;
			}
		}
	if ( nameHeader == "Projects" ) {
		if ( $.isNumeric ( arrayOfElements[1] ) == true || $.isNumeric( arrayOfElements[2] ) == false ) {
			verificaCampuri = false;
			}
		}
	if ( nameHeader == "Employees" ) {
		if ( $.isNumeric( arrayOfElements[1] ) == true || $.isNumeric( arrayOfElements[2] ) == true || $.isNumeric( arrayOfElements[3] )==true ) {
			verificaCampuri = false;
			}
		var projectsId = arrayOfElements[4];
		projectsId = projectsId.split(" ");
		for ( var i in projectsId ) {
			if ( $.isNumeric( projectsId[i] ) == false ) {
				verificaCampuri = false;
				}
			}
		}
	var arrayOfSavedIds = [];
	arrayOfSavedIds = dataController.getDataIds( nameHeader );
	if ( arrayOfSavedIds.length != 0 ) {
		if ( dataController.checkIdUnique ( arrayOfSavedIds , arrayOfElements[0] ) == false ) {
			verificaCampuri = false;
			}
		}
	if ( verificaCampuri == false ) {
		alert("Date incorecte sau lipsa!\nReintroduce-ti datele!");
		} else {
		this.saveEntity ( nameHeader , this.numberOfRowsInserted );
		this.numberOfRowsInserted++;
		this.renderRows ( nameHeader );
		}
	};