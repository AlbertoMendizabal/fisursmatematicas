const WHATSAPP_NUMBER = "525610885857";
const APPROVED_KEY = "LTA_APPROVED_V1";
const PENDING_KEY = "LTA_PENDING_V1";
const NOTIFICATION_TEXT_KEY = "LTA_NOTIFICATION_TEXT_V1";
const NOTIFICATION_ENABLED_KEY = "LTA_NOTIFICATION_ENABLED_V1";
const ADMIN_SESSION_KEY = "LTA_ADMIN_SESSION_V1";
const STUDENT_SESSION_KEY = "LTA_STUDENT_SESSION_V1";
const STUDENT_CONTENT_KEY = "LTA_STUDENT_CONTENT_V1";
const MESSAGE_KEY = "LTA_MESSAGES_V1";

const DEFAULT_NOTIFICATION =
  "Bienvenido a LA TIENDA DE ALBERTO. Consulta cursos y productos disponibles.";

const courseButtons = document.querySelectorAll("[data-course]");
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const notificationToast = document.getElementById("notificationToast");
const notificationMessage = document.getElementById("notificationMessage");
const closeNotification = document.getElementById("closeNotification");

const proposalForm = document.getElementById("proposalForm");
const proposalDropzone = document.getElementById("proposalDropzone");
const proposalImageBtn = document.getElementById("proposalImageBtn");
const proposalImage = document.getElementById("proposalImage");
const proposalPreview = document.getElementById("proposalPreview");
const proposalType = document.getElementById("proposalType");
const proposalCategory = document.getElementById("proposalCategory");
const proposalTitle = document.getElementById("proposalTitle");
const proposalDescription = document.getElementById("proposalDescription");
const proposalPrice = document.getElementById("proposalPrice");
const proposalSchedule = document.getElementById("proposalSchedule");
const proposalDates = document.getElementById("proposalDates");
const proposalStartDate = document.getElementById("proposalStartDate");
const proposalEndDate = document.getElementById("proposalEndDate");
const proposalStatus = document.getElementById("proposalStatus");

const adminModal = document.getElementById("adminModal");
const openAdmin = document.getElementById("openAdmin");
const closeAdmin = document.getElementById("closeAdmin");
const adminLogin = document.getElementById("adminLogin");
const adminPanel = document.getElementById("adminPanel");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminPassword = document.getElementById("adminPassword");
const adminLoginStatus = document.getElementById("adminLoginStatus");
const adminLogout = document.getElementById("adminLogout");

const adminPendingList = document.getElementById("adminPendingList");
const adminProductList = document.getElementById("adminProductList");
const newProductBtn = document.getElementById("newProduct");
const productForm = document.getElementById("productForm");
const productFormTitle = document.getElementById("productFormTitle");
const productImage = document.getElementById("productImage");
const productImageBtn = document.getElementById("productImageBtn");
const productPreview = document.getElementById("productPreview");
const adminDropzone = document.getElementById("adminDropzone");
const adminWhatsApp = document.getElementById("adminWhatsApp");
const productType = document.getElementById("productType");
const productCategory = document.getElementById("productCategory");
const productTitle = document.getElementById("productTitle");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productSchedule = document.getElementById("productSchedule");
const productDates = document.getElementById("productDates");
const productStartDate = document.getElementById("productStartDate");
const productEndDate = document.getElementById("productEndDate");
const descCount = document.getElementById("descCount");
const cancelProduct = document.getElementById("cancelProduct");
const productFormStatus = document.getElementById("productFormStatus");
const adminStorageStatus = document.getElementById("adminStorageStatus");
const adminMessagesList = document.getElementById("adminMessagesList");

const notificationForm = document.getElementById("notificationForm");
const notificationInput = document.getElementById("notificationInput");
const notificationEnabled = document.getElementById("notificationEnabled");
const notificationStatus = document.getElementById("notificationStatus");

const exportDataBtn = document.getElementById("exportData");
const importDataBtn = document.getElementById("importDataBtn");
const importDataInput = document.getElementById("importData");
const settingsStatus = document.getElementById("settingsStatus");

const tabButtons = document.querySelectorAll("[data-tabs] .tab");
const adminTabButtons = document.querySelectorAll("#adminPanel .tab");

const gameQuestion = document.getElementById("gameQuestion");
const gameAnswer = document.getElementById("gameAnswer");
const gameSubmit = document.getElementById("gameSubmit");
const gameReset = document.getElementById("gameReset");
const gameFeedback = document.getElementById("gameFeedback");

