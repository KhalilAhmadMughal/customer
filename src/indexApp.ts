const api_url: string = "http://localhost:3000/customers";

function getUserDataFromDatabase(): Promise<any> {
  return fetch(api_url).then(data=>data.json())
}
getUserDataFromDatabase().then(data=>{
  showCustomerProfile(data);
})

function showCustomerProfile(data:any) {
  const customerContainer = document.getElementById("customer-container");
      data.forEach(function(element:any) {
      let customer = document.createElement("div");
      customer.innerHTML=element.name;
      customer.id=element.id;
      customer.classList.add("customer");
      customer.addEventListener("click", function(){
        showCustomersDetails(element.id, element);
      })
      customerContainer?.appendChild(customer);
    }); 
}

function showCustomersDetails(id: number, data:any){
  const detailContainer: HTMLElement = document.getElementById("detail-box") as HTMLElement;
  detailContainer.innerHTML=""
  let heading = document.createElement("h2");
  heading.innerHTML = "Customer- " + data.id + " -Details";
  detailContainer?.appendChild(heading);

  getDetailSectionComponent().then(component => {
    let html: string;
    const lenght: number= Object.keys(data).length;
    for(let i:number=0;i<lenght;i++){
      html = component.replace("$title", Object.keys(data)[i])
      .replace("$content",data[Object.keys(data)[i]]);
      detailContainer.innerHTML +=html;
    }
  });
  detailContainer.style.display = "block";
}

function getDetailSectionComponent(){
  return fetch("../dist/detailSection.html").then(Response=>Response.text());
}

