const API_KEY = "538a8d61463941fdb350fb85b094dbb0";
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load' , () => fetchNews("India"))

function reload(){
    window.location.reload()
}

function fetchNews(query){
    fetch(`${url}${query}&apiKey=${API_KEY}`)
    .then(async function(res){
        const data = await res.json();
        console.log(data);
        bindData(data.articles)
    })
}

function bindData(articles){
    const cardContainer = document.getElementById('card-container')
    const newsCardTemplate = document.getElementById('template-news-card')

    cardContainer.innerHTML = "";
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone , article)
        cardContainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone , article){

    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle  = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click" , () => {
        window.open(article.url, "_blank")
    })
}

function onNavItemClick(id){
    fetchNews(id)
    
}

const searchText = document.getElementById('search-text')
const searchButton = document.getElementById('search-button')

searchButton.addEventListener("click" , () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
})