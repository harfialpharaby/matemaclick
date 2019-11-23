function show() {
    // Get the modal
    let modal = document.getElementById("insModal");

    // open the modal 
    modal.style.display = "block";

    // close modal when user clicks on it
    modal.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal && modal.style.display === 'block') {
            modal.style.display = "none";
        }
    }
}