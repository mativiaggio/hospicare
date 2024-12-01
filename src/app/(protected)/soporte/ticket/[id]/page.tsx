"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { tickets, comments, Ticket } from "../../_components/data";

export default function TicketDetailPage() {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");

  const ticket = tickets.find((t) => t.id === id) as Ticket;
  const ticketComments = comments.filter((c) => c.ticketId === id);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new comment to your backend
    console.log("New comment:", newComment);
    setNewComment("");
  };

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">{ticket.title}</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-5">
        <p className="text-sm text-gray-500">Status: {ticket.status}</p>
        <p className="text-sm text-gray-500">
          Created: {new Date(ticket.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          Updated: {new Date(ticket.updatedAt).toLocaleString()}
        </p>
        <p className="mt-4">{ticket.description}</p>
      </div>
      <h2 className="text-2xl font-bold mb-3">Comments</h2>
      <div className="space-y-4 mb-5">
        {ticketComments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">
              User {comment.userId} at{" "}
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <Button type="submit">Add Comment</Button>
      </form>
    </div>
  );
}
