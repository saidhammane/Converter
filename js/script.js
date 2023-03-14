const fileInput = document.getElementById('file-input');
const inputFormat = document.getElementById('input-format');
const outputFormat = document.getElementById('output-format');
const convertButton = document.getElementById('convert-button');
const inputImage = document.getElementById('input-image');
const outputImage = document.getElementById('output-image');

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        inputImage.src = reader.result;
    };
    reader.readAsDataURL(file);
});

convertButton.addEventListener('click', () => {
    const jimpImage = Jimp.read(inputImage.src);
    const outputFormatValue = outputFormat.value;
    const outputFileName = 'output.' + outputFormatValue;
    jimpImage.then(image => {
        image.getBase64Async(image.getMIME())
            .then(base64 => {
                const outputImageElement = document.createElement('img');
                outputImageElement.src = base64;
                outputImage.src = outputImageElement.src;
                download(outputFileName, base64, outputFormatValue);
            })
            .catch(err => {
                console.log(err);
            });
    });
});


function download(filename, dataUrl, format) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl.replace('image/' + inputFormat.value, 'image/' + format);
    link.click();
}