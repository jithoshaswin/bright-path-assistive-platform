(() => {
  "use strict";
  const STORAGE_KEY = "brightPathActivityLog";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  let log = loadLog();

  function loadLog() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function saveLog() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
      renderLog();
    } catch {
      announce("#voice-status", "Unable to save on this device. Check browser storage settings.");
    }
  }

  function addEntry(type, details) {
    log.unshift({ time: new Date().toISOString(), type, details: String(details).slice(0, 300) });
    log = log.slice(0, 100);
    saveLog();
  }

  function announce(selector, message) {
    const el = $(selector);
    if (el) el.textContent = message;
  }

  function speak(text) {
    if (!("speechSynthesis" in window) || !text.trim()) {
      announce("#voice-status", "Text-to-speech is not available, or the message is empty.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => announce("#voice-status", "Reading your message aloud.");
    utterance.onend = () => announce("#voice-status", "Finished reading.");
    utterance.onerror = () => announce("#voice-status", "Speech playback could not be completed.");
    window.speechSynthesis.speak(utterance);
    addEntry("Communication phrase", text);
  }

  $$(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".tab").forEach((tab) => {
        const selected = tab === button;
        tab.classList.toggle("active", selected);
        tab.setAttribute("aria-selected", String(selected));
      });
      $$(".panel").forEach((panel) => {
        const selected = panel.id === button.dataset.panel;
        panel.classList.toggle("active", selected);
        panel.hidden = !selected;
      });
      if (button.dataset.panel === "caregiver-panel") renderLog();
    });
  });

  $$(".phrase").forEach((button) => {
    button.addEventListener("click", () => {
      const phrase = button.dataset.phrase || "";
      $("#message").value = phrase;
      speak(phrase);
    });
  });

  $("#speak-btn").addEventListener("click", () => speak($("#message").value));

  $("#listen-btn").addEventListener("click", () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      announce("#voice-status", "Speech-to-text is not supported by this browser. You can type your message instead.");
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    announce("#voice-status", "Listening. Your browser may ask for microphone permission.");
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      $("#message").value = transcript;
      announce("#voice-status", transcript ? `Recognized: ${transcript}` : "No speech was recognized.");
      if (transcript) addEntry("Speech-to-text", transcript);
    };
    recognition.onerror = (event) => announce("#voice-status", `Speech recognition error: ${event.error || "unknown error"}. You can type instead.`);
    recognition.onend = () => {
      if ($("#voice-status").textContent === "Listening. Your browser may ask for microphone permission.") {
        announce("#voice-status", "Listening ended. Try again or type your message.");
      }
    };
    try { recognition.start(); }
    catch { announce("#voice-status", "Could not start speech recognition. Try again or type your message."); }
  });

  $$(".mood").forEach((button) => {
    button.addEventListener("click", () => {
      const mood = button.dataset.mood || "Not sure";
      announce("#mood-status", `You selected: ${mood}. Thank you for checking in.`);
      addEntry("Self-reported check-in", mood);
    });
  });

  $("#focus-submit").addEventListener("click", () => {
    const answer = $("#focus-choice").value;
    if (!answer) {
      announce("#focus-status", "Please choose a shape, or skip this activity if you prefer.");
      return;
    }
    addEntry("Focus activity", `Selected ${answer}`);
    announce("#focus-status", "Activity recorded. Great job trying the activity!");
  });

  $("#clear-log").addEventListener("click", () => {
    if (!window.confirm("Clear all Bright Path activity entries stored in this browser?")) return;
    log = [];
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    renderLog();
  });

  function renderLog() {
    const body = $("#log-rows");
    if (!body) return;
    body.replaceChildren();
    $("#total-count").textContent = String(log.length);
    $("#phrase-count").textContent = String(log.filter((item) => ["Communication phrase", "Speech-to-text"].includes(item.type)).length);
    $("#focus-count").textContent = String(log.filter((item) => item.type === "Focus activity").length);
    if (!log.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 3;
      cell.textContent = "No activities recorded yet.";
      row.append(cell);
      body.append(row);
      return;
    }
    log.forEach((item) => {
      const row = document.createElement("tr");
      const dateCell = document.createElement("td");
      const typeCell = document.createElement("td");
      const detailCell = document.createElement("td");
      const date = new Date(item.time);
      dateCell.textContent = Number.isNaN(date.getTime()) ? "Unknown" : date.toLocaleString();
      typeCell.textContent = item.type || "Activity";
      detailCell.textContent = item.details || "";
      row.append(dateCell, typeCell, detailCell);
      body.append(row);
    });
  }

  renderLog();

  // Exposed only for lightweight automated tests; no application data is exposed.
  if (typeof window !== "undefined") {
    window.BrightPathTest = Object.freeze({
      isValidEntry: (entry) => Boolean(entry && typeof entry.type === "string" && typeof entry.details === "string"),
      storageKey: STORAGE_KEY
    });
  }
})();
