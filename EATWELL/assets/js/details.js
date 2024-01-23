let id=new URLSearchParams(window.location.search).get("id");
let  details=document.querySelector(".details")
const BASE_URL = ``;

// get
async function getData() {
    let res = await axios.get(`${BASE_URL}/${id}`);
    console.log(res.data);
    drawTable(res.data);
  }
  getData();

  function drawCard(data) {
    const desCard=document.createElement("div");
    desCard.innerHTML=`
    
    
    `
  }