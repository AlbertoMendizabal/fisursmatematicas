const WHATSAPP_NUMBER = "525610885357";
const PRODUCT_KEY = "LTA_PRODUCTS_V1";
const NOTIFICATION_KEY = "LTA_NOTIFICATION_V1";
const NOTIFICATION_ENABLED_KEY = "LTA_NOTIFICATION_ENABLED_V1";
const ADMIN_SESSION_KEY = "LTA_ADMIN_SESSION_V1";
const STUDENT_SESSION_KEY = "LTA_STUDENT_SESSION_V1";
const STUDENT_CONTENT_KEY = "LTA_STUDENT_CONTENT_V1";

const DEFAULT_NOTIFICATION =
  "Bienvenido a LA TIENDA DE ALBERTO. Consulta cursos y productos disponibles.";

const courseButtons = document.querySelectorAll("[data-course]");
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const notificationToast = document.getElementById("notificationToast");
const notificationMessage = document.getElementById("notificationMessage");
const closeNotification = document.getElementById("closeNotification");
const staticWhatsAppLinks = document.querySelectorAll("[data-whatsapp-message]");

const adminModal = document.getElementById("adminModal");
const openAdmin = document.getElementById("openAdmin");
const closeAdmin = document.getElementById("closeAdmin");
const adminLogin = document.getElementById("adminLogin");
const adminPanel = document.getElementById("adminPanel");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminPassword = document.getElementById("adminPassword");
const adminLoginStatus = document.getElementById("adminLoginStatus");
const adminLogout = document.getElementById("adminLogout");

const adminProductList = document.getElementById("adminProductList");
const newProductBtn = document.getElementById("newProduct");
const productForm = document.getElementById("productForm");
const productFormTitle = document.getElementById("productFormTitle");
const productImage = document.getElementById("productImage");
const productImageBtn = document.getElementById("productImageBtn");
const productPreview = document.getElementById("productPreview");
const adminDropzone = document.getElementById("adminDropzone");
const adminWhatsApp = document.getElementById("adminWhatsApp");
const productTitle = document.getElementById("productTitle");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const descCount = document.getElementById("descCount");
const cancelProduct = document.getElementById("cancelProduct");
const productFormStatus = document.getElementById("productFormStatus");
const adminStorageStatus = document.getElementById("adminStorageStatus");

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

