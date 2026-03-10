const defaultData = {
  speakerName: "Raka Pratama",
  heroTagline: "Inspiring Keynote Speaker",
  heroSubtitle:
    "Membantu tim dan pemimpin membangun komunikasi berpengaruh, growth mindset, dan budaya performa tinggi.",
  aboutText:
    "Raka adalah pembicara profesional dengan pengalaman lebih dari 10 tahun membantu perusahaan, startup, dan institusi pendidikan merancang komunikasi yang jelas, empatik, dan berdampak.",
  upcomingEvent: "Leadership Summit 2026 · Jakarta · 21 Mei",
  topics: [
    "Public Speaking untuk Leader",
    "Storytelling untuk Brand & Bisnis",
    "Komunikasi Tim Lintas Generasi",
    "Mindset Produktif & Performa Tinggi"
  ],
  testimonials: [
    { quote: "Sesi yang sangat actionable dan bikin tim langsung bergerak.", by: "Head of People, TechNova" },
    { quote: "Pembawaan energik, materi dalam, dan sangat relevan dengan kebutuhan bisnis.", by: "CEO, Nusantara Digital" },
    { quote: "Salah satu keynote terbaik di event kami tahun ini.", by: "Program Director, GrowthCon" }
  ],
  schedule: [
    { name: "Women Leadership Forum", meta: "Bandung · 10 Juni 2026" },
    { name: "Future Talent Conference", meta: "Surabaya · 2 Juli 2026" },
    { name: "Digital Enterprise Summit", meta: "Jakarta · 22 Agustus 2026" }
  ]
};

const storageKey = "narapro-cms-data";

const byId = (id) => document.getElementById(id);

function getData() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return structuredClone(defaultData);
    return { ...structuredClone(defaultData), ...JSON.parse(raw) };
  } catch {
    return structuredClone(defaultData);
  }
}

function saveData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function renderCards(containerId, items, mapFn) {
  const container = byId(containerId);
  container.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "content-card";
    card.innerHTML = mapFn(item);
    container.append(card);
  });
}

function render(data) {
  byId("speakerName").textContent = data.speakerName;
  byId("heroTagline").textContent = data.heroTagline;
  byId("heroSubtitle").textContent = data.heroSubtitle;
  byId("aboutText").textContent = data.aboutText;
  byId("upcomingEvent").textContent = data.upcomingEvent;

  renderCards("topicsGrid", data.topics, (topic) => `<h3>${topic}</h3><p>Disusun spesifik untuk kebutuhan audiens Anda.</p>`);
  renderCards("testimonialsGrid", data.testimonials, (item) => `<h3>“${item.quote}”</h3><p>${item.by}</p>`);
  renderCards("scheduleGrid", data.schedule, (item) => `<h3>${item.name}</h3><p>${item.meta}</p>`);
}

function fillCmsForm(data) {
  const form = byId("cmsForm");
  form.speakerName.value = data.speakerName;
  form.heroTagline.value = data.heroTagline;
  form.heroSubtitle.value = data.heroSubtitle;
  form.aboutText.value = data.aboutText;
  form.upcomingEvent.value = data.upcomingEvent;
  form.topics.value = data.topics.join("; ");
  form.testimonials.value = data.testimonials.map((t) => `${t.quote}|${t.by}`).join("; ");
  form.schedule.value = data.schedule.map((s) => `${s.name}|${s.meta}`).join("; ");
}

function setupCms() {
  const panel = byId("cmsPanel");
  const status = byId("cmsStatus");
  const open = () => {
    panel.classList.add("active");
    panel.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    panel.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
  };

  byId("openCmsBtn").addEventListener("click", open);
  byId("closeCmsBtn").addEventListener("click", close);
  panel.addEventListener("click", (event) => {
    if (event.target === panel) close();
  });

  byId("cmsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      speakerName: form.speakerName.value.trim(),
      heroTagline: form.heroTagline.value.trim(),
      heroSubtitle: form.heroSubtitle.value.trim(),
      aboutText: form.aboutText.value.trim(),
      upcomingEvent: form.upcomingEvent.value.trim(),
      topics: form.topics.value.split(";").map((t) => t.trim()).filter(Boolean),
      testimonials: form.testimonials.value
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => {
          const [quote = "", by = ""] = item.split("|");
          return { quote: quote.trim(), by: by.trim() || "Klien" };
        }),
      schedule: form.schedule.value
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => {
          const [name = "", meta = ""] = item.split("|");
          return { name: name.trim(), meta: meta.trim() || "TBA" };
        })
    };

    saveData(data);
    render(data);
    status.textContent = "Perubahan berhasil disimpan.";
    setTimeout(() => {
      status.textContent = "";
      close();
    }, 900);
  });

  byId("resetCmsBtn").addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    const fresh = structuredClone(defaultData);
    fillCmsForm(fresh);
    render(fresh);
    status.textContent = "Konten dikembalikan ke default.";
  });
}

function setupAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));

  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.05;
    document.querySelector(".orb-1").style.transform = `translateY(${offset}px)`;
    document.querySelector(".orb-2").style.transform = `translateY(${-offset}px)`;
  });
}

function setupContactForm() {
  const form = document.querySelector(".contact-form");
  const message = byId("formMessage");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      message.textContent = "Mohon lengkapi semua field dengan benar.";
      return;
    }
    message.textContent = "Terima kasih! Permintaan Anda sudah kami terima.";
    form.reset();
  });
}

const initialData = getData();
render(initialData);
fillCmsForm(initialData);
setupCms();
setupAnimations();
setupContactForm();
