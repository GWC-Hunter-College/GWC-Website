# Page gallery

These reference images were captured locally at a 1440px desktop width on August 28, 2026. They document the complete frontend presentation rather than a production data state.

Events and Initiatives currently show Work in Progress placeholders. Their images below were captured from the complete implementations preserved in their source files, as requested, so the designs remain available for future development.

## Home

Route: `/`

The Home page introduces the club, provides direct Learn More and Join Us actions, explains the community, shows event photography, presents an interactive member directory, and ends with frequently asked questions.

![Full Home page](screenshots/home.png)

## Membership

Route: `/membership`

The Membership page combines the member hero and the entire responsive form. The page handles validation in the browser and shows a confirmation message, but it does not persist or transmit submission data.

![Full Membership page](screenshots/membership.png)

## Events — preserved full design

Route: `/events`

The preserved Events design presents a configurable featured-event title, schedule, and RSVP action. The active route currently replaces this view with a Work in Progress page until real event data becomes available.

![Preserved Events page design](screenshots/events-full-design.png)

## Initiatives — preserved full design

Route: `/initiatives`

The preserved Initiatives design contains a hero, category chips, and a typed card grid for four student programs. The active route currently replaces this directory with a Work in Progress page until the directory is ready to launch.

![Preserved Initiatives page design](screenshots/initiatives-full-design.png)

## Not Found

Route: any unmatched URL

The fallback page keeps the shared navigation and footer and provides a clear return path to Home.

![Not Found page](screenshots/not-found.png)
