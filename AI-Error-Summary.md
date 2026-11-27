
# CAMPUS BREW — AI ERROR ANALYSIS SUMMARY

**University:** UPES
**Course:** AI Foundations & Ethical AI
**Project:** Campus Brew Cafe Website
**Year:** 2026

## 1. Introduction

Campus Brew is a responsive cafe website built
using HTML, CSS and JavaScript with AI assistance.

AI-generated suggestions were evaluated through
manual browser testing, debugging and code review.

The following four issues were identified and
corrected during development.

## 2. Error Analysis

### Error 1 — External Image Dependency

**Problem:**
The homepage coffee image depended on an
external image URL and failed to load offline.

**Cause:**
The image was not stored locally.

**Correction:**
Downloaded the image and updated the HTML
to reference a local file.

**Verification:**
Offline image-loading test passed in the
earlier website version.

**Status:** Fixed in earlier version.

### Error 2 — Whitespace Validation Bug

**Problem:**
The Contact Form accepted a message
containing only spaces.

**Cause:**
The initial validation did not reject
whitespace-only input.

**Correction:**
Added JavaScript validation using trim()
and setCustomValidity().

**Verification:**
A five-spaces-only message was rejected
during the final retest.

**Status:** Verified and Fixed.

### Error 3 — Cart Data Loss on Refresh

**Problem:**
Cart items disappeared after refreshing
the Order Page.

**Cause:**
The cart was stored only in a JavaScript Map.

**Correction:**
Implemented localStorage persistence,
saved cart changes and restored valid items.

**Verification:**
Coffee + Burger (₹219) remained in the
cart after refreshing.

Checkout cleared the cart, and it remained
empty after another refresh.

**Status:** Verified and Fixed.

### Error 4 — Multi-Tab Synchronization

**Problem:**
Cart changes in one Chrome tab were not
automatically displayed in another tab.

**Cause:**
The initial implementation did not
synchronize in-memory carts across tabs.

**Correction:**
Added a storage event listener and ensured
cart changes were saved to localStorage.

A further checkout bug was corrected by
saving the empty cart after cart.clear().

**Verification:**
Adding Cappuccino in Tab 1 updated Tab 2.

After checkout, both tabs displayed ₹0
without manually refreshing Tab 2.

**Status:** Verified and Fixed.

## 3. Additional Tests

The following tests passed:

- Empty cart checkout prevention
- Maximum quantity limit of 20
- Duplicate checkout prevention
- Contact Name whitespace validation
- Keyboard focus visibility
- Image alternative text
- Mobile checkout at 390px width
- UPI, Card and Cash selection

These successful tests were not counted
as AI errors.

## 4. Ethical AI Reflection

AI helped generate code and suggest fixes,
but its outputs required human verification.

Some solutions initially appeared correct
yet failed additional tests.

For example, cart persistence did not
automatically provide multi-tab synchronization.

The project demonstrates the importance
of testing, critical evaluation and
responsible use of AI-generated code.

## 5. Conclusion

Four development issues were documented
with observed behaviour, corrections and
verification evidence.

A fifth genuine AI error has not yet been
confirmed and should not be fabricated.

The website remains a frontend-only
academic project. It does not transmit
orders, collect real payments or send
contact messages to a server.


## Error #5 Candidate — Stale Checkout Summary Across Tabs
Code review found that external cart updates did not hide an earlier order summary. Added summary invalidation in the storage listener. **Browser reproduction/retest pending**; this is not yet counted as a verified fifth error.


## Additional finding - stale order summary
When the user changed the cart after generating an order summary, the old summary could remain visible. The UI now hides the summary on local cart changes and payment selection changes. This is a separate UI state issue, but it has not been independently verified in a real browser on the published site; do not claim five verified errors on this basis alone.