const studentLoginForm = document.getElementById("studentLoginForm");
const studentPassword = document.getElementById("studentPassword");
const studentLoginStatus = document.getElementById("studentLoginStatus");
const studentPanel = document.getElementById("studentPanel");
const studentLogout = document.getElementById("studentLogout");
const studentEditForm = document.getElementById("studentEditForm");
const studentContent = document.getElementById("studentContent");
const studentDate = document.getElementById("studentDate");
const studentNumber = document.getElementById("studentNumber");
const studentSaveStatus = document.getElementById("studentSaveStatus");
const studentPreview = document.getElementById("studentPreview");

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
const categorySelect = document.getElementById("categorySelect");

let approvedProducts = [];
let pendingProposals = [];
let editingApprovedId = null;
let editingPendingId = null;
let editingMode = "approved";
let currentGame = null;
let storedMessages = [];

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const createWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const parsePrice = (value) => {
  if (!value) return null;
  const normalized = value.toString().trim().replace(",", ".");
  const numberValue = Number.parseFloat(normalized);
  return Number.isFinite(numberValue) ? numberValue : null;
};

const formatPrice = (value) => currencyFormatter.format(value ?? 0);

const safeText = (value) => (value ?? "").toString();

const generateId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `prod-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const demoImage = (label) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
      <defs>
        <linearGradient id="a" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#1dbba7"/>
          <stop offset="1" stop-color="#f0c75e"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#a)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial" font-size="34" fill="#ffffff">${label}</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const defaultProducts = () => [
  {
    id: generateId(),
    title: "Calculadora científica",
    description: "Ideal para bachillerato y primeros semestres. Incluye manual.",
    price: 650,
    images: [demoImage("Calculadora")],
    category: "Electrónica",
    type: "Producto",
    startDate: "",
    endDate: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: generateId(),
    title: "Asesoría personalizada",
    description: "Sesión 1 a 1 para resolver dudas y reforzar conceptos.",
    price: 450,
    images: [demoImage("Asesoría")],
    category: "Servicios profesionales",
    type: "Servicio",
    startDate: "2024-11-18",
    endDate: "2024-11-18",
    createdAt: Date.now() - 10000,
    updatedAt: Date.now() - 10000,
  },
  {
    id: generateId(),
    title: "Guía de ejercicios",
    description: "Colección de problemas con soluciones paso a paso.",
    price: 220,
    images: [demoImage("Guía")],
    category: "Educación",
    type: "Producto",
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 20000,
    updatedAt: Date.now() - 20000,
  },
];

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

const loadFromStorage = (key, fallback) => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
};

const normalizeItem = (item) => ({
  ...item,
  images: item.images || (item.imageDataUrl ? [item.imageDataUrl] : []),
  type: item.type || "Producto",
  category: item.category || "Otros",
  startDate: item.startDate || "",
  endDate: item.endDate || "",
});

const loadApproved = () => {
  const stored = loadFromStorage(APPROVED_KEY, null);
  if (stored && Array.isArray(stored)) {
    approvedProducts = stored.map(normalizeItem);
    return;
  }
  approvedProducts = defaultProducts();
  saveToStorage(APPROVED_KEY, approvedProducts);
};

const loadPending = () => {
  const stored = loadFromStorage(PENDING_KEY, []);
  pendingProposals = Array.isArray(stored)
    ? stored.map(normalizeItem)
    : [];
};

const loadMessages = () => {
  const stored = loadFromStorage(MESSAGE_KEY, []);
  storedMessages = Array.isArray(stored) ? stored : [];
};

const renderMessages = () => {
  if (!adminMessagesList) return;
  adminMessagesList.innerHTML = "";
  if (!storedMessages.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay mensajes privados aún.";
    adminMessagesList.appendChild(empty);
    return;
  }

  storedMessages.forEach((message) => {
    const item = document.createElement("div");
    item.className = "admin-item";
    item.classList.add("message-item");

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = message.productTitle || "Producto sin título";
    const meta = document.createElement("p");
    meta.className = "muted";
    meta.textContent = `${message.name} · ${message.contact}`;
    const body = document.createElement("p");
    body.textContent = message.message;
    info.append(title, meta, body);

    const actions = document.createElement("div");
    const readBtn = document.createElement("button");
    readBtn.className = "btn btn-ghost";
    readBtn.type = "button";
    readBtn.textContent = message.read ? "Leído" : "Marcar leído";
    readBtn.disabled = message.read;
    readBtn.addEventListener("click", () => {
      message.read = true;
      saveToStorage(MESSAGE_KEY, storedMessages);
      renderMessages();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      storedMessages = storedMessages.filter((item) => item.id !== message.id);
      saveToStorage(MESSAGE_KEY, storedMessages);
      renderMessages();
    });

    actions.append(readBtn, deleteBtn);
    item.append(info, actions);
    if (!message.read) item.classList.add("is-unread");
    adminMessagesList.appendChild(item);
  });
};

const renderProducts = () => {
  const query = safeText(searchInput.value).toLowerCase();
  const sort = sortSelect.value;
  const selectedCategory = categorySelect?.value ?? "all";

  let filtered = approvedProducts.filter((product) => {
    const text = `${product.title} ${product.description}`.toLowerCase();
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return text.includes(query) && matchesCategory;
  });

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => b.createdAt - a.createdAt);
  }

  productGrid.innerHTML = "";
  filtered.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card product-card";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = product.images?.[0] || demoImage("Producto");
    img.alt = safeText(product.title);

    const title = document.createElement("h3");
    title.textContent = safeText(product.title);

    const meta = document.createElement("div");
    meta.className = "tag-row";
    const typeTag = document.createElement("span");
    typeTag.className = "tag";
    typeTag.textContent = product.type || "Producto";
    const categoryTag = document.createElement("span");
    categoryTag.className = "tag tag-alt";
    categoryTag.textContent = product.category || "Otros";
    meta.append(typeTag, categoryTag);

    const desc = document.createElement("p");
    desc.textContent = safeText(product.description);

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatPrice(product.price);

    const schedule = document.createElement("p");
    schedule.className = "muted small";
    if (product.startDate || product.endDate) {
      const start = product.startDate ? `Inicio: ${product.startDate}` : "";
      const end = product.endDate ? `Fin: ${product.endDate}` : "";
      schedule.textContent = [start, end].filter(Boolean).join(" · ");
    }

    const gallery = document.createElement("div");
    gallery.className = "mini-gallery";
    (product.images || []).slice(0, 4).forEach((image) => {
      const thumb = document.createElement("img");
      thumb.src = image;
      thumb.alt = `Vista de ${product.title}`;
      gallery.appendChild(thumb);
    });

    const button = document.createElement("a");
    button.className = "btn btn-whatsapp";
    button.target = "_blank";
    button.rel = "noopener";
    button.textContent = "Comprar por WhatsApp";
    const message = `Hola Alberto. Me interesa este ${product.type?.toLowerCase() || "producto"}: ${product.title}. Precio: $${product.price} MXN. ¿Sigue disponible? ¿Cómo procedemos?`;
    button.href = createWhatsAppUrl(message);

    const messageToggle = document.createElement("button");
    messageToggle.className = "btn btn-ghost";
    messageToggle.type = "button";
    messageToggle.textContent = "Enviar mensaje privado";

    const messageForm = document.createElement("form");
    messageForm.className = "message-form";
    messageForm.hidden = true;
    messageForm.innerHTML = `
      <label class="field">
        <span>Nombre</span>
        <input type="text" name="name" required>
      </label>
      <label class="field">
        <span>WhatsApp o email</span>
        <input type="text" name="contact" required>
      </label>
      <label class="field">
        <span>Mensaje</span>
        <textarea name="message" rows="3" required></textarea>
      </label>
      <button class="btn btn-primary" type="submit">Enviar mensaje</button>
      <p class="muted small" data-status></p>
    `;

    messageToggle.addEventListener("click", () => {
      messageForm.hidden = !messageForm.hidden;
    });

    messageForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(messageForm);
      const payload = {
        id: generateId(),
        productId: product.id,
        productTitle: product.title,
        name: formData.get("name")?.toString().trim() || "",
        contact: formData.get("contact")?.toString().trim() || "",
        message: formData.get("message")?.toString().trim() || "",
        createdAt: Date.now(),
        read: false,
      };
      if (!payload.name || !payload.contact || !payload.message) return;
      storedMessages.unshift(payload);
      saveToStorage(MESSAGE_KEY, storedMessages);
      const status = messageForm.querySelector("[data-status]");
      if (status) {
        status.textContent = "Mensaje enviado. Te responderemos pronto.";
      }
      messageForm.reset();
      renderMessages();
    });

    card.append(img);
    if (gallery.childElementCount) card.append(gallery);
    card.append(meta, title, desc, price);
    if (schedule.textContent) card.append(schedule);
    card.append(button, messageToggle, messageForm);
    productGrid.appendChild(card);
  });
};

const updateAdminList = () => {
  adminProductList.innerHTML = "";
  if (!approvedProducts.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay productos aprobados aún.";
    adminProductList.appendChild(empty);
    return;
  }

  approvedProducts.forEach((product) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const img = document.createElement("img");
    img.src = product.images?.[0] || demoImage("Producto");
    img.alt = safeText(product.title);

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = safeText(product.title);
    const meta = document.createElement("p");
    meta.className = "muted";
    const dates = [product.startDate, product.endDate].filter(Boolean).join(" · ");
    meta.textContent = `${formatPrice(product.price)} · ${product.type || "Producto"} · ${
      product.category || "Otros"
    }${dates ? ` · ${dates}` : ""} · ${safeText(product.description)}`;
    info.append(title, meta);

    const actions = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-ghost";
    editBtn.type = "button";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", () => openEditForm(product, "approved"));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Borrar";
    deleteBtn.addEventListener("click", () => deleteProduct(product.id));

    actions.append(editBtn, deleteBtn);
    item.append(img, info, actions);
    adminProductList.appendChild(item);
  });
};

const updatePendingList = () => {
  adminPendingList.innerHTML = "";
  if (!pendingProposals.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay propuestas pendientes.";
    adminPendingList.appendChild(empty);
    return;
  }

  pendingProposals.forEach((proposal) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const img = document.createElement("img");
    img.src = proposal.images?.[0] || demoImage("Producto");
    img.alt = safeText(proposal.title);

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = safeText(proposal.title);
    const meta = document.createElement("p");
    meta.className = "muted";
    const dates = [proposal.startDate, proposal.endDate].filter(Boolean).join(" · ");
    meta.textContent = `${formatPrice(proposal.price)} · ${proposal.type || "Producto"} · ${
      proposal.category || "Otros"
    }${dates ? ` · ${dates}` : ""} · ${safeText(proposal.description)}`;
    info.append(title, meta);

    const actions = document.createElement("div");
    const approveBtn = document.createElement("button");
    approveBtn.className = "btn btn-primary";
    approveBtn.type = "button";
    approveBtn.textContent = "Aprobar";
    approveBtn.addEventListener("click", () => approveProposal(proposal.id));

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-ghost";
    editBtn.type = "button";
    editBtn.textContent = "Editar antes de aprobar";
    editBtn.addEventListener("click", () => openEditForm(proposal, "pending"));

    const rejectBtn = document.createElement("button");
    rejectBtn.className = "btn btn-ghost";
    rejectBtn.type = "button";
    rejectBtn.textContent = "Rechazar";
    rejectBtn.addEventListener("click", () => rejectProposal(proposal.id));

    actions.append(approveBtn, editBtn, rejectBtn);
    item.append(img, info, actions);
    adminPendingList.appendChild(item);
  });
};

const resetProductForm = () => {
  productForm.reset();
  productPreview.hidden = true;
  productPreview.innerHTML = "";
  productPreview.dataset.images = "";
  editingApprovedId = null;
  editingPendingId = null;
  editingMode = "approved";
  productFormTitle.textContent = "Nuevo producto";
  productFormStatus.textContent = "";
  descCount.textContent = "0/220";
  productDates.hidden = true;
};

const openEditForm = (item, mode) => {
  productForm.hidden = false;
  editingMode = mode;
  if (mode === "approved") {
    productFormTitle.textContent = "Editar producto";
    editingApprovedId = item.id;
    editingPendingId = null;
  } else {
    productFormTitle.textContent = "Editar propuesta pendiente";
    editingPendingId = item.id;
    editingApprovedId = null;
  }
  productType.value = item.type || "";
  productCategory.value = item.category || "";
  productTitle.value = item.title;
  productDescription.value = item.description;
  productPrice.value = item.price;
  descCount.textContent = `${item.description.length}/220`;
  productStartDate.value = item.startDate || "";
  productEndDate.value = item.endDate || "";
  productSchedule.checked = Boolean(item.startDate || item.endDate);
  productDates.hidden = !productSchedule.checked;
  renderPreviewGrid(productPreview, item.images || []);

  const adminProductsTab = document.getElementById("admin-products-btn");
  if (adminProductsTab) adminProductsTab.click();
};

const deleteProduct = (id) => {
  const confirmed = window.confirm("¿Seguro que deseas borrar este producto?");
  if (!confirmed) return;
  approvedProducts = approvedProducts.filter((product) => product.id !== id);
  persistApproved();
};

const approveProposal = (id) => {
  const proposal = pendingProposals.find((item) => item.id === id);
  if (!proposal) return;
  const confirmed = window.confirm(
    "¿Aprobar esta propuesta y publicarla en el catálogo?"
  );
  if (!confirmed) return;
  pendingProposals = pendingProposals.filter((item) => item.id !== id);
  approvedProducts.unshift({
    ...proposal,
    updatedAt: Date.now(),
  });
  persistPending();
  persistApproved();
};

const rejectProposal = (id) => {
  const confirmed = window.confirm("¿Rechazar esta propuesta?");
  if (!confirmed) return;
  pendingProposals = pendingProposals.filter((item) => item.id !== id);
  persistPending();
};

const persistApproved = () => {
  const saved = saveToStorage(APPROVED_KEY, approvedProducts);
  if (!saved) {
    adminStorageStatus.textContent =
      "No se pudo guardar. Reduce el tamaño de la imagen o elimina productos.";
    return;
  }
  adminStorageStatus.textContent = "";
  renderProducts();
  updateAdminList();
};

const persistPending = () => {
  const saved = saveToStorage(PENDING_KEY, pendingProposals);
  if (!saved) {
    adminStorageStatus.textContent =
      "No se pudo guardar pendientes. Reduce el tamaño de las imágenes.";
  }
  updatePendingList();
};

const compressImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Imagen inválida"));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
    reader.readAsDataURL(file);
  });

const compressImages = async (files) => {
  const fileList = Array.from(files || []);
  const images = [];
  for (const file of fileList) {
    // eslint-disable-next-line no-await-in-loop
    const dataUrl = await compressImage(file);
    images.push(dataUrl);
  }
  return images;
};

const renderPreviewGrid = (previewEl, images) => {
  const list = images || [];
  previewEl.innerHTML = "";
  list.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = `Imagen ${index + 1}`;
    previewEl.appendChild(img);
  });
  previewEl.dataset.images = JSON.stringify(list);
  previewEl.hidden = list.length === 0;
};

const getPreviewImages = (previewEl) => {
  const raw = previewEl.dataset.images;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const handleImageDrop = async ({ files, previewEl, statusEl }) => {
  if (!files || !files.length) return;
  try {
    const images = await compressImages(files);
    renderPreviewGrid(previewEl, images);
    if (statusEl) statusEl.textContent = "";
  } catch (error) {
    if (statusEl) {
      statusEl.textContent = "No se pudo procesar la imagen.";
    }
  }
};

const setupCourseButtons = () => {
  courseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const course = button.dataset.course;
      const message = `Hola Alberto. Quiero inscribirme al curso: ${course}. Paquete: 8 sesiones de 1 hora. Precio: $2400 MXN. ¿Me confirmas horarios y forma de pago?`;
      window.open(createWhatsAppUrl(message), "_blank", "noopener");
    });
  });
};

const setupTabs = () => {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const container = button.closest(".tabs");
      if (!container) return;
      const panelId = button.getAttribute("aria-controls");
      const panels = container.querySelectorAll(".tab-panel");
      const buttons = container.querySelectorAll(".tab");
      buttons.forEach((btn) => btn.setAttribute("aria-selected", "false"));
      panels.forEach((panel) => (panel.hidden = true));
      button.setAttribute("aria-selected", "true");
      const activePanel = container.querySelector(`#${panelId}`);
      if (activePanel) activePanel.hidden = false;
    });
  });
};

