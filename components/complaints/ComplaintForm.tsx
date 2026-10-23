"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Alert } from "@/components/ui/Alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { COMPLAINT_CATEGORIES } from "@/lib/constants";
import { submitComplaint } from "@/lib/services/complaints.service";
import { useState } from "react";
import { toast } from "sonner";

export function ComplaintForm({
  studentSic,
  onSuccess,
}: {
  studentSic: string;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(COMPLAINT_CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) { setError("Please enter a complaint title."); return; }
    if (!description.trim()) { setError("Please enter a description."); return; }
    if (!location.trim()) { setError("Please enter a location."); return; }

    setSubmitting(true);
    setSuccess(false);
    try {
      await submitComplaint({
        student_sic: studentSic,
        title: title.trim(),
        description: description.trim(),
        category,
        location: location.trim(),
      });
      setTitle("");
      setDescription("");
      setLocation("");
      setSuccess(true);
      toast.success("Complaint submitted successfully!");
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Failed to submit complaint. Please try again.");
      toast.error("Failed to submit complaint.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Complaint</CardTitle>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert variant="success" className="mb-4">
            Complaint submitted successfully. Track it in the table below.
          </Alert>
        )}
        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Complaint Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Brief summary of the issue"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Detailed description..."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {COMPLAINT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Building / area"
              />
            </div>
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
