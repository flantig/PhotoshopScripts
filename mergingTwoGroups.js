#target photoshop
app.bringToFront();
var docRef = app.activeDocument;
var edittext1;
var edittext2;
var edittext3;

function showDialog(){
	  var dialog = new Window("dialog"); 
      dialog.text = "Test UI"; 
      dialog.orientation = "row"; 
      dialog.alignChildren = ["left","top"]; 
      dialog.spacing = 10; 
      dialog.margins = 16; 
	  
	  var group1 = dialog.add("group", undefined, {name: "group1"}); 
      group1.preferredSize.width = 150; 
      group1.orientation = "column"; 
      group1.alignChildren = ["fill","top"]; 
      group1.spacing = 10; 
      group1.margins = 0; 
      group1.alignment = ["left","fill"];
	  
	  var panel3 = group1.add("panel", undefined, undefined, {name: "panel3"}); 
      panel3.text = "Edit Text Group"; 
      panel3.orientation = "column"; 
      panel3.alignChildren = ["left","top"]; 
      panel3.spacing = 10; 
      panel3.margins = 10; 
      panel3.alignment = ["fill","top"]; 

      dialog.statictext1 = panel3.add("statictext", undefined, undefined, {name: "statictext1"}); 
      dialog.statictext1.text = "Foundation Layer Group Name"; 
      dialog.statictext1.alignment = ["fill","top"]; 

      dialog.edittext1 = panel3.add('edittext {properties: {name: "edittext1"}}'); 
      dialog.edittext1.text = edittext1 || ""; 
      dialog.edittext1.alignment = ["fill","top"];
      dialog.edittext1.value = edittext1; 

      dialog.statictext2 = panel3.add("statictext", undefined, undefined, {name: "statictext2"}); 
      dialog.statictext2.text = "Overlay Layer Group Name"; 
      dialog.statictext2.alignment = ["fill","top"]; 

      dialog.edittext2 = panel3.add('edittext {properties: {name: "edittext2"}}'); 
      dialog.edittext2.text = edittext2 || ""; 
      dialog.edittext2.alignment = ["fill","top"];
      dialog.edittext2.value = edittext2; 
	  
	  dialog.statictext3 = panel3.add("statictext", undefined, undefined, {name: "statictext3"}); 
      dialog.statictext3.text = "Output Layer Group Name"; 
      dialog.statictext3.alignment = ["fill","top"]; 

      dialog.edittext3 = panel3.add('edittext {properties: {name: "edittext3"}}'); 
      dialog.edittext3.text = edittext3 || ""; 
      dialog.edittext3.alignment = ["fill","top"];
      dialog.edittext3.value = edittext3; 
	  
	  var group2 = dialog.add("group", undefined, {name: "group2"}); 
		group2.orientation = "column"; 
		group2.alignChildren = ["fill","top"]; 
		group2.spacing = 10; 
		group2.margins = 0; 

	  var ok = group2.add("button", undefined, undefined, {name: "ok"}); 
	  ok.text = "OK"; 

	  var cancel = group2.add("button", undefined, undefined, {name: "cancel"}); 
      cancel.text = "Cancel"; 
	  
	  function updateParams() {
        edittext1 = dialog.edittext1.text;
        edittext2 = dialog.edittext2.text;
		edittext3 = dialog.edittext3.text;
	  };
	  
	  ok.onClick = function(){
		updateParams();
		dialog.close(1);
	  }
	  
	  cancel.onClick = function(){
		dialog.close(2);
	  }
	  
	  dialog.center();
	  return dialog.show();
}

function getLayerSetNames(layerSet){
	var layerNames = [];
	for(var i=0;i<layerSet.layers.length;i++){
		layerNames.push(layerSet.layers[i].name);
	}
	return layerNames;
}

function runMerger(){
	var foundationSet = docRef.layerSets.getByName(edittext1);
	var overlaySet = docRef.layerSets.getByName(edittext2);
	var foundationSetNames = getLayerSetNames(foundationSet);
	var overlaySetNames = getLayerSetNames(overlaySet);
	var myOutputSet = docRef.layerSets.add();
	myOutputSet.name = edittext3;

	for(var i=0;i<foundationSet.layers.length;i++){
		layer1 = foundationSet.layers.getByName(foundationSetNames[i]);
		for(var j=0;j<overlaySet.layers.length;j++){
			layer2 = overlaySet.layers.getByName(overlaySetNames[j]);
			newLayer1Temp = layer1.duplicate();
			newLayer2Temp = layer2.duplicate();
			tempLayerSet = myOutputSet.layerSets.add();
			newLayer1Temp.move(tempLayerSet, ElementPlacement.INSIDE);
			newLayer2Temp.move(tempLayerSet, ElementPlacement.INSIDE);
			var mergedGroup = tempLayerSet.merge();
		}

	}
}

function main(){
	var dialogInt = showDialog();
	if(dialogInt === 1) {
		runMerger();
	}
}

main();