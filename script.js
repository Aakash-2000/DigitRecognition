let canvas = document.getElementById("canvas");
canvas.height = 300;
canvas.width = 300;
let drawing = false;
let ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
window.addEventListener("load",()=>{
    loadModel()
})
function start(e){
    drawing = true;
    draw(e);
}
let classes = ["0","1","2","3","4","5","6","7","8","9"]
function prediction(){
    html2canvas(document.getElementById("canvas")).then(function(image){

        
       
    
    let tensor  = preprocessCanvas(document.getElementById("canvas"));
    
    let predictions =  model.predict(tensor).data()
    predictions.then(function(res){
        let results = Array.from(res);
        console.log(results)
        ans = classes[results.indexOf(Math.max(...results))]
        document.getElementById("result").innerHTML = String(ans)
    
    })
        
    
    
    
    
})

    
}
async function loadModel() {
    
    model = undefined; 
    
    model = await tf.loadLayersModel("models/model.json");
    console.log("model")
}
function preprocessCanvas(image){
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();
    return tensor.div(255.0)
   
}

function stop(){
    drawing = false;
    prediction();
    ctx.beginPath();
    
}
function draw(e){
    if (!drawing){
        return
    }
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX,e.clientY);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX,e.clientY);


}
canvas.addEventListener("mousedown",start);
canvas.addEventListener("mousemove",draw);
canvas.addEventListener("mouseup",stop)

