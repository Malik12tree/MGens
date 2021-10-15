var audioE = document.createElement('audio');
audioE.src = "Loud Minecraft Anvil  Sound Effect.mp3";
let bufferLength;
let dataArray;
let dataAvg = 0;

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioCtx.createAnalyser();
//play / ready
let source;
let ones = {
    p: 0
};
/*
Timeline.keyframes[1].data_points[0].y
let kf = new Keyframe({
    channel, time,
    data_points: [{x: 2, y: 0, z:0}]         
});
*/
function startBake() {
    audioCtx.resume();
    if (ones.p === 0) {
        source = audioCtx.createMediaElementSource(audioE);
    }
    ones.p++
    
    
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    analyser.fftSize = 2048;  
    bufferLength = analyser.frequencyBinCount;
    // audioE.src = "./Nyan Cat [original].mp3"
    audioE.play();
    bake(analyser);   
}
function bake(test) {
        dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < dataArray.length; i++) {
            dataAvg+= dataArray[i]; 
        }
    
        dataAvg = (dataAvg / dataArray.length).toFixed(4) * 1;
        console.log(dataAvg);
        if (!audioE.paused) {
            // requestAnimationFrame(bake);
            requestAnimationFrame(function() {
                bake(test)
            });
        }
}