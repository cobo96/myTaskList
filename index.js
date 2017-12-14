//opening a file
document.getElementById("openFile").addEventListener('change', function() {
    var fr = new FileReader();
    fr.onload = function() {
        document.getElementById("fileContents").textContent = this.result;
    }
    fr.readAsText(this.files[0]);
})
//saving a file
$("#save-btn").click(function(){
    var blob = new Blob([
        document.getElementsByTagName(li)
    ], 
    {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "taskListTextFile.txt");
})