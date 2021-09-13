




function discord() {
    window.open('https://discord.gg/N5R8Gg7N7r','_blank');
}
var s_range = document.getElementById('s-range');
var s_value = document.getElementById('s-value');
var c_range = document.getElementById('c-range');
var c_value = document.getElementById('c-value');
var d_range = document.getElementById('d-range');
var d_value = document.getElementById('d-value');
var a_range = document.getElementById('a-range');
var a_value = document.getElementById('a-value');
var r_range = document.getElementById('r-range');
var r_value = document.getElementById('r-value');
var cm_range = document.getElementById('cm-range');
var cm_value = document.getElementById('cm-value');
var rm_range = document.getElementById('rm-range');
var rm_value = document.getElementById('rm-value');

s_value.value = s_range.value
s_range.oninput = function(){
  s_value.value = s_range.value
}
s_range.value = s_value.value
s_value.oninput = function(){
  s_range.value = s_value.value
}

c_value.value = c_range.value
c_range.oninput = function(){
  c_value.value = c_range.value
}
c_range.value = c_value.value
c_value.oninput = function(){
  c_range.value = c_value.value
}

d_value.value = d_range.value
d_range.oninput = function(){
  d_value.value = d_range.value
}
d_range.value = d_value.value
d_value.oninput = function(){
  d_range.value = d_value.value
}

a_value.value = a_range.value
a_range.oninput = function(){
  a_value.value = a_range.value
}
a_range.value = a_value.value
a_value.oninput = function(){
  a_range.value = a_value.value
}

r_value.value = r_range.value
r_range.oninput = function(){
  r_value.value = r_range.value
}
r_range.value = r_value.value
r_value.oninput = function(){
  r_range.value = r_value.value
}


cm_value.value = cm_range.value
cm_range.oninput = function(){
  cm_value.value = cm_range.value
}
cm_range.value = cm_value.value
cm_value.oninput = function(){
  cm_range.value = cm_value.value
}

rm_value.value = rm_range.value
rm_range.oninput = function(){
  rm_value.value = rm_range.value
}
rm_range.value = rm_value.value
rm_value.oninput = function(){
  rm_range.value = rm_value.value
}







var main_s = document.getElementById('main-s');
var canvas = document.getElementById('drawing-canvas')
var context = canvas.getContext("2d");
canvas.width = 600
canvas.height = 400






let isDrawing = false;
let isErasing = false;
let isMultiDrawing = false;
let isCircleDrawing = false;

let Brush_selected = true;
let Eraser_selected = false;
let Multi_br_selected = false;
let Circle_br_selected = false;
let x = 0;
let y = 0;
//Brush Settings
let brush_spacing = 0
let brush_radius = 10
let particles = []

let jitterR = 0;
let jitterA = 0;


window.addEventListener("keydown", function(){
  if (event.key == "b"|| event.key == "B") {
    brush_select();
  }
  if (event.key == "e"|| event.key == "E") {
    eraser_select();
  }
  if (event.key == "m"|| event.key == "M") {
    multi_br_select();
  }
  if (event.key == "c"|| event.key == "C") {
    arc_br_select();
  }

})
canvas.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  if (Brush_selected === true) {
    var particle_click = new Particle(x, y, brush_radius, "#0f3a80");
    isDrawing = true;
    isErasing = false;
    particle_click.draw();
    particles.push(particle_click);
    
  } else {
    isDrawing = false
  }

  if (Eraser_selected === true) {
    
    for (let a = 0; a < particles.length; a++) {
      if (getDistance(particles[a].x, particles[a].y, x, y) < brush_radius) {
        particles.splice(a, 1)
      }
    }
    isErasing = true
    isDrawing = false
  } else{
    isErasing = false;
  }

  
  if (Multi_br_selected === true) {
    for (let q = 0; q < cm_range.value; q++) {
      var randomX = (Math.random() - 0.5) * (rm_range.value * 1)
      var randomY = (Math.random() - 0.5) * (rm_range.value * 1)
      var mp_click = new Particle(x + randomX, y + randomY, brush_radius, "#0f3a80");
      mp_click.draw();
      particles.push(mp_click);
      
    }
    isDrawing = false;
    isErasing = false;
    isMultiDrawing = true;

  } else{
    isMultiDrawing = false;
  }
  if (Circle_br_selected === true) {
    // Total circles, Radius size, Distance from center, Color
    circles(c_range.value, brush_radius * 1.5, d_range.value, '#0f3a80', x ,y);
  } else{
    Circle_br_selected = false;
  }


});
canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    x = e.offsetX;
    y = e.offsetY;
    brush_spacing +=1
    if (brush_spacing > s_range.value) {
      brush_spacing = 0;
      var particle_hold = new Particle(x, y, brush_radius, "#0f3a80");
      particle_hold.draw();
      particles.push(particle_hold);
    }
  }
  if (isMultiDrawing === true) {
    x = e.offsetX;
    y = e.offsetY;
    brush_spacing +=1
    if (brush_spacing > s_range.value){
      brush_spacing = 0;
      for (let w = 0; w < cm_range.value; w++) {
        var randomX2 = (Math.random() - 0.5) * (rm_range.value * 1)
        var randomY2 = (Math.random() - 0.5) * (rm_range.value * 1)
        var mp_hold = new Particle(x + randomX2, y + randomY2, brush_radius, "#0f3a80");
        mp_hold.draw();
        particles.push(mp_hold);
        
      }
    }
  }
  if (isErasing == true) {
    x = e.offsetX;
    y = e.offsetY;
    for (let e = 0; e < particles.length; e++) {
      if (getDistance(particles[e].x, particles[e].y, x, y) < brush_radius) {

        particles.splice(e, 1)
      }
    }
    isErasing = true
    isDrawing = false
  }

});

