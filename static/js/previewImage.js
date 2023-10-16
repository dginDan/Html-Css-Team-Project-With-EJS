document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.querySelector('input[type="file"]');
    const imagePreview = document.getElementById('imagePreview');

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function() {
            imagePreview.src = reader.result;
            imagePreview.style.display = "block";
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});
