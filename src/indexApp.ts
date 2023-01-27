const api_url: string = "http://localhost:3000/customers";

type Customer = {
  id: number;
  username: string;
  password: string;
  name: string;
  father_name: string;
  age: number;
  isAdmin: boolean;
  cnic: number;
};

async function getDataFromDatabase(url: string): Promise<void> {
  let Response = await fetch(url);
  let data: Array<Customer> = await Response.json();
  showCustomerProfile(data);
}

function showCustomerProfile(data: Array<Customer>) {
  const customerContainer: HTMLElement = document.getElementById(
    "customer-container"
  ) as HTMLElement;

  data.forEach(function (element: Customer) {
    let customerElemet = document.createElement("div");
    customerElemet.innerHTML = element.name;
    customerElemet.id = "customer" + element.id;
    customerElemet.classList.add("customer");
    customerElemet.addEventListener("click", function () {
      showCustomersDetails(element);
    });
    customerContainer.appendChild(customerElemet);
  });
}

function showCustomersDetails(data: any) {
  const detailContainer: HTMLElement = document.getElementById(
    "detail-box"
  ) as HTMLElement;
  detailContainer.innerHTML = "";
  let heading = document.createElement("h2");
  heading.innerHTML = "Customer- " + data.id + " -Details";
  detailContainer?.appendChild(heading);

  getDetailSectionComponent().then((component: string) => {
    let html: string;
    const lenght: number = Object.keys(data).length;
    for (let i: number = 0; i < lenght; i++) {
      html = component
        .replace("$title", Object.keys(data)[i])
        .replace("$content", data[Object.keys(data)[i]]);
      detailContainer.innerHTML += html;
    }
  });
  detailContainer.style.display = "block";
}

async function getDetailSectionComponent() {
  let Response = await fetch("../dist/detailSection.html");
  let component: string = await Response.text();
  return component;
}

//function calls
getDataFromDatabase(api_url);
