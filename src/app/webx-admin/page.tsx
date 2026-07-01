"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  initialServices,
  initialTestimonials,
  initialWorks,
  auditLogs,
  mediaAssets,
  portalProject,
  type Service,
  type Testimonial,
  type Work,
  type AuditLog as AuditLogRecord,
} from "@/lib/admin-cms-mock";

type Section =
  | "dashboard"
  | "works"
  | "featured"
  | "services"
  | "testimonials"
  | "portal"
  | "media"
  | "audit"
  | "settings";
type Editable =
  | { kind: "work"; value: Work }
  | { kind: "service"; value: Service }
  | { kind: "testimonial"; value: Testimonial };

const nav: { id: Section; label: string; mark: string }[] = [
  { id: "dashboard", label: "Dashboard", mark: "01" },
  { id: "works", label: "Projects / Works", mark: "02" },
  { id: "featured", label: "Featured Works", mark: "03" },
  { id: "services", label: "Services", mark: "04" },
  { id: "testimonials", label: "Testimonials", mark: "05" },
  { id: "portal", label: "Portal Content", mark: "06" },
  { id: "media", label: "Media Library", mark: "07" },
  { id: "audit", label: "Audit Log", mark: "08" },
  { id: "settings", label: "Settings", mark: "09" },
];

function ThemeIcon({ theme }: { theme: "dark" | "light" }) {
  return theme === "dark" ? (
    <span aria-hidden>☼</span>
  ) : (
    <span aria-hidden>◐</span>
  );
}

