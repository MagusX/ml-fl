function getBLOBFileHeader(blob, callback) {
    var fileReader = new FileReader();
    fileReader.onloadend = function(e) {
      var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
      var header = "";
      for (var i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      callback(header);
    };
    fileReader.readAsArrayBuffer(blob);
}

function mimeType(headerString) {
    let type;
    switch (headerString) {
        case "89504e47":
            type = "image/png";
            break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
        case "ffd8ffee":
        case "ffd8ffdb":
            type = "image/jpeg";
            break;
        default:
            type = "unknown";
            break;
    }
    return type;
}

(function() {
    const imgInput = document.getElementById("picture");
    if (imgInput !== null) {
        imgInput.addEventListener('change', e => {
            const blob = e.target.files[0];
            getBLOBFileHeader(blob, header => {
                console.log(header);
                if (!["image/jpeg", "image/png"].includes(mimeType(header))) {
                    e.target.value = "";
                    alert("Invalid file. Only jpg, png files allowed!")
                }
            });
        });
    }
})()
