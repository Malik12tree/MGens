if(location.href === 'https://malik12tree.github.io/index.html'){
    location.href = "https://malik12tree.github.io"
}
function discord() {
    window.open('https://discord.gg/N5R8Gg7N7r','_blank');
}
function p() {
    location.href = "pages/datapack_gens/particle-draw/particle-draw.html";
}
function t() {
    location.href = "pages/datapack_gens/text-build/text-build.html";
}
function ab() {
    location.href = "pages/datapack_gens/animated-build/animated-build.html";
}

let obj = {};
let chain = {
    a: "",
}
let cmd ={
    id: "command_block_minecart",
    command: "say hi"
}
let objJson;
function passe(numberOF) {
    chain = {
        a: "",
    }
    for (let i = 0; i < numberOF * 1; i++) {
        if (i === 0) {
            chain.a+= ".Passengers";
            eval(`obj${chain.a} = [{}]`);
            eval(`obj${chain.a + "[0].id"} = "${cmd.id}" `);
            eval(`obj${chain.a + "[0].Command"} = "${cmd.command}"`);
    
        } else{
            chain.a+= "[0].Passengers";
            eval(`obj${chain.a} = [{}]`);
            eval(`obj${chain.a + "[0].id"} = "${cmd.id}" `);
            eval(`obj${chain.a + "[0].Command"} = "${cmd.command}"`);
        }
    }
    objJson = JSON.stringify(obj, null, 0).replace(/"([^"]+)":/g, '$1:');
    console.log(`summon ${cmd.id} ~ ~ ~` + objJson);
}