let products = [];
let editingProductId = null;
let currentGame = null;

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const createWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const setupStaticWhatsAppLinks = () => {
  staticWhatsAppLinks.forEach((link) => {
    const message = link.dataset.whatsappMessage;
    if (message) {
      link.href = createWhatsAppUrl(message);
    }
  });
};

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
    imageDataUrl: demoImage("Calculadora"),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: generateId(),
    title: "Asesoría personalizada",
    description: "Sesión 1 a 1 para resolver dudas y reforzar conceptos.",
    price: 450,
    imageDataUrl: demoImage("Asesoría"),
    createdAt: Date.now() - 10000,
    updatedAt: Date.now() - 10000,
  },
  {
    id: generateId(),
    title: "Guía de ejercicios",
    description: "Colección de problemas con soluciones paso a paso.",
    price: 220,
    imageDataUrl: demoImage("Guía"),
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

const loadProducts = () => {
  const stored = loadFromStorage(PRODUCT_KEY, null);
  if (stored && Array.isArray(stored)) {
    products = stored;
    return;
  }
  products = defaultProducts();
  saveToStorage(PRODUCT_KEY, products);
};

const renderProducts = () => {
  const query = safeText(searchInput.value).toLowerCase();
  const sort = sortSelect.value;

  let filtered = products.filter((product) => {
    const text = `${product.title} ${product.description}`.toLowerCase();
    return text.includes(query);
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
    img.src = product.imageDataUrl;
    img.alt = safeText(product.title);

    const title = document.createElement("h3");
    title.textContent = safeText(product.title);

    const desc = document.createElement("p");
    desc.textContent = safeText(product.description);

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("a");
    button.className = "btn btn-whatsapp";
    button.target = "_blank";
    button.rel = "noopener";
    button.textContent = "Comprar por WhatsApp";
    const message = `Hola Alberto. Me interesa este producto: ${product.title}. Precio: $${product.price} MXN. ¿Sigue disponible? ¿Cómo procedemos?`;
    button.href = createWhatsAppUrl(message);

    card.append(img, title, desc, price, button);
    productGrid.appendChild(card);
  });
};

const updateAdminList = () => {
  adminProductList.innerHTML = "";
  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const img = document.createElement("img");
    img.src = product.imageDataUrl;
    img.alt = safeText(product.title);

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = safeText(product.title);
    const meta = document.createElement("p");
    meta.className = "muted";
    meta.textContent = `${formatPrice(product.price)} · ${safeText(product.description)}`;
    info.append(title, meta);

    const actions = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-ghost";
    editBtn.type = "button";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", () => openEditForm(product));

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

const resetProductForm = () => {
  productForm.reset();
  productPreview.hidden = true;
  productPreview.src = "";
  productPreview.dataset.image = "";
  editingProductId = null;
  productFormTitle.textContent = "Nuevo producto";
  productFormStatus.textContent = "";
  descCount.textContent = "0/220";
};

const openEditForm = (product) => {
  productForm.hidden = false;
  productFormTitle.textContent = "Editar producto";
  editingProductId = product.id;
  productTitle.value = product.title;
  productDescription.value = product.description;
  productPrice.value = product.price;
  descCount.textContent = `${product.description.length}/220`;
  productPreview.src = product.imageDataUrl;
  productPreview.dataset.image = product.imageDataUrl;
  productPreview.hidden = false;
};

const deleteProduct = (id) => {
  const confirmed = window.confirm("¿Seguro que deseas borrar este producto?");
  if (!confirmed) return;
  products = products.filter((product) => product.id !== id);
  persistProducts();
};

const persistProducts = () => {
  const saved = saveToStorage(PRODUCT_KEY, products);
  if (!saved) {
    adminStorageStatus.textContent =
      "No se pudo guardar. Reduce el tamaño de la imagen o elimina productos.";
    return;
  }
  adminStorageStatus.textContent = "";
  renderProducts();
  updateAdminList();
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

const handleProductImage = async (file) => {
  if (!file) return;
  try {
    const dataUrl = await compressImage(file);
    productPreview.src = dataUrl;
    productPreview.hidden = false;
    productPreview.dataset.image = dataUrl;
  } catch (error) {
    productFormStatus.textContent = "No se pudo procesar la imagen.";
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
  const message = loadFromStorage(NOTIFICATION_KEY, DEFAULT_NOTIFICATION);
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
  const title = productTitle.value.trim();
  const description = productDescription.value.trim();
  const priceValue = parsePrice(productPrice.value);
  const imageData = productPreview.dataset.image || productPreview.src;

  if (!title || !description || priceValue === null) {
    productFormStatus.textContent = "Completa todos los campos con datos válidos.";
    return;
  }

  if (!imageData) {
    productFormStatus.textContent = "Agrega una imagen del producto.";
    return;
  }

  const now = Date.now();
  if (editingProductId) {
    products = products.map((product) =>
      product.id === editingProductId
        ? {
            ...product,
            title,
            description,
            price: priceValue,
            imageDataUrl: imageData,
            updatedAt: now,
          }
        : product
    );
  } else {
    products.unshift({
      id: generateId(),
      title,
      description,
      price: priceValue,
      imageDataUrl: imageData,
      createdAt: now,
      updatedAt: now,
    });
  }

  const saved = saveToStorage(PRODUCT_KEY, products);
  if (!saved) {
    productFormStatus.textContent =
      "No se pudo guardar. Reduce el tamaño de la imagen.";
    return;
  }

  resetProductForm();
  productForm.hidden = true;
  renderProducts();
  updateAdminList();
};

const handleNotificationSave = (event) => {
  event.preventDefault();
  const message = notificationInput.value.trim();
  if (!message) {
    notificationStatus.textContent = "Escribe un mensaje válido.";
    return;
  }
  saveToStorage(NOTIFICATION_KEY, message);
  saveToStorage(NOTIFICATION_ENABLED_KEY, notificationEnabled.checked);
  notificationStatus.textContent = "Notificación actualizada.";
};

const handleExport = () => {
  const payload = {
    products,
    notification: loadFromStorage(NOTIFICATION_KEY, DEFAULT_NOTIFICATION),
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
      if (Array.isArray(data.products)) {
        products = data.products;
        saveToStorage(PRODUCT_KEY, products);
        renderProducts();
        updateAdminList();
      }
      if (data.notification) {
        saveToStorage(NOTIFICATION_KEY, data.notification);
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
    handleProductImage(event.target.files?.[0])
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
    const file = event.dataTransfer?.files?.[0];
    handleProductImage(file);
  });
  productDescription.addEventListener("input", () => {
    descCount.textContent = `${productDescription.value.length}/220`;
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

const initializeNotificationForm = () => {
  notificationInput.value = loadFromStorage(NOTIFICATION_KEY, DEFAULT_NOTIFICATION);
  notificationEnabled.checked = loadFromStorage(NOTIFICATION_ENABLED_KEY, true);
};

const init = () => {
  loadProducts();
  renderProducts();
  updateAdminList();
  setupCourseButtons();
  setupStaticWhatsAppLinks();
  setupTabs();
  setupAdminTabs();
  setupNotification();
  setupAdminEvents();
  initializeNotificationForm();
  updateGame();
  gameSubmit.addEventListener("click", handleGameSubmit);
  gameReset.addEventListener("click", updateGame);
  searchInput.addEventListener("input", renderProducts);
  sortSelect.addEventListener("change", renderProducts);
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
