const iframe = document.querySelector(".myIframe");

iframe.onload = function () {
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
};

const navItems = document.querySelectorAll(".nav-list-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((i) => i.classList.remove("active"));

    item.classList.add("active");
  });
});

const ass1 = document.getElementById("ass1");
const ass2 = document.getElementById("ass2");
const task1 = document.getElementById("task1");
const task2 = document.getElementById("task2");

ass1.addEventListener("click", function () {
  iframe.src = "../../Assignments/Assignment_1/index.html";
});

ass2.addEventListener("click", function () {
  iframe.src = "../../Assignments/Assignment_2/index.html";
});

task1.addEventListener("click", function () {
  iframe.src = "../../Lab_Tasks/Lab_Task_1/index.html";
});

task2.addEventListener("click", function () {
  iframe.src = "../../Lab_Tasks/Lab_Task_2/index.html";
});
