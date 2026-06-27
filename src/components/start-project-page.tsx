"use client";

import { type FormEvent, useState } from "react";

const projectTypes = [
  "Business Website",
  "Landing Page",
  "E-Commerce Website",
  "Website Redesign",
  "Not Sure Yet",
];

const budgetRanges = [
  "Under PHP 25,000",
  "PHP 25,000 - PHP 50,000",
  "PHP 50,000 - PHP 100,000",
  "PHP 100,000 - PHP 250,000",
  "PHP 250,000+",
  "Not sure yet",
];

const timelines = [
  "As soon as possible",
  "2-4 weeks",
  "1-2 months",
  "3+ months",
  "Flexible",
];

const goals = [
  "Generate more inquiries",
  "Sell products online",
  "Explain services clearly",
  "Improve credibility",
  "Launch a new offer",
];

const steps = ["About You", "Business", "Challenges", "Goals", "Details", "Schedule"];
const lastStep = steps.length - 1;
type SelectName = "projectType" | "budget" | "timeline" | "primaryGoal";

type LeadForm = {
  audience: string;
  budget: string;
  challenge: string;
  company: string;
  email: string;
  fullName: string;
  mustHave: string;
  primaryGoal: string;
  projectType: string;
  timeline: string;
};

type FormErrors = Partial<Record<keyof LeadForm, string>>;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M4 10H15M11 6L15 10L11 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M10 6.5V10.8M10 13.6H10.01M17 15.5L10.9 4.8C10.5 4.1 9.5 4.1 9.1 4.8L3 15.5C2.6 16.2 3.1 17 3.9 17H16.1C16.9 17 17.4 16.2 17 15.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <span className="flex items-start gap-2 rounded-lg border border-[#ff9a2f]/32 bg-[#ff8a00]/12 px-3 py-2 text-xs leading-5 tracking-tight text-[#ffd7ad]">
      <span className="mt-0.5 shrink-0 text-[#ff9a2f]">
        <AlertIcon />
      </span>
      <span>{message}</span>
    </span>
  );
}

