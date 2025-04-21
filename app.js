if (Notification.permission !== "granted") {
  Notification.requestPermission();
}
console.log(Notification.permission)
function saveReminder(date, time, note) {
  const reminder = {
    datetime: new Date(`${date}T${time}`),
    note: note
  };
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.push(reminder);
  localStorage.setItem("reminders", JSON.stringify(reminders));
  closeReminder();
}
function saveReminder2(){
  let date = document.getElementById('date').value;
  let time = document.getElementById('time').value;
  let note = document.getElementById('note').value;
  if(date && time && note){
  saveReminder(date,time,note)
  }
}

setInterval(() => {
  const now = new Date();
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  reminders.forEach((reminder, index) => {
    const reminderTime = new Date(reminder.datetime);

    if (
      now.getFullYear() >= reminderTime.getFullYear() &&
      now.getMonth() >= reminderTime.getMonth() &&
      now.getDate() >= reminderTime.getDate() &&
      now.getHours() >= reminderTime.getHours() &&
      now.getMinutes() >= reminderTime.getMinutes()
    ) {
      showNotification(reminder.note);
      reminders.splice(index, 1); 
    }
  });

  localStorage.setItem("reminders", JSON.stringify(reminders));
}, 1000);
function showNotification(note) {
  if (Notification.permission === "granted") {
    new Notification("📚 Study Reminder", {
      body: note,
      icon: "favicon.png" 
    });
  }
}

function reminderPopup(){
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('reminder-popup').style.display = 'flex';
}
function closeReminder(){
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('reminder-popup').style.display = 'none';
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((reg) => console.log("✅ Service Worker registered!", reg))
      .catch((err) => console.error("❌ Service Worker registration failed:", err));
  });
}
