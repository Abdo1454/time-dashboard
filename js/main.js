let daily = document.getElementById("daily");
let weekly = document.getElementById("weekly");
let monthly = document.getElementById("monthly");

let resultDash = document.getElementById("result-dash");

let stateCurrent = "weekly";
let allData = [];
weekly.classList.add("click1");
// تحديد الزرار النشط
function setActive(activeBtn) {
  [daily, weekly, monthly].forEach(btn => btn.classList.remove("click"));
  activeBtn.classList.add("click");
}

// النص حسب الحالة
const lastText = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month"
};

// جلب البيانات مرة واحدة فقط
function getData() {
  if (allData.length > 0) {
    renderData(allData);
    return;
  }

  fetch("../data.json")
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      renderData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// عرض البيانات
function renderData(data) {
  resultDash.innerHTML = data.map((item) => {
    let iconName = item.title;

    return `
      <div class="card">
        <div class="card-image ${item.title}">
          <img src="../images/icon-${item.title}.svg" alt="${item.title}" />
        </div>
        <div class="card-content">
          <h3>${item.title}</h3>
          <div class="card-mobile">
          
          <h2>${item.timeframes[stateCurrent].current}hrs</h2>
          <p>${lastText[stateCurrent]} - ${item.timeframes[stateCurrent].previous}hrs</p>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Events
daily.addEventListener("click", () => {
  stateCurrent = "daily";
  setActive(daily);
  weekly.classList.add("naturl");
  weekly.classList.remove("click1");
  monthly.classList.remove("click1");
  monthly.classList.add("naturl");
  daily.classList.remove("naturl");
  daily.classList.add("click1");
  getData();
});

weekly.addEventListener("click", () => {
  stateCurrent = "weekly";
  setActive(weekly);
    weekly.classList.remove("naturl");
  weekly.classList.add("click1");
  monthly.classList.remove("click1");
  monthly.classList.add("naturl");
  daily.classList.add("naturl");
  daily.classList.remove("click1");
  getData();
});

monthly.addEventListener("click", () => {
  stateCurrent = "monthly";
  setActive(monthly);
  weekly.classList.add("naturl");
  weekly.classList.remove("click1");
  monthly.classList.add("click1");
  monthly.classList.remove("naturl");
  daily.classList.add("naturl");
  daily.classList.remove("click1");
  getData();
});

// default
setActive(weekly);
getData();