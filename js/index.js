var siteNameInput=document.getElementById("bookmarkName")
var siteUrlInput=document.getElementById("bookmarkUrl")
var tableData=document.getElementById("tableData")
var submitBtn=document.getElementById("submitBtn")
var boxModal = document.querySelector(".box-info");
var deleteBtns;
var visitBtns;






var bookmarkList=[];


if(localStorage.getItem('bookmarkList')==null)
  {
      var bookmarkList=[];
  }

else
  {
    bookmarkList=JSON.parse(localStorage.getItem("bookmarkList"));
     displayBookmark();

  }


function addBookmark(){
    var bookmark={
        name:siteNameInput.value,
        url:siteUrlInput.value,
    }
    bookmarkList.push(bookmark);
    displayBookmark();
    localStorage.setItem('bookmarkList',JSON.stringify(bookmarkList))
    clearInputs();
    
     
  deleteBtns = document.querySelectorAll(".btn-delete");
 
}



function displayBookmark(){
  
    var htmlContainer="";
    for(var i=0 ; i<bookmarkList.length ;i++)
        {
           htmlContainer+=`  <tr >
                    <td >${i+1}</td>
                    <td class="text-capitalize">${bookmarkList[i].name}</td>
                    <td>
                        <button class="btn btn-dark btn-visit">
                        
                       
                            <i class="fa-solid fa-eye pe-2"></i>
                           Visit
                        </button>
                    </td>
                    <td>
                        <button  class="btn btn-danger btn-delete ">
                            <i class="fa-solid fa-trash-can pe-2"></i>
                            Delete
                        </button>
                    </td>
                </tr>`
        }
     tableData.innerHTML=(htmlContainer)
     deleteBookmark();
     visitWebsite();


}

function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
  }


  function deleteBookmark() {
    var deleteBtns = document.querySelectorAll(".btn-delete");
 for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", function(event) {
        var index = event.target.parentNode.parentNode.rowIndex;
        bookmarkList.splice((index-1), 1);
        displayBookmark();
        localStorage.setItem('bookmarkList',JSON.stringify(bookmarkList))

        })
    }
};
    
function visitWebsite(){
  var visitBtns = document.querySelectorAll(".btn-visit");
  for (var i = 0; i < visitBtns.length; i++) {
      visitBtns[i].addEventListener("click", function (e) {
          for(var j = 0; j < bookmarkList.length; j++) {
              var targetUrl = bookmarkList[j].url;
              // Check if the URL starts with "www" and prepend "https://"
              if (targetUrl.startsWith("www")) {
                  targetUrl = "https://" + targetUrl;
              }
              if (e.target.parentNode.parentNode.rowIndex == (j + 1)) {
                  window.open(targetUrl, '_blank');
              }
          }
      });
  }}



submitBtn.addEventListener("click", function () {
  if (siteNameInput.classList.contains("is-valid") && siteUrlInput.classList.contains("is-valid"))
    {
    addBookmark();
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
  } 
  else
   {
    boxModal.classList.remove("d-none");
  }
});


var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteNameInput.addEventListener("input", function () {
  validate(siteNameInput, nameRegex);
});

siteUrlInput.addEventListener("input", function () {
  validate(siteUrlInput, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function closeModal() {
    boxModal.classList.add("d-none");
  }
  

  
  closeBtn.addEventListener("click", closeModal);
  
  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      closeModal();
    }
  });
  
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
      closeModal();
    }
  });