const setupAdminTabs = () => {
  adminTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panelId = button.getAttribute("aria-controls");
      adminTabButtons.forEach((btn) => btn.setAttribute("aria-selected", "false"));
      document
        .querySelectorAll("#adminPanel .tab-panel")
        .forEach((panel) => (panel.hidden = true));
      button.setAttribute("aria-selected", "true");
      const panel = document.getElementById(panelId);
      if (panel) panel.hidden = false;
    });
  });
};

const showNotification = () => {
  const enabled = loadFromStorage(NOTIFICATION_ENABLED_KEY, true);
  if (!enabled) return;
  const message = loadFromStorage(NOTIFICATION_TEXT_KEY, DEFAULT_NOTIFICATION);
  notificationMessage.textContent = safeText(message);
  notificationToast.hidden = false;
};

const setupNotification = () => {
  closeNotification.addEventListener("click", () => {
    notificationToast.hidden = true;
  });
  showNotification();
};

const setAdminSession = () => {
  const expiresAt = Date.now() + 2 * 60 * 60 * 1000;
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ expiresAt }));
};

const hasAdminSession = () => {
  const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
  if (!stored) return false;
  try {
    const data = JSON.parse(stored);
    return data.expiresAt > Date.now();
  } catch (error) {
    return false;
  }
};

