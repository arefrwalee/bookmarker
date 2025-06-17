var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var bookmarkContainer = [];

if (localStorage.getItem("bookmark") !== null) {
  bookmarkContainer = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark();
}

// Add Bookmark Function

function addBookmark() {
  if (validationSiteName() && validationSiteUrl()) {
    var bookmark = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    bookmarkContainer.push(bookmark);

    restForm();
    displayBookmark();
    localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
    Swal.fire({
      title: "Good job!",
      text: "Bookmark Added Successfully",
      icon: "success",
    });
  }
}

// Rest Form Function

function restForm() {
  siteNameInput.value = null;
  siteUrlInput.value = null;

  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteUrlInput.classList.remove("is-valid", "is-invalid");
}

// Display bookmark Function

function displayBookmark() {
  var cartona = "";

  for (var i = 0; i < bookmarkContainer.length; i++) {
    cartona += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${bookmarkContainer[i].name}</td>
            <td>
              <button class="btn btn-dark">
             <i class="fa-solid fa-eye"></i> <a href="${
               bookmarkContainer[i].url
             }" target="_blank">Visit</a>
             </button>
            </td>
            <td>
            <button onclick="deleteBookmark(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i> Delete
            </button>
            </td>
          </tr>`;
  }
  document.getElementById("tbody").innerHTML = cartona;
}

// Delete bookmark Function

function deleteBookmark(deletedIndex) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success ",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        bookmarkContainer.splice(deletedIndex, 1);
        displayBookmark();
        localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your Bookmark has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your bookmark is safe :)",
          icon: "error",
        });
      }
    });
}

// Validation Site Name Function

function validationSiteName() {
  var msgSiteName = document.getElementById("msgSiteName");
  var siteNameRegex = /^(?!\s)(?=.*\p{L})[\p{L}\d ._-]{2,15}(?<!\s)$/u;
  var siteName = siteNameInput.value;

  if (siteNameRegex.test(siteName)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    msgSiteName.classList.add("d-none");

    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    msgSiteName.classList.remove("d-none");

    return false;
  }
}

// Validation Site Url Function

function validationSiteUrl() {
  var msgSiteUrl = document.getElementById("msgSiteUrl");
  var urlRegex =
    /^https?:\/\/[\w\-]+(\.[\w\-]+)+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  var siteUrl = siteUrlInput.value;

  if (urlRegex.test(siteUrl)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    msgSiteUrl.classList.add("d-none");

    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    msgSiteUrl.classList.remove("d-none");

    return false;
  }
}
