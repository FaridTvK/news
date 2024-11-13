import './style.css'
import { IArticle, INews } from './interfaces/INews'
const API_KEY = import.meta.env.VITE_KEY_API



const BASE_URL = "https://newsapi.org"


console.log(API_KEY);

const searchElement = document.getElementById("search") as HTMLInputElement;
const languageElement = document.getElementById("language") as HTMLSelectElement;
const sortElement = document.getElementById("sort") as HTMLSelectElement;
const newsContent = document.getElementById("article-container") as HTMLDivElement;
const buttonElement = document.getElementById("send") as HTMLButtonElement;


function createArticle(article: IArticle) {
  const newsCard = document.createElement("div") as HTMLDivElement;
  newsCard.innerHTML = `
    <h3>${article.title}</h3>
    <p>${article.description}</p>
    <img src="${article.urlToImage}"/>
    <a href="${article.url}">Click here</a>
  `
  newsContent.appendChild(newsCard)
}



const fetchNews = async () => {
  let newsURL = `${BASE_URL}/v2/everything`

  const parameter: string[] = []

  if (searchElement.value.length !== 0) {
    const searchValue = searchElement.value
    parameter.push(`q=${searchValue}`)
  }

  if (languageElement.value.length !== 0) {
    const languageKey = languageElement.value
    parameter.push(`language=${languageKey}`)
  }

  if (sortElement.value.length !== 0) {
    const sortKey = sortElement.value;
    parameter.push(`sortBy=${sortKey}`)
  }

  parameter.push(`apiKey=${API_KEY}`)
  console.log(parameter);


  newsURL += `?${parameter.join("&")}`


  newsContent.innerHTML = ""
  const response = await fetch(newsURL)
  const data = await response.json()
  data.articles.forEach((article: IArticle) => {
    createArticle(article)
  })
}


buttonElement?.addEventListener("click", fetchNews)

const fetchTopNews = async () => {
  const topNewsURL = `${BASE_URL}/v2/top-headlines?apiKey=${API_KEY}&country=us`
  newsContent.innerHTML = ""
  const response = await fetch(topNewsURL)
  const data: INews = await response.json()
  console.log(data.articles);
  data.articles.forEach((article: IArticle) => {
    createArticle(article)
  })
}


fetchTopNews()