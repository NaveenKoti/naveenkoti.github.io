


//Display the css background
function load(){
    showLoader();
    /*var pathName = window.location.pathname.split('/');
    if(pathName[pathName.length-1].indexOf('.html') == -1){
        loadProfile(pathName[pathName.length-1]);
    }else{
        loadProfile('404');
    }*/
    loadProfile('nvnkoti');
}


function loadGraphics() {
    if (!navigator.userAgent.match(/Android|BlackBerry|BB10|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
        showLoader();
        if (document.getElementById('displayCanvas')) {
            document.getElementById('displayCanvas').style.display = "";
        }
        var scripts = [
            'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js',
            'code.js'
        ];

        scripts.forEach(function (url) {
            let script = document.createElement('script');
            script.src = url;
            script.async = false;
            document.body.appendChild(script);
        });
        setTimeout(function () {
            canvasApp();
            hideLoader();
        }, 800);
    }
}

function showLoader() {
    if (document.getElementById('loader-loading')) {
        document.getElementById('loader-loading').style.display = "";
    }
}

function hideLoader() {
    if (document.getElementById('loader-loading')) {
        document.getElementById('loader-loading').style.display = "none";
    }
}

function loadProfile(profileName){
    //get the details
    var profileObjectKeys = Object.keys(userData);
    var objectTraverse;
    if(profileObjectKeys.indexOf(profileName) > -1){
        objectTraverse = userData[profileName];
    }else{
        objectTraverse = userData['404'];
    }

    document.title = objectTraverse["user"]["name"];

    for(var i in objectTraverse.user){
        if(i){
            if(i == "imageSrc"){
                document.getElementById('imageSrc').src = objectTraverse.user[i];
            }else{
                document.getElementById(i).innerText = objectTraverse.user[i];
            }  
        }
    }
    for(var j in objectTraverse.socialLinks){
        if(j){
            document.getElementById(j).children[0].classList.add(objectTraverse.socialLinks[j]['css']); 
            document.getElementById(j).href = objectTraverse.socialLinks[j]['url']; 
        }
    }

    if(objectTraverse.otherLinks && Object.keys(objectTraverse.otherLinks).length > 0){
        for(var k in objectTraverse.otherLinks){
            if(k){
                var node = document.createElement("LI");
                node.innerHTML = '<a class="anchor-color" href="'+ objectTraverse.otherLinks[k] +'">'+ k +'</a>';
                document.getElementById("otherLinks").appendChild(node);
            }
        } 
    }else{
        document.getElementById('additional-links').style.display = "none";
        document.getElementById('social-links').style.paddingBottom = "30px";
    }
    if(profileName == 'nvnkoti'){
        loadGraphics();
    }
    hideLoader();
}