const openAdminModal = () => {
  adminModal.classList.add("show");
  adminModal.setAttribute("aria-hidden", "false");
  if (hasAdminSession()) {
    adminLogin.hidden = true;
    adminPanel.hidden = false;
  } else {
    adminLogin.hidden = false;
    adminPanel.hidden = true;
  }
};

const closeAdminModal = () => {
  adminModal.classList.remove("show");
  adminModal.setAttribute("aria-hidden", "true");
  adminLoginStatus.textContent = "";
  adminPassword.value = "";
};

const handleAdminLogin = (event) => {
  event.preventDefault();
  const value = adminPassword.value.trim();
  if (value === "2025" || value === "2010") {
    setAdminSession();
    adminLogin.hidden = true;
    adminPanel.hidden = false;
    adminLoginStatus.textContent = "";
  } else {
    adminLoginStatus.textContent = "Contraseña incorrecta.";
  }
};

const handleAdminLogout = () => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  adminPanel.hidden = true;
  adminLogin.hidden = false;
};

const handleProductSubmit = (event) => {
  event.preventDefault();
  const type = productType.value.trim();
  const category = productCategory.value.trim();
  const title = productTitle.value.trim();
  const description = productDescription.value.trim();
  const priceValue = parsePrice(productPrice.value);
  const images = getPreviewImages(productPreview);
  const startDate = productSchedule.checked ? productStartDate.value : "";
  const endDate = productSchedule.checked ? productEndDate.value : "";

  if (!type || !category || !title || !description || priceValue === null) {
    productFormStatus.textContent = "Completa todos los campos con datos válidos.";
    return;
  }

  if (!images.length) {
    productFormStatus.textContent = "Agrega al menos una imagen del producto.";
    return;
  }

  const now = Date.now();
  if (editingMode === "pending" && editingPendingId) {
    pendingProposals = pendingProposals.map((proposal) =>
      proposal.id === editingPendingId
        ? {
            ...proposal,
            type,
            category,
            title,
            description,
            price: priceValue,
            images,
            startDate,
            endDate,
            updatedAt: now,
          }
        : proposal
    );
    const saved = saveToStorage(PENDING_KEY, pendingProposals);
    if (!saved) {
      productFormStatus.textContent =
        "No se pudo guardar. Reduce el tamaño de la imagen.";
      return;
    }
    updatePendingList();
  } else if (editingApprovedId) {
    approvedProducts = approvedProducts.map((product) =>
      product.id === editingApprovedId
        ? {
            ...product,
            type,
            category,
            title,
            description,
            price: priceValue,
            images,
            startDate,
            endDate,
            updatedAt: now,
          }
        : product
    );
    const saved = saveToStorage(APPROVED_KEY, approvedProducts);
    if (!saved) {
      productFormStatus.textContent =
        "No se pudo guardar. Reduce el tamaño de la imagen.";
      return;
    }
    renderProducts();
    updateAdminList();
  } else {
    approvedProducts.unshift({
      id: generateId(),
      type,
      category,
      title,
      description,
      price: priceValue,
      images,
      startDate,
      endDate,
      createdAt: now,
      updatedAt: now,
    });
    const saved = saveToStorage(APPROVED_KEY, approvedProducts);
    if (!saved) {
      productFormStatus.textContent =
        "No se pudo guardar. Reduce el tamaño de la imagen.";
      return;
    }
    renderProducts();
    updateAdminList();
  }

  resetProductForm();
  productForm.hidden = true;
};

