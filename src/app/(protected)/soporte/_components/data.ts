export type TicketStatus = "open" | "in-progress" | "resolved";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Comment = {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: string;
};

export const tickets: Ticket[] = [
  {
    id: "1",
    title: "Cannot login to the application",
    description:
      "I am unable to login to the application. It shows an error message.",
    status: "open",
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-01T10:00:00Z",
    userId: "user1",
  },
  {
    id: "2",
    title: "Dashboard not loading properly",
    description:
      "The dashboard is not loading all the widgets. Some are missing.",
    status: "in-progress",
    createdAt: "2023-06-02T14:30:00Z",
    updatedAt: "2023-06-03T09:15:00Z",
    userId: "user2",
  },
  {
    id: "3",
    title: "Error when submitting form",
    description: "I get a 500 error when trying to submit the contact form.",
    status: "resolved",
    createdAt: "2023-06-03T11:45:00Z",
    updatedAt: "2023-06-04T16:20:00Z",
    userId: "user1",
  },
];

export const comments: Comment[] = [
  {
    id: "1",
    ticketId: "2",
    userId: "dev1",
    content:
      "I am looking into this issue. It seems to be related to a recent update.",
    createdAt: "2023-06-03T10:00:00Z",
  },
  {
    id: "2",
    ticketId: "2",
    userId: "dev2",
    content: "Found the problem. Working on a fix now.",
    createdAt: "2023-06-03T14:30:00Z",
  },
  {
    id: "3",
    ticketId: "3",
    userId: "dev1",
    content:
      "This has been fixed in the latest deployment. Please confirm if its working for you now.",
    createdAt: "2023-06-04T15:45:00Z",
  },
];
