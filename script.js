const emptySlotsCountElement = document.querySelector('.empty-slots-count');
const parkingSlotsTab = document.getElementById('parkingSlotsTab');
const manageSlotsTab = document.getElementById('manageSlotsTab');
const manageSlotsContainer = document.getElementById('manageSlotsContainer');

let emptySlotsCount = 30;
const totalSlots = 30;
const bookedSlots = [];

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
}

function updateEmptySlotsCount() {
  emptySlotsCountElement.textContent = emptySlotsCount;
}

function showManageSlots() {
  parkingSlotsTab.style.display = 'none';
  manageSlotsTab.style.display = 'block';
  manageSlotsContainer.classList.add('active');
  document.querySelector('.empty-slots-tab').style.display = 'none';
  document.querySelector('.slots-container').style.display = 'flex';
}

function showParkingSlots() {
  parkingSlotsTab.style.display = 'block';
  manageSlotsTab.style.display = 'none';
  manageSlotsContainer.classList.remove('active');
  document.querySelector('.empty-slots-tab').style.display = 'flex';
  document.querySelector('.slots-container').style.display = 'none';
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

updateEmptySlotsCount();