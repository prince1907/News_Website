let url = 'https://gnews.io/api/v4/top-headlines?country=in&token=5d8bdf4d6b001a542459a66a417b57d0&lang=en' ;
// let apiKey = '649268fe857e443b93904f47c72a5e90';
// http://newsapi.org/v2/top-headlines?country=in&apiKey=649268fe857e443b93904f47c72a5e90'

let newsAccordion = document.getElementById('newsAccordion');

const xhr = new XMLHttpRequest();
xhr.open('GET', url, true)
xhr.getResponseHeader('Content-type', 'application/json');


function insertAndShift(arr, from, to) {
    let cutOut = arr.splice(from, 1)[0]; // Cut the element at index 'from'
    arr.splice(to, 0, cutOut);            // Insert it at index 'to'
}

xhr.onload = function () {
    if (this.status == 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {
            // console.log(element, index)
            let news = `<div class="headline" id="${index}">
                        <img src="${element['image']}" alt="img" width=250 height=150>
                        <div class="right">
                        <div ><h5><i><b><a style="color:rgb(80,80,80)" href="${element['url']}" target="_blank" >${element["title"]}</a></b></i></h5></div>
                            <p class="para">${element["content"]} <a href="${element['url']}" target="_blank" >Read more</a></p>
                        </div>
                        </div>
                        <br>`;
            newsHtml += news;
            newsAccordion.innerHTML = newsHtml;
        });
    }

    else {
        console.log("Some error occured");
    }

    let search = document.getElementById('searchTxt');
    search.addEventListener('input', function () {

        let inputVal = search.value;

        console.log('input event fired', inputVal);
        let headline = document.getElementsByClassName('headline');
        console.log(headline);

        Array.from(headline).forEach(function (element, index) {
            let searchedNews = element.getElementsByTagName('div')[0].innerText;
            let searchedText = element.getElementsByTagName('p')[0].innerText;
            if (inputVal == "") {
                element.style.background = "white";
                element.style.display = "flex";
            }
            else if (searchedNews.includes(inputVal) || searchedText.includes(inputVal)) {
                element.style.display = "flex";
                element.style.background = "rgb(255,255,153)";
            }


            else {
                element.style.background = "white";
                element.style.display = "none";
            }



        });



    });




}

xhr.send();