const handleNotificationSave = (event) => {
  event.preventDefault();
  const message = notificationInput.value.trim();
  if (!message) {
    notificationStatus.textContent = "Escribe un mensaje válido.";
    return;
  }
  saveToStorage(NOTIFICATION_TEXT_KEY, message);
  saveToStorage(NOTIFICATION_ENABLED_KEY, notificationEnabled.checked);
  notificationStatus.textContent = "Notificación actualizada.";
};

const handleExport = () => {
  const payload = {
    approved: approvedProducts,
    pending: pendingProposals,
    notification: loadFromStorage(NOTIFICATION_TEXT_KEY, DEFAULT_NOTIFICATION),
    notificationEnabled: loadFromStorage(NOTIFICATION_ENABLED_KEY, true),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lta_backup.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  settingsStatus.textContent = "Archivo exportado.";
};

const handleImport = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (Array.isArray(data.approved)) {
        approvedProducts = data.approved;
        saveToStorage(APPROVED_KEY, approvedProducts);
        renderProducts();
        updateAdminList();
      }
      if (Array.isArray(data.pending)) {
        pendingProposals = data.pending;
        saveToStorage(PENDING_KEY, pendingProposals);
        updatePendingList();
      }
      if (data.notification) {
        saveToStorage(NOTIFICATION_TEXT_KEY, data.notification);
      }
      if (typeof data.notificationEnabled === "boolean") {
        saveToStorage(NOTIFICATION_ENABLED_KEY, data.notificationEnabled);
        notificationEnabled.checked = data.notificationEnabled;
      }
      settingsStatus.textContent = "Datos importados correctamente.";
    } catch (error) {
      settingsStatus.textContent = "Archivo inválido.";
    }
  };
  reader.readAsText(file);
};

