const columnDiv = document.querySelector('#main-row')
const addressForm = document.querySelector('#address-form')

addressForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const addressValue = event.target.inlineFormAddress.value
  const username = event.target.inlineFormInputGroupUsername.value
  fetch('http://localhost:3000/users', { //eslint-disable-line
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: username,
        address: addressValue
      }
    })
  })
    .then((r) => r.json())
    .then((user) => {
      fetchFederal(user)
    })
})

function fetchFederal (user) {
  fetch(`http://localhost:3000/users/${user.id}?federal=true`) //eslint-disable-line
    .then((response) => response.json())
    .then(function (federal) {
      console.log(federal)
      federal.forEach(function (member) {
        renderMember(member)
      })
    })
}

function renderMember (member) {
  const card = document.createElement('div')
  card.className = 'col-md-4'

  const cardShadow = createAndAppendElement('div', card, null, 'card mb-4 shadow-sm')
  const cardBody = createAndAppendElement('div', cardShadow, null, 'card-body')
  createAndAppendElement('img', cardBody, null, 'container', (element) => {
    element.src = member.photoUrl
  })
  createAndAppendElement('h4', cardBody, null, 'card-office', (el) => {
    el.innerText = member.title
  })
  createAndAppendElement('h5', cardBody, null, 'card-name', (el) => {
    el.innerText = member.name
  })
  const buttonDiv = createAndAppendElement('div', cardBody, null, 'd-flex justify-content-between align-items-center')
  createAndAppendElement('div', buttonDiv, `btn-group-${member.channels[1].id}`, 'btn-group')
  columnDiv.append(card)
  makeButton(member)
  socialIcons(buttonDiv, member)
}

function makeButton (member) {
  const buttonDiv = document.querySelector(`#btn-group-${member.channels[1].id}`)
  const viewButton = document.createElement('button')
  viewButton.innerText = 'View Representative'
  viewButton.className = 'btn btn-sm btn-outline-secondary'
  viewButton.setAttribute('data-toggle', 'modal')
  viewButton.setAttribute('data-target', '.bd-example-modal-xl')
  viewButton.dataset.id = member.id
  buttonDiv.append(viewButton)
  viewButton.addEventListener('click', () => {
    representativeModalElements(member)
  })
}

function socialIcons (cardBody, member) {
  createAndAppendElement('i', cardBody, null, 'fa fa-twitter', (el) => {
    el.style = 'font-size: 20px;'
    el.dataset.twitter = member.channels[1].id
    el.addEventListener('click', (event) => {
      window.location.href = `https://twitter.com/${event.target.dataset.twitter}?s=10`
    })
  })
}

function representativeModalElements (member) {
  const modalTitle = document.querySelector('#modal-title')
  modalTitle.innerText = member.name
  const tableBody = document.querySelector('#member-info')
  tableBody.innerHTML = ''
  const tr = createAndAppendElement('tr', tableBody, null, null)
  createAndAppendElement('td', tr, null, null, (el) => { el.innerText = member.phones[0] })
  createAndAppendElement('td', tr, null, null, (el) => { el.innerText = member.party })
  createAndAppendElement('td', tr, null, null, (el) => {
    el.innerText = `${member.address[0].line1}, ${member.address[0].line2}, ${member.address[0].city}, ${member.address[0].state}, ${member.address[0].zip}`
  })
  createAndAppendElement('td', tr, null, null, (el) => { el.innerText = member.urls[0] })
}

function createAndAppendElement (tag, parent, id, className, callback) {
  const element = document.createElement(tag)
  parent.append(element)
  if (id !== null) element.id = id
  if (className !== null) element.className = className
  if (callback !== undefined) callback(element)
  return element
}

const local = document.querySelector('#local-items')
local.addEventListener('click', function (event) {
  console.log('clicked')
  fetch('http://localhost:3000/users') //eslint-disable-line
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      console.log(json)
    })
})
