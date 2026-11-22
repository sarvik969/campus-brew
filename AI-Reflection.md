# CAMPUS BREW — AI REFLECTION REPORT

**University:** UPES  
**Course:** AI Foundations & Ethical AI  
**Project:** CS-1 — The Café Website: Build, Launch, and Critique  
**Academic Year:** 2026–27

## 1. Introduction

The Campus Brew project involved developing a responsive, multi-page café website using HTML, CSS and JavaScript with assistance from generative AI. The main objective was not only to build a functional website but also to understand the strengths, limitations and ethical responsibilities associated with AI-generated code.

As a first-semester Computer Science student with basic programming knowledge in C, I initially found web development challenging. AI helped me understand the structure of web pages, create initial code and troubleshoot problems.

## 2. How I Used AI

I used ChatGPT as a coding assistant throughout the development process. AI provided suggestions for website planning, HTML structure, CSS styling, JavaScript functionality and debugging.

The website includes five pages: Home, Menu, About, Contact and Order. I also developed a shopping cart supporting multiple items, quantity controls, automatic price calculation and payment-method selection.

AI accelerated the development process, but its suggestions required testing and correction before they could be considered reliable.

## 3. AI Errors and Human Intervention

One of the most important lessons was that AI-generated code can appear correct while containing functional limitations.

During development, I identified and investigated several issues:

**External Image Dependency:** The original homepage relied on an external image URL that failed during offline testing. The image was downloaded locally to improve reliability.

**Contact Form Validation:** The form initially accepted messages containing only spaces. JavaScript validation using `trim()` was introduced to reject meaningless input.

**Cart Data Loss:** Shopping cart items disappeared after refreshing the page. Browser `localStorage` was implemented to preserve cart contents.

**Multi-Tab Synchronization:** Cart changes were initially not reflected across open browser tabs. A `storage` event listener and additional saving logic were added.

These experiences demonstrated that human testing is essential even when AI-generated solutions seem convincing.

## 4. Ethical AI Considerations

Transparency was an important consideration in this project. AI assistance should be disclosed rather than presenting all generated code as entirely independent work.

Another important responsibility is avoiding misleading functionality. Campus Brew is a frontend-only academic website. Its payment options simulate selection and do not process financial transactions. Similarly, contact messages and orders are not transmitted to a real café.

Accessibility and user experience were also considered through mobile responsiveness, keyboard navigation, focus indicators and image alternative text.

## 5. Skills and Learning Outcomes

This project improved my understanding of HTML, CSS, JavaScript, browser testing and debugging.

I learned how to inspect AI-generated code, identify problems, test possible solutions and verify whether corrections actually worked.

The shopping cart development was particularly useful because it introduced concepts such as JavaScript Maps, browser storage, event listeners and dynamic interface updates.

I also learned that solving one problem can introduce another. For example, implementing cart persistence did not automatically solve synchronization across multiple tabs.

## 6. Conclusion

Campus Brew helped me understand that generative AI is a useful development assistant but should not replace human reasoning, testing or responsibility.

The most valuable learning outcome was developing a critical approach to AI-generated suggestions rather than accepting them without verification.

In future projects, I intend to use AI for brainstorming, learning and debugging while independently evaluating its outputs and documenting its limitations.

**Final Reflection:** AI can accelerate development, but human judgment determines whether the final result is trustworthy.