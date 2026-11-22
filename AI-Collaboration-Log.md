
# CAMPUS BREW — AI COLLABORATION LOG

**University:** UPES
**Course:** AI Foundations & Ethical AI
**Project:** CS-1 — The Café Website
**Academic Year:** 2026–27
**Team Size:** 6 Students

## Project Objective

Develop a responsive, multi-page café website
using HTML, CSS and JavaScript.

Evaluate AI-generated code, identify genuine
limitations, test proposed solutions and
document the improvements.

## Entry 1 — Website Planning

**Prompt to AI:**
"Campus Brew Cafe ka naam final hai.
Website banana step by step shuru karwao."

**AI Response:**
AI suggested a multi-page café website
with Home, Menu, About, Contact and
Ordering pages.

**Team Decision:**
The Campus Brew concept was selected
with a modern, student-friendly design.

**Implementation:**
The website was developed using HTML,
CSS and JavaScript.

**Evaluation:**
The initial website structure was tested
through browser navigation.

**Result:**
All five website pages were subsequently
created and tested successfully.



## Entry 2 — Coffee Image Loading Issue

**AI-Generated Suggestion:**
AI initially suggested loading the homepage
coffee image from an external Unsplash URL.

**Problem Identified:**
The homepage image depended on an external
internet connection.

**Testing Method:**
Chrome Developer Tools was opened.
Network throttling was changed to Offline,
with browser cache disabled.

**Observed Result:**
The coffee image failed to load offline.

**Correction Applied:**
The image was downloaded and saved locally
inside the project's images folder.

The HTML image path was updated to use
a local file instead of the external URL.

**Verification:**
The homepage was tested again in Offline
mode, and the coffee image loaded.

**Learning Outcome:**
External image dependencies can reduce
website reliability. Local assets improve
offline availability and project portability.

**Status:** VERIFIED AND FIXED



## Entry 3 — Contact Form Validation Bug

**Prompt to AI:**
"Campus Brew mein sirf spaces wala Contact
Form message accept ho gaya. Is genuine
validation bug ka cause investigate aur
fix karwao."

**AI Response:**
AI identified that the form submission
handler did not properly validate
whitespace-only input.

**Problem Identified:**
The Contact Form accepted a message
containing only five spaces and displayed
a success confirmation.

**Testing Method:**
1. Opened the Contact Page.
2. Entered a valid name and email.
3. Pressed Spacebar five times in the
   message field.
4. Clicked Send Message.

**Observed Result:**
The form accepted the whitespace-only
message instead of rejecting it.

**Correction Applied:**
JavaScript validation was improved using
the trim() method.

The corrected code checks whether the
name or message contains meaningful text.

Example:

if (!message.value.trim()) {
  message.setCustomValidity(
    "Please enter meaningful text."
  );
  message.reportValidity();
  return;
}

**Verification:**
The corrected Contact Form was later
tested with valid input and successfully
displayed its confirmation message.

A separate post-fix whitespace-only
retest is still required for full
verification of this specific bug.

**Learning Outcome:**
HTML required validation alone does not
reject whitespace-only text. JavaScript
validation is necessary for this case.

**Status:** VERIFIED AND FIXED

## Entry 4 — AI Error #3: Cart Data Loss on Refresh

**Prompt to AI:**
"Campus Brew mein refresh karne par Smart Cart
empty ho gaya. AI Error #3 investigate karwao."

**AI Response:**
AI identified that the shopping cart used
JavaScript Map() to store items temporarily.

AI suggested using browser localStorage
to preserve cart items across page refreshes.

**Problem Identified:**
The Smart Cart lost all selected items
when the webpage was refreshed.

**Testing Method:**
1. Added Cappuccino (₹120) to the cart.
2. Added Veg Burger (₹99).
3. Verified the total was ₹219.
4. Refreshed the webpage.

**Original Result:**
Both items disappeared and the cart
total returned to ₹0.

**Correction Applied:**
Implemented localStorage-based cart persistence.