window.addEventListener('mouseup', e => {
    x = 0;
    y = 0;
    isDrawing = false;
    isErasing = false;
    isMultiDrawing = false;
  
});
function getDistance(x1, y1, x2, y2) {
  let Xdistance = x2 - x1
  let Ydistance = y2 - y1

  return Math.sqrt(Math.pow(Xdistance, 2) + Math.pow(Ydistance, 2))
}


function Particle(x, y, brush_radius, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.brush_radius = brush_radius;

  this.update = function(){
    this.draw();
  }
  this.draw = function(){
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.x, this.y, this.brush_radius, 0, 2 * Math.PI);
  context.fill(); 
  }
}

var selected_BGcolor = "rgb(119, 163, 159)"
var selected_border_radius = "7px"

var brush = document.getElementById('brush');
var eraser = document.getElementById('eraser');
var multi_br = document.getElementById('multi-br');
var circle_br = document.getElementById('arc-br');
var clear = document.getElementById('clear');

brush.style.backgroundColor = "rgb(119, 163, 159)"
brush.style.borderRadius = "7px"

function brush_select() {
  Brush_selected = true
  Eraser_selected = false
  Multi_br_selected = false;
  Circle_br_selected = false;
  canvas.style.cursor = "url(../../../assets/Brush.svg) -10 20, move "
  multi_br.style.backgroundColor = null;
  multi_br.style.borderRadius = null;
  brush.style.backgroundColor = selected_BGcolor
  brush.style.borderRadius = selected_border_radius
  eraser.style.backgroundColor = null;
  eraser.style.borderRadius = null;
  clear.style.backgroundColor = null;
  clear.style.borderRadius = null;
  circle_br.style.backgroundColor = null
  circle_br.style.borderRadius = null;
}
function multi_br_select() {
  Brush_selected = false;
  Eraser_selected = false;
  Multi_br_selected = true;
  Circle_br_selected = false;
  canvas.style.cursor = "url(../../../assets/MultiBrush.svg) -10 20, move "
  multi_br.style.backgroundColor = selected_BGcolor;
  multi_br.style.borderRadius = selected_border_radius;
  brush.style.backgroundColor = null;
  brush.style.borderRadius = null;
  eraser.style.backgroundColor = null;
  eraser.style.borderRadius = null;
  clear.style.backgroundColor = null;
  clear.style.borderRadius = null;
  circle_br.style.backgroundColor = null
  circle_br.style.borderRadius = null;
}
function eraser_select() {
  Brush_selected = false
  Eraser_selected = true
  Multi_br_selected = false;
  Circle_br_selected = false;
  canvas.style.cursor = "url(../../../assets/Erase.svg) -10 20, move"
  multi_br.style.backgroundColor = null;
  multi_br.style.borderRadius = null;
  eraser.style.backgroundColor = selected_BGcolor
  eraser.style.borderRadius = selected_border_radius
  brush.style.backgroundColor = null;
  brush.style.borderRadius = null;
  clear.style.backgroundColor = null;
  clear.style.borderRadius = null;
  circle_br.style.backgroundColor = null
  circle_br.style.borderRadius = null;
}
function arc_br_select() {
  Brush_selected = false
  Eraser_selected = false
  Multi_br_selected = false;
  Circle_br_selected = true;
  canvas.style.cursor = "url(../../../assets/CircleBrush.svg) 12.5 12.5, move"
  circle_br.style.backgroundColor = selected_BGcolor
  circle_br.style.borderRadius = selected_border_radius
  multi_br.style.backgroundColor = null;
  multi_br.style.borderRadius = null;
  eraser.style.backgroundColor = null;
  eraser.style.borderRadius = null
  brush.style.backgroundColor = null;
  brush.style.borderRadius = null;
  clear.style.backgroundColor = null;
  clear.style.borderRadius = null;
}
let cleared = false;
function clear_canvas() {
  cleared = true;
  context.clearRect(0, 0, canvas.width, canvas.height);
  particles.splice(0, particles.length + 1);
}




