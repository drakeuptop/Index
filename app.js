const btn = document.getElementById("sendBtn");
const emailEl = document.getElementById("email");
const msg = document.getElementById("msg");

btn?.addEventListener("click", async () => {
  const email = (emailEl.value || "").trim();
  if (!email) {
    msg.textContent = "Please enter an email address.";
    return;
  }

  btn.disabled = true;
  msg.textContent = "Sending…";

  try {
    const res = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        eventTitle: "LSU SPORT — Football vs. Southern Louisiana",
        dateTime: "Sat, Sep 20, 2025 • 6:45 PM",
        venue: "Tiger Stadium",
        seats: "Sec 101 • Row 30 • Seats 1–2",
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      msg.textContent = `✅ Sent to ${email}`;
    } else {
      msg.textContent = `❌ Failed: ${data.error || res.statusText}`;
    }
  } catch (e) {
    msg.textContent = `❌ Error: ${e.message}`;
  } finally {
    btn.disabled = false;
  }
});
