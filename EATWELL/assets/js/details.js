let id = new URLSearchParams(window.location.search).get("id");
let details = document.querySelector(".details");
const BASE_URL = `http://localhost:8080/product`;

// get
async function getData() {
  let res = await axios.get(`${BASE_URL}/${id}`);
  console.log(res.data);
  drawCard(res.data);
}
getData();

function drawCard(data) {
  const desCard = document.createElement("div");
  desCard.className = "details-card";
  desCard.innerHTML = `
    <img src="${data.imgUrl}" alt="" />
    <h3>${data.price}</h3>
    <h2>${data.title}</h2>
    <p>
    ${data.des}
    </p>
    `;
  details.append(desCard);
}