function log() {
  console.log(particles)
}



var animate_cb = document.getElementById('animate');
var anim_settings = document.getElementById('animation-settings');
var anim_type = document.getElementById('anim-type');
var particle_id = document.getElementById('ptcl-id-input');
var particle_end = document.getElementById('ptcl-input');
var ppf_range = document.getElementById('ppf-range');
var ppf_value = document.getElementById('ppf-value');
var global = document.getElementById('global');

ppf_value.value = ppf_range.value
ppf_range.oninput = function(){
  ppf_value.value = ppf_range.value
}

ppf_range.value = ppf_value.value
ppf_value.oninput = function(){
  ppf_range.value = ppf_value.value
}



//not important=>
var exp_settings = document.getElementById('export-settings');
let height_anim = 200
function anim_height() {
  height_anim+=20
  if (height_anim < 310) {
    requestAnimationFrame(anim_height);
    exp_settings.style.height = height_anim + "px"
  } else{
    height_anim = 200
  }
}
//not important^

animate_cb.addEventListener("change", function(){
  if (animate_cb.checked === true) {
    anim_settings.style.display = "block";
    anim_height();
  } else{
    anim_settings.style.display = "none";
    exp_settings.style.height = null
  }
})

//download======================>>>>>>>
let commands = ""
let frame_file_name = ""
let anim_commands = ""
function download() {
  var zip = new JSZip();
  if (animate_cb.checked === true) {
    animated_particles(zip);
  } else{
    raw_particles(zip);
  }
  

  zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
    saveAs(content, "Particle-Draw.zip");
});
}
function raw_particles(zip) {
  for (let k = 0; k < particles.length; k++) {
    commands+= `particle ${particle_id.value} ^ ^${(canvas.height / 2 - particles[k].y) / 10} ^${particles[k].x/10} ${particle_end.value}\n`
  }
   var file = zip.file("Particles.mcfunction", "#File Generated With Malik12tree's Particle Drawer.\n" + commands)
   commands = ""
 }

let player = "";
let frame_id = ""
function animated_particles(zip) {
  var ppf = particles.length / ppf_value.value
  if (global.checked === true) {
    //fake player
    player = "~" + (Math.random() * 3000).toFixed();
  } else{
    //For each player
    player = "@s"
  }
  
  

  //generate basic stuff
  zip.file("pack.mcmeta", `{\n    "pack": {\n        "description": "Custom Hat",\n        "pack_format": 6\n    }\n}\n`);
  var data = zip.folder("data");
  var p = data.folder("p")
  var fn = p.folder("functions")
  var framesf = fn.folder("frames")
  for (let d = 0; d < particles.length; d++) {
    if (anim_type.value === "0-1") {
      frame_id = d
    }
    if (anim_type.value === "1-0") {
      frame_id = particles.length - 1 - d
    }
    
    anim_commands += `execute if score ${player} m_particledraw matches ${Math.trunc((((ppf - 1) * d) + d) / particles.length)} run function p:frames/frame${frame_id}\n`
  }
  var anim = fn.file("anim.mcfunction", anim_commands)
  var start = fn.file("start.mcfunction", "#File Generated With Malik12tree's Particle Drawer.\n" + `scoreboard objectives add m_particledraw dummy\nexecute unless score ${player} m_particledraw matches ${ppf}.. run function p:anim\nscoreboard players add ${player} m_particledraw 1\nexecute if score ${player} m_particledraw matches ${ppf}.. run scoreboard players set ${player} m_particledraw 0`)



  //generate frames
  for (let t = 0; t < particles.length; t++) {
    commands = `particle ${particle_id.value} ^ ^${(canvas.height / 2 - particles[t].y) / 100} ^${particles[t].x/100} ${particle_end.value}\n`
    var file = framesf.file("frame" + t + ".mcfunction", commands)
  }
  commands = ""
  anim_commands = ""
}
// 
// 



var circle_settings = document.getElementById('arc_br_settings')
var preview = document.getElementById('preview');
var preview_switch = document.getElementById('switch-preview');
let previewed = false;
let sort = 255;

anim_type.addEventListener("change", function(){
  if (anim_type.value === "0-1"|| anim_type.value === "1-0") {
    preview.style.display = "block";
  } else{
    preview.style.display = "none";
  }
})
preview_switch.addEventListener("change", function(){
  if (preview_switch.checked === true) {
    previewed = true
  } else{
    previewed = false
  }
})


