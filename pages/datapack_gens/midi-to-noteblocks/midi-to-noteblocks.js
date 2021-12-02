function discord() {
    window.open('https://discord.gg/N5R8Gg7N7r', '_blank');
}
var Idata = {};
var GlobName = "";
fetch("./data.json").then(response => response.json()).then(r => Idata = r);
let results;
var instrument = document.getElementById("instrument");
var upload = document.getElementById("upload");

var initF = document.getElementById("initF");
var mainF = document.getElementById("mainF");
var namespaceF = document.getElementById("namespaceF");
var pathF = document.getElementById("pathF");
var noteLPF = document.getElementById("noteLPF");
var info = document.getElementById("info");


upload.addEventListener("change", function () {
    if (upload.value) {
        const reader = new FileReader()
        reader.onload = function () {
            results = reader.result;
            GlobName = upload.files[0].name;
            info.innerHTML = GlobName;
        }
        reader.readAsArrayBuffer(upload.files[0])
    } else {
        GlobName = "";
        info.innerHTML = "";
    }
})

// one tick = 0.05 seconds
let cmds = "";
let animCmds = "";
let datapack = {
    scoreboard: "m_midi_notes",
    player: "@s",
    namespace: "midi_notes",
    path: ""
}
function download() {
    const midi = new Midi(results);

    // gather
    let TimeNotes = [];
    midi.tracks.forEach((track) => {
        let Iinstrument;
        if (instrument.value === "detect") {
            if (Idata[track.instrument.name] !== undefined) {
                Iinstrument = Idata[track.instrument.name];
            } else {
                if (track.instrument.family === undefined) {
                    Iinstrument = instruments[0]
                } else {
                    Iinstrument = instruments[track.instrument.family]
                }
            }
        } else {
            Iinstrument = instrument.value;
        }
        track.notes.forEach(note => {
            const fixedTime = SecondToTick(note.time);
            const indexT = TimeNotes.findIndex(n => n[0].time === fixedTime);
            if (indexT !== -1) {
                if (TimeNotes[indexT].length < noteLPF.value * 1) {
                    TimeNotes[indexT].push({/*time: fixedTime,*/ pitch: (note.pitch).toUpperCase(), octave: note.octave, velocity: note.velocity, "instrument": Iinstrument })
                }
            } else {
                TimeNotes.push([{ time: fixedTime, pitch: (note.pitch).toUpperCase(), octave: note.octave, velocity: note.velocity, "instrument": Iinstrument }])
            }
        });

    });
    // Conversion
    asDP(TimeNotes);
}

// Pitches - IDs
var notes = {
    octave1: {
        "C":  [0.707107, 6],
        "D":  [0.793701, 8],
        "E":  [0.890899, 10],
        "F":  [0.943874, 11],
        "G":  [0.529732, 1],
        "A":  [0.594604, 3],
        "B":  [0.667420, 5],
        "C#": [0.749154, 7],
        "D#": [0.840896, 9],
        "F#": [0.5,      0],
        "G#": [0.561231, 2],
        "A#": [0.629961, 4],
    },
    octave2: {
        "C":  [1.414214, 18],
        "D":  [1.587401, 20],
        "E":  [1.781797, 22],
        "F":  [1.887749, 23],
        "G":  [1.059463, 13],
        "A":  [1.122462, 15],
        "B":  [1.334840, 17],
        "C#": [1.498307, 19],
        "D#": [1.681793, 21],
        "F#": [1.0,      12],
        "G#": [1.122462, 14],
        "A#": [1.259921, 16],
    }
}
// "used" are just some markers.
var mcinstruments = [
    "block.note_block.harp",            // paino                        Paino                   //used
    "block.note_block.bass",            // bass (string)                Strings
    "block.note_block.banjo",           // banjo                        world / Ethnic
    "block.note_block.basedrum",        // bass drum (kick)             Percussive              //used
    "block.note_block.bell",            // bells                        Percussive
    "block.note_block.bit",             // "bit" (square wave)          Synth Lead
    "block.note_block.chime",           // chimes                       Chromatic Percussion    //used
    "block.note_block.cow_bell",        // cow bell                     Chromatic Percussion
    "block.note_block.didgeridoo",      // didgerido                    Reed
    "block.note_block.flute",           // flute                        Pipe
    "block.note_block.guitar",          // guitar                       Guitar
    "block.note_block.hat",             // clicks and sticks (hihat)    Percussive 
    "block.note_block.iron_xylophone",  // iron xylophone               Chromatic Percussion
    "block.note_block.pling",           // "pling" (electric piano)     Paino
    "block.note_block.snare",           // snare drum                   Percussive
    "block.note_block.xylophone",       // xylophone                    Chromatic Percussion
]
var mcinstruments2 = {
    "block.note_block.harp":            "",            
    "block.note_block.bass":            "oak_wood",            
    "block.note_block.banjo":           "hay_block",           
    "block.note_block.basedrum":        "stone",        
    "block.note_block.bell":            "gold_block",            
    "block.note_block.bit":             "emerald_block",             
    "block.note_block.chime":           "packed_ice",           
    "block.note_block.cow_bell":        "soul_sand",        
    "block.note_block.didgeridoo":      "pumpkin",      
    "block.note_block.flute":           "clay",           
    "block.note_block.guitar":          "red_wool",          
    "block.note_block.hat":             "glass",             
    "block.note_block.iron_xylophone":  "iron_block",  
    "block.note_block.pling":           "glowstone",           
    "block.note_block.snare":           "sand",           
    "block.note_block.xylophone":       "bone_block"
}
// using closet stuff for non used in mc
var instruments = {"piano": "block.note_block.harp","chromatic percussion": "block.note_block.chime","organ": "block.note_block.pling","guitar": "block.note_block.guitar","bass": "block.note_block.basedrum","strings": "block.note_block.bass","ensemble": "block.note_block.harp","brass": "block.note_block.didgeridoo","reed": "block.note_block.didgeridoo","pipe": "block.note_block.flute","synth lead": "block.note_block.bit","synth pad": "block.note_block.cow_bell","synth effects": "block.note_block.harp","world": "block.note_block.banjo","percussive": "block.note_block.bell","sound effects": "block.note_block.chime","drums": "block.note_block.snare"}