function Field({
  error,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = "text",
  value,
}: {
  error?: string;
  label: string;
  name: keyof LeadForm;
  onChange: (name: keyof LeadForm, value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-normal tracking-tight text-[#F3F3F3]/64">
        {label}
        {required ? <span className="text-[#8f86dc]"> *</span> : null}
      </span>
      <input
        aria-invalid={error ? true : undefined}
        className={`h-11 rounded-lg border bg-[#F3F3F3]/8 px-4 text-sm font-normal tracking-tight text-[#F3F3F3] outline-none transition placeholder:text-[#F3F3F3]/34 focus:bg-[#F3F3F3]/12 focus:ring-4 ${
          error
            ? "border-[#ff9a2f]/74 focus:border-[#ff9a2f] focus:ring-[#ff9a2f]/16"
            : "border-[#F3F3F3]/14 focus:border-[#8f86dc] focus:ring-[#8f86dc]/18"
        }`}
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        required={false}
        type={type}
        value={value}
      />
      <FieldError message={error} />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  onChange,
  placeholder,
  value,
}: {
  label: string;
  name: keyof LeadForm;
  onChange: (name: keyof LeadForm, value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-normal tracking-tight text-[#F3F3F3]/64">
        {label}
      </span>
      <textarea
        className="h-24 resize-none rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/8 px-4 py-3 text-sm font-normal leading-6 tracking-tight text-[#F3F3F3] outline-none transition placeholder:text-[#F3F3F3]/34 focus:border-[#8f86dc] focus:bg-[#F3F3F3]/12 focus:ring-4 focus:ring-[#8f86dc]/18"
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  onChange,
  onToggle,
  openSelect,
  options,
  placeholder,
  value,
}: {
  label: string;
  name: SelectName;
  onChange: (name: keyof LeadForm, value: string) => void;
  onToggle: (name: SelectName) => void;
  openSelect: SelectName | null;
  options: string[];
  placeholder: string;
  value: string;
}) {
  const isOpen = openSelect === name;

  return (
    <div className="relative grid gap-1.5">
      <span className="text-xs font-normal tracking-tight text-[#F3F3F3]/64">
        {label}
      </span>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex h-11 w-full items-center justify-between rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/8 px-4 text-left text-sm font-normal tracking-tight outline-none focus:border-[#8f86dc] focus:bg-[#F3F3F3]/12 focus:ring-4 focus:ring-[#8f86dc]/18 ${
          value ? "text-[#F3F3F3]" : "text-[#F3F3F3]/42"
        }`}
        onClick={() => onToggle(name)}
        type="button"
      >
        <span>{value || placeholder}</span>
        <span className={isOpen ? "rotate-180" : ""}>
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-40 grid gap-1 rounded-lg border border-[#F3F3F3]/14 bg-[#121037] p-1 shadow-[0_18px_54px_rgba(0,0,0,0.36)]"
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = value === option;

            return (
              <button
                aria-selected={isSelected}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-normal tracking-tight ${
                  isSelected
                    ? "bg-[#8f86dc] text-[#07062C]"
                    : "text-[#F3F3F3]/82 hover:bg-[#F3F3F3]/8 hover:text-[#F3F3F3]"
                }`}
                key={option}
                onClick={() => {
                  onChange(name, option);
                  onToggle(name);
                }}
                role="option"
                type="button"
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function StartProjectPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<LeadForm>({
    audience: "",
    budget: "",
    challenge: "",
    company: "",
    email: "",
    fullName: "",
    mustHave: "",
    primaryGoal: "",
    projectType: "",
    timeline: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openSelect, setOpenSelect] = useState<SelectName | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateForm(name: keyof LeadForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
  }

  function toggleSelect(name: SelectName) {
    setOpenSelect((current) => (current === name ? null : name));
  }

  function goBack() {
    if (activeStep === 0) {
      window.location.href = "/";
      return;
    }

    setOpenSelect(null);
    setActiveStep((current) => Math.max(0, current - 1));
  }

  async function sendEmail() {
    const response = await fetch("/api/project-inquiry", {
      body: JSON.stringify({
        ...form,
        message: [
          form.challenge && `Challenge: ${form.challenge}`,
          form.audience && `Audience: ${form.audience}`,
          form.mustHave && `Details: ${form.mustHave}`,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      throw new Error(
        result?.error ?? "EmailJS could not send the project details.",
      );
    }
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpenSelect(null);
    setSubmitError(null);

    if (activeStep === 0) {
      const nextErrors: FormErrors = {};

      if (!form.fullName.trim()) {
        nextErrors.fullName = "Please enter your name.";
      }

      if (!form.email.trim()) {
        nextErrors.email = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        nextErrors.email = "Use a valid email address, like hello@company.com.";
      }

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
    }

    if (activeStep < lastStep) {
      setActiveStep((current) => Math.min(lastStep, current + 1));
      return;
    }

    try {
      setIsSending(true);
      await sendEmail();
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your project details.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="webx-start-project flex h-dvh overflow-hidden px-4 py-6 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]">
      <div className="mx-auto grid w-full max-w-[1260px] items-center gap-8 lg:grid-cols-[0.42fr_0.58fr]">
        <aside className="hidden max-w-md lg:block">
          <a aria-label="Web X home" className="inline-flex" href="/">
            <img
              alt="Web X"
              className="h-9 w-auto brightness-0 invert"
              src="/webx%20logo/webx.svg"
            />
          </a>
          <h1 className="mt-10 text-5xl font-normal leading-[1.03] tracking-tighter">
            Tell us what you want to build.
          </h1>
          <p className="mt-5 text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/66">
            Share the essentials. We will use them to shape the first
            conversation around goals, scope, timing, and the clearest next step.
          </p>

          <div className="mt-10 grid gap-3 text-sm font-normal tracking-tight text-[#F3F3F3]/72">
            {[
              "A focused project fit review",
              "A practical path from idea to launch",
              "No spam, no pressure, just clarity",
            ].map((item) => (
              <div className="flex items-center gap-3" key={item}>
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#8f86dc] text-[#07062C]">
                  <ArrowIcon />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="mx-auto w-full max-w-[640px]">
          <div className="mb-8 grid grid-cols-6 gap-0 text-center text-[11px] font-normal tracking-tight text-[#F3F3F3]/48">
            {steps.map((step, index) => (
              <div className="relative grid justify-items-center gap-2" key={step}>
                {index > 0 ? (
                  <span className="absolute right-1/2 top-4 h-px w-full bg-[#F3F3F3]/14" />
                ) : null}
                <span
                  className={`relative z-10 grid size-8 place-items-center rounded-full border text-xs ${
                    index === activeStep
                      ? "border-[#8f86dc] bg-[#8f86dc] text-[#07062C]"
                      : index < activeStep
                        ? "border-[#8f86dc]/70 bg-[#8f86dc]/24 text-[#F3F3F3]"
                        : "border-[#F3F3F3]/18 bg-[#F3F3F3] text-[#07062C]/54"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`hidden sm:block ${
                    index === activeStep ? "text-[#F3F3F3]" : ""
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>

          {!isSubmitted ? (
            <form className="grid gap-4" noValidate onSubmit={handleFormSubmit}>
              <div>
                <h2 className="text-4xl font-normal leading-[1.02] tracking-tighter text-[#F3F3F3] sm:text-5xl">
                  {activeStep === 0 && "A few details first."}
                  {activeStep === 1 && "What are we building?"}
                  {activeStep === 2 && "What feels stuck?"}
                  {activeStep === 3 && "What should it achieve?"}
                  {activeStep === 4 && "A few build details."}
                  {activeStep === 5 && "When should we start?"}
                </h2>
                <p className="mt-2 text-sm font-normal leading-6 tracking-tight text-[#F3F3F3]/62">
                  {activeStep === 0 &&
                    "Start with your contact details so we know who to reply to."}
                  {activeStep === 1 &&
                    "Tell us the type of website and business behind it."}
                  {activeStep === 2 &&
                    "Share what the current site or idea needs to solve."}
                  {activeStep === 3 &&
                    "A clear outcome helps us recommend the right path."}
                  {activeStep === 4 &&
                    "Give us a rough budget and any must-have details."}
                  {activeStep === 5 &&
                    "Tell us your timeline, then send the project brief."}
                </p>
              </div>

              {activeStep === 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    error={errors.fullName}
                    label="Full name"
                    name="fullName"
                    onChange={updateForm}
                    placeholder="Your name"
                    required
                    value={form.fullName}
                  />
                  <Field
                    error={errors.email}
                    label="Email address"
                    name="email"
                    onChange={updateForm}
                    placeholder="you@company.com"
                    required
                    type="email"
                    value={form.email}
                  />
                </div>
              ) : null}

              {activeStep === 1 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Company"
                    name="company"
                    onChange={updateForm}
                    placeholder="Business name"
                    value={form.company}
                  />
                  <SelectField
                    label="Project type"
                    name="projectType"
                    onChange={updateForm}
                    onToggle={toggleSelect}
                    openSelect={openSelect}
                    options={projectTypes}
                    placeholder="Choose type"
                    value={form.projectType}
                  />
                </div>
              ) : null}

              {activeStep === 2 ? (
                <TextAreaField
                  label="What is the main challenge?"
                  name="challenge"
                  onChange={updateForm}
                  placeholder="Example: unclear message, outdated design, low inquiries, no way to sell online."
                  value={form.challenge}
                />
              ) : null}

              {activeStep === 3 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <SelectField
                    label="Primary goal"
                    name="primaryGoal"
                    onChange={updateForm}
                    onToggle={toggleSelect}
                    openSelect={openSelect}
                    options={goals}
                    placeholder="Choose goal"
                    value={form.primaryGoal}
                  />
                  <Field
                    label="Audience"
                    name="audience"
                    onChange={updateForm}
                    placeholder="Who should it reach?"
                    value={form.audience}
                  />
                </div>
              ) : null}

              {activeStep === 4 ? (
                <div className="grid gap-3">
                  <SelectField
                    label="Budget range"
                    name="budget"
                    onChange={updateForm}
                    onToggle={toggleSelect}
                    openSelect={openSelect}
                    options={budgetRanges}
                    placeholder="Choose budget"
                    value={form.budget}
                  />
                  <Field
                    label="Must-have detail"
                    name="mustHave"
                    onChange={updateForm}
                    placeholder="Example: payments, booking, CMS, blog, speed, SEO"
                    value={form.mustHave}
                  />
                </div>
              ) : null}

              {activeStep === 5 ? (
                <div className="grid gap-3">
                  <SelectField
                    label="Timeline"
                    name="timeline"
                    onChange={updateForm}
                    onToggle={toggleSelect}
                    openSelect={openSelect}
                    options={timelines}
                    placeholder="Choose timeline"
                    value={form.timeline}
                  />
                  <div className="rounded-lg border border-[#F3F3F3]/12 bg-[#F3F3F3]/7 p-4 text-sm leading-6 tracking-tight text-[#F3F3F3]/70">
                    We will review your answers and reply with the best next
                    step for your project.
                  </div>
                  <FieldError message={submitError ?? undefined} />
                </div>
              ) : null}

              <div className="mt-1 grid grid-cols-[132px_1fr] gap-3">
                <button
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#F3F3F3]/16 px-6 text-sm font-normal tracking-tight text-[#F3F3F3] transition hover:border-[#F3F3F3]/36"
                  onClick={goBack}
                  type="button"
                >
                  Back
                </button>
                <button
                  disabled={isSending}
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-normal tracking-tight text-[#07062C] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8f86dc] disabled:cursor-not-allowed disabled:opacity-65"
                  type="submit"
                >
                  {activeStep === lastStep
                    ? isSending
                      ? "Sending..."
                      : "Send Project Details"
                    : "Next"}
                  <ArrowIcon />
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h2 className="text-4xl font-normal leading-[1.02] tracking-tighter text-[#F3F3F3] sm:text-5xl">
                Your project details were sent.
              </h2>
              <p className="mt-3 text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/62">
                We will review the details and reply with the best next step for
                your project.
              </p>
              <a
                className="mt-7 inline-flex h-12 items-center justify-center rounded-full border border-[#F3F3F3]/14 bg-[#F3F3F3] px-6 text-sm font-normal tracking-tight text-[#07062C] transition hover:bg-white"
                href="/"
              >
                Back to site
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
