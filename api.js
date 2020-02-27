

//get arrays of cars/htmel elements
const proImages = document.querySelectorAll('.card-img');
const cards =  document.querySelectorAll('.card-info-container');
const caps = document.querySelectorAll('.card-name');
const lowerCards =  document.querySelectorAll('.card-text');

//New Arrays to strore values from API Response
const modalEmail=[];
const modalImages=[];
const modalLocation =[];
const modalCaps = [];
const modalPhone = [];
const birthdays = [];
const modalCity = [];
const modalCell = [];


//Function to Extract detail from Response
function extractInfo(data) {
    for (var i =0; i < data.length; i++)
    {  proImages[i].src=data[i].picture.large;
       caps[i].textContent = data[i].name.first+ " " + data[i].name.last;
       lowerCards[i*2].textContent = data[i].email;
       lowerCards[i*2+1].textContent = data[i].location.city;
       modalCity.push(data[i].location.city);
       modalImages.push(data[i].picture.large);
       modalEmail.push(data[i].email);
       modalLocation.push(data[i].location.street.number+" "+data[i].location.street.name+" "+data[i].location.city+", "+data[i].location.state+" "+data[i].location.postcode);
       modalCell.push(data[i].cell);
       modalCaps.push(data[i].name.first+ " " + data[i].name.last);
       birthdays.push(data[i].dob.date);

    };
};

// Pulls Data from API parces to strings
const apiResponses = (
  fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    // .then(data => console.log(data))  //Use to investigate JSON response
    .then(data => extractInfo(data.results)) //need to remove to investigate response
  )


// Get the div that opens the modal
const card_boxes = document.querySelectorAll('.card');
//Works through underlying functions
for (var i = 0; i < card_boxes.length; i++) {
   (function(index) {
card_boxes[index].addEventListener("click", function(){
        document.querySelector('.modal').style.display = "block";
        document.querySelector('.modal-container').style.display = "block";
        document.querySelector('.modal-img').src=modalImages[index];
        document.querySelector('#nameModal').innerHTML=modalCaps[index];
        document.querySelector('#email').innerHTML=modalEmail[index];
        document.querySelector('#city').textContent =modalCity[index]
        document.querySelector('#phone').textContent = modalCell[index]
        document.querySelector('#address').textContent = modalLocation[index];
        //create new variable for Birthday in correct format
        var birthDay="Birthday: "+new Date(Date.parse(birthdays[index])).toLocaleDateString();
        document.querySelector('#birth').textContent = birthDay;
      })
})(i);
}

//Create close modal Function
function closeModal() {
  document.querySelector('.modal').style.display='none';
  document.querySelector('.modal-container').style.display='none';
  };

//Add Close Function to top right button on Modal
document.querySelector('button').addEventListener("click",function(){
  closeModal();
})

closeModal();
