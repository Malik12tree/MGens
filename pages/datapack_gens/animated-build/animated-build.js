function discord() {
    window.open('https://discord.gg/N5R8Gg7N7r','_blank');
}
var upload = document.getElementById('upload');
var delay = document.getElementById('delay');
var placeType = document.getElementById('placeType');

var bpf_range = document.getElementById('bpf-range');
var bpf_value = document.getElementById('bpf-value');

var global = document.getElementById('global');

bpf_range.oninput = function () {
    bpf_value.value = bpf_range.value
}
bpf_value.oninput = function () {
    bpf_range.value = bpf_value.value
}

let datapack = {
    scoreboard: "m_anim_build",
    namespace: "m_anim_b",
    player: "@s",
}

let data;
let nbtParsed = {
    blocks: [],
    palette: []
};

let cords = ""

let block_prop = {
    // As Block
    BlockState:{
        Name:"minecraft:stone",
        Properties:{
            // <== Block States Pushed Here
        }
    },
    // As Entity
    NoGravity: "1b",
    Time: -20000,
    DropItem: 0 + "b",
    HurtEntities: 0 + "b",
    Motion: [1.0,1.0,1.0], // <== Based on pos
};

let q = 0;
let ST = 1;
function toggle_time(id, after, before) {
    q++
    if (q === 1) {
        document.getElementById(id).innerHTML = after;
        ST = 20
    } else{
        document.getElementById(id).innerHTML = before;
        ST = 1;
        q = 0;
    }
}

let maxBlocks = 0;
//  nbtParsed.palette[nbtParsed.blocks[0].state.value]; <======= use to get block
upload.addEventListener('change', () => {
    if (upload.value) {
        const reader = new FileReader();
        reader.onload = function () {
            // data = reader.result
            data = pako.ungzip(reader.result);
            document.getElementById('upload-btn').innerHTML = upload.files[0].name
            nbt.parse(data, function(error, data) {
                if (error) { throw error; }
                nbtParsed.blocks = data.value.blocks.value.value;
                nbtParsed.palette = data.value.palette.value.value;
            });
            maxBlocks = 0;
            for (let i = 0; i < nbtParsed.blocks.length; i++) {
                block_prop.BlockState.Name = nbtParsed.palette[nbtParsed.blocks[i].state.value].Name.value        
                if (block_prop.BlockState.Name !== "minecraft:air") {
                    maxBlocks++
                }
            }
            bpf_range.max = maxBlocks
            bpf_value.max = maxBlocks
        
        }
        reader.readAsArrayBuffer(upload.files[0])
    } else{
        document.getElementById('upload-btn').innerHTML = "Upload Structure"
    }
});

///summon falling_block ~ ~ ~ {BlockState:{Name:"minecraft:fire",Properties:{up:"false"}},NoGravity:1b,Time:-20000,DropItem:0b,HurtEntities:0b,Motion:[1.0,1.0,1.0]}

let anim_commands = "";
let nbts = ""; 
let states = "";
let statesArr = [];
let nbtsArr = [];
let bpf = 0;
let Fixair = 0;
let dela = 0;
function download() {
    dela = delay.value * ST;
    Fixair = 0;
    bpf = maxBlocks / bpf_range.value;
    if (global.checked) {
        datapack.player = "$" +( Math.random() * 3000).toFixed();
    } else{
        datapack.player = "@s"
    }
    anim_commands = "";
    var zip = new JSZip();
    for (let i = 0; i < nbtParsed.blocks.length; i++) {
        //nbtParsed.palette[nbtParsed.blocks[0].state.value].Properties.value
        if (nbtParsed.palette[nbtParsed.blocks[i].state.value].Properties) {
            block_prop.BlockState.Properties = nbtParsed.palette[nbtParsed.blocks[i].state.value].Properties.value;
        }

        block_prop.BlockState.Name = nbtParsed.palette[nbtParsed.blocks[i].state.value].Name.value
        cords = `^${(nbtParsed.blocks[i].pos.value.value[0])} ^${(nbtParsed.blocks[i].pos.value.value[1])} ^${(nbtParsed.blocks[i].pos.value.value[2])}`;
        
        states = "";
        nbts = "";  
        // console.log(Object.keys(nbtParsed.palette[nbtParsed.blocks[9038].state.value].Properties.value))
        if (block_prop.BlockState.Name !== "minecraft:air") {
            //block states
            if (nbtParsed.palette[nbtParsed.blocks[i].state.value].Properties) {
                statesArr = Object.keys(nbtParsed.palette[nbtParsed.blocks[i].state.value].Properties.value);
                for (let l = 0; l < statesArr.length; l++) {
                    states+= `${statesArr[l]}=${nbtParsed.palette[nbtParsed.blocks[i].state.value].Properties.value[statesArr[l]].value},`;
                }
            }
            //
            anim_commands += `execute if score ${datapack.player} ${datapack.scoreboard} matches ${(Math.trunc((((bpf - 1) * Fixair) + Fixair) / maxBlocks) * dela)} run setblock ${cords} ${block_prop.BlockState.Name}[${states}] ${placeType.value}\n`;
            Fixair++
            //{${nbts.replace(/"([^"]+)":/g, '$1:')}}
        };
    }
    //cubic-bezier(0.7,-0.46, 0.36, 1);
    zip.file("pack.mcmeta", `{\n    "pack": {\n        "description": "Animated Build",\n        "pack_format": 6\n    }\n}\n`);
    zip.file([`data/${datapack.namespace}/functions/anim.mcfunction`], anim_commands);

    zip.file([`data/${datapack.namespace}/functions/start.mcfunction`], `#file generated with Malik12tree's Animated-Build.\nscoreboard objectives add ${datapack.scoreboard} dummy\nfunction ${datapack.namespace}:anim\nscoreboard players add ${datapack.player} ${datapack.scoreboard} 1\nexecute if score ${datapack.player} ${datapack.scoreboard} matches ${(Math.trunc((((bpf - 1) * maxBlocks) + maxBlocks) / maxBlocks) * dela) + 1}.. run scoreboard players set ${datapack.player} ${datapack.scoreboard} 0`);

    // nbtParsed.palette[nbtParsed.blocks[i].state.value].Name.value
    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "Animated-Build.zip");
      });
};
// var sortedArray;
function animate() {
    requestAnimationFrame(animate);
    document.getElementById('countB').innerHTML = maxBlocks + ")";

    // sortedArray = nbtParsed.blocks.sort(function(a, b) {
    //     return a.pos.value.value[2] - b.pos.value.value[2];
    //   });

}
animate();