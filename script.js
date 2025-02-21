$(document).ready(function() {
    $('#qr-login-btn').click(function() {
        $('#video').show(); 
        startQRScanner(); 
    });


    function startQRScanner() {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
                requestAnimationFrame(scanQRCode);
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
            });

        function scanQRCode() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);

                if (code) {
                    if (code.data === 'https://qr.me-qr.com/C5KluulN') { 
                        alert("QR Code valid! Mengarahkan ke dashboard...");
                        window.location.href = "dashboard.html"; 
                    } else {
                        alert("QR Code tidak valid!");
                    }
                }
            }
            requestAnimationFrame(scanQRCode);
        }
    }
});