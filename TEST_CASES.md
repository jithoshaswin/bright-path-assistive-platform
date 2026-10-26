# Test cases

Run the app in a modern browser and verify the following manually.

| ID | Test | Steps | Expected result |
|---|---|---|---|
| TC-01 | Navigation | Select My Space, Caregiver View, About | Correct panel appears and selected tab is announced |
| TC-02 | Phrase card | Tap “I need a break” | Phrase fills text box, speech plays if supported, activity is logged |
| TC-03 | Typed text-to-speech | Enter a short message and click Read aloud | Browser reads message if supported; status updates |
| TC-04 | Empty message | Clear message and click Read aloud | Helpful availability/empty-message status appears |
| TC-05 | Speech-to-text supported | Click Speech to text and grant permission | Recognized transcript appears in text box and is logged |
| TC-06 | Speech-to-text unsupported | Use a browser without SpeechRecognition | Fallback message asks user to type |
| TC-07 | Feelings check-in | Select “Calm” | Confirmation appears and self-reported entry is logged |
| TC-08 | Focus activity validation | Click Finish activity without selecting a shape | Prompt to select or skip appears; no entry is added |
| TC-09 | Focus activity success | Select a shape and finish | Success status appears and entry is logged |
| TC-10 | Caregiver counts | Create phrase and focus entries, open Caregiver View | Counts and recent entries match actions |
| TC-11 | Clear log | Click Clear local log and confirm | Local entries and counts clear |
| TC-12 | Clear cancellation | Click Clear local log and cancel | Existing entries remain |
| TC-13 | Responsive layout | Resize browser to mobile width | Cards and controls fit the viewport |
| TC-14 | Keyboard access | Navigate using Tab and activate controls with Enter/Space | Controls are reachable and focus is visible |
| TC-15 | Refresh persistence | Create an entry and refresh the page | Entry remains in the same browser profile |

## Lightweight test hook

The app exposes `window.BrightPathTest.isValidEntry(entry)` for basic shape checking in the browser console. Example:

```javascript
BrightPathTest.isValidEntry({
  type: "Self-reported check-in",
  details: "Calm"
}); // true
```
