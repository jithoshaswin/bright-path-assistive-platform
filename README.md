# Bright Path — Autism Communication & Support Prototype

Bright Path is a beginner-friendly, front-end prototype for an assistive communication and learning support project. It demonstrates communication phrase cards, browser text-to-speech, optional speech-to-text, a voluntary self-reported feelings check-in, a simple focus activity, and a caregiver activity summary.

> **Important:** This is an educational prototype, not a medical device. It does not diagnose autism, infer emotions automatically, detect sensory overload, or provide clinical recommendations. Do not use it for emergency monitoring or clinical decisions.

## Features

- Child-friendly communication phrase buttons
- Text-to-speech using the browser's speech synthesis API
- Speech-to-text where the browser supports Web Speech recognition
- Optional self-reported feelings check-in (not automatic emotion recognition)
- Simple focus activity
- Caregiver view with activity counts and recent entries
- Local browser storage; no server or cloud upload
- Responsive layout, keyboard focus indicators, labels, and status announcements

## Tech stack

- HTML5
- CSS3 (responsive layout and reduced-motion preference)
- Vanilla JavaScript
- Browser Web Speech APIs (availability varies by browser)
- `localStorage` for a demo-only activity log

No build step, API key, database, or special hardware is required.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

For best results, use a local development server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

Speech recognition support differs between browsers and may require microphone permission and a secure context. If it is unavailable, use the text input and text-to-speech button.

## Project structure

```text
bright-path/
├── index.html
├── styles.css
├── app.js
├── README.md
├── ARCHITECTURE.md
├── SAMPLE_DATA.md
├── TEST_CASES.md
├── LICENSE
└── .gitignore
```

## Privacy and safety

- The demo stores activity entries in the browser's local storage on the current device.
- Anyone with access to the same browser profile may be able to view these entries. Use the **Clear local log** button on the Caregiver View to remove them.
- Avoid entering names, contact details, diagnoses, or other sensitive personal information.
- Browser speech features may process audio according to the browser/provider's policies. Check those policies before using speech recognition with children.
- Use with caregiver/educator guidance. Obtain appropriate consent and conduct accessibility/usability testing before any real-world deployment.
- Mood entries are self-reported; they are not emotion-recognition results.

## Known limitations

- No login, backend, cloud sync, encryption layer, or multi-user access control
- No machine-learning model is included
- Speech recognition may be unavailable or inaccurate for some users/languages
- Focus activities are illustrative and have not been clinically validated
- No emergency alerting or therapist recommendation engine

## Suggested future work

1. Co-design and test with autistic people, caregivers, and specialists.
2. Add optional picture-based AAC cards and configurable sensory settings.
3. Add multilingual phrase packs.
4. If cloud sync is required, design consent, data minimization, access control, encryption, retention, and deletion first.
5. Evaluate usability and accessibility with informed consent and clear safeguards.

## License

Released under the MIT License. See `LICENSE`.