- Saved cart data using JSON.stringify().
- Restored saved data using JSON.parse().
- Validated product IDs and quantities.
- Automatically saved cart changes.
- Cleared saved cart after checkout.

**Verification:**
Test 1:
Cappuccino + Veg Burger = ₹219.
After refreshing, both items remained
in the cart with the correct ₹219 total.

Result: PASS

Test 2:
Completed checkout with UPI selected.
The cart reset to ₹0.

After refreshing, the cart remained empty.
Previously purchased items did not reappear.

Result: PASS

**Learning Outcome:**
JavaScript Map() stores data in memory.
Browser localStorage can preserve cart data
across refreshes.

Saved data must be validated before use,
and the cart must be cleared after checkout.

**Status:** VERIFIED AND FIXED

## Entry 5 — AI Error #4: Multi-Tab Cart Synchronization

**Prompt to AI:**
"Campus Brew mein Tab 2 bina refresh quantity
20 dikha raha hai. Multi-tab synchronization
limitation investigate karwao."

**Problem Identified:**
The shopping cart was stored in localStorage,
but changes made in one browser tab were not
automatically reflected in another open tab.

**Original Test:**
1. Opened the Order Page in two Chrome tabs.
2. Added 20 Cappuccinos to the cart.
3. Decreased quantity to 19 in Tab 1.
4. Checked Tab 2 without refreshing.

**Observed Result:**
Tab 1 displayed 19 items (₹2,280).
Tab 2 still displayed 20 items (₹2,400).

**AI-Suggested Solution:**
Use the browser's storage event to detect
cart changes made in other tabs.

**Correction Applied:**
1. Added a storage event listener.
2. Restored valid cart data from localStorage.
3. Separated cart rendering from saving.
4. Added saveCart() to Add, Plus, Minus
   and Remove button actions.
5. Added saveCart() after cart.clear()
   during checkout.

**Additional Issue:**
The first multi-tab checkout test failed.
Tab 2 still displayed ₹120 after checkout.

**Root Cause:**
The checkout handler cleared the in-memory
cart without saving the empty cart to
localStorage.

**Final Verification:**
Test 1:
Adding Cappuccino in Tab 1 automatically
updated Tab 2 without refreshing.

Result: PASS

Test 2:
Completed a ₹120 UPI checkout in Tab 1.
Both tabs displayed an empty cart (₹0)
without refreshing Tab 2.

Result: PASS

**Learning Outcome:**
localStorage persistence and live multi-tab
synchronization are different features.

A storage event listener is required to
respond to changes from other tabs.

Cart changes must be saved consistently,
including after checkout.

**Status:** VERIFIED AND FIXED

## Entry 6 — Accessibility Testing

**Objective:**
Evaluate basic website accessibility.

**Tests Performed:**
1. Keyboard navigation using Tab.
2. Visible keyboard focus outline.
3. Image alternative text.
4. Search for "outline: none" in CSS.

**Results:**
- Keyboard focus navigation: PASS
- Visible focus outline: PASS
- Homepage image alt text: PRESENT
- "outline: none" search: No results

**Conclusion:**
The tested accessibility features passed.
A complete accessibility audit has not
yet been performed.

**Status:** TESTED — NO ISSUE FOUND


## Entry 7 — AI Error #5 Candidate: Stale Order Summary Across Tabs

**Code review finding:** The storage event listener updated the cart but did not hide an older order summary. After checkout in Tab 1, a new cart addition in Tab 2 could leave the previous summary visible alongside the new cart in Tab 1. This is a potential misleading UI state.

**AI-assisted correction:** Added `summary.hidden = true` to the storage-event handler before `render()`. The updated cart can then appear without an unrelated older order summary.

**Evidence:** The missing invalidation was identified by inspecting `cart.js` in the supplied ZIP.

**Verification status:** SOURCE-CODE FIX APPLIED; TWO-TAB BROWSER RETEST PENDING. Do not claim a fifth verified error until the reproduction and post-fix test are performed.
