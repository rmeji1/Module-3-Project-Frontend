let cardTitle = document.querySelector('.card-text')
let imageDiv = document.querySelector('.card.mb-4.shadow-sm')
let buttonDiv = document.querySelector('.btn-group')
let isOpen = false
let tester = document.querySelector('.modal.fade.bd-example-modal-lg')


fetch("http://localhost:3000/federal")
  .then(function(response) {
    return response.json();
  })
  .then(function(federal){
    federal.forEach(function(member){
      appendMembers(member)
    })
  })

  function appendMembers(member){
    cardTitle.innerText = member.name
    let imageOfMember = document.createElement("img")
    imageOfMember.className = "container"
    imageOfMember.src = member.photoUrl
    imageDiv.prepend(imageOfMember)
    makeButton(member)
  }

  function makeButton(member){
    let viewButton = document.createElement('button')
    viewButton.innerText = "View Representative"
    viewButton.className = 'btn btn-sm btn-outline-secondary'
    viewButton.dataset.id = member.id
    console.log(viewButton)
    buttonDiv.append(viewButton)
    viewButton.addEventListener('click', () => {
      console.log('clicked')
    //   // if(!isOpen){
        popper(event.target.dataset.id)
    //     // isOpen = true
    //
  })
  }

  function popper(id){
  fetch(`http://localhost:3000/federal/${id}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(member){
      console.log(member)
    })
  }
