import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  requirementTitle: string;
  clientName: string;
  onSubmit: (data: {
    type: "resume" | "linkedin";
    file?: File;
    linkedinUrl?: string;
    candidateName: string;
    candidateEmail: string;
    candidatePhone: string;
    notes: string;
  }) => void;
}

export function SubmissionModal({
  isOpen,
  onClose,
  requirementTitle,
  clientName,
  onSubmit,
}: SubmissionModalProps) {
  const [submissionType, setSubmissionType] = useState<"resume" | "linkedin">(
    "resume",
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Form validation
    if (submissionType === "resume" && !selectedFile) {
      alert("Please upload a resume file");
      setIsSubmitting(false);
      return;
    }

    if (submissionType === "linkedin" && !linkedinUrl) {
      alert("Please enter a LinkedIn URL");
      setIsSubmitting(false);
      return;
    }

    if (!candidateName || !candidateEmail) {
      alert("Please enter candidate name and email");
      setIsSubmitting(false);
      return;
    }

    onSubmit({
      type: submissionType,
      file: selectedFile || undefined,
      linkedinUrl: linkedinUrl || undefined,
      candidateName,
      candidateEmail,
      candidatePhone,
      notes,
    });

    // Reset form
    setSelectedFile(null);
    setLinkedinUrl("");
    setCandidateName("");
    setCandidateEmail("");
    setCandidatePhone("");
    setNotes("");
    setIsSubmitting(false);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Candidate</DialogTitle>
          <DialogDescription>
            Submitting for: <strong>{requirementTitle}</strong> - {clientName}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="resume"
          onValueChange={(value) =>
            setSubmissionType(value as "resume" | "linkedin")
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="resume">Upload Resume</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="resume" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="resume">Upload Resume (PDF, DOC, DOCX)</Label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <p className="text-xs text-muted-foreground">
                    Selected file: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="linkedin" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/..."
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Candidate Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="(123) 456-7890"
                value={candidatePhone}
                onChange={(e) => setCandidatePhone(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the candidate..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Candidate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