function ChevronIcon({ direction = "down" }: { direction?: "up" | "down" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path
        d={direction === "up" ? "M4.5 9.5 8 6l3.5 3.5" : "m4.5 6.5 3.5 3.5 3.5-3.5"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SearchIcon() {
  return <svg className="cms-search-icon" aria-hidden="true" viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="m12.7 12.7 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function GripIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16"><circle cx="5" cy="4" r="1" fill="currentColor" /><circle cx="11" cy="4" r="1" fill="currentColor" /><circle cx="5" cy="8" r="1" fill="currentColor" /><circle cx="11" cy="8" r="1" fill="currentColor" /><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="11" cy="12" r="1" fill="currentColor" /></svg>;
}

function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={checked}
      className="cms-toggle"
      data-on={checked}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span />
    </button>
  );
}

function Pill({ active }: { active: boolean }) {
  return (
    <span className={`cms-pill ${active ? "is-active" : "is-idle"}`}>
      <i />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function Thumb({
  index,
  image,
  className = "",
}: {
  index: number;
  image?: string;
  className?: string;
}) {
  return (
    <div
      className={`cms-thumb cms-art-${(index % 4) + 1} ${className}`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <span>WX—{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

function SectionHeading({
  title,
  copy,
  action,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="cms-section-heading">
      <div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      {action}
    </header>
  );
}

function AdminAccess({ onContinue }: { onContinue: () => void }) {
  const [email, setEmail] = useState("buildonwebx@gmail.com");
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <main className="cms-root cms-auth">
      <section className="cms-auth-brand">
        <div className="cms-auth-logo">
          <span className="cms-logo-mark" aria-label="Web X" role="img" />
          <span>CMS Console</span>
        </div>
        <p className="cms-console-label">[ INTERNAL ACCESS ]</p>
        <h1>Web X Admin</h1>
        <p>Content management for the Web X website.</p>
      </section>
      <section className="cms-auth-card" aria-labelledby="access-title">
        <p className="cms-console-label">[ ADMIN LOGIN ]</p>
        <h2 id="access-title">Access the CMS.</h2>
        <p>
          This frontend preview simulates the private access flow. No email will
          be sent.
        </p>
        <form onSubmit={submit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <small>Allowed email: buildonwebx@gmail.com</small>
          <button className="cms-primary" type="submit">
            Send Magic Link <span>↗</span>
          </button>
        </form>
        {sent && (
          <div className="cms-success" role="status">
            <span>✓</span>
            <div>
              <strong>Preview ready</strong>
              <p>Magic link preview sent to buildonwebx@gmail.com</p>
            </div>
          </div>
        )}
        <button className="cms-secondary" onClick={onContinue} type="button">
          Continue to Dashboard Preview <span>→</span>
        </button>
      </section>
    </main>
  );
}

function AdminCms() {
  const [entered, setEntered] = useState(false);
  const [section, setSection] = useState<Section>("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [works, setWorks] = useState(initialWorks);
  const [services, setServices] = useState(initialServices);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [featured, setFeatured] = useState([1, 2, 3]);
  const [featuredVisible, setFeaturedVisible] = useState<
    Record<number, boolean>
  >({ 1: true, 2: true, 3: true });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All services");
  const [editing, setEditing] = useState<Editable | null>(null);
  const [auditDetail, setAuditDetail] = useState<AuditLogRecord | null>(null);
  const [toast, setToast] = useState("");
  const [portalTab, setPortalTab] = useState("Overview");
  const [portalNotes, setPortalNotes] = useState(portalProject.notes);
  const [uploadState, setUploadState] = useState<"idle" | "success">("idle");
  const [uploadedMedia, setUploadedMedia] = useState<
    { name: string; url: string; size: string }[]
  >([]);
  const [dragging, setDragging] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("webx-theme") as
      | "dark"
      | "light"
      | null;
    setTheme(stored ?? "dark");
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(id);
  }, [toast]);
  useEffect(() => {
    if (!editing && !auditDetail) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditing(null);
        setAuditDetail(null);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [editing, auditDetail]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("webx-theme", next);
    document.documentElement.dataset.theme = next;
    document.documentElement.classList.toggle("theme-light", next === "light");
    document.documentElement.classList.toggle("theme-dark", next === "dark");
  }
  function chooseSection(id: Section) {
    setSection(id);
    setMobileNav(false);
  }
  function saveEditing(next: Editable) {
    if (next.kind === "work")
      setWorks((items) =>
        items.map((item) => (item.id === next.value.id ? next.value : item)),
      );
    if (next.kind === "service")
      setServices((items) =>
        items.map((item) => (item.id === next.value.id ? next.value : item)),
      );
    if (next.kind === "testimonial")
      setTestimonials((items) =>
        items.map((item) => (item.id === next.value.id ? next.value : item)),
      );
    setEditing(null);
    setToast("Saved locally for preview");
  }
  function reorderItems<T extends { id: number; sortOrder: number }>(items: T[], fromId: number, toId: number) {
    const from = items.findIndex((item) => item.id === fromId);
    const to = items.findIndex((item) => item.id === toId);
    if (from < 0 || to < 0 || from === to) return items;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next.map((item, index) => ({ ...item, sortOrder: index + 1 }));
  }
  function previewFile(
    file: File | undefined,
    target: Editable,
    setTarget: (value: Editable) => void,
  ) {
    if (!file) return;
    setTarget({
      ...target,
      value: { ...target.value, image: URL.createObjectURL(file) },
    } as Editable);
  }
  const filteredWorks = useMemo(
    () =>
      works.filter(
        (item) =>
          (filter === "All services" || item.service === filter) &&
          `${item.title} ${item.slug}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [works, search, filter],
  );
  const current = nav.find((item) => item.id === section)!;

  if (!entered) return <AdminAccess onContinue={() => setEntered(true)} />;
  return (
    <main className="cms-root cms-app">
      <aside className={`cms-sidebar ${mobileNav ? "is-open" : ""}`}>
        <div className="cms-sidebar-brand">
          <span className="cms-logo-mark" aria-label="Web X" role="img" />
          <button aria-label="Close menu" onClick={() => setMobileNav(false)}>
            ×
          </button>
        </div>
        <div className="cms-workspace">
          <span>Workspace</span>
          <strong>Website Content</strong>
          <small>Frontend preview</small>
        </div>
        <nav aria-label="CMS sections">
          {nav.map((item) => (
            <button
              aria-current={section === item.id ? "page" : undefined}
              className={section === item.id ? "active" : ""}
              key={item.id}
              onClick={() => chooseSection(item.id)}
            >
              <span>{item.mark}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="cms-sidebar-foot">
          <span>
            <i /> Local mock data
          </span>
          <button onClick={() => setEntered(false)}>Exit preview ↗</button>
        </div>
      </aside>
      {mobileNav && (
        <button
          className="cms-nav-scrim"
          aria-label="Close menu"
          onClick={() => setMobileNav(false)}
        />
      )}
      <section className="cms-main">
        <header className="cms-topbar">
          <button
            className="cms-menu"
            aria-label="Open menu"
            onClick={() => setMobileNav(true)}
          >
            ☰
          </button>
          <div>
            <span>[ Web X Admin ]</span>
            <strong>{current.label}</strong>
          </div>
          <div className="cms-top-actions">
            <span className="cms-preview-badge">Preview mode</span>
            <button
              className="cms-theme"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={toggleTheme}
            >
              <ThemeIcon theme={theme} />
            </button>
            <div className="cms-avatar">WX</div>
          </div>
        </header>
        <div className="cms-content">
          {section === "dashboard" && (
            <Dashboard
              works={works}
              services={services}
              testimonials={testimonials}
              onAction={chooseSection}
            />
          )}
          {section === "works" && (
            <>
              <SectionHeading
                eyebrow="Projects"
                title="Projects & Works"
                copy="Manage the project stories that power the public work archive."
                action={
                  <button
                    className="cms-primary compact"
                    onClick={() =>
                      setToast("New project form is ready for backend phase")
                    }
                  >
                    ＋ Add project
                  </button>
                }
              />
              <div className="cms-toolbar">
                <label className="cms-search">
                  <SearchIcon />
                  <input
                    aria-label="Search projects"
                    placeholder="Search projects or slugs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <select
                  aria-label="Filter by service"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All services</option>
                  {services.map((s) => (
                    <option key={s.id}>{s.title}</option>
                  ))}
                </select>
                <span>{filteredWorks.length} records</span>
              </div>
              <div className="cms-table-wrap">
                <table className="cms-table">
                  <thead>
                    <tr>
                      <th><span className="sr-only">Reorder</span></th>
                      <th>Project</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>URL</th>
                      <th>
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorks.map((work, index) => (
                      <tr className={dragging === `work-${work.id}` ? "is-dragging" : ""} draggable key={work.id} onDragStart={() => setDragging(`work-${work.id}`)} onDragEnd={() => setDragging(null)} onDragOver={(event) => event.preventDefault()} onDrop={() => { const id = Number(dragging?.replace("work-", "")); if (id) { setWorks((items) => reorderItems(items, id, work.id)); setToast("Reordered locally for preview"); } setDragging(null); }}>
                        <td><span className="cms-drag-handle" aria-label={`Drag to reorder ${work.title}`} title="Drag to reorder"><GripIcon /></span></td>
                        <td>
                          <div className="cms-project-cell">
                            <Thumb index={index} image={work.image} />
                            <div>
                              <strong>{work.title}</strong>
                              <small>/{work.slug}</small>
                            </div>
                          </div>
                        </td>
                        <td>{work.service}</td>
                        <td>
                          <Pill active={work.active} />
                        </td>
                        <td>
                          {work.projectUrl ? (
                            <span className="cms-url">Linked ↗</span>
                          ) : (
                            <span className="cms-muted">Not set</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="cms-icon-button"
                            aria-label={`Edit ${work.title}`}
                            onClick={() =>
                              setEditing({ kind: "work", value: { ...work } })
                            }
                          >
                            •••
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {section === "featured" && (
            <Featured
              works={works}
              featured={featured}
              setFeatured={setFeatured}
              visible={featuredVisible}
              setVisible={setFeaturedVisible}
              notify={setToast}
            />
          )}
          {section === "services" && (
            <>
              <SectionHeading
                eyebrow="Services"
                title="Services"
                copy="Keep service positioning, imagery, and display order consistent."
              />
              <div className="cms-service-list">
                {services.map((service) => (
                  <article className={dragging === `service-${service.id}` ? "is-dragging" : ""} draggable key={service.id} onDragStart={() => setDragging(`service-${service.id}`)} onDragEnd={() => setDragging(null)} onDragOver={(event) => event.preventDefault()} onDrop={() => { const id = Number(dragging?.replace("service-", "")); if (id) { setServices((items) => reorderItems(items, id, service.id)); setToast("Reordered locally for preview"); } setDragging(null); }}>
                    <span className="cms-drag-handle" aria-label={`Drag to reorder ${service.title}`} title="Drag to reorder"><GripIcon /></span>
                    <div className="cms-service-icon">
                      {service.iconKey.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <Pill active={service.active} />
                    <button
                      className="cms-outline cms-edit-compact"
                      onClick={() =>
                        setEditing({ kind: "service", value: { ...service } })
                      }
                    >
                      Edit
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
          {section === "testimonials" && (
            <>
              <SectionHeading
                eyebrow="Testimonials"
                title="Testimonials"
                copy="Curate proof that feels personal, credible, and specific."
              />
              <div className="cms-testimonial-grid">
                {testimonials.map((item, index) => (
                  <article className={dragging === `testimonial-${item.id}` ? "is-dragging" : ""} draggable key={item.id} onDragStart={() => setDragging(`testimonial-${item.id}`)} onDragEnd={() => setDragging(null)} onDragOver={(event) => event.preventDefault()} onDrop={() => { const id = Number(dragging?.replace("testimonial-", "")); if (id) { setTestimonials((items) => reorderItems(items, id, item.id)); setToast("Reordered locally for preview"); } setDragging(null); }}>
                    <span className="cms-drag-handle cms-card-drag" aria-label={`Drag to reorder testimonial from ${item.name}`} title="Drag to reorder"><GripIcon /></span>
                    <div className="cms-quote">“</div>
                    <p>{item.quote}</p>
                    <footer>
                      <div className={`cms-person cms-art-${index + 1}`}>
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <strong>{item.name}</strong>
                        <small>{item.role}</small>
                      </div>
                      <Pill active={item.active} />
                    </footer>
                    <button
                      aria-label={`Edit testimonial from ${item.name}`}
                      onClick={() =>
                        setEditing({ kind: "testimonial", value: { ...item } })
                      }
                    >
                      Edit ↗
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
          {section === "portal" && (
            <Portal
              tab={portalTab}
              setTab={setPortalTab}
              notes={portalNotes}
              setNotes={setPortalNotes}
              notify={setToast}
            />
          )}
          {section === "media" && (
            <Media
              uploaded={uploadedMedia}
              uploadState={uploadState}
              onUpload={(files) => {
                const file = files?.[0];
                if (!file) return;
                setUploadedMedia((items) => [
                  {
                    name: file.name,
                    url: URL.createObjectURL(file),
                    size: `${Math.ceil(file.size / 1024)} KB`,
                  },
                  ...items,
                ]);
                setUploadState("success");
                setToast("Image added to local preview");
              }}
            />
          )}
          {section === "audit" && <AuditLog onOpen={setAuditDetail} />}
          {section === "settings" && <Settings />}
        </div>
      </section>
      {editing && (
        <Editor
          editing={editing}
          setEditing={setEditing}
          save={saveEditing}
          previewFile={previewFile}
        />
      )}
      {auditDetail && (
        <AuditDetails record={auditDetail} onClose={() => setAuditDetail(null)} />
      )}
      {toast && (
        <div className="cms-toast" role="status">
          <span>✓</span>
          {toast}
        </div>
      )}
    </main>
  );
}

function Dashboard({
  works,
  services,
  testimonials,
  onAction,
}: {
  works: Work[];
  services: Service[];
  testimonials: Testimonial[];
  onAction: (s: Section) => void;
}) {
  const stats = [
    ["Total Projects", works.length, "+1 this month"],
    ["Featured Works", 3, "Homepage selection"],
    ["Services", services.length, "All published"],
    ["Testimonials", testimonials.length, "2 visible"],
    ["Portal Projects", 1, "Demo content"],
    ["Media Assets", mediaAssets.length, "2.5 MB total"],
  ];
  return (
    <>
      <SectionHeading
        eyebrow="Dashboard"
        title="Good afternoon, Web X."
        copy="A clear view of the website content that needs attention before publishing."
      />
      <div className="cms-stats">
        {stats.map(([label, value, note]) => (
          <article key={String(label)}>
            <p>{label}</p>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </div>
      <div className="cms-dashboard-grid">
        <section className="cms-panel cms-activity">
          <header>
            <div>
              <p className="cms-eyebrow">Audit trail</p>
              <h3>Recent Audit Activity</h3>
            </div>
            <button onClick={() => onAction("audit")}>View audit log</button>
          </header>
          {auditLogs.slice(0, 4).map((record, i) => (
            <div className="cms-activity-row" key={record.id}>
              <span className={`cms-activity-mark cms-art-${i + 1}`}>
                {record.action[0]}
              </span>
              <div>
                <strong>{record.item}</strong>
                <small>{record.action} · {record.section}</small>
              </div>
              <time>{formatAuditDate(record.timestamp, true)}</time>
            </div>
          ))}
        </section>
        <section className="cms-panel">
          <header>
            <div>
              <p className="cms-eyebrow">Shortcuts</p>
              <h3>Quick Actions</h3>
            </div>
          </header>
          <div className="cms-quick-actions">
            <button onClick={() => onAction("works")}>
              <span>＋</span>
              <strong>Add project</strong>
              <small>Create a work entry</small>
            </button>
            <button onClick={() => onAction("media")}>
              <span>↥</span>
              <strong>Upload media</strong>
              <small>Add a local asset</small>
            </button>
            <button onClick={() => onAction("featured")}>
              <span>✦</span>
              <strong>Curate homepage</strong>
              <small>Review featured work</small>
            </button>
          </div>
        </section>
        <section className="cms-panel cms-health">
          <header>
            <div>
              <p className="cms-eyebrow">Publishing readiness</p>
              <h3>Content Health</h3>
            </div>
            <strong>83%</strong>
          </header>
          <div className="cms-health-bar">
            <i />
          </div>
          {[
            ["Project URLs", "3 of 4 added", true],
            ["Service images", "6 of 6 ready", true],
            ["Testimonial visibility", "1 draft", false],
            ["Alt text coverage", "Review needed", false],
          ].map(([label, note, done]) => (
            <div className="cms-health-row" key={String(label)}>
              <span data-done={done}>{done ? "✓" : "!"}</span>
              <div>
                <strong>{label}</strong>
                <small>{note}</small>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

function Featured({
  works,
  featured,
  setFeatured,
  visible,
  setVisible,
  notify,
}: {
  works: Work[];
  featured: number[];
  setFeatured: React.Dispatch<React.SetStateAction<number[]>>;
  visible: Record<number, boolean>;
  setVisible: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  notify: (s: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPickerOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [pickerOpen]);

  function move(index: number, delta: number) {
    const next = [...featured];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setFeatured(next);
    notify("Featured order saved locally");
  }

  function addProject(id: number) {
    setFeatured((items) => [...items, id]);
    setVisible((items) => ({ ...items, [id]: true }));
    setPickerOpen(false);
    notify("Project added to Featured Works");
  }

  const availableWorks = works.filter((work) => !featured.includes(work.id));

  return (
    <>
      <SectionHeading
        eyebrow="Featured works"
        title="Featured Works"
        copy="A focused selection for the homepage. Project details remain managed in Works."
        action={
          <div className="cms-project-picker">
            <button aria-expanded={pickerOpen} aria-haspopup="listbox" className="cms-project-picker-trigger" onClick={() => setPickerOpen((open) => !open)} type="button">
              <span>Add existing project</span>
              <ChevronIcon />
            </button>
            {pickerOpen && (
              <div className="cms-project-picker-menu" role="listbox" aria-label="Available projects">
                {availableWorks.length ? availableWorks.map((work) => (
                  <button key={work.id} onClick={() => addProject(work.id)} role="option" type="button">
                    <span>{work.title}</span>
                    <small>{work.service}</small>
                  </button>
                )) : <p>All projects are featured.</p>}
              </div>
            )}
          </div>
        }
      />
      <div className="cms-featured-grid">
        {featured.map((id, index) => {
          const work = works.find((w) => w.id === id)!;
          return (
            <article className={draggedId === id ? "is-dragging" : ""} draggable key={id} onDragStart={() => setDraggedId(id)} onDragEnd={() => setDraggedId(null)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (draggedId && draggedId !== id) { const from = featured.indexOf(draggedId); const to = featured.indexOf(id); const next = [...featured]; const [moved] = next.splice(from, 1); next.splice(to, 0, moved); setFeatured(next); notify("Reordered locally for preview"); } setDraggedId(null); }}>
              <Thumb index={id - 1} image={work.image} className="large" />
              <div className="cms-featured-rank">0{index + 1}</div>
              <div className="cms-featured-copy">
                <span>{work.service}</span>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <footer className="cms-featured-controls">
                  <div className="cms-reorder-controls" aria-label={`Reorder ${work.title}`}>
                    <span className="cms-drag-handle" aria-label={`Drag to reorder ${work.title}`} title="Drag to reorder"><GripIcon /></span>
                    <button
                      className="cms-reorder-button"
                      disabled={index === 0}
                      aria-label={`Move ${work.title} up`}
                      onClick={() => move(index, -1)}
                      title="Move up"
                    >
                      <ChevronIcon direction="up" />
                    </button>
                    <button
                      className="cms-reorder-button"
                      disabled={index === featured.length - 1}
                      aria-label={`Move ${work.title} down`}
                      onClick={() => move(index, 1)}
                      title="Move down"
                    >
                      <ChevronIcon direction="down" />
                    </button>
                  </div>
                  <div className="cms-visibility-control">
                    <span>Visible</span>
                    <Toggle
                      label={`Toggle ${work.title} visibility`}
                      checked={visible[id]}
                      onChange={(value) =>
                        setVisible((v) => ({ ...v, [id]: value }))
                      }
                    />
                  </div>
                </footer>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

function Portal({
  tab,
  setTab,
  notes,
  setNotes,
  notify,
}: {
  tab: string;
  setTab: (s: string) => void;
  notes: string;
  setNotes: (s: string) => void;
  notify: (s: string) => void;
}) {
  const tabs = [
    "Overview",
    "Documents",
    "Messages",
    "Notes",
    "Links",
  ];
  const list =
    tab === "Documents"
      ? portalProject.documents
      : tab === "Messages"
        ? portalProject.messages
        : tab === "Links"
          ? portalProject.links
          : portalProject.links;
  return (
    <>
      <SectionHeading
        eyebrow="Client portal"
        title="Portal Preview Content"
        copy="Edit the client-facing project narrative—not internal delivery operations."
      />
      <section className="cms-portal-hero">
        <div>
          <span>{portalProject.clientId}</span>
          <h3>{portalProject.projectName}</h3>
          <p>{portalProject.clientName} · Demo portal preview</p>
        </div>
        <span className="cms-preview-badge">Client-facing demo</span>
      </section>
      <div className="cms-tabs" role="tablist">
        {tabs.map((item) => (
          <button
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? "active" : ""}
            key={item}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="cms-panel cms-portal-panel">
        {tab === "Overview" ? (
          <div className="cms-overview-grid">
            <label>
              Portal title
              <input defaultValue={portalProject.projectName} />
            </label>
            <label>
              Client display name
              <input defaultValue={portalProject.clientName} />
            </label>
            <label className="wide">
              Welcome / status copy
              <textarea defaultValue={portalProject.status} />
            </label>
          </div>
        ) : tab === "Notes" ? (
          <label className="cms-note-field">
            Portal preview note
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
        ) : (
          <div className="cms-edit-list">
            {list.map((item, index) => (
              <label key={`${item}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <input defaultValue={item} />
                <button aria-label={`Remove ${item}`}>×</button>
              </label>
            ))}
            <button className="cms-outline">＋ Add item</button>
          </div>
        )}
        <footer>
          <span>Changes stay in this browser preview.</span>
          <button
            className="cms-primary compact"
            onClick={() => notify("Portal content saved locally")}
          >
            Save portal content
          </button>
        </footer>
      </section>
    </>
  );
}

function Media({
  uploaded,
  uploadState,
  onUpload,
}: {
  uploaded: { name: string; url: string; size: string }[];
  uploadState: string;
  onUpload: (files: FileList | null) => void;
}) {
  return (
    <>
      <SectionHeading
        eyebrow="Media library"
        title="Media Library"
        copy="Review imagery and usage before storage integration is connected."
      />
      <label className="cms-dropzone">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onUpload(e.target.files)}
        />
        <span>↥</span>
        <div>
          <strong>
            {uploadState === "success"
              ? "Image ready in local preview"
              : "Drop an image here or browse"}
          </strong>
          <small>JPG, PNG, WEBP · No file will be uploaded</small>
        </div>
        <em>Upload Image</em>
      </label>
      <div className="cms-media-grid">
        {uploaded.map((item) => (
          <article key={item.url}>
            <div
              className="cms-media-image"
              style={{ backgroundImage: `url(${item.url})` }}
            />
            <div>
              <strong>{item.name}</strong>
              <span>New preview</span>
              <small>IMAGE · {item.size}</small>
            </div>
          </article>
        ))}
        {mediaAssets.map(([name, usage, type, size], i) => (
          <article key={name}>
            <Thumb index={i} className="media" />
            <div>
              <strong>{name}</strong>
              <span>{usage}</span>
              <small>
                {type} · {size}
              </small>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function formatAuditDate(value: string, short = false) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-PH", short
    ? { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }
    : { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function AuditFilter({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cms-audit-filter">
      <button aria-expanded={open} aria-haspopup="listbox" className="cms-audit-filter-trigger" onClick={() => setOpen(!open)} type="button">
        <span><small>{label}</small>{value}</span><ChevronIcon direction={open ? "up" : "down"} />
      </button>
      {open && <div className="cms-audit-filter-menu" role="listbox" aria-label={label}>
        {options.map((option) => <button aria-selected={value === option} className={value === option ? "active" : ""} key={option} onClick={() => { onChange(option); setOpen(false); }} role="option" type="button">{option}<span>{value === option ? "✓" : ""}</span></button>)}
      </div>}
    </div>
  );
}

function AuditLog({ onOpen }: { onOpen: (record: AuditLogRecord) => void }) {
  const [query, setQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState("All sections");
  const [actionFilter, setActionFilter] = useState("All actions");
  const sections = ["All sections", ...Array.from(new Set(auditLogs.map((item) => item.section)))];
  const actions = ["All actions", ...Array.from(new Set(auditLogs.map((item) => item.action)))];
  const records = auditLogs.filter((record) => {
    const haystack = `${record.action} ${record.section} ${record.actor} ${record.item} ${record.summary}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (sectionFilter === "All sections" || record.section === sectionFilter) && (actionFilter === "All actions" || record.action === actionFilter);
  });
  return <>
    <SectionHeading eyebrow="Audit Log" title="Audit Log" copy="Track CMS changes, admin actions, and content updates." />
    <div className="cms-audit-toolbar">
      <label className="cms-search cms-audit-search"><SearchIcon /><input aria-label="Search audit log" placeholder="Search action, section, or user" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <AuditFilter label="Section" value={sectionFilter} options={sections} onChange={setSectionFilter} />
      <AuditFilter label="Action type" value={actionFilter} options={actions} onChange={setActionFilter} />
      <span className="cms-audit-count">{records.length} {records.length === 1 ? "record" : "records"}</span>
    </div>
    <div className="cms-audit-list" role="list">
      <div className="cms-audit-list-head" aria-hidden><span>Activity</span><span>Section</span><span>Actor</span><span>Status</span><span>Timestamp</span></div>
      {records.map((record) => <button className="cms-audit-row" key={record.id} onClick={() => onOpen(record)} role="listitem" type="button">
        <span className="cms-audit-main"><i>{record.action.slice(0, 2).toUpperCase()}</i><span><strong>{record.action} · {record.item}</strong><small>{record.summary}</small></span></span>
        <span className="cms-audit-section">{record.section}</span>
        <span className="cms-audit-actor">{record.actor}</span>
        <span className={`cms-audit-status ${record.status.toLowerCase()}`}><i />{record.status}</span>
        <time>{formatAuditDate(record.timestamp)}</time>
      </button>)}
      {!records.length && <div className="cms-audit-empty"><strong>No matching activity</strong><p>Adjust the search or filters to see more records.</p></div>}
    </div>
  </>;
}

function AuditDetails({ record, onClose }: { record: AuditLogRecord; onClose: () => void }) {
  const fields = [["Action", record.action], ["Actor", record.actor], ["Timestamp", formatAuditDate(record.timestamp)], ["Section", record.section], ["Item name", record.item], ["Summary", record.summary], ["Status", record.status]];
  return <div className="cms-drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <aside className="cms-drawer cms-audit-drawer" role="dialog" aria-modal="true" aria-labelledby="audit-drawer-title">
      <header><div><p className="cms-eyebrow">Audit record · {record.id}</p><h2 id="audit-drawer-title">{record.action}</h2></div><button aria-label="Close audit details" onClick={onClose}>×</button></header>
      <div className="cms-audit-details">
        {fields.map(([label, value]) => <div className={label === "Summary" ? "wide" : ""} key={label}><small>{label}</small><strong>{value}</strong></div>)}
        <section><p className="cms-eyebrow">Metadata preview</p><div>{Object.entries(record.metadata).map(([key, value]) => <p key={key}><span>{key}</span><code>{value}</code></p>)}</div></section>
      </div>
      <footer className="cms-audit-drawer-foot"><button className="cms-secondary" onClick={onClose} type="button">Close details</button></footer>
    </aside>
  </div>;
}

function Settings() {
  const items = [
    ["Allowed admin email", "buildonwebx@gmail.com"],
    ["CMS route", "/webx-admin"],
    ["Dev console route", "/webx-dev"],
    ["Auth status", "Frontend preview only"],
    ["Database status", "Mock data only"],
    ["Storage status", "Local preview only"],
  ];
  return (
    <>
      <SectionHeading
        eyebrow="Settings"
        title="Settings"
        copy="Phase 1 connection details and environment status."
      />
      <div className="cms-settings">
        <section>
          <p className="cms-eyebrow">Access & routes</p>
          <h3>CMS environment</h3>
          <p>These values are informational during the frontend-only phase.</p>
        </section>
        <div>
          {items.map(([label, value], index) => (
            <article key={label}>
              <span>0{index + 1}</span>
              <div>
                <small>{label}</small>
                <strong>{value}</strong>
              </div>
              <em>{index > 2 ? "Preview" : "Configured"}</em>
            </article>
          ))}
        </div>
      </div>
      <div className="cms-settings-note">
        <span>i</span>
        <div>
          <strong>No live services are connected</strong>
          <p>
            Authentication, database writes, and storage uploads are
            intentionally disabled for Phase 1.
          </p>
        </div>
      </div>
    </>
  );
}

function Editor({
  editing,
  setEditing,
  save,
  previewFile,
}: {
  editing: Editable;
  setEditing: (e: Editable | null) => void;
  save: (e: Editable) => void;
  previewFile: (
    file: File | undefined,
    target: Editable,
    setTarget: (e: Editable) => void,
  ) => void;
}) {
  const value = editing.value;
  const set = (key: string, next: string | number | boolean) =>
    setEditing({ ...editing, value: { ...value, [key]: next } } as Editable);
  return (
    <div
      className="cms-drawer-layer"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && setEditing(null)}
    >
      <aside
        className="cms-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <header>
          <div>
            <p className="cms-eyebrow">Edit {editing.kind}</p>
            <h2 id="drawer-title">
              {"title" in value ? value.title : value.name}
            </h2>
          </div>
          <button aria-label="Close editor" onClick={() => setEditing(null)}>
            ×
          </button>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save(editing);
          }}
        >
          <label className="cms-image-field">
            <span>
              {value.image ? (
                <img src={value.image} alt="Local preview" />
              ) : (
                "↥"
              )}
            </span>
            <div>
              <strong>Preview image</strong>
              <small>Select a local image for this session.</small>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                previewFile(e.target.files?.[0], editing, (next) =>
                  setEditing(next),
                )
              }
            />
          </label>
          {editing.kind === "work" && (
            <>
              <Field
                label="Title"
                value={editing.value.title}
                onChange={(v) => set("title", v)}
              />
              <Field
                label="Slug"
                value={editing.value.slug}
                onChange={(v) => set("slug", v)}
              />
              <Field
                label="Service"
                value={editing.value.service}
                onChange={(v) => set("service", v)}
              />
              <TextField
                label="Description"
                value={editing.value.description}
                onChange={(v) => set("description", v)}
              />
              <TextField
                label="Outcome"
                value={editing.value.outcome}
                onChange={(v) => set("outcome", v)}
              />
              <Field
                label="Project URL"
                value={editing.value.projectUrl}
                onChange={(v) => set("projectUrl", v)}
              />
            </>
          )}
          {editing.kind === "service" && (
            <>
              <Field
                label="Title"
                value={editing.value.title}
                onChange={(v) => set("title", v)}
              />
              <TextField
                label="Description"
                value={editing.value.description}
                onChange={(v) => set("description", v)}
              />
              <Field
                label="Icon key"
                value={editing.value.iconKey}
                onChange={(v) => set("iconKey", v)}
              />
            </>
          )}
          {editing.kind === "testimonial" && (
            <>
              <Field
                label="Name"
                value={editing.value.name}
                onChange={(v) => set("name", v)}
              />
              <Field
                label="Role"
                value={editing.value.role}
                onChange={(v) => set("role", v)}
              />
              <TextField
                label="Quote"
                value={editing.value.quote}
                onChange={(v) => set("quote", v)}
              />
            </>
          )}
          <div className="cms-form-row">
            <label className="cms-switch-label">
              Active{" "}
              <Toggle
                label="Toggle active state"
                checked={value.active}
                onChange={(v) => set("active", v)}
              />
            </label>
          </div>
          <footer>
            <button
              className="cms-secondary"
              type="button"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
            <button className="cms-primary" type="submit">
              Save changes
            </button>
          </footer>
        </form>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <label>
      {label}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <label>
      {label}
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export default function WebXAdminPage() {
  return <AdminCms />;
}
