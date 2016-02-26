
(function() 
{

	// getElementById
	function $id(id) 
	{
		return document.getElementById(id);
	}

	// output information
	function Output(msg) 
	{
		var m = $id("container");
		m.innerHTML = msg + m.innerHTML;

	}

	// file drag hover
	function FileDragHover(e) 
	{
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");

	}
	
	// file selection
	function FileSelectHandler(e) 
	{

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for (var i = 0, f; f = files[i]; i++)
		{
			ParseFile(f);
		}

	}
	// output file information
	function ParseFile(file) 
	{

		Output("");
		// display an image
		if (file.type.indexOf("image") == 0) 
		{
			var reader = new FileReader();
			reader.onload = function(e) 
			{
				Output(
					'<img src="' + e.target.result + '" /></p>'
				);
			}
			reader.readAsDataURL(file);

		}

		// display text
		if (file.type.indexOf("text") == 0) 
		{
			var reader = new FileReader();
			reader.onload = function(e) 
			{
				Output(
					"<p><strong>" + file.name + ":</strong></p><pre>" +
					e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
					"</pre>"
				);
			}
			reader.readAsText(file);
		}

	}
	//var cookieValue = document.getElementById('container').getAttribute('value');
				

	// initialize
	function Init() 
	{

		var fileselect = $id("fileselect"),
			filedrag = $id("filedrag"),
			submitbutton = $id("submitbutton");
		
		
		// file select
		fileselect.addEventListener("change", FileSelectHandler, true);

		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) 
		{

			// file drop
			filedrag.addEventListener("dragover", FileDragHover, true);
			filedrag.addEventListener("dragleave", FileDragHover, true);
			filedrag.addEventListener("drop", FileSelectHandler, true);
			filedrag.style.display = "block";
	
			
			// remove submit button
			submitbutton.style.display = "none";
			
		}
		
	}

	// call initialization file
	if (window.File && window.FileList && window.FileReader) 
	{
		Init();
	}


})();
