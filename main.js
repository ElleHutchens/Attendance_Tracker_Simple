// --- THE PLAYERS ---
const players = ["Please select a player", "human1", "human2", "human3"]

// --- THE GAMES ---
const today = new Date()
const dates = ["Please select a date", today, "2024-06-05", "2024-07-05"]

// --- ATTENDEES PRESENT COUNTER ---
let attendeesPresent = []

// --- FUNCTION TO POPULATE THE PLAYER DROPDOWN ---
const playerDropdown = document.getElementById("dropdown-player-list")

function populatePlayerDropdown() {
    players.forEach(function(player) {
        let option = document.createElement("option")
        option.value = player
        option.text = player
        playerDropdown.appendChild(option)
        })
    
  }

// --- FUNCTION TO STOP TEXT "Please select a date" BEING CONVERTED INTO DATE
function containsNumbers(dropdownDates) {
    return /^\D*$/.test(dropdownDates)
}

// --- FUNCTION TO FORMAT DATES ---
function formatDate(dateString) {
        if (containsNumbers(dateString)){
            return dateString
        } else {
            const date = new Date(dateString)
            const day = date.getDate().toString().padStart(2,'0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()

            return `${day}-${month}-${year}`
    }
}

// --- FUNCTION TO POPULATE THE DATE DROPDOWN ---
const dateDropdown = document.getElementById("dropdown-dates")

function populateDateDropdown() {
    dates.forEach(function(dateString){
        const formattedDate = formatDate(dateString)

        let option = document.createElement("option")
        option.value = dateString
        option.text = formattedDate
        dateDropdown.appendChild(option)
    })

}

// --- FUNCTION TO REGISTER ATTENDANCE ---
function confirmAttendance() {
    const selectedPlayer = document.getElementById("dropdown-player-list").value
    const selectedDate = formatDate(document.getElementById("dropdown-dates").value)

    if (selectedPlayer !== "Please select a player" && selectedDate !== "Please select a date") {
        console.log(`${selectedPlayer} has been marked as present on ${selectedDate}.`)
        alert("Thank you. Your attendance has been confirmed.")

        // reset player dropdown
        playerDropdown.selectedIndex = 0

        // +1 to attendees present
        if (!attendeesPresent.includes(selectedPlayer)) {
            attendeesPresent.push(selectedPlayer)
            console.log(attendeesPresent)
        }

        // show percentage present, if selected date is today
        const today = new Date()
        const formattedToday = formatDate(today)

        if (selectedDate === formattedToday) {
            const totalAttendees = players.length - 1
            const percentage = (attendeesPresent.length / totalAttendees) * 100

            const percentageElement = document.getElementById("attendance-percentage")
            percentageElement.innerHTML = `Today's attendance: ${attendeesPresent.length}<br>${percentage.toFixed(0)}% marked as present`

            const progressBar = document.getElementById("progress-bar")
            progressBar.style.width = `${percentage}%`
        }

    } else if (selectedPlayer == "Please select a player" && selectedDate == "Please select a date"){
        alert("Please select from the dropdown menus.")

    } else if (selectedPlayer == "Please select a player"){
        alert("Please select a player before proceeding.")

    } else if (selectedDate == "Please select a date"){
        alert("Please select a date before proceeding.")
    }
}    

// --- RUN FUNCTIONS ON LOAD + ADD EVENTLISTENER TO BUTTON
window.onload = function() {
    populatePlayerDropdown()
    populateDateDropdown()
    const confirmAttendanceButton = document.getElementById("button-confirm-attendance")
    confirmAttendanceButton.addEventListener("click", confirmAttendance)
  }