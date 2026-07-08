# AI_RULES.md

# SiagaKota Frontend Development Rules

Version: 1.0

---

# Overview

You are working on **SiagaKota**, a production-ready React application.

This project follows modern frontend architecture.

The goal is maintainable, scalable, reusable, responsive, and clean code.

Always think like a Senior Frontend Engineer.

Never think like an AI code generator.

---

# Tech Stack

React 19

Vite

JavaScript (NO TypeScript)

Tailwind CSS v4

React Router DOM

TanStack Query

Axios

React Hook Form

Zod

Framer Motion

Lucide React

React Leaflet

Recharts

---

# General Rules

- Never redesign the UI.
- Follow the Figma design exactly.
- Pixel-perfect implementation.
- Mobile First.
- Responsive.
- Accessible.
- Reusable.
- Maintainable.
- Scalable.

---

# Project Structure

Always follow this structure.

```text
src/

assets/
    images/
    icons/
    fonts/

components/
    common/
    ui/
    layout/
    map/

features/
    landing/
    auth/
    dashboard/
    report/
    prediction/
    notification/
    leaderboard/
    education/
    profile/
    announcement/

hooks/

layouts/

lib/

routes/

services/

store/

styles/

utils/

App.jsx

main.jsx
```

Never create new folders unless necessary.

---

# Folder Rules

## components/

Contains reusable UI.

Examples:

Button

Input

Modal

Card

Table

Badge

Avatar

Navbar

Sidebar

Footer

SearchBar

Pagination

---

## features/

Contains feature-specific code.

Example:

```text
report/

components/

pages/

hooks/

validation/

api/
```

Do NOT place feature components inside global components.

---

## layouts/

Contains layouts only.

LandingLayout

AuthLayout

DashboardLayout

MainLayout

Every page must use a Layout.

---

## services/

Contains API services only.

No business logic.

---

## hooks/

Contains reusable custom hooks.

---

## utils/

Contains helper functions.

---

## lib/

Contains reusable utilities.

Example:

cn()

constants

helpers

---

# Naming Convention

Everything uses English.

Folders

Files

Variables

Functions

Hooks

Props

Components

State

Examples

Good

LoginPage.jsx

ReportCard.jsx

PredictionCard.jsx

UserMenu.jsx

FloodMap.jsx

WeatherWidget.jsx

Bad

HalamanLogin.jsx

LaporanCard.jsx

PrediksiCard.jsx

---

# UI Language

Visible text remains Indonesian.

Example

Correct

Masuk

Daftar

Lapor

Dashboard

Prediksi

Wrong

Login

Register

Prediction

Unless specified otherwise by design.

---

# Component Rules

Never create giant JSX files.

Maximum:

250 lines per file.

If a component exceeds 250 lines:

Split it.

Extract reusable components.

---

# Reusable Components

Always reuse.

Examples

Button

Input

Textarea

Card

Badge

Avatar

Dropdown

Modal

Drawer

Table

Pagination

FilterBar

SearchBar

StatisticCard

NotificationCard

PredictionCard

ReportCard

WeatherCard

MapLegend

MapMarker

Never duplicate them.

---

# Before Creating a Component

Always check:

Does this component already exist?

YES

Reuse it.

NO

Create a reusable component.

Never duplicate UI.

---

# Layout Rules

Landing

LandingLayout

Authentication

AuthLayout

Dashboard

DashboardLayout

Public

MainLayout

Every page must use Layout.

---

# Responsive Rules

Target

Desktop

1440px

Laptop

1280px

Tablet

768px

Mobile

390px

Requirements

Mobile First

No horizontal scrolling

Cards wrap automatically

Grid becomes one column

Sidebar becomes Drawer

Navigation becomes Hamburger

Buttons become full width when needed

Table becomes scrollable

---

# Tailwind Rules

Use Tailwind CSS only.

Do NOT use

CSS Modules

Styled Components

Emotion

Bootstrap

Inline CSS

Prefer

Flex

Grid

Gap

Responsive utilities

Tailwind variables

---

# Animation Rules

Use Framer Motion.

Allowed

Fade

Slide

Scale

Hover

Drawer

Sidebar

Accordion

Modal

Page Transition

Loading Skeleton

Duration

200–500ms

Smooth

Natural

Professional

Do NOT over animate.

---

# Form Rules

Use

React Hook Form

Zod

Prepare validation only.

No backend integration.

---

# API Rules

Backend is NOT ready.

Do NOT implement API.

Create placeholder services only.

Example

auth.service.js

report.service.js

prediction.service.js

No fake API.

No mock server.

---

# State Management

Do NOT use Redux.

Do NOT use Zustand.

Use local state.

Prepare components for TanStack Query.

---

# Icons

Only use

Lucide React

---

# Images

Import assets.

Do NOT hardcode image URLs.

---

# Accessibility

Always include

aria-label

alt

button type

semantic HTML

keyboard navigation

---

# Code Style

Follow

SOLID

Single Responsibility Principle

DRY

KISS

Readable

Maintainable

Reusable

Scalable

---

# Performance

Lazy load pages.

Memoize expensive components when needed.

Avoid unnecessary rerenders.

Keep components small.

---

# AI Behavior

Never generate the whole project.

Generate ONLY the requested page.

Do NOT modify unrelated files.

Do NOT rename existing files.

Do NOT change architecture.

Only generate files related to the current task.

---

# Current Task Rule

Every prompt will include

Current Task

Only generate files related to that task.

Ignore everything else.

---

# Expected Output

Generate

Folder placement

Component hierarchy

Responsive React components

Tailwind CSS

Framer Motion

Reusable architecture

Ready for backend integration

Nothing else.

# ROLE-BASED ROUTING

This project uses role-based routing.

Every authenticated page MUST include the role prefix.

Public

/

/map

/report

/education

/about

Authentication

/login

/register

Citizen

/citizen/...

Officer

/officer/...

Government

/government/...

Never generate generic authenticated routes such as

/dashboard

/profile

/settings

/reports

Always use role-specific routes.

Prepare all navigation, breadcrumbs, links, and redirects using the appropriate role prefix.

Whenever possible, use centralized route constants instead of hardcoded strings.