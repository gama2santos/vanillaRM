import API from './api.js'
import Character from './character.js'

const api = new API()
let currentCaracter = 4
const $loadNext = document.querySelector('#load-next')
const $loadPrevious = document.querySelector('#load-previous')

$loadNext.addEventListener('click', async () => {
  const characterData = await api.getCharacter(++currentCaracter)
  new Character(characterData)
})

$loadPrevious.addEventListener('click', async () => {
  if (currentCaracter > 1) {
    const characterData = await api.getCharacter(--currentCaracter)
    new Character(characterData)
  }
})

async function initApp(initCharacterId) {
  const characterData = await api.getCharacter(initCharacterId)
  console.log(characterData)
  new Character(characterData)
}

initApp(currentCaracter)



