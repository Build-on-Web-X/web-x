"use client";

import {
  createContext,
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";

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

const steps = ["About", "Project", "Budget", "Timeline"];
const lastStep = steps.length - 1;
type SelectName = "projectType" | "budget" | "timeline";

type ModalContextValue = {
  openModal: () => void;
};

type LeadForm = {
  fullName: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

type FormErrors = Partial<Record<keyof LeadForm, string>>;
type SubmitError = string | null;

const BookCallModalContext = createContext<ModalContextValue | null>(null);

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
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

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <span className="mt-1 flex items-start gap-2 rounded-lg border border-[#ffb86b]/24 bg-[#ff8a00]/12 px-3 py-2 text-xs leading-5 tracking-tight text-[#ffd7ad]">
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
      <span className="text-xs font-normal tracking-tight text-[#F3F3F3]/58">
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
    <div className="grid gap-1.5">
      <span className="text-xs font-normal tracking-tight text-[#F3F3F3]/58">
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
          className="grid gap-1 rounded-lg border border-[#F3F3F3]/14 bg-[#121037] p-1"
          data-lenis-prevent
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

export function BookCallModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [openSelect, setOpenSelect] = useState<SelectName | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<SubmitError>(null);
  const [form, setForm] = useState<LeadForm>({
    fullName: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.style.overflow = isOpen ? "hidden" : "";
    document.body.classList.toggle("project-modal-open", isOpen);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("project-modal-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

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

  function openModal() {
    setIsSubmitted(false);
    setIsSending(false);
    setOpenSelect(null);
    setErrors({});
    setSubmitError(null);
    setActiveStep(0);
    setIsOpen(true);
  }

  function closeModal() {
    setOpenSelect(null);
    document.body.style.overflow = "";
    document.body.classList.remove("project-modal-open");
    setIsOpen(false);
  }

  function goToPreviousStep() {
    setOpenSelect(null);
    setActiveStep((current) => Math.max(0, current - 1));
  }

  async function sendEmail() {
    const response = await fetch("/api/project-inquiry", {
      body: JSON.stringify({
        budget: form.budget,
        company: form.company,
        email: form.email,
        fullName: form.fullName,
        message: form.message,
        projectType: form.projectType,
        timeline: form.timeline,
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
    <BookCallModalContext.Provider value={{ openModal }}>
      {children}
      <div
        aria-hidden={!isOpen}
        className={`webx-project-modal fixed inset-0 z-[100] bg-[#07062C] text-[#F3F3F3] transition-opacity duration-75 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        data-lenis-prevent
      >
        <section
          aria-modal="true"
          className="grid h-dvh overflow-y-auto lg:grid-cols-[0.34fr_0.66fr] lg:overflow-hidden"
          data-lenis-prevent
          role="dialog"
        >
          <div className="project-modal-intro flex min-h-[300px] flex-col justify-between border-b border-[#F3F3F3]/10 bg-[#07062C] px-6 py-7 text-[#F3F3F3] sm:px-10 lg:h-dvh lg:min-h-0 lg:border-b-0 lg:border-r lg:px-12 lg:py-10">
            <div>
              <img
                alt="Web X"
                className="h-9 w-auto brightness-0 invert"
                src="/webx%20logo/webx.svg"
              />
              <h2 className="mt-12 max-w-md text-4xl font-normal leading-[1.02] tracking-tighter sm:text-5xl lg:text-[3.4rem]">
                Tell us what you want to build.
              </h2>
              <p className="mt-5 max-w-md text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/66">
                Share the essentials. We will use them to shape the first
                conversation around goals, scope, timing, and the clearest next
                step.
              </p>
            </div>

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
          </div>

          <div className="project-modal-form flex min-h-0 flex-col bg-[#07062C] px-5 py-5 sm:px-8 lg:h-dvh lg:px-12 lg:py-7">
            <div className="flex shrink-0 items-center justify-between gap-4">
              <div className="hidden items-center gap-3 text-sm font-normal tracking-tight text-[#F3F3F3]/54 sm:flex">
                {steps.map((step, index) => (
                  <div className="flex items-center gap-2" key={step}>
                    <span
                      className={`grid size-8 place-items-center rounded-full border text-xs ${
                        index === activeStep
                          ? "border-[#8f86dc] bg-[#8f86dc] text-[#07062C]"
                          : index < activeStep
                            ? "border-[#8f86dc]/70 bg-[#8f86dc]/24 text-[#F3F3F3]"
                            : "border-[#F3F3F3]/16 bg-[#F3F3F3] text-[#07062C]/54"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className={index === activeStep ? "text-[#F3F3F3]" : ""}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <button
                aria-label="Close project inquiry"
                className="ml-auto grid size-10 place-items-center rounded-full border border-[#F3F3F3]/12 bg-[#F3F3F3] text-[#07062C] hover:border-[#F3F3F3]/34"
                onClick={closeModal}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 items-center py-5 lg:py-4">
              {!isSubmitted ? (
                <form
                  className="mx-auto grid w-full max-w-[720px] gap-4"
                  noValidate
                  onSubmit={handleFormSubmit}
                >
                  <div>
                    <h2 className="text-4xl font-normal leading-[1.02] tracking-tighter text-[#F3F3F3] sm:text-5xl">
                      {activeStep === 0 && "A few details first."}
                      {activeStep === 1 && "What are we building?"}
                      {activeStep === 2 && "Budget and scope."}
                      {activeStep === 3 && "Timeline and final notes."}
                    </h2>
                    <p className="mt-2 text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/62">
                      {activeStep === 0 &&
                        "Start with your contact details so we know who to reply to."}
                      {activeStep === 1 &&
                        "Tell us the type of website and what it needs to achieve."}
                      {activeStep === 2 &&
                        "A rough range is enough. We only use this to guide the first recommendation."}
                      {activeStep === 3 &&
                        "Add timing and anything else we should know before we reply."}
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
                      <Field
                        label="Company"
                        name="company"
                        onChange={updateForm}
                        placeholder="Business name"
                        value={form.company}
                      />
                    </div>
                  ) : null}

                  {activeStep === 1 ? (
                    <div className="grid gap-3">
                      <SelectField
                        label="Project type"
                        name="projectType"
                        onChange={updateForm}
                        onToggle={toggleSelect}
                        openSelect={openSelect}
                        options={projectTypes}
                        placeholder="Choose project type"
                        value={form.projectType}
                      />

                      <label className="grid gap-1.5">
                        <span className="text-xs font-normal tracking-tight text-[#F3F3F3]/58">
                          What should the website help you do?
                        </span>
                        <textarea
                          className="min-h-32 resize-none rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/8 px-4 py-3 text-sm font-normal leading-6 tracking-tight text-[#F3F3F3] outline-none transition placeholder:text-[#F3F3F3]/34 focus:border-[#8f86dc] focus:bg-[#F3F3F3]/12 focus:ring-4 focus:ring-[#8f86dc]/18"
                          name="message"
                          onChange={(event) =>
                            updateForm("message", event.target.value)
                          }
                          placeholder="Example: generate leads, sell products, explain services, or refresh an outdated site."
                          value={form.message}
                        />
                      </label>
                    </div>
                  ) : null}

                  {activeStep === 2 ? (
                    <SelectField
                      label="Budget range"
                      name="budget"
                      onChange={updateForm}
                      onToggle={toggleSelect}
                      openSelect={openSelect}
                      options={budgetRanges}
                      placeholder="Choose budget range"
                      value={form.budget}
                    />
                  ) : null}

                  {activeStep === 3 ? (
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
                        We will send these details to Web X and reply with the
                        best next step for your project.
                      </div>
                      <FieldError message={submitError ?? undefined} />
                    </div>
                  ) : null}

                  <div className="mt-1 flex gap-3">
                    {activeStep > 0 ? (
                      <button
                        className="inline-flex h-12 w-32 items-center justify-center rounded-full border border-[#F3F3F3]/16 px-6 text-sm font-normal tracking-tight text-[#F3F3F3] transition hover:border-[#F3F3F3]/36"
                        onClick={goToPreviousStep}
                        type="button"
                      >
                        Back
                      </button>
                    ) : null}
                    <button
                      disabled={isSending}
                      className="inline-flex h-12 flex-1 items-center justify-center gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-normal tracking-tight text-[#07062C] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8f86dc] disabled:cursor-not-allowed disabled:opacity-65"
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
                <div className="mx-auto w-full max-w-[680px]">
                  <h2 className="text-4xl font-normal leading-[1.02] tracking-tighter text-[#F3F3F3] sm:text-5xl">
                    Your project details were sent.
                  </h2>
                  <p className="mt-3 text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/62">
                    We will review the details and reply with the best next
                    step for your project.
                  </p>
                  <button
                    className="mt-7 inline-flex h-12 items-center justify-center rounded-full border border-[#F3F3F3]/14 bg-[#F3F3F3] px-6 text-sm font-normal tracking-tight text-[#07062C] transition hover:bg-white"
                    onClick={closeModal}
                    type="button"
                  >
                    Back to site
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </BookCallModalContext.Provider>
  );
}

export function BookCallTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href="/start-a-project">
      {children}
    </a>
  );
}
