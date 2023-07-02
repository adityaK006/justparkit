const emptySlotsCountElement = document.querySelector('.empty-slots-count');
const parkingSlotsTab = document.getElementById('parkingSlotsTab');
const manageSlotsContainer = document.getElementById('manageSlotsContainer');
const goToHomeLink = document.getElementById('goToHomeLink');

let emptySlotsCount = 40; // Update the initial count to 40
const totalSlots = 40; // Update the total slots to 40
let bookedSlots = [];

function toggleBooking(slot) {
  const element = document.getElementById(slot);

  if (element.classList.contains('booked')) {
    element.classList.remove('booked');
    const index = bookedSlots.indexOf(slot);
    if (index > -1) {
      bookedSlots.splice(index, 1);
    }
    emptySlotsCount++;
  } else {
    element.classList.add('booked');
    bookedSlots.push(slot);
    emptySlotsCount--;
  }

  element.classList.toggle('selected');
  updateEmptySlotsCount();
  saveBookedSlots(); // Save booked slots to localStorage
}

function updateEmptySlotsCount() {
  emptySlotsCountElement.textContent = emptySlotsCount;
}

function showManageSlots() {
  manageSlotsContainer.style.display = 'grid';
  updateEmptySlotsCount();
  goToHomeLink.style.display = 'inline-block'; // Show the Go to Home link
  parkingSlotsTab.removeEventListener('click', showManageSlots); // Remove the event listener for the Parking Slots tab
  parkingSlotsTab.addEventListener('click', showParkingSlots); // Add the event listener for the Parking Slots tab to switch back
}

function showParkingSlots() {
  manageSlotsContainer.style.display = 'none';
  updateEmptySlotsCount();
  goToHomeLink.style.display = 'none'; // Hide the Go to Home link
  parkingSlotsTab.removeEventListener('click', showParkingSlots); // Remove the event listener for the Parking Slots tab
  parkingSlotsTab.addEventListener('click', showManageSlots); // Add the event listener for the Parking Slots tab to switch back
}

function showHome() {
  manageSlotsContainer.style.display = 'none';
  updateEmptySlotsCount();
  goToHomeLink.style.display = 'none'; // Hide the Go to Home link
}

// Create slots dynamically
const slotsContainer = document.querySelector('.slots-container');
for (let i = 1; i <= totalSlots; i++) {
  const slot = document.createElement('div');
  slot.id = 'slot' + i;
  slot.classList.add('slot');
  slot.addEventListener('click', function() {
    toggleBooking(slot.id);
  });
  slotsContainer.appendChild(slot);
}

function loadBookedSlots() {
  const storedBookedSlots = localStorage.getItem('bookedSlots');
  if (storedBookedSlots) {
    bookedSlots = JSON.parse(storedBookedSlots);
    emptySlotsCount = totalSlots - bookedSlots.length;

    bookedSlots.forEach((slot) => {
      const element = document.getElementById(slot);
      if (element) {
        element.classList.add('booked');
        element.classList.add('selected');
      }
    });
  }
}

function saveBookedSlots() {
  localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
}

loadBookedSlots();
updateEmptySlotsCount();

parkingSlotsTab.addEventListener('click', showManageSlots);
goToHomeLink.addEventListener('click', showHome);
