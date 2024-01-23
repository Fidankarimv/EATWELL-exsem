let product = document.querySelector(".product");
const BASE_URL = `http://localhost:8080/product`;
let loadMore = document.querySelector(".load-more button");
let productCopy = [];
let limit = 3;

// menu
const navBar = document.querySelector("nav");
const menuIcon = document.querySelector(".fa-solid");
menuIcon.addEventListener("click", function () {
  navBar.classList.toggle("show");
  this.classList.contains("fa-bars")
    ? (this.className = "fa-solid fa-x")
    : (this.className = "fa-solid fa-bars");
});
// get
async function getData() {
  let res = await axios.get(`${BASE_URL}`);
  console.log(res.data);
  drawCard(res.data);
}
getData();

function drawCard(arr) {
  product.innerHTML = "";
  arr.forEach((element) => {
    let divElem = document.createElement("div");
    divElem.className = "col-lg-4";
    divElem.innerHTML = `

        <img src="${element.imgUrl}" alt="" />
        <h3>${element.price}</h3>
        <h2>${element.title}</h2>
        <p>
        ${element.des}
        </p>
        <a href="details.html?id=${element.id}"><button class="btn btn">Details</button></a>
        `;
    product.append(divElem);
  });
}

loadMore.addEventListener("click", function () {
  limit += 3;
  drawCard(productCopy.slice(0, limit));
  if (limit >= productCopy.length) {
    this.remove();
  }
});