function animate() {
  requestAnimationFrame(animate);
    context.clearRect(0 ,0 , canvas.width, canvas.height)
    context.strokeStyle = "#000";
    context.beginPath();
    context.moveTo(5, 0);
    context.lineTo(5, canvas.height);
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.stroke();
    context.fillStyle = "#022";
    context.font = "15px sans-serief" ;
    context.fillText("Y+", 10, (canvas.height/2) - 5);
    context.fillText("Y-", 10, (canvas.height/2) + 15);

  
  particles.forEach((partile, index) => {
    partile.color = "#0f3a80"
    if (previewed === true && animate_cb.checked === true && anim_type.value === "0-1"||previewed === true && animate_cb.checked === true && anim_type.value === "1-0") {
    if (anim_type.value === "0-1") {
       partile.color = `rgb(${255 - (index / 2)}%, ${0 + (index / 2)}%, 0%)`
      }
    if (anim_type.value === "1-0") {
       partile.color = `rgb(${0 + index}%, ${255 - index}%, 0%)`
      }
    }
    partile.update()
     
  })
  


  ppf_range.max = particles.length
  ppf_value.max = particles.length


  if (Circle_br_selected === true) {
    circle_settings.style.display = "block";
  } else{
    circle_settings.style.display = null;
  }

  if (Multi_br_selected === true) {
    document.getElementById('mBr-s').style.display = "block";
  } else{
    document.getElementById('mBr-s').style.display = "none";
  }
  
  
}
animate();






const deg2rad = d => d * (Math.PI / 180);
function circles(tot, rad, dist, color, xx, yy) {
  const deg = a_range.value / tot;   // Subdivision in degrees
  let d = r_value.value * 1;               // Start at degree (0=east)

  for (let i = 0; i < tot; i++) {
    x = dist * Math.cos(deg2rad(d)) / 2;
    y = dist * Math.sin(deg2rad(d)) / 2;
    
    var arc_particles = new Particle(x + xx, y + yy, rad / 1.5, color);
    arc_particles.draw();
    particles.push(arc_particles);
    d += deg;
  }
}
// function Dialog(width, height, title) {
//   this.width = width;
//   this.height = height;
//   this.title = title;


//   var dial = document.createElement('Dev');
//   var titl = document.createElement('h3');
//   var title_text = document.createTextNode(this.title);
//   titl.appendChild(title_text);
//   dial.appendChild(titl)
//   //style
//   titl.style.color = "#fff"
//   titl.style.fontWeight = 620
//   titl.style.padding = "10px"
//   titl.style.backgroundColor = "#255"
//   titl.style.borderRadius = "10px"

//   dial.style.width = this.width + "px"
//   dial.style.height = this.height + "px"
//   dial.style.backgroundColor = "#455"
//   dial.style.position = "fixed"
//   dial.style.left = (window.innerWidth / 2) - (this.width / 2) + "px"
//   dial.style.top = (window.innerHeight / 2) - (this.height / 2) + "px"
//   dial.draggable = true
//   dial.style.borderRadius = "10px"
//   //

//   document.getElementById('main-s').appendChild(dial);

// }
// new Dialog(
//   width = 600,
//   height = 400,
//   title = "Example Title",
//   );

function reset() {
  s_range.value = 0;
  s_value.value = 0;
  c_range.value = 22;
  c_value.value = 22;
  d_range.value = 140;
  d_value.value = 140;
  a_range.value = 360;
  a_value.value = 360;
  r_range.value = 0;
  r_value.value = 0;
  cm_range.value = 3;
  cm_value.value = 3;
  rm_range.value = 40;
  rm_value.value = 40;
}

let export_file, exportJson, importJson;

function exportP_f() {
  exportJson = JSON.stringify(particles, null, 2);
  // console.log(exportJson );

  export_file = new Blob([exportJson], {type: "text/plain;charset=utf-8"});
  saveAs(export_file, "particles"+ ".json");
}
var importP_btn = document.getElementById('importP');

function importP_f() {
  importP_btn.value = "";
  importP_btn.click();
}

importP_btn.addEventListener('change', function(){
  if (importP_btn.value) {
    const reader = new FileReader();
    reader.onload = function() {
      // console.log(reader.result)
      importJson = JSON.parse(reader.result);
      for (let i = 0; i < importJson.length; i++) {
        particles.push(new Particle(importJson[i].x, importJson[i].y, importJson[i].brush_radius, importJson[i].color))  
      }
    }
    reader.readAsText(importP_btn.files[0])
  }
})