const updateGame = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const operator = Math.random() > 0.5 ? "+" : "-";
  const result = operator === "+" ? a + b : a - b;
  currentGame = { a, b, operator, result };
  gameQuestion.textContent = `${a} ${operator} ${b} = ?`;
  gameAnswer.value = "";
  gameFeedback.textContent = "";
};

const handleGameSubmit = () => {
  if (!currentGame) return;
  const answer = Number.parseInt(gameAnswer.value, 10);
  if (Number.isNaN(answer)) {
    gameFeedback.textContent = "Escribe una respuesta válida.";
    return;
  }
  if (answer === currentGame.result) {
    gameFeedback.textContent = "¡Correcto!";
  } else {
    gameFeedback.textContent = "Respuesta incorrecta. Intenta de nuevo.";
  }
};

const setStudentSession = () => {
  const expiresAt = Date.now() + 2 * 60 * 60 * 1000;
  sessionStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify({ expiresAt }));
};

const hasStudentSession = () => {
  const stored = sessionStorage.getItem(STUDENT_SESSION_KEY);
  if (!stored) return false;
  try {
    const data = JSON.parse(stored);
    return data.expiresAt > Date.now();
  } catch (error) {
    return false;
  }
};

const loadStudentContent = () => {
  const data = loadFromStorage(STUDENT_CONTENT_KEY, {
    content: "Bienvenido al panel de estudiantes.",
    date: "",
    number: "",
  });
  studentContent.value = data.content;
  studentDate.value = data.date;
  studentNumber.value = data.number;
  studentPreview.textContent = `${data.content} ${data.date ? `· ${data.date}` : ""} ${
    data.number ? `· ${data.number}` : ""
  }`;
};

