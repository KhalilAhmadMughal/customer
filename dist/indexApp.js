"use strict";
const api_url = "http://localhost:3000/customers";
async function getDataFromDatabase(url) {
    let Response = await fetch(url);
    let data = await Response.json();
    showCustomerProfile(data);
}
function showCustomerProfile(data) {
    const customerContainer = document.getElementById("customer-container");
    data.forEach(function (element) {
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
function showCustomersDetails(data) {
    const detailContainer = document.getElementById("detail-box");
    detailContainer.innerHTML = "";
    let heading = document.createElement("h2");
    heading.innerHTML = "Customer- " + data.id + " -Details";
    detailContainer === null || detailContainer === void 0 ? void 0 : detailContainer.appendChild(heading);
    getDetailSectionComponent().then((component) => {
        let html;
        const lenght = Object.keys(data).length;
        for (let i = 0; i < lenght; i++) {
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
    let component = await Response.text();
    return component;
}
getDataFromDatabase(api_url);
