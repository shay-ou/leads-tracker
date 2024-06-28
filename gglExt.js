let myLeads = []
let inputEl = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")
let ulEL = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderGame(myLeads)
}

function renderGame(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
    }
    ulEL.innerHTML = listItems
}
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderGame(myLeads)
    })

})


deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    myLeads = []
    renderGame(myLeads)

})
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderGame(myLeads)
})






