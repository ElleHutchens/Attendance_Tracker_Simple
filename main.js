// --- THE PLAYERS ---
const players = ["Please select a player", "human1", "human2", "human3"]

// --- THE GAMES ---
const dates = ["Please select a date", "2024-01-20", "2024-06-05", "2024-07-05"]

// --- FUNCTION TO POPULATE THE PLAYER DROPDOWN ---
function populatePlayerDropdown() {
    const playerDropdown = document.getElementById("dropdown-player-list")

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
function populateDateDropdown() {
    const dateDropdown = document.getElementById("dropdown-dates")

    dates.forEach(function(dateString){
        const formattedDate = formatDate(dateString)

        let option = document.createElement("option")
        option.value = dateString
        option.text = formattedDate
        dateDropdown.appendChild(option)
    })
}

// --- ATTENDEES PRESENT COUNTER ---
let attendeesPresent = 0

// --- FUNCTION TO REGISTER ATTENDANCE ---
function confirmAttendance() {
    const selectedPlayer = document.getElementById("dropdown-player-list").value
    const selectedDate = formatDate(document.getElementById("dropdown-dates").value)
    
    if (selectedPlayer !== "Please select a player" && selectedDate !== "Please select a date") {
        console.log(`${selectedPlayer} has been marked as present on ${selectedDate}.`)
        alert("Thank you. Your attendance has been confirmed.")

        attendeesPresent += 1

        const today = new Date()
        const formattedToday = formatDate(today)

        if (selectedDate === formattedToday) {
            const totalAttendees = players.length - 1
            const percentage = (attendeesPresent / totalAttendees) * 100

            const percentageElement = document.getElementById("attendance-percentage")
            percentageElement.textContent = `Today's attendance: ${percentage.toFixed(0)}% marked as present.`
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

// const confirmAttendanceButton = document.getElementById("button-confirm-attendance")
// confirmAttendanceButton.addEventListener("click", confirmAttendance)