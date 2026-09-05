export type EventPresentation = {
  title: string;
  schedule: string;
  rsvpLabel: string;
  rsvpUrl: string | null;
  rsvpUnavailableMessage: string;
};

export const featuredEvent: EventPresentation = {
  title: "CURRENT EVENT",
  schedule: "TIME AND DATE",
  rsvpLabel: "RSVP",
  rsvpUrl: null,
  rsvpUnavailableMessage: "RSVP details are coming soon",
};
