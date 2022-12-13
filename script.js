(function() {

    let width = 1920;
    let height = 1440;

    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let photo = document.getElementById('photo');
    let takePhoto = document.getElementById('take-photo-button');
    let cameraButton =  document.getElementById('camera-button');
    let downloadButton =  document.getElementById('download-btn');
    let shutterSound = new Audio('./camera-shutter.mp3');

    function startUp() {
        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occurred: " + err);
            });

        clearPhoto();
    }

    function clearPhoto() {
        let context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        let data = canvas.toDataURL('image/jpeg');
        photo.setAttribute('src', data);
    }

    function takePicture() {
        let context = canvas.getContext('2d');
        
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            let data = canvas.toDataURL('image/jpeg');
            photo.setAttribute('src', data);
        } else {
            clearPhoto();
        }
    }

    function turnOff() {
        video.srcObject.getVideoTracks().forEach((track) => track.stop());
        video.srcObject = null;
        clearPhoto();
    }

    takePhoto.addEventListener('click', function(ev) {
        shutterSound.play();
        takePicture();
        ev.preventDefault();
    }, false);
    
    downloadButton.addEventListener('click', () => {
        const imageLink = document.createElement('a');
        
        imageLink.download = 'image.jpeg';
        imageLink.href = canvas.toDataURL('image/jpeg');
        imageLink.click();
    })

    cameraButton.addEventListener('click', () => {
        if(cameraButton.innerHTML == 'Turn on') {
            cameraButton.innerHTML = 'Turn off';
            startUp();
        } else {
            cameraButton.innerHTML = 'Turn on';
            turnOff();
        }
    });
})();