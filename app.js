document.getElementById("sendBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();

  // basic guard
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("Enter a valid email address.");
    return;
  }

  setSending(true);
  try {
    const res = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }) // <-- important
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json?.error?.message || json?.error || "Failed to send");
    showSuccess("Email sent!");
  } catch (e) {
    showError(e.message);
  } finally {
    setSending(false);
  }
});
