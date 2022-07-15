BASE_URL = 'https://superheroapi.com/api.php'
TOKEN = '509884420934733'
const superHeroImage = document.getElementById('superHeroImage')
const heroname = document.getElementById('name')
const randomHero = document.getElementById('randomHero')
const nameInput = document.getElementById('nameInput')
const searchButton = document.getElementById('searchButton')
const stats = document.getElementById('stats')

const getStatsHTML = (data) => {
       const statsArray = Object.keys(data.powerstats).map(stat =>{
        // console.log(`${stat} : ${data.powerstats[stat]}`)
        return `<p>${stat} : ${data.powerstats[stat]}</p>`
    }).join(' ')

    stats.innerHTML = `${statsArray}`
}

const getRandomHero = (id) => {
    fetch(`${BASE_URL}/${TOKEN}/${id}`)
    .then(response => response.json())
    .then(json => {
        // console.log(json)
        superHeroImage.innerHTML = `<img src ='${json.image.url}' height="280px" width= "280px"/>`
        heroname.innerHTML = `<h2>${json.name}</h2>`
        getStatsHTML(json)
})
}

const getSearchedSuperHero = (searchedName) =>{
    fetch(`${BASE_URL}/${TOKEN}/search/${searchedName}`)
    .then(response => response.json())
    .then(json => {
        // console.log(json.results[0])
        superHeroImage.innerHTML = `<img src ='${json.results[0].image.url}' height="280px" width= "280px"/>`
        heroname.innerHTML = `<h2>${json.results[0].name}</h2>`
        getStatsHTML(json.results[0])
})
}

const start = () =>{
    getRandomHero(Math.ceil(Math.random()*731))
}

start() 
randomHero.onclick = () =>getRandomHero(Math.ceil(Math.random()*731))
searchButton.onclick = () => getSearchedSuperHero(nameInput.value.toLowerCase())

