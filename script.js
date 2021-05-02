window.onload = function(){
    console.log('adssd');
    var arrayWords = ["dreamer.", "adventurer.", "sweet-toothed."];
    setInterval(function(e){
        var x = arrayWords[Math.floor(Math.random() * arrayWords.length)];
        document.getElementById('taglines').textContent = x;
    },1000);
}

