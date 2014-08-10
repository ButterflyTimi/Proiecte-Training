$(document).ready(function(){

	$("#butonLogin").mouseover(function(){
		$("#butonLogin").css("background-color", "#045E9F");
	})
	$("#butonLogin").mouseout(function(){
		$("#butonLogin").css("background-color", "#2283C5");
	})

	$("input").focusin(function(){
    	$(this).css("outline","solid 1px #FEBA7A");
    	//$(this).css("border"," solid 2px #FEBA7A");
  	})
  	$("input").focusout(function(){
    	$(this).css("outline","initial");
    	//$(this).css("border", "solid 1px #A9A9A9");
  	})
  	$("#butonLogin").click(function(){
  		if ( $("#inputUsername").val() == 0 || $("#inputPassword").val() == 0 )
  			{
  				if ($("#badCredentials").length==0)	
  				{
  					var bad=document.createElement("p");
  					var text=document.createTextNode("Bad credentials");
  					bad.setAttribute("id","badCredentials");
  					bad.appendChild(text);
  					$(bad).insertAfter("h2");
				}
  			}
  			else
  			{
  				 $.post("demo_test_post.php",
  					{
              user: $("#inputUsername").val(),
              pass: $("#inputPassword").val()
  					},
  					function(data, status){
              if ($("#inputPassword").val() == "123")
              {
                var log=window.open("","","width=300, height=250");
                log.document.write("<p>Password is correct!<br> Username: "+$("#inputUsername").val()+"<br>Status: "+status+"</p>");
              }
	
  					})
           
  			}
  	})
});
