# Architecture

## Overview

This version is a static, client-side web application. It intentionally uses no backend or external AI service.

```text
User
 |
 v
index.html (screens and controls)
 |
 v
app.js (interaction logic)
 |            |                 |
 |            |                 +--> Browser Speech APIs
 |            |                      - SpeechSynthesis (text-to-speech)
 |            |                      - SpeechRecognition (optional speech-to-text)
 |            |
 |            +--> localStorage
 |                 - activity type
 |                 - timestamp
 |                 - short activity detail
 |
 v
Caregiver View (counts and recent entries)
```

## Main modules

- **My Space:** phrase cards, text input, voice controls, voluntary check-in, focus activity.
- **Speech adapter:** uses browser-provided speech APIs when available; otherwise displays a fallback message.
- **Activity logger:** stores a limited list of entries in browser `localStorage`.
- **Caregiver View:** renders the locally stored log and simple counts.
- **About:** communicates limitations, privacy considerations, and accessibility choices.

## Data model

Each local log item has the following shape:

```json
{
  "time": "2026-10-26T10:30:00.000Z",
  "type": "Self-reported check-in",
  "details": "Calm"
}
```

The app stores up to 100 recent entries. It does not send entries to a server.

## Trust and safety boundaries

- No automated emotion inference or autism severity prediction is implemented.
- The app does not provide medical advice or emergency alerts.
- Local storage is not a secure health-data store. Do not store sensitive information.
- Before adding cloud services, create a threat model and consent, access, retention, deletion, and security requirements.
