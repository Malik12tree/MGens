// let deci = 5;
// function generateVoxel(res, size) {
//     let cube = [];
//     for(let w = 0; w < res; w++) {         //width
//         for(let h = 0; h < res; h++) {         //height
//             for(let l = 0; l < res; l++) {         //length
//                 cube.push({x: ((size/ (res-1)) * w).toFixed(deci) * 1, y: ((size/ (res-1)) * h).toFixed(deci) * 1, z: ((size/ (res-1)) * l).toFixed(deci) * 1});
                
//             }
            
//         }

//     }
//     return cube;
// }

var holoCol = document.getElementById('holoCol');
// let Voxelcmds = "";
let Mcmds = "";
// function hexToRgb(hex) {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//       r: parseInt(result[1], 16),
//       g: parseInt(result[2], 16),
//       b: parseInt(result[3], 16)
//     } : null;
// }

var size = document.getElementById('scaleRange');
let voxelCol;
let Prtclsize = size.value * 6;
let scaleT = 100;
function download() {
    Prtclsize = (size.value * 6) / 100;
    // Voxelcmds = "";
    Mcmds = "#file generated with malik12tree's";
    // let voxel = generateVoxel(holders.res, size.value);
    
    // voxel.forEach(vertex => {
    //     Voxelcmds+= `particle dust ${(hexToRgb(holoCol.value).r / 255).toFixed(3) * 1} ${(hexToRgb(holoCol.value).g / 255).toFixed(3) * 1} ${(hexToRgb(holoCol.value).b / 255).toFixed(3) * 1} .1 ^${vertex.x} ^${vertex.y} ^${vertex.z} 0 0 0 0 1\n`
    // });

    voxels.voxels.forEach(voxel =>{
        voxelCol = voxels.palette[voxel.colorIndex];

        Mcmds+= `execute positioned ^${(voxel.x * (size.value / scaleT)).toFixed(3)} ^${(voxel.z * (size.value / scaleT)).toFixed(3)} ^${(voxel.y * (size.value / scaleT)).toFixed(3)} run particle dust ${(voxelCol.r / 255).toFixed(3) * 1} ${(voxelCol.g / 255).toFixed(3) * 1} ${(voxelCol.b / 255).toFixed(3) * 1} ${Prtclsize.toFixed(3)} ~ ~ ~ 0 0 0 0 1\n`
    });

    //particle dust ${(hexToRgb(holoCol.value).r / 255).toFixed(3) * 1} ${(hexToRgb(holoCol.value).g / 255).toFixed(3) * 1} ${(hexToRgb(holoCol.value).b / 255).toFixed(3) * 1} 1 ~ ~ ~ 0 0 0 0 1\n
    
    //function vox:voxel
    // zip.file("voxel.mcfunction", Voxelcmds);
    var file = new Blob([Mcmds], {type: "text/plain;charset=utf-8"});
    saveAs(file, "vox-particles.mcfunction");
};


let voxels;
var upload = document.getElementById('upload');
var uploadBtn = document.getElementById('upload-btn');
upload.addEventListener("change", function () {
    if(upload.value){
        if(upload.files[0].name.endsWith('.vox')) {
            //Error! Invalid file type, or voxels are outside the bounding limit
            parseVoxels();
            uploadBtn.innerHTML = upload.files[0].name
        } else {
            errorUpload("Error! Invalid file type");
        }
    } else {
        uploadBtn.innerHTML = "Upload .vox";
    }
});
function errorUpload(message) {
    // alert(message);
    upload.value = "";
    uploadBtn.innerHTML = "Upload .vox";
}
function parseVoxels() {
    const reader = new FileReader();
    reader.onload = function (){
     vox.Parser.prototype.parseUint8Array(new Uint8Array(reader.result), function(er, data) {
        if (er) {
            errorUpload(`${er}`);
            throw er;
        };
        
        voxels = data;
     });
 }

    reader.readAsArrayBuffer(upload.files[0]);
}

function animate() {
    requestAnimationFrame(animate);    
    document.querySelectorAll(`input[type="color"]`).forEach(coloInp =>{
        coloInp.style.border = `3px solid ${coloInp.value}`;
    })
}
animate();