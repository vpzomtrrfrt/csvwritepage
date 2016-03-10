window.onload = function() {
	var boxes = document.getElementById('boxes');
	var button = document.createElement('button');
	button.textContent = "Save";
	button.onclick = function() {
		var csv = "";
		var labels = boxes.getElementsByClassName("mainLabel");
		for(var i = 0; i < labels.length; i++) {
			var label = labels[i];
			if(csv.length != 0) {
				csv += ",";
			}
			var inputs = label.getElementsByClassName("input");
			var val = null;
			if(inputs.length == 1) {
				if(inputs[0].type == "checkbox") {
					val = inputs[0].checked?1:0;
				}
				else {
					val = inputs[0].value;
				}
			}
			else {
				for(var j = 0; j < inputs.length; j++) {
					if(inputs[j].checked) {
						val = inputs[j].value;
					}
				}
			}
			val = val+"";
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
