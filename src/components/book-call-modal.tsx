"use client";

import Link from "next/link";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CALENDLY_URL = "https://calendly.com/buildonwebx/30min";
const CONTACT_EMAIL = "buildonwebx@gmail.com";

const projectTypes = [
  "Business Website",
  "Landing Page",
  "E-Commerce Website",
  "Website Redesign",
  "Not Sure Yet",
];

type ModalContextValue = {
  openModal: () => void;
};

type LeadForm = {
  fullName: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

const BookCallModalContext = createContext<ModalContextValue | null>(null);

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`text-[17px] leading-none ${className}`}>
      ↗
    </span>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
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

function TextField({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = "text",
  value,
}: {
  label: string;
  name: keyof LeadForm;
  onChange: (name: keyof LeadForm, value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-normal tracking-tight text-[#F3F3F3]">
        {label}
      </span>
      <input
        className="mt-2 h-12 w-full rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/8 px-4 text-sm font-normal tracking-tight text-[#F3F3F3] outline-none transition placeholder:text-[#F3F3F3]/36 focus:border-[#F3F3F3]/42 focus:ring-4 focus:ring-[#8f86dc]/18"
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

export function BookCallModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false);
  const [form, setForm] = useState<LeadForm>({
    fullName: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent("New Web X project inquiry");
    const body = encodeURIComponent(
      [
        `Full Name: ${form.fullName}`,
        `Email: ${form.email}`,
        `Company: ${form.company || "Not provided"}`,
        `Project Type: ${form.projectType || "Not sure yet"}`,
        "",
        "Project Notes:",
        form.message || "Not provided",
      ].join("\n"),
    );

    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }, [form]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.style.overflow = isOpen ? "hidden" : "";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function updateForm(name: keyof LeadForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function openModal() {
    setIsSubmitted(false);
    setIsProjectTypeOpen(false);
    setIsOpen(true);
  }

  function closeModal() {
    setIsProjectTypeOpen(false);
    setIsOpen(false);
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailtoLink;
    setIsSubmitted(true);
  }

  return (
    <BookCallModalContext.Provider value={{ openModal }}>
      {children}
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[100] transition ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          aria-label="Close project inquiry"
          className={`webx-modal-backdrop absolute inset-0 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
          type="button"
        />

        <aside
          aria-modal="true"
          className={`absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col overflow-hidden border-l border-[#F3F3F3]/14 bg-[#07062C] text-[#F3F3F3] shadow-[0_0_80px_rgba(0,0,0,0.42)] transition-transform duration-500 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
        >
          <div className="flex items-center justify-between gap-5 border-b border-[#F3F3F3]/10 px-6 py-5">
            <Link href="#" aria-label="Web X home" className="inline-flex">
              <img
                alt="Web X"
                className="h-9 w-auto object-contain"
                src="/webx%20logo/webx.svg"
              />
            </Link>
            <button
              aria-label="Close project inquiry"
              className="grid size-10 place-items-center rounded-full border border-[#F3F3F3]/14 text-[#F3F3F3]/78 transition hover:border-[#F3F3F3]/38 hover:text-[#F3F3F3]"
              onClick={closeModal}
              type="button"
            >
              <CloseIcon />
            </button>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto px-6 py-7"
            data-lenis-prevent
          >
            {!isSubmitted ? (
              <>
                <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight text-[#F3F3F3]">
                  <span className="text-[#F3F3F3]/42">[</span>
                  <span>Start Your Project</span>
                  <span className="text-[#F3F3F3]/42">]</span>
                </p>
                <h2 className="mt-5 text-4xl font-normal leading-[1.04] tracking-tighter">
                  Tell us enough to start the right conversation.
                </h2>
                <p className="mt-4 text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/68">
                  A few details help us understand your goals before we meet.
                  We keep the form short because the real clarity happens on the
                  discovery call.
                </p>

                <form className="mt-7 grid gap-4" onSubmit={submitForm}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    onChange={updateForm}
                    placeholder="Your name"
                    required
                    value={form.fullName}
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    onChange={updateForm}
                    placeholder="you@company.com"
                    required
                    type="email"
                    value={form.email}
                  />
                  <TextField
                    label="Company / Business"
                    name="company"
                    onChange={updateForm}
                    placeholder="Business name"
                    value={form.company}
                  />

                  <div className="block">
                    <span className="text-sm font-normal tracking-tight">
                      What are you looking to build?
                    </span>
                    <div className="relative mt-2">
                      <button
                        aria-expanded={isProjectTypeOpen}
                        aria-haspopup="listbox"
                        className={`flex h-12 w-full items-center justify-between rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/8 px-4 text-left text-sm font-normal tracking-tight outline-none transition focus:border-[#F3F3F3]/42 focus:ring-4 focus:ring-[#8f86dc]/18 ${
                          form.projectType ? "text-[#F3F3F3]" : "text-[#F3F3F3]/42"
                        }`}
                        onClick={() =>
                          setIsProjectTypeOpen((current) => !current)
                        }
                        type="button"
                      >
                        <span>{form.projectType || "Choose a project type"}</span>
                        <ChevronDownIcon />
                      </button>

                      <div
                        className={`absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-lg border border-[#F3F3F3]/14 bg-[#121037] shadow-[0_18px_50px_rgba(0,0,0,0.36)] transition ${
                          isProjectTypeOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-2 opacity-0"
                        }`}
                        role="listbox"
                      >
                        {projectTypes.map((type) => {
                          const isSelected = form.projectType === type;

                          return (
                            <button
                              aria-selected={isSelected}
                              className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-normal tracking-tight transition ${
                                isSelected
                                  ? "bg-[#8f86dc] text-[#F3F3F3]"
                                  : "text-[#F3F3F3]/74 hover:bg-[#F3F3F3]/8 hover:text-[#F3F3F3]"
                              }`}
                              key={type}
                              onClick={() => {
                                updateForm("projectType", type);
                                setIsProjectTypeOpen(false);
                              }}
                              role="option"
                              type="button"
                            >
                              {type}
                              {isSelected && (
                                <span
                                  aria-hidden="true"
                                  className="size-1.5 rounded-full bg-[#F3F3F3]"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <label className="block">
                    <span className="text-sm font-normal tracking-tight">
                      What should this website help you achieve?
                    </span>
                    <textarea
                      className="mt-2 min-h-28 w-full resize-none rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/8 px-4 py-3 text-sm font-normal leading-6 tracking-tight text-[#F3F3F3] outline-none transition placeholder:text-[#F3F3F3]/36 focus:border-[#F3F3F3]/42 focus:ring-4 focus:ring-[#8f86dc]/18"
                      name="message"
                      onChange={(event) =>
                        updateForm("message", event.target.value)
                      }
                      placeholder="Example: build credibility, generate leads, sell products, or redesign an outdated site."
                      value={form.message}
                    />
                  </label>

                  <button
                    className="mt-2 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-normal tracking-tight text-[#07062C] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F3F3F3]"
                    type="submit"
                  >
                    Send Project Details
                    <span className="grid size-7 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]">
                      <ArrowIcon className="text-[#F3F3F3]" />
                    </span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex min-h-full flex-col justify-center">
                <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight text-[#F3F3F3]">
                  <span className="text-[#F3F3F3]/42">[</span>
                  <span>Form Submitted</span>
                  <span className="text-[#F3F3F3]/42">]</span>
                </p>
                <h2 className="mt-5 text-4xl font-normal leading-[1.04] tracking-tighter">
                  Your details are ready for us.
                </h2>
                <p className="mt-4 text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/68">
                  Recommended next step: book a 30-minute discovery call so we
                  can talk through the best path for your website.
                </p>

                <div className="mt-8 rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/8 p-4">
                  <p className="text-sm font-normal uppercase tracking-tight text-[#F3F3F3]/52">
                    Discovery call
                  </p>
                  <p className="mt-2 text-lg font-normal tracking-tight">
                    Quick fit check, goals, timeline, and next steps.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-normal tracking-tight text-[#07062C] transition hover:bg-white"
                    href={CALENDLY_URL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Book Discovery Call
                    <span className="grid size-7 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]">
                      <ArrowIcon className="text-[#F3F3F3]" />
                    </span>
                  </a>
                  <button
                    className="inline-flex h-12 items-center justify-center rounded-full border border-[#F3F3F3]/16 px-6 text-sm font-normal tracking-tight text-[#F3F3F3] transition hover:border-[#F3F3F3]/38"
                    onClick={closeModal}
                    type="button"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
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
  const context = useContext(BookCallModalContext);

  if (!context) {
    throw new Error("BookCallTrigger must be used inside BookCallModalProvider");
  }

  return (
    <button className={className} onClick={context.openModal} type="button">
      {children}
    </button>
  );
}
