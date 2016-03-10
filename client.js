var getCSV = function() {
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
	return csv;
};
window.onload = function() {
	var PAGE = location.href.substring(location.href.indexOf('/')+1);
	var key = "localsave-"+PAGE;
	var boxes = document.getElementById('boxes');
	var button = document.createElement('button');
	button.textContent = "Save";
	button.onclick = function(event) {
		event.preventDefault();
		var self = this;
		this.disabled = true;
		var csv = getCSV();
		var allcsv = csv;
		if(key in localStorage) {
			allcsv = localStorage[key] + allcsv;
		}
		var xhr = new XMLHttpRequest();
		xhr.open("GET", location.href+"/"+encodeURIComponent(allcsv));
		xhr.onload = function() {
			boxes.reset();
			delete localStorage[key];
			self.disabled = false;
		};
		xhr.send();
	};
	boxes.appendChild(button);
	var localButton = document.createElement('button');
	localButton.textContent = "Save Local";
	localButton.onclick = function(event) {
		event.preventDefault();
		var csv = getCSV();
		if(!(key in localStorage)) {
			localStorage[key] = "";
		}
		localStorage[key] += csv+"\n";
		boxes.reset();
	};
	boxes.appendChild(localButton);
};
