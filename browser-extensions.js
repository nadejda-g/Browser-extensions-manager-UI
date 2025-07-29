async function fetchData() {
    const res = await fetch('data.json')
    const data = await res.json()

    renderCards(data)
}

function displayOnlyActive() {
    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.classList.add('only-active')
    cardsContainer.classList.remove('only-inactive')
}

function displayOnlyInactive() {
    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.classList.add('only-inactive')
    cardsContainer.classList.remove('only-active')
}

function displayAll() {
    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.classList.remove('only-active')
    cardsContainer.classList.remove('only-inactive')
}

function removeCard(event) {
    const button = event.target
    const footer = button.parentElement
    const content = footer.parentElement
    const generalCard = content.parentElement

    generalCard.classList.add('is-removed')
}

function toggleCard(event) {
    const input = event.target
    const checked = input.checked

    const toggle = input.parentElement
    const footer = toggle.parentElement
    const content = footer.parentElement
    const generalCard = content.parentElement

    if (checked) {
        generalCard.classList.add('is-active')
        generalCard.classList.remove('is-inactive')
    } else {
        generalCard.classList.add('is-inactive')
        generalCard.classList.remove('is-active')
    }
}

function switchColors() {
    const body = document.querySelector('body')
    const isDarkMode = body.classList.contains('dark-mode')
    const image = document.querySelector('.navbar button img')

    if (isDarkMode) {
        body.classList.remove('dark-mode')
        image.src = 'assets/images/icon-moon.svg'
    } else {
        body.classList.add('dark-mode')
        image.src = 'assets/images/icon-sun.svg'
    }
}

function renderCards(data) {
    for (const card of data) {
        renderCard(card)
    }
}

function renderCard(card) {
    const cardsContainer = document.getElementById('cards-container')

    const generalCard = document.createElement('div')
    generalCard.classList.add('general-card')

    const cardContent = document.createElement('div')
    cardContent.classList.add('card-content')

    const cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')

    const cardFooter = document.createElement('div')
    cardFooter.classList.add('card-footer')

    const cardDescription = document.createElement('div')
    cardDescription.classList.add('card-description')

    const title = document.createElement('h3')
    title.innerText = card.name

    const description = document.createElement('p')
    description.innerText = card.description

    const image = document.createElement('img')
    image.src = card.logo


    const button = document.createElement('button')
    button.innerText = "Remove"
    button.addEventListener('click', removeCard)


    const toggle = document.createElement('div')
    toggle.classList.add('toggle')
    toggle.addEventListener('click', toggleCard)

    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')

    if (card.isActive) {
        input.setAttribute('checked', true)

        generalCard.classList.add('is-active')
    } else {
        generalCard.classList.add('is-inactive')
    }

    const label = document.createElement('label')

    cardDescription.appendChild(title)
    cardDescription.appendChild(description)

    cardHeader.appendChild(image)
    cardHeader.appendChild(cardDescription)

    cardContent.appendChild(cardHeader)
    cardContent.appendChild(cardFooter)

    toggle.appendChild(input)
    toggle.appendChild(label)

    cardFooter.appendChild(button)
    cardFooter.appendChild(toggle)

    generalCard.appendChild(cardContent)
    cardsContainer.appendChild(generalCard)
}

fetchData()