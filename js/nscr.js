const fileInput = document.getElementById('imageFile');
const imagePreview = document.getElementById('image-preview');

fileInput.addEventListener('change', function() {
  const file = this.files[0];
  
  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', function() {
      imagePreview.setAttribute('src', reader.result);
    },);

    reader.readAsDataURL(file);
  }
});
