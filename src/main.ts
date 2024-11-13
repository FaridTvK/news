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
  const newsCard = document.createElement("div") as HTMLDivElement
}




const fetchTopNews = async () => {
  const topNewsURL = `${BASE_URL}/v2/top-headlines?apiKey=${API_KEY}&country=us`
  const response = await fetch(topNewsURL)
  const data: INews = await response.json()
  console.log(data.articles);
  data.articles.forEach((article: IArticle) => {
    createArticle(article)
  })
}


fetchTopNews()