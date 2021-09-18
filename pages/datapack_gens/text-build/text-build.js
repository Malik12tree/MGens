function discord() {
    window.open('https://discord.gg/N5R8Gg7N7r','_blank');
}
 var cs_range = document.getElementById('cs_range');
 var cs_value = document.getElementById('cs_value');
 var cpf_range = document.getElementById('cpf_range');
 var cpf_value = document.getElementById('cpf_value');
 var delay_range = document.getElementById('delay-range');
 var delay_value = document.getElementById('delay-value');
let delay = delay_value.value * 1;
// var typewrite_cb = document.getElementById('typewriter');
// var typewrite_sec = document.getElementById('typewriter-sec');

var block_id = document.getElementById('block-id');
// typewrite_cb.addEventListener("change", function () {
//     if (typewrite_cb.checked === true) {
//         typewrite_sec.style.display = "block";
//     } else{
//         typewrite_sec.style.display = null;
//     }
// })

 cs_value.value = cs_range.value
 cs_range.oninput = function(){
     cs_value.value = cs_range.value
 }

 cs_range.value = cs_value.value
 cs_value.oninput = function(){
     cs_range.value = cs_value.value
 }

 cpf_value.value = cpf_range.value
 cpf_range.oninput = function(){
     cpf_value.value = cpf_range.value
 }
 
 cpf_range.value = cpf_value.value
 cpf_value.oninput = function(){
     cpf_range.value = cpf_value.value
 }

 delay_value.value = delay_range.value
 delay_range.oninput = function(){
    delay_value.value = delay_range.value
    delay = delay_value.value * 1;
 }
 
 delay_range.value = delay_value.value
 delay_value.oninput = function(){
    delay_range.value = delay_value.value
    delay = delay_value.value * 1;
 }


//setup
var text_inp = document.getElementById('text-inp');
let chars = []
let char_file = undefined;
let fake_player = undefined;
let chars_j = undefined;

let commands = "";
let anim_commands = "";


fetch('characters.json')
  .then(response => response.json())
  .then(jsonResponse => chars_j = (jsonResponse))
  .then(e => console.log(""));

  

//


function log() {
    console.log(chars)
}
text_inp.oninput = function () {
    chars = [];
    for (let a = 0; a < text_inp.value.length; a++) {
        chars.push(text_inp.value[a]);
        // chars.push((text_inp.value[a] + `/fill ~ ~ ~ ~ ~ ~ minecraft:stone`).split( '/' ));
    }
}


function download() {
    if (chars.length == 0) {
        chars = ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!"]
        for (let z = 0; z < text_inp.value.length; z++) {
            chars.push(text_inp.value[z]);
        }
    }
    var zip = new JSZip();
    // if (typewrite_cb.checked === true) {
    //     download_tw(zip);
    // } else{
    //      download_raw(zip);
    // }
       
    download_tw(zip);
    zip.generateAsync({type:"blob"}).then(function(content) {
        // see FileSaver.js
        saveAs(content, "Text-Build-Datapack.zip");
    });
}

// function download_raw(zip) {
//     for (let q = 0; q < chars.length; q++) {
//         for (let w = 0; w < chars_j[chars[q]].length; w+=2) {
//             chars_j[chars[q]][w+1] = ` ${block_id.value}\n`
//         }
//         commands+= chars_j[chars[q]] + "\n"
//     }
//     zip.file("text-build.mcfunction", commands);
    
//     commands = "";
// }
let textinfo = "";
function download_tw(zip) {
    var cpf = chars.length / cpf_range.value;

   zip.file("pack.mcmeta", `{\n    "pack": {\n        "description": "Text Build",\n        "pack_format": 6\n    }\n}\n`);
   var data = zip.folder("data");

   //name space folder
   var tb = data.folder("tb");
   var fn_tb = tb.folder("functions");
   var chars_f = fn_tb.folder("letters");
   if (global.checked === true) {
    fake_player = "$" + (Math.random() * 3000).toFixed()
   } else{
       fake_player = "@s"
   }
   if (text_inp.value === "") {
    textinfo = "Hello World!";
   } else{
    textinfo = text_inp.value
   }
   var start_f = fn_tb.file("start.mcfunction", `#file generated with Malik12tree's Text-Build.\n#Text: ${textinfo}\nscoreboard objectives add m_tb dummy\nfunction tb:animate\nscoreboard players add ${fake_player} m_tb 1\nexecute if score ${fake_player} m_tb matches ${((chars.length * delay) - delay) / cpf_range.value}.. run scoreboard players set ${fake_player} m_tb 0`)

   //letters
   anim_commands = ""
   for (let i = 0; i < chars.length; i++) {
    for (let f = 0; f < chars_j["charss"][chars[i]].length; f+=2) {
        chars_j["charss"][chars[i]][f+1] = `${block_id.value}\n`
    }
    all=""
    for (let k = 0; k < chars_j["charss"][chars[i]].length; k++) {
        all+= chars_j["charss"][chars[i]][k]
        
    }
    char_file = chars_f.file(`${chars_j["names"][chars[i]]}` + ".mcfunction", all);
    
        anim_commands+= `execute if score ${fake_player} m_tb matches ${Math.trunc((((cpf - 1) * i) + i) / chars.length) * delay} positioned ^ ^ ^${-((7 + (cs_value.value * 1)) * i)} run function tb:letters/${chars_j["names"][chars[i]]}\n`
    
    //((chars_j["size"][chars[i]] * i) + (chars_j["size"][chars[i - 1]] * i) / 10) - chars_j["size"][chars[0]]


    }
    var animate_f = fn_tb.file("animate.mcfunction", anim_commands)
}
/*
╔╦╗
╠╩╣
║╔╝
╚╬╗
 ╚╝
 -
*/

function animate() {
    requestAnimationFrame(animate);

    cpf_range.max = chars.length
    cpf_value.max = chars.length
}
animate();
