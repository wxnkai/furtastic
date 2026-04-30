# 🐾 Furtastic
### *Where Every Pet Journey is Furtastically Managed* 🐱🐶🐰

**⚠️ Archived Project**

This repository is archived and no longer actively maintained. It was developed as a university assignment for a **Front-End Web Development** course.

**⚠️ Note:**

The project may not work as expected as the APIs and Firebase keys have been terminated.

## Overview

**Furtastic** is a fully functional pet management website designed to make pet care effortless and organised. From rehoming pets to browsing services, reading blogs, and connecting with the community — Furtastic brings everything a pet lover needs into one place.

Whether you're a proud pet parent, a vet, or just someone who loves to keep things neat, Furtastic has you covered! 🐾



## Features

Derived from the site's pages, Furtastic includes:

| Page                                         | Description                        |
| -------------------------------------------- | ---------------------------------- |
| 🏠 `index.html`                              | Landing / home page                |
| 🔐 `index1.html`                             | Login / authentication page        |
| 🛎️ `services.html`                           | Pet services offered               |
| 🏡 `rehome-page.html`                        | Pet rehoming listings              |
| 🖼️ `gallery.html`                            | Pet photo gallery                  |
| 📅 `event.html`                              | Pet events and activities          |
| 📝 `blog.html` / `blog2.html` / `blog3.html` | Pet care blog articles             |
| 🌐 `socialmedia.html`                        | Social media integration           |
| 💬 `testimonial.html`                        | User testimonials                  |
| ❓ `faqs.html`                               | Frequently asked questions         |
| 📬 `contact.html`                            | Contact form (via `sendEmail.php`) |
| 📜 `t&c.html`                                | Terms and conditions               |



## Tech Stack

| Layer | Technology |
| - | - |
| Structure | HTML5 |
| Styling | CSS3 |
| Interactivity | JavaScript |
| Email | PHP (`sendEmail.php`) |
| Database & Auth | Firebase (Realtime DB + Authentication) |

## Folder Structure

```
furtastic/
├── assets/          # Images and static media
├── css/             # Stylesheets
├── js/              # JavaScript files
├── index.html       # Home page
├── index1.html      # Login page
├── services.html
├── rehome-page.html
├── gallery.html
├── event.html
├── blog.html
├── blog2.html
├── blog3.html
├── socialmedia.html
├── testimonial.html
├── faqs.html
├── contact.html
├── sendEmail.php    # Contact form mailer
├── t&c.html
└── README.md
```

## Getting Started

As this is a static website, you can run it locally with minimal setup.

1. **Clone the repository**
   ```bash
   git clone https://github.com/wxnkai/furtastic.git
   cd furtastic
   ```

2. **Open in browser**
   Simply open `index.html` in any modern web browser.
   ```bash
   # Or use a local dev server for full functionality
   npx serve .
   ```

3. **Firebase setup** *(optional — for auth & database features)*
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Replace the Firebase config object in the relevant `.js` files with your own credentials
   - Enable Authentication and Realtime Database in the Firebase console

4. **Email setup** *(optional — for contact form)*
   - Configure `sendEmail.php` with your SMTP credentials or a mail API



## Academic Context

This project was developed as part of a **Front-End Web Development** university course assignment — and notably, it was the authors' **first-ever website**. It demonstrates foundational skills in HTML, CSS, JavaScript, and third-party API integration (Firebase).

> "So, if you find any bugs… uh, let's call them features!" — the authors

> This repository is **archived** — no pull requests or issues will be reviewed.



## License

This project is for educational purposes only. All rights reserved by the authors.
