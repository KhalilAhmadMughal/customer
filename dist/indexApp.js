"use strict";
const api_url = "http://localhost:3000/customers";
function getUserDataFromDatabase() {
    return fetch(api_url).then(data => data.json());
}
getUserDataFromDatabase().then(data => {
    showCustomerProfile(data);
});
function showCustomerProfile(data) {
    const customerContainer = document.getElementById("customer-container");
    data.forEach(function (element) {
        let customer = document.createElement("div");
        customer.innerHTML = element.name;
        customer.id = element.id;
        customer.classList.add("customer");
        customer.addEventListener("click", function () {
            showCustomersDetails(element.id, element);
        });
        customerContainer === null || customerContainer === void 0 ? void 0 : customerContainer.appendChild(customer);
    });
}
function showCustomersDetails(id, data) {
    const detailContainer = document.getElementById("detail-box");
    detailContainer.innerHTML = "";
    let heading = document.createElement("h2");
    heading.innerHTML = "Customer- " + data.id + " -Details";
    detailContainer === null || detailContainer === void 0 ? void 0 : detailContainer.appendChild(heading);
    getDetailSectionComponent().then(component => {
        let html;
        const lenght = Object.keys(data).length;
        for (let i = 0; i < lenght; i++) {
            html = component.replace("$title", Object.keys(data)[i])
                .replace("$content", data[Object.keys(data)[i]]);
            detailContainer.innerHTML += html;
        }
    });
    detailContainer.style.display = "block";
}
function getDetailSectionComponent() {
    return fetch("../dist/detailSection.html").then(Response => Response.text());
}
