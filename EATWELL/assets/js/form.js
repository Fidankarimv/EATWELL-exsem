let form = document.querySelector("form");
let sortBtn = document.querySelector(".sortBtn");
let searchInp = document.querySelector(".search");
let tbody = document.querySelector("tbody");
let allInput = document.querySelectorAll("input");
const BASE_URL = ``;
let productData;
let copyProductData;

// get
async function getData() {
  let res = await axios.get(`${BASE_URL}`);
  productData = res.data;
  copyProductData = [...res.data];
  console.log(res.data);
  drawTable(res.data);
}
getData();

function drawTable(arr) {
  tbody.innerHTML = "";
  arr.forEach((element) => {
    tbody.innerHTML += `
        <tr>
                <td>${element.id}</td>
                <td><img src="${element.imgUrl}" alt=""></td>
                <td>${element.price}</td>
                <td>${element.title}</td>
                <td>${element.des}</td>
                <td><button onclick=deletData("${element.id}",this)>DELETE</button></td>
            </tr>
        
        `;
  });
}

// delete
async function deletData(id, btn) {
  try {
    if (window.confirm("silmeye eminsenmi??")) {
      await axios.delete(`${BASE_URL}/${id}`);
      btn.closest("tr").remove();
    }
  } catch (error) {
    console.log(error);
  }
}

// post

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    imgUrl: allInput[0].value,
    price: allInput[1].value,
    title: allInput[2].value,
    des: allInput[3].value,
  };
  try {
    await axios.post(`${BASE_URL}`, obj);
  } catch (error) {
    console.log(error);
  }
});

// search
searchInp.addEventListener("input", function (e) {
  let filtered = productData.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

// sort

sortBtn.addEventListener("click", function sortId() {
  let sorted;
  if (sortBtn.innerText === "Asc") {
    this.innerText = "Des";
    sorted = productData.sort((a, b) => a.id - b.id);
  } else if (sortBtn.innerText === "Des") {
    this.innerText = "Asc";
    sorted = productData.sort((a, b) => b.id - a.id);
  } else if (sortBtn.innerText === "Asc") {
    sorted = copyProductData;
  }
  drawTable(sorted);
});
