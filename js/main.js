let daily = document.getElementById("daily");
let weekly = document.getElementById("weekly");
let monthly = document.getElementById("monthly");

let resultDash = document.getElementById("result-dash");
let stateCurrent = "weekly";
daily.addEventListener("click", () => {
  stateCurrent = "daily";
  getData();
});
weekly.addEventListener("click", () => {
  stateCurrent = "weekly";
  getData();
});
monthly.addEventListener("click", () => {
  stateCurrent = "monthly";
  getData();
});

function getData() {
  fetch("../data.json")
    .then((res) => res.json())
    .then((data) => {
      resultDash.innerHTML = data
        .map((item) => {
          return `
            <div class="card">
            <div class="card-image" >
            <img src="../images/icon-${item.title}.svg"/>
                </div>
            <div class="card-content">
            <h3>${item.title}</h3>
            <h2>${item.timeframes[stateCurrent].current}hrs</h2>
            <p>Last week-${item.timeframes[stateCurrent].previous}hrs</p>
             </div>
            
            </div>
            `;
        })
        .join("");
      console.log(data);
    })
    .catch((error) => {
      console.error("error:", error);
    });
}

getData();