var ytBTN = document.getElementById("ytBTN");
// ytBTN.addEventListener("mouseenter", function () {
//     ytBTN.innerHTML = "Coming Soon.." // 11
// })
// ytBTN.addEventListener("mouseleave", function () {
//     ytBTN.innerHTML = "Youtube Video" //13
// })
ytBTN.onclick = function() {
    window.open('https://www.youtube.com/watch?v=LkbWjaBgj0U', "_blank")
}


function genCMD(n) {
    return `playsound ${n.instrument} master @s ~ ~ ~ ${(n.velocity * 1).toFixed(6) * 1} ${notes[`octave${limitf(n.octave, 1, 2)}`][n.pitch][0]}\n`
}
const limitf = function (x, min, max) {
    const evenNum = x % 2 === 0
    if (evenNum) {
        return 2;
    }
    if (!evenNum) {
        return 1;
    }
    return x;
}
const roundedD = .05;
const roundDecimal = function (x) {
    const d = (x % 1).toFixed(4) * 1;
    if (d < roundedD) {
        return Math.trunc(x);
    }
    if (d >= roundedD) {
        return Math.trunc(x) + 1;
    }

}
const SecondToTick = function (tick) {
    return roundDecimal(tick / .05)
}

function asDP(TimeNotes) {
    info.innerHTML = GlobName + " | processing..."
    datapack.namespace = namespaceF.value;
    datapack.path = pathF.value;
    const path = "data/" + datapack.namespace + "/" + (datapack.path !== "" ? datapack.path + "/" : "");
    var zip = new JSZip();
    animCmds = "";
    
    zip.file("pack.mcmeta", `{\n    "pack": {\n        "description": "Midi Notes",\n        "pack_format": 7\n    }\n}\n`);
    TimeNotes.forEach((noteT, index) => {
        cmds = "";
        noteT.forEach(n => {
            cmds += genCMD(n)
        });
        animCmds += `execute if score ${datapack.player} ${datapack.scoreboard} matches ${noteT[0].time} run function ${datapack.namespace}:notes/time${index}\n`
        zip.file(`${path}functions/notes/time${index}.mcfunction`, cmds)
    });

    zip.file(`${path}functions/anim.mcfunction`, animCmds)
    // if (TimeNotes[TimeNotes.length-1]) {}
    zip.file(`${path}functions/start.mcfunction`, "#File Generated With Malik12tree's Midi To NoteBlock Notes.\n" + `scoreboard players remove ${datapack.player} m_midi_timer 1\nscoreboard players add ${datapack.player} ${datapack.scoreboard} 0\nexecute unless score ${datapack.player} ${datapack.scoreboard} matches ${TimeNotes[TimeNotes.length - 1][0].time}.. run function ${datapack.namespace}:${datapack.path !== "" ? datapack.path + "/" : ""}anim\nscoreboard players add ${datapack.player} ${datapack.scoreboard} 1\nexecute if score ${datapack.player} ${datapack.scoreboard} matches ${TimeNotes[TimeNotes.length - 1][0].time}.. run scoreboard players set ${datapack.player} ${datapack.scoreboard} 0`);
    // init
    zip.file(`${path}functions/${initF.value}.mcfunction`, `scoreboard objectives add ${datapack.scoreboard} dummy\nscoreboard objectives add m_midi_timer dummy\nscoreboard objectives add m_mpaused dummy`);

    // functionality
    zip.file(`${path}functions/play.mcfunction`, `function ${datapack.namespace}:${datapack.path !== "" ? datapack.path + "/" : ""}resume\nscoreboard players set @s m_midi_timer ${TimeNotes[TimeNotes.length - 1][0].time}`);
    zip.file(`${path}functions/pause.mcfunction`, `scoreboard players set @s m_mpaused 1`);
    zip.file(`${path}functions/resume.mcfunction`, `scoreboard players set @s m_mpaused 0`);
    zip.file(`${path}functions/stop.mcfunction`, `scoreboard players set @s m_midi_timer 0\nscoreboard players set @s ${datapack.scoreboard} 0`);

    // tags
    zip.file(`data/minecraft/tags/functions/load.json`, `{\n    "values": [\n       "${datapack.namespace}:${datapack.path !== "" ? datapack.path + "/" : ""}${initF.value}"\n   ]\n}`);
    zip.file(`data/minecraft/tags/functions/tick.json`, `{\n    "values": [\n       "${datapack.namespace}:${datapack.path !== "" ? datapack.path + "/" : ""}${mainF.value}"\n   ]\n}`);
    // main
    zip.file(`${path}functions/${mainF.value}.mcfunction`, `execute as @a[scores={m_midi_timer=1.., m_mpaused=..0}] at @s run function ${datapack.namespace}:${datapack.path !== "" ? datapack.path + "/" : ""}start`);

    zip.generateAsync({ type: "blob" }).then(function (content) {
        info.innerHTML = GlobName + " | downloading..."
        saveAs(content, "notes.zip");
    });
}
