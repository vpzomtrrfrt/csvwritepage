window.onload = function() {
	var boxes = document.getElementById('boxes');
	var button = document.createElement('button');
	button.textContent = "Save";
	button.onclick = function() {
		var csv = "";
		var elems = boxes.getElementsByClassName("input");
		for(var i = 0; i < elems.length; i++) {
			var input = elems[i];
			if(csv.length != 0) {
				csv += ",";
			}
			var val = input.value;
			if(val.indexOf(",") > -1 || val.indexOf("\n") > -1) {
				csv += '"'+val+'"';
			}
			else {
				csv += val;
			}
		}
		var xhr = new XMLHttpRequest();
		xhr.open("GET", location.href+"/"+encodeURIComponent(csv));
		xhr.send();
	};
	boxes.appendChild(button);
};