const handleStudentLogin = (event) => {
  event.preventDefault();
  const value = studentPassword.value.trim();
  if (value === "2025" || value === "1991") {
    setStudentSession();
    studentPanel.hidden = false;
    studentLoginStatus.textContent = "Acceso correcto.";
    loadStudentContent();
  } else {
    studentLoginStatus.textContent = "Contraseña incorrecta.";
  }
};

const handleStudentLogout = () => {
  sessionStorage.removeItem(STUDENT_SESSION_KEY);
  studentPanel.hidden = true;
  studentLoginStatus.textContent = "Sesión cerrada.";
};

const handleStudentSave = (event) => {
  event.preventDefault();
  const payload = {
    content: studentContent.value.trim(),
    date: studentDate.value,
    number: studentNumber.value,
  };
  saveToStorage(STUDENT_CONTENT_KEY, payload);
  studentPreview.textContent = `${payload.content} ${payload.date ? `· ${payload.date}` : ""} ${
    payload.number ? `· ${payload.number}` : ""
  }`;
  studentSaveStatus.textContent = "Cambios guardados.";
};

const setupContactForm = () => {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactStatus.textContent = "Mensaje enviado. Te contactaremos pronto.";
    contactForm.reset();
  });
};

const handleProposalSubmit = (event) => {
  event.preventDefault();
  const type = proposalType.value.trim();
  const category = proposalCategory.value.trim();
  const title = proposalTitle.value.trim();
  const description = proposalDescription.value.trim();
  const priceValue = parsePrice(proposalPrice.value);
  const images = getPreviewImages(proposalPreview);
  const startDate = proposalSchedule.checked ? proposalStartDate.value : "";
  const endDate = proposalSchedule.checked ? proposalEndDate.value : "";

  if (!type || !category || !title || !description || priceValue === null) {
    proposalStatus.textContent = "Completa los campos con datos válidos.";
    return;
  }

  if (!images.length) {
    proposalStatus.textContent = "Agrega una o más imágenes para enviar la propuesta.";
    return;
  }

  const proposal = {
    id: generateId(),
    type,
    category,
    title,
    description,
    price: priceValue,
    images,
    startDate,
    endDate,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  pendingProposals.unshift(proposal);
  const saved = saveToStorage(PENDING_KEY, pendingProposals);
  if (!saved) {
    pendingProposals.shift();
    proposalStatus.textContent =
      "No se pudo guardar. Usa una imagen más ligera.";
    return;
  }

  proposalStatus.textContent = "Propuesta enviada. Será revisada.";
  proposalForm.reset();
  proposalPreview.hidden = true;
  proposalPreview.innerHTML = "";
  proposalPreview.dataset.images = "";
  proposalDates.hidden = true;
  updatePendingList();
};

const setupAdminEvents = () => {
  openAdmin.addEventListener("click", openAdminModal);
  closeAdmin.addEventListener("click", closeAdminModal);
  adminModal.addEventListener("click", (event) => {
    if (event.target === adminModal) closeAdminModal();
  });
  adminLoginForm.addEventListener("submit", handleAdminLogin);
  adminLogout.addEventListener("click", handleAdminLogout);
  newProductBtn.addEventListener("click", () => {
    resetProductForm();
    productForm.hidden = false;
  });
  cancelProduct.addEventListener("click", () => {
    productForm.hidden = true;
    resetProductForm();
  });
  productImageBtn.addEventListener("click", () => productImage.click());
  productImage.addEventListener("change", (event) =>
    handleImageDrop({
      files: event.target.files,
      previewEl: productPreview,
      statusEl: productFormStatus,
    })
  );
  adminDropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    adminDropzone.classList.add("is-dragging");
  });
  adminDropzone.addEventListener("dragleave", () => {
    adminDropzone.classList.remove("is-dragging");
  });
  adminDropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    adminDropzone.classList.remove("is-dragging");
    const files = event.dataTransfer?.files;
    handleImageDrop({ files, previewEl: productPreview, statusEl: productFormStatus });
  });
  productDescription.addEventListener("input", () => {
    descCount.textContent = `${productDescription.value.length}/220`;
  });
  productSchedule.addEventListener("change", () => {
    productDates.hidden = !productSchedule.checked;
  });
  productForm.addEventListener("submit", handleProductSubmit);
  adminWhatsApp.addEventListener("click", () => {
    const title = productTitle.value.trim() || "Sin título";
    const priceValue = parsePrice(productPrice.value) ?? 0;
    const message = `Hola Alberto. Estoy publicando/actualizando un producto en LA TIENDA DE ALBERTO. Producto: ${title}. Precio: $${priceValue} MXN. (Adjunto imagen si aplica).`;
    window.open(createWhatsAppUrl(message), "_blank", "noopener");
  });
  notificationForm.addEventListener("submit", handleNotificationSave);
  exportDataBtn.addEventListener("click", handleExport);
  importDataBtn.addEventListener("click", () => importDataInput.click());
  importDataInput.addEventListener("change", handleImport);
};

const setupProposalEvents = () => {
  proposalImageBtn.addEventListener("click", () => proposalImage.click());
  proposalImage.addEventListener("change", (event) =>
    handleImageDrop({
      files: event.target.files,
      previewEl: proposalPreview,
      statusEl: proposalStatus,
    })
  );
  proposalDropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    proposalDropzone.classList.add("is-dragging");
  });
  proposalDropzone.addEventListener("dragleave", () => {
    proposalDropzone.classList.remove("is-dragging");
  });
  proposalDropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    proposalDropzone.classList.remove("is-dragging");
    const files = event.dataTransfer?.files;
    handleImageDrop({ files, previewEl: proposalPreview, statusEl: proposalStatus });
  });
  proposalSchedule.addEventListener("change", () => {
    proposalDates.hidden = !proposalSchedule.checked;
  });
  proposalForm.addEventListener("submit", handleProposalSubmit);
};

const initializeNotificationForm = () => {
  notificationInput.value = loadFromStorage(
    NOTIFICATION_TEXT_KEY,
    DEFAULT_NOTIFICATION
  );
  notificationEnabled.checked = loadFromStorage(NOTIFICATION_ENABLED_KEY, true);
};

const init = () => {
  loadApproved();
  loadPending();
  loadMessages();
  renderProducts();
  updateAdminList();
  updatePendingList();
  renderMessages();
  setupCourseButtons();
  setupTabs();
  setupAdminTabs();
  setupNotification();
  setupAdminEvents();
  setupProposalEvents();
  initializeNotificationForm();
  updateGame();
  gameSubmit.addEventListener("click", handleGameSubmit);
  gameReset.addEventListener("click", updateGame);
  searchInput.addEventListener("input", renderProducts);
  sortSelect.addEventListener("change", renderProducts);
  categorySelect?.addEventListener("change", renderProducts);
  studentLoginForm.addEventListener("submit", handleStudentLogin);
  studentLogout.addEventListener("click", handleStudentLogout);
  studentEditForm.addEventListener("submit", handleStudentSave);
  setupContactForm();

  if (hasAdminSession()) {
    adminLogin.hidden = true;
    adminPanel.hidden = false;
  }

  if (hasStudentSession()) {
    studentPanel.hidden = false;
    loadStudentContent();
  }
};

init();
