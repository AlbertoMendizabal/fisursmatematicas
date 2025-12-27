const WHATSAPP_NUMBER = "525610885357";
const APPROVED_KEY = "proposals_published";
const PENDING_KEY = "proposals_pending";
const REJECTED_KEY = "proposals_rejected";
const LEGACY_APPROVED_KEY = "LTA_APPROVED_V1";
const LEGACY_PENDING_KEY = "LTA_PENDING_V1";
const NOTIFICATION_TEXT_KEY = "LTA_NOTIFICATION_TEXT_V1";
const NOTIFICATION_ENABLED_KEY = "LTA_NOTIFICATION_ENABLED_V1";
const NOTIFICATION_LOG_KEY = "LTA_NOTIFICATIONS_V1";
const WELCOME_DISMISSED_KEY = "toastDismissed";
const NOTIFICATION_BUBBLE_DISMISSED_KEY = "notificationBubbleDismissed";
const ADMIN_SESSION_KEY = "LTA_ADMIN_SESSION_V1";
const MESSAGE_KEY = "LTA_MESSAGES_V1";
const PROTECTED_CATALOG_KEY = "protectedCatalogUnlocked";
const PROTECTED_CATALOG_HASH = "db55da3fc3098e9c42311c6013304ff36b19ef73d12ea932054b5ad51df4f49d";
const ADMIN_ACCESS_HASHES = new Set([
  "7d12ba56e9f8b3dc64f77c87318c4f37bc12cfbf1a37573cdf3e4fa683f20155",
  "b2b2f104d32c638903e151a9b20d6e27b41d8c0c84cf8458738f83ca2f1dd744",
]);
const ABOUT_KEY = "LTA_ABOUT_V1";
const TAXONOMY_KEY = "catalogTaxonomy";
const DEBUG_ADMIN_EDIT = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const DEFAULT_NOTIFICATION =
  "Bienvenida a LA TIENDA DE ALBERTO. Aquí puedes consultar cursos y productos disponibles.";
const DEFAULT_ABOUT =
  "Soy Alberto. Aquí encontrarás cursos en línea y asesorías, además de un catálogo para vender o rentar productos y servicios.\n\nCada propuesta se revisa para mantener calidad y confianza. Los productos se muestran de forma profesional, con precios transparentes y fechas claras.\n\nEste proyecto nació para dar visibilidad a emprendedores y personas que desean promover asesorías, cursos o artículos especializados. La prioridad es que el proceso sea simple, directo y seguro.\n\nSi tienes dudas o necesitas ayuda para subir tu producto, puedes contactarte para recibir apoyo en el proceso.";

const DEFAULT_CATEGORIES = [
  {
    id: "inmuebles",
    name: "Inmuebles",
    subcategories: [
      { id: "casa", name: "Casa" },
      { id: "departamento", name: "Departamento" },
      { id: "cuarto-habitacion", name: "Cuarto / Habitación" },
      { id: "terreno", name: "Terreno" },
      { id: "oficina", name: "Oficina" },
      { id: "local", name: "Local" },
      { id: "bodega", name: "Bodega" },
      { id: "consultorio", name: "Consultorio" },
      { id: "estudio", name: "Estudio" },
      { id: "cochera-estacionamiento", name: "Cochera / Estacionamiento" },
      { id: "otros", name: "Otros" },
    ],
  },
  {
    id: "vehiculos",
    name: "Vehículos",
    subcategories: [
      { id: "coches", name: "Coche" },
      { id: "motos", name: "Moto" },
      { id: "camionetas", name: "Camioneta" },
      { id: "bicicletas", name: "Bicicleta" },
      { id: "bicicletas-electricas", name: "Bicicleta eléctrica" },
      { id: "scooters-electricos", name: "Scooter eléctrico" },
      { id: "refacciones", name: "Refacciones / Accesorios" },
      { id: "otros", name: "Otros" },
    ],
  },
  {
    id: "electronica",
    name: "Electrónica",
    subcategories: [
      { id: "celulares", name: "Celular" },
      { id: "laptops", name: "Laptop" },
      { id: "tablets", name: "Tablet" },
      { id: "computo", name: "PC" },
      { id: "monitores", name: "Monitor" },
      { id: "audio", name: "Audio" },
      { id: "accesorios", name: "Accesorios" },
      { id: "otros", name: "Otros" },
    ],
  },
  {
    id: "hogar",
    name: "Hogar y muebles",
    subcategories: [
      { id: "muebles", name: "Muebles" },
      { id: "electrodomesticos", name: "Electrodomésticos" },
      { id: "cocina", name: "Cocina" },
      { id: "jardin", name: "Jardín" },
      { id: "herramientas", name: "Herramientas" },
      { id: "otros", name: "Otros" },
    ],
  },
  {
    id: "moda",
    name: "Moda y accesorios",
    subcategories: [
      { id: "ropa", name: "Ropa" },
      { id: "calzado", name: "Calzado" },
      { id: "relojes", name: "Relojes" },
      { id: "bolsas", name: "Bolsas" },
      { id: "accesorios", name: "Accesorios" },
      { id: "otros", name: "Otros" },
    ],
  },
  {
    id: "salud",
    name: "Salud y belleza",
    subcategories: [
      { id: "cuidado-personal", name: "Cuidado personal" },
      { id: "perfumes", name: "Perfumes" },
      { id: "barberia", name: "Barbería" },
      { id: "fitness", name: "Fitness" },
      { id: "otros", name: "Otros" },
    ],
  },
  {
    id: "servicios",
    name: "Servicios",
    subcategories: [
      { id: "asesorias", name: "Asesorías" },
      { id: "eventos", name: "Eventos" },
      { id: "reparaciones", name: "Reparaciones" },
      { id: "clases", name: "Clases" },
      { id: "otros", name: "Otros" },
    ],
  },
  {
    id: "cursos",
    name: "Cursos",
    subcategories: [
      { id: "matematicas", name: "Matemáticas" },
      { id: "tecnologia", name: "Tecnología" },
      { id: "lectura", name: "Lectura" },
      { id: "ajedrez", name: "Ajedrez" },
      { id: "otros", name: "Otros" },
    ],
  },
];

const courseButtons = document.querySelectorAll("[data-course]");
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const notificationToast = document.getElementById("notificationToast");
const notificationMessage = document.getElementById("notificationMessage");
const proposalForm = document.getElementById("proposalForm");
const proposalDropzone = document.getElementById("proposalDropzone");
const proposalImageBtn = document.getElementById("proposalImageBtn");
const proposalImage = document.getElementById("proposalImage");
const proposalPreview = document.getElementById("proposalPreview");
const proposalType = document.getElementById("proposalType");
const proposalOperation = document.getElementById("proposalOperation");
const proposalCondition = document.getElementById("proposalCondition");
const proposalDelivery = document.getElementById("proposalDelivery");
const proposalContactPhone = document.getElementById("proposalContactPhone");
const proposalContactEmail = document.getElementById("proposalContactEmail");
const proposalAddress = document.getElementById("proposalAddress");
const proposalMapSearch = document.getElementById("proposalMapSearch");
const proposalMapManual = document.getElementById("proposalMapManual");
const proposalMap = document.getElementById("proposalMap");
const proposalMapStatus = document.getElementById("proposalMapStatus");
const proposalMapRequest = document.getElementById("proposalMapRequest");
const proposalCategory = document.getElementById("proposalCategory");
const proposalSubcategory = document.getElementById("proposalSubcategory");
const proposalChildcategory = document.getElementById("proposalChildcategory");
const proposalTitle = document.getElementById("proposalTitle");
const proposalDescription = document.getElementById("proposalDescription");
const proposalDescriptionEditor = document.getElementById("proposalDescriptionEditor");
const proposalDescCount = document.getElementById("proposalDescCount");
const proposalPrice = document.getElementById("proposalPrice");
const proposalCommission = document.getElementById("proposalCommission");
const proposalPayout = document.getElementById("proposalPayout");
const proposalPrivate = document.getElementById("proposalPrivate");
const proposalSchedule = document.getElementById("proposalSchedule");
const proposalDates = document.getElementById("proposalDates");
const proposalStartDate = document.getElementById("proposalStartDate");
const proposalEndDate = document.getElementById("proposalEndDate");
const proposalTerms = document.getElementById("proposalTerms");
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
const productOperation = document.getElementById("productOperation");
const productCondition = document.getElementById("productCondition");
const productDelivery = document.getElementById("productDelivery");
const productCategory = document.getElementById("productCategory");
const productSubcategory = document.getElementById("productSubcategory");
const productChildcategory = document.getElementById("productChildcategory");
const productTitle = document.getElementById("productTitle");
const productDescription = document.getElementById("productDescription");
const productDescriptionEditor = document.getElementById("productDescriptionEditor");
const productPrice = document.getElementById("productPrice");
const productContactPhone = document.getElementById("productContactPhone");
const productContactEmail = document.getElementById("productContactEmail");
const productAddress = document.getElementById("productAddress");
const productShowPhone = document.getElementById("productShowPhone");
const productShowEmail = document.getElementById("productShowEmail");
const productShowMap = document.getElementById("productShowMap");
const productShowAddress = document.getElementById("productShowAddress");
const productPrivate = document.getElementById("productPrivate");
const productSchedule = document.getElementById("productSchedule");
const productDates = document.getElementById("productDates");
const productStartDate = document.getElementById("productStartDate");
const productEndDate = document.getElementById("productEndDate");
const productMapSearch = document.getElementById("productMapSearch");
const productMapManual = document.getElementById("productMapManual");
const productMap = document.getElementById("productMap");
const productMapStatus = document.getElementById("productMapStatus");
const productExpiration = document.getElementById("productExpiration");
const productExpirationDateField = document.getElementById("productExpirationDateField");
const productExpirationDate = document.getElementById("productExpirationDate");
const productExpirationHelp = document.getElementById("productExpirationHelp");
const descCount = document.getElementById("descCount");
const cancelProduct = document.getElementById("cancelProduct");
const reactivateProduct = document.getElementById("reactivateProduct");
const productFormStatus = document.getElementById("productFormStatus");
const adminStorageStatus = document.getElementById("adminStorageStatus");
const adminMessagesList = document.getElementById("adminMessagesList");
const adminExpiredList = document.getElementById("adminExpiredList");

const notificationForm = document.getElementById("notificationForm");
const notificationInput = document.getElementById("notificationInput");
const notificationEnabled = document.getElementById("notificationEnabled");
const notificationStatus = document.getElementById("notificationStatus");
const adminNotificationList = document.getElementById("adminNotificationList");
const clearNotificationsBtn = document.getElementById("clearNotifications");

const notificationBubble = document.getElementById("notificationBubble");
const notificationBubbleText = document.getElementById("notificationBubbleText");
const openNotifications = document.getElementById("openNotifications");
const dismissNotifications = document.getElementById("dismissNotifications");

const exportDataBtn = document.getElementById("exportData");
const importDataBtn = document.getElementById("importDataBtn");
const importDataInput = document.getElementById("importData");
const settingsStatus = document.getElementById("settingsStatus");

const tabButtons = document.querySelectorAll("[data-tabs] .tab");
const adminTabButtons = document.querySelectorAll("#adminPanel .tab");

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");
const childcategorySelect = document.getElementById("childcategorySelect");
const typeSelect = document.getElementById("typeSelect");
const operationSelect = document.getElementById("operationSelect");
const priceMin = document.getElementById("priceMin");
const priceMax = document.getElementById("priceMax");
const conditionSelect = document.getElementById("conditionSelect");
const operationChips = document.getElementById("operationChips");
const categoryChips = document.getElementById("categoryChips");
const catalogMenuToggle = document.getElementById("catalogMenuToggle");
const catalogMenu = document.getElementById("catalogMenu");
const catalogMenuCategories = document.getElementById("catalogMenuCategories");
const catalogMenuSubcategories = document.getElementById("catalogMenuSubcategories");
const catalogMenuMobile = document.getElementById("catalogMenuMobile");
const protectedModal = document.getElementById("protectedModal");
const openProtectedCatalog = document.getElementById("openProtectedCatalog");
const closeProtectedModal = document.getElementById("closeProtectedModal");
const protectedAccessForm = document.getElementById("protectedAccessForm");
const protectedPassword = document.getElementById("protectedPassword");
const protectedAccessStatus = document.getElementById("protectedAccessStatus");

const holidayAudio = document.getElementById("holidayAudio");
const toggleMusic = document.getElementById("toggleMusic");
const protectedCatalog = document.getElementById("protectedCatalog");
const protectedGrid = document.getElementById("protectedGrid");
const closeProtectedCatalog = document.getElementById("closeProtectedCatalog");
const commissionModal = document.getElementById("commissionModal");
const commissionModalMessage = document.getElementById("commissionModalMessage");
const continueWhatsApp = document.getElementById("continueWhatsApp");
const cancelWhatsApp = document.getElementById("cancelWhatsApp");
const closeCommissionModal = document.getElementById("closeCommissionModal");
const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const aboutContent = document.getElementById("aboutContent");
const aboutForm = document.getElementById("aboutForm");
const aboutInput = document.getElementById("aboutInput");
const aboutStatus = document.getElementById("aboutStatus");
const taxonomySearch = document.getElementById("taxonomySearch");
const taxonomyCategoryForm = document.getElementById("taxonomyCategoryForm");
const taxonomyCategoryName = document.getElementById("taxonomyCategoryName");
const taxonomyCategoryList = document.getElementById("taxonomyCategoryList");
const taxonomySubcategoryForm = document.getElementById("taxonomySubcategoryForm");
const taxonomySubcategoryName = document.getElementById("taxonomySubcategoryName");
const taxonomySubcategoryList = document.getElementById("taxonomySubcategoryList");
const taxonomyChildForm = document.getElementById("taxonomyChildForm");
const taxonomyChildName = document.getElementById("taxonomyChildName");
const taxonomyChildList = document.getElementById("taxonomyChildList");
const taxonomySelectedCategory = document.getElementById("taxonomySelectedCategory");
const taxonomySelectedSubcategory = document.getElementById("taxonomySelectedSubcategory");

let approvedProducts = [];
let pendingProposals = [];
let rejectedProposals = [];
let editingApprovedId = null;
let editingPendingId = null;
let editingMode = "approved";
let editingDraft = null;
let adminActionsBound = false;
let proposalMapManager = null;
let productMapManager = null;

const MAP_DEFAULT_CENTER = [19.4326, -99.1332];
const MAP_DEFAULT_ZOOM = 5;
let storedMessages = [];
let storedNotifications = [];
let revealObserver = null;
let categories = [];
let activeCategoryId = "";
let activeSubcategoryId = "";
let pendingWhatsAppUrl = "";

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

const ALLOWED_RICH_TAGS = new Set(["B", "STRONG", "U", "BR", "P", "DIV", "SPAN"]);
const ALLOWED_ALIGN = new Set(["left", "center"]);
const ALLOWED_COLORS = ["#0b0b0b", "#5a5a5a", "#b88900", "#1f2937", "#b45309"];

const hexToRgb = (hex) => {
  const raw = hex.replace("#", "");
  if (raw.length !== 6) return "";
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const ALLOWED_COLOR_VALUES = new Set([
  ...ALLOWED_COLORS,
  ...ALLOWED_COLORS.map((color) => hexToRgb(color)),
]);

const sanitizeRichText = (rawHtml) => {
  if (!rawHtml) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${rawHtml}</div>`, "text/html");
  const walk = (node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.COMMENT_NODE) {
        child.remove();
        return;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) return;
      const element = child;
      if (!ALLOWED_RICH_TAGS.has(element.tagName)) {
        const textNode = document.createTextNode(element.textContent || "");
        element.replaceWith(textNode);
        return;
      }
      const styleValue = element.getAttribute("style") || "";
      const sanitizedStyles = [];
      styleValue.split(";").forEach((rule) => {
        const [prop, val] = rule.split(":");
        if (!prop || !val) return;
        const key = prop.trim().toLowerCase();
        const value = val.trim().toLowerCase();
        if (key === "color" && ALLOWED_COLOR_VALUES.has(value)) {
          sanitizedStyles.push(`color:${value}`);
        }
        if (key === "text-align" && ALLOWED_ALIGN.has(value)) {
          sanitizedStyles.push(`text-align:${value}`);
        }
      });
      element.getAttributeNames().forEach((attr) => {
        if (attr !== "style") element.removeAttribute(attr);
      });
      if (sanitizedStyles.length) {
        element.setAttribute("style", sanitizedStyles.join(";"));
      } else {
        element.removeAttribute("style");
      }
      walk(element);
    });
  };
  walk(doc.body);
  return doc.body.innerHTML;
};

const setEditorContent = (editor, html) => {
  if (!editor) return;
  editor.innerHTML = sanitizeRichText(html || "");
};

const getEditorText = (editor) => safeText(editor?.textContent).trim();

const syncEditorValue = (editor, hiddenInput, countEl, max = 220) => {
  if (!editor) return;
  const text = safeText(editor.textContent);
  if (max && text.length > max) {
    editor.textContent = text.slice(0, max);
  }
  const remaining = max ? Math.max(max - safeText(editor.textContent).length, 0) : 0;
  if (countEl) {
    countEl.textContent = max ? `${remaining} caracteres restantes` : "";
  }
  if (hiddenInput) {
    hiddenInput.value = sanitizeRichText(editor.innerHTML);
  }
};

const setupRichTextToolbar = (toolbar) => {
  if (!toolbar) return;
  const editorId = toolbar.dataset.editor;
  const editor = document.getElementById(editorId);
  if (!editor) return;
  toolbar.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    const format = target.dataset.format;
    const color = target.dataset.color;
    editor.focus();
    if (format === "bold") document.execCommand("bold");
    if (format === "underline") document.execCommand("underline");
    if (format === "align-left") document.execCommand("justifyLeft");
    if (format === "align-center") document.execCommand("justifyCenter");
    if (color) document.execCommand("foreColor", false, color);
  });
};

const setupRichTextEditors = () => {
  document.querySelectorAll(".richtext-toolbar").forEach((toolbar) => {
    setupRichTextToolbar(toolbar);
  });
  syncEditorValue(productDescriptionEditor, productDescription, descCount, 220);
  syncEditorValue(proposalDescriptionEditor, proposalDescription, proposalDescCount, 220);
};

const slugify = (value) =>
  safeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const sortTaxonomy = (taxonomy) => {
  const collator = new Intl.Collator("es", { sensitivity: "base" });
  taxonomy.sort((a, b) => collator.compare(a.name, b.name));
  taxonomy.forEach((category) => {
    category.subcategories = category.subcategories || [];
    category.subcategories.sort((a, b) => collator.compare(a.name, b.name));
    category.subcategories.forEach((subcategory) => {
      subcategory.children = subcategory.children || [];
      subcategory.children.sort((a, b) => collator.compare(a.name, b.name));
    });
  });
  return taxonomy;
};

const normalizeTaxonomy = (taxonomy) => {
  if (!Array.isArray(taxonomy)) return [];
  return taxonomy.map((category) => {
    const categoryId = category.id || slugify(category.name);
    const subcategories = (category.subcategories || []).map((subcategory) => ({
      id: subcategory.id || slugify(subcategory.name),
      name: subcategory.name || "Sin nombre",
      children: (subcategory.children || []).map((child) => ({
        id: child.id || slugify(child.name),
        name: child.name || "Sin nombre",
      })),
    }));
    return {
      id: categoryId,
      name: category.name || "Sin nombre",
      subcategories,
    };
  });
};

const loadTaxonomy = () => {
  const stored = loadFromStorage(TAXONOMY_KEY, null);
  if (stored && Array.isArray(stored)) {
    categories = sortTaxonomy(normalizeTaxonomy(stored));
    return;
  }
  categories = sortTaxonomy(JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)));
  saveToStorage(TAXONOMY_KEY, categories);
};

const ensureDefaultTaxonomy = () => {
  const defaults = normalizeTaxonomy(DEFAULT_CATEGORIES);
  let updated = false;
  defaults.forEach((defaultCategory) => {
    const existingCategory = categories.find((cat) => cat.id === defaultCategory.id);
    if (!existingCategory) {
      categories.push(defaultCategory);
      updated = true;
      return;
    }
    defaultCategory.subcategories.forEach((defaultSub) => {
      if (!existingCategory.subcategories.some((sub) => sub.id === defaultSub.id)) {
        existingCategory.subcategories.push(defaultSub);
        updated = true;
      }
    });
  });
  if (updated) saveTaxonomy();
};

const saveTaxonomy = () => {
  categories = sortTaxonomy(normalizeTaxonomy(categories));
  saveToStorage(TAXONOMY_KEY, categories);
};

const getCategories = () => categories;

const hashText = async (value) => {
  if (!value || !window.crypto?.subtle) return null;
  const data = new TextEncoder().encode(value);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const isCourseItem = (product) =>
  product?.type === "Curso" || product?.categoryId === "cursos";

const hasProtectedAccess = () =>
  sessionStorage.getItem(PROTECTED_CATALOG_KEY) === "1";

const setProtectedAccess = () =>
  sessionStorage.setItem(PROTECTED_CATALOG_KEY, "1");

const clearProtectedAccess = () =>
  sessionStorage.removeItem(PROTECTED_CATALOG_KEY);

const updatePriceBreakdown = (priceValue, commissionEl, payoutEl) => {
  if (!commissionEl || !payoutEl) return;
  if (priceValue === null) {
    commissionEl.textContent = "$0 MXN";
    payoutEl.textContent = "$0 MXN";
    return;
  }
  const commission = priceValue * 0.2;
  const payout = priceValue - commission;
  commissionEl.textContent = formatPrice(commission);
  payoutEl.textContent = formatPrice(payout);
};

const formatCondition = (value) => (value ? `Estado: ${value}` : "Estado: Sin especificar");

const formatDelivery = (value) =>
  value ? `Entrega: ${value}` : "Entrega: Sin especificar";

const formatOperation = (value) => {
  const labels = {
    venta: "Venta",
    renta: "Renta",
    venta_renta: "Venta y renta",
  };
  return labels[value] || "Venta";
};

const formatPriceLabel = (value) =>
  value === null || value === undefined ? "Precio: a consultar" : formatPrice(value);

const getCategoryById = (id) => getCategories().find((category) => category.id === id);

const getSubcategoryById = (categoryId, subcategoryId) => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find((subcategory) => subcategory.id === subcategoryId);
};

const getChildById = (categoryId, subcategoryId, childId) => {
  const subcategory = getSubcategoryById(categoryId, subcategoryId);
  return subcategory?.children?.find((child) => child.id === childId);
};

const populateCategorySelect = (selectEl, { includeAll = false } = {}) => {
  if (!selectEl) return;
  selectEl.innerHTML = "";
  if (includeAll) {
    const option = document.createElement("option");
    option.value = "all";
    option.textContent = "Todas";
    selectEl.appendChild(option);
  } else {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Selecciona";
    selectEl.appendChild(option);
  }

  getCategories().forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    selectEl.appendChild(option);
  });
};

const updateChipSelection = (container, datasetKey, value) => {
  if (!container) return;
  const buttons = container.querySelectorAll(".chip");
  buttons.forEach((button) => {
    const matches = button.dataset[datasetKey] === value;
    button.classList.toggle("chip-active", matches);
  });
};

const renderCategoryChips = () => {
  if (!categoryChips || !categorySelect) return;
  categoryChips.innerHTML = "";
  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "chip";
  allButton.dataset.category = "all";
  allButton.textContent = "Todas";
  categoryChips.appendChild(allButton);
  getCategories().forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.dataset.category = category.id;
    button.textContent = category.name;
    categoryChips.appendChild(button);
  });
  updateChipSelection(categoryChips, "category", categorySelect.value || "all");
};

const setupCategoryChips = () => {
  if (!categoryChips || !categorySelect) return;
  categoryChips.addEventListener("click", (event) => {
    const target = event.target.closest("button[data-category]");
    if (!target) return;
    const value = target.dataset.category || "all";
    categorySelect.value = value;
    populateSubcategorySelect(subcategorySelect, categorySelect.value, { includeAll: true });
    populateChildcategorySelect(
      childcategorySelect,
      categorySelect.value,
      subcategorySelect?.value,
      { includeAll: true }
    );
    updateChipSelection(categoryChips, "category", value);
    renderProducts();
  });
};

const setupCategoryScroller = () => {
  const scroller = document.querySelector(".chip-scroller");
  if (!scroller || !categoryChips) return;
  const scrollTarget = categoryChips;
  scroller.querySelectorAll("[data-chip-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.chipNav === "left" ? -1 : 1;
      scrollTarget.scrollBy({ left: direction * 260, behavior: "smooth" });
    });
  });
  scroller.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      scrollTarget.scrollBy({ left: event.deltaY, behavior: "smooth" });
    },
    { passive: true }
  );
};

const setupOperationChips = () => {
  if (!operationChips) return;
  operationChips.addEventListener("click", (event) => {
    const target = event.target.closest("button[data-operation]");
    if (!target) return;
    const value = target.dataset.operation || "all";
    if (operationSelect) operationSelect.value = value;
    updateChipSelection(operationChips, "operation", value);
    renderProducts();
  });
};

const populateSubcategorySelect = (selectEl, categoryId, { includeAll = false } = {}) => {
  if (!selectEl) return;
  selectEl.innerHTML = "";
  if (!categoryId || categoryId === "all") {
    selectEl.disabled = true;
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Selecciona";
    selectEl.appendChild(option);
    return;
  }
  selectEl.disabled = false;
  if (includeAll) {
    const option = document.createElement("option");
    option.value = "all";
    option.textContent = "Todas";
    selectEl.appendChild(option);
  } else {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Selecciona";
    selectEl.appendChild(option);
  }
  const category = getCategoryById(categoryId);
  if (!category) return;
  category.subcategories.forEach((subcategory) => {
    const option = document.createElement("option");
    option.value = subcategory.id;
    option.textContent = subcategory.name;
    selectEl.appendChild(option);
  });
};

const populateChildcategorySelect = (
  selectEl,
  categoryId,
  subcategoryId,
  { includeAll = false } = {}
) => {
  if (!selectEl) return;
  selectEl.innerHTML = "";
  const subcategory = getSubcategoryById(categoryId, subcategoryId);
  const children = subcategory?.children || [];
  if (!children.length) {
    selectEl.disabled = true;
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Selecciona";
    selectEl.appendChild(option);
    return;
  }
  selectEl.disabled = false;
  if (includeAll) {
    const option = document.createElement("option");
    option.value = "all";
    option.textContent = "Todas";
    selectEl.appendChild(option);
  } else {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Selecciona";
    selectEl.appendChild(option);
  }
  children.forEach((child) => {
    const option = document.createElement("option");
    option.value = child.id;
    option.textContent = child.name;
    selectEl.appendChild(option);
  });
};

const ensureValidTaxonomyForItem = (item) => {
  const availableCategories = getCategories();
  if (!availableCategories.length) return item;
  const categoryExists = availableCategories.some((category) => category.id === item.categoryId);
  const categoryId = categoryExists ? item.categoryId : availableCategories[0].id;
  const category = getCategoryById(categoryId);
  const subcategories = category?.subcategories || [];
  const subcategoryExists = subcategories.some(
    (subcategory) => subcategory.id === item.subcategoryId
  );
  const fallbackSubcategory =
    subcategories.find((subcategory) => subcategory.id === "otros")?.id ||
    subcategories[0]?.id ||
    "";
  const subcategoryId = subcategoryExists ? item.subcategoryId : fallbackSubcategory;
  const childExists = subcategories
    .find((subcategory) => subcategory.id === subcategoryId)
    ?.children?.some((child) => child.id === item.childId);
  return {
    ...item,
    categoryId,
    subcategoryId,
    childId: childExists ? item.childId : "",
    category: getCategoryById(categoryId)?.name || item.category,
  };
};

const setCategorySelection = (
  selectEl,
  subSelectEl,
  childSelectEl,
  categoryId,
  subcategoryId,
  childId,
  fallbackName = ""
) => {
  const resolvedCategoryId = categoryId || guessCategoryIdFromName(fallbackName);
  if (selectEl) {
    selectEl.value = resolvedCategoryId || "";
  }
  populateSubcategorySelect(subSelectEl, resolvedCategoryId || "");
  if (subSelectEl && subcategoryId) {
    subSelectEl.value = subcategoryId;
  }
  populateChildcategorySelect(childSelectEl, resolvedCategoryId || "", subcategoryId || "");
  if (childSelectEl && childId) {
    childSelectEl.value = childId;
  }
};

const normalizeCategoryName = (name) => safeText(name).toLowerCase();

const guessCategoryIdFromName = (name) => {
  const normalized = normalizeCategoryName(name);
  if (normalized.includes("inmueble")) return "inmuebles";
  if (normalized.includes("veh")) return "vehiculos";
  if (normalized.includes("electr")) return "electronica";
  if (normalized.includes("hogar") || normalized.includes("mueble")) return "hogar";
  if (normalized.includes("moda") || normalized.includes("ropa")) return "moda";
  if (normalized.includes("salud") || normalized.includes("belleza")) return "salud";
  if (normalized.includes("serv")) return "servicios";
  if (normalized.includes("curso")) return "cursos";
  return "";
};

const mapLegacySubcategory = (categoryId, subcategoryId, childId = "") => {
  const category = getCategoryById(categoryId);
  if (!category) {
    return { subcategoryId: subcategoryId || "otros", childId: childId || "" };
  }
  const fallbackId = category.subcategories.find((subcategory) => subcategory.id === "otros")
    ? "otros"
    : category.subcategories[0]?.id || "otros";
  const legacyOverrides = {
    inmuebles: {
      "venta-casas": "casa",
      "renta-casas": "casa",
      "venta-departamentos": "departamento",
      "renta-departamentos": "departamento",
      "venta-terrenos": "terreno",
      "venta-oficinas": "oficina",
      "renta-oficinas": "oficina",
      "venta-locales": "local",
      "renta-locales": "local",
      "venta-bodegas": "bodega",
      "renta-bodegas": "bodega",
    },
    vehiculos: {
      "venta-coches": "coches",
      "renta-coches": "coches",
      "venta-motos": "motos",
      "renta-motos": "motos",
      "venta-camionetas": "camionetas",
      "electricos-coches": "coches",
      "electricos-motos": "motos",
      "electricos-bicicletas": "bicicletas-electricas",
      "electricos-scooters": "scooters-electricos",
      electricos: "bicicletas-electricas",
      llantas: "refacciones",
      "cascos-equipo": "refacciones",
      refacciones: "refacciones",
    },
    electronica: {
      computo: "computo",
      accesorios: "accesorios",
      monitores: "monitores",
      consolas: "computo",
      audio: "audio",
    },
    servicios: {
      asesoria: "asesorias",
    },
    salud: {
      cuidado: "cuidado-personal",
    },
  };
  const legacyChild = legacyOverrides[categoryId]?.[childId];
  if (legacyChild) {
    return { subcategoryId: legacyChild, childId: "" };
  }
  if (subcategoryId) {
    const direct = category.subcategories.find((subcategory) => subcategory.id === subcategoryId);
    if (direct) {
      return { subcategoryId: direct.id, childId: "" };
    }
  }
  if (!subcategoryId) {
    return { subcategoryId: fallbackId, childId: "" };
  }
  return { subcategoryId: fallbackId, childId: "" };
};

const ensureCategoryData = (item) => {
  const categoryId = item.categoryId || guessCategoryIdFromName(item.category);
  const fallbackCategoryId = categoryId || "servicios";
  const fallbackSubcategoryId = item.subcategoryId || "otros";
  const matched = mapLegacySubcategory(
    fallbackCategoryId,
    fallbackSubcategoryId,
    item.childId || ""
  );
  return {
    ...item,
    categoryId: fallbackCategoryId,
    subcategoryId: matched.subcategoryId,
    childId: matched.childId,
  };
};

const getCategoryLabel = (product) =>
  getCategoryById(product.categoryId)?.name || product.category || "Otros";

const getSubcategoryLabel = (product) =>
  getSubcategoryById(product.categoryId, product.subcategoryId)?.name || "";

const getChildLabel = (product) =>
  getChildById(product.categoryId, product.subcategoryId, product.childId)?.name || "";

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
    title: "Asistencia en exámenes",
    description: "Ideal para bachillerato y primeros semestres. Incluye manual.",
    price: 250,
    priceMXN: 250,
    images: [demoImage("Asistencia")],
    category: "Electrónica",
    categoryId: "electronica",
    subcategoryId: "computo",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: generateId(),
    title: "Laptop ultraligera 14”",
    description: "Equipo rápido para estudio o trabajo remoto, batería de larga duración.",
    price: 14500,
    priceMXN: 14500,
    images: [demoImage("Laptop")],
    category: "Electrónica",
    categoryId: "electronica",
    subcategoryId: "laptops",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 5000,
    updatedAt: Date.now() - 5000,
  },
  {
    id: generateId(),
    title: "Monitor 27” para estudio",
    description: "Pantalla amplia para productividad, ideal para home office.",
    price: 4200,
    priceMXN: 4200,
    images: [demoImage("Monitor")],
    category: "Electrónica",
    categoryId: "electronica",
    subcategoryId: "computo",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 9000,
    updatedAt: Date.now() - 9000,
  },
  {
    id: generateId(),
    title: "Consola de entretenimiento",
    description: "Consola en excelente estado, incluye controles originales.",
    price: 7800,
    priceMXN: 7800,
    images: [demoImage("Consola")],
    category: "Electrónica",
    categoryId: "electronica",
    subcategoryId: "computo",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 12000,
    updatedAt: Date.now() - 12000,
  },
  {
    id: generateId(),
    title: "Sala esquinera moderna",
    description: "Mueble amplio y cómodo, tapizado en tela resistente.",
    price: 9800,
    priceMXN: 9800,
    images: [demoImage("Sala")],
    category: "Hogar y muebles",
    categoryId: "hogar",
    subcategoryId: "muebles",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 15000,
    updatedAt: Date.now() - 15000,
  },
  {
    id: generateId(),
    title: "Refrigerador familiar",
    description: "Gran capacidad, ideal para familias o departamentos compartidos.",
    price: 7200,
    priceMXN: 7200,
    images: [demoImage("Refrigerador")],
    category: "Hogar y muebles",
    categoryId: "hogar",
    subcategoryId: "electrodomesticos",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 17000,
    updatedAt: Date.now() - 17000,
  },
  {
    id: generateId(),
    title: "Taladro inalámbrico",
    description: "Herramienta multiusos para el hogar y proyectos personales.",
    price: 1100,
    priceMXN: 1100,
    images: [demoImage("Taladro")],
    category: "Hogar y muebles",
    categoryId: "hogar",
    subcategoryId: "herramientas",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 19000,
    updatedAt: Date.now() - 19000,
  },
  {
    id: generateId(),
    title: "Vestido casual",
    description: "Vestido cómodo para uso diario o eventos informales.",
    price: 650,
    priceMXN: 650,
    images: [demoImage("Vestido")],
    category: "Moda y accesorios",
    categoryId: "moda",
    subcategoryId: "ropa",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 21000,
    updatedAt: Date.now() - 21000,
  },
  {
    id: generateId(),
    title: "Tenis deportivos",
    description: "Calzado ligero para entrenamiento o uso diario.",
    price: 1200,
    priceMXN: 1200,
    images: [demoImage("Calzado")],
    category: "Moda y accesorios",
    categoryId: "moda",
    subcategoryId: "calzado",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 23000,
    updatedAt: Date.now() - 23000,
  },
  {
    id: generateId(),
    title: "Perfume floral",
    description: "Aroma fresco para uso diario.",
    price: 850,
    priceMXN: 850,
    images: [demoImage("Perfume")],
    category: "Salud y belleza",
    categoryId: "salud",
    subcategoryId: "perfumes",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 25000,
    updatedAt: Date.now() - 25000,
  },
  {
    id: generateId(),
    title: "Kit de barbería en casa",
    description: "Máquina y accesorios para cuidado personal.",
    price: 900,
    priceMXN: 900,
    images: [demoImage("Barbería")],
    category: "Salud y belleza",
    categoryId: "salud",
    subcategoryId: "barberia",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 27000,
    updatedAt: Date.now() - 27000,
  },
  {
    id: generateId(),
    title: "Departamento en renta · Roma Norte",
    description: "Departamento amueblado con servicios incluidos, ideal para quien busca comodidad.",
    price: 8500,
    priceMXN: 8500,
    images: [demoImage("Departamento")],
    category: "Inmuebles",
    categoryId: "inmuebles",
    subcategoryId: "departamento",
    childId: "",
    operation: "renta",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 30000,
    updatedAt: Date.now() - 30000,
  },
  {
    id: generateId(),
    title: "Local en renta · Centro",
    description: "Local ideal para negocio, alto flujo peatonal.",
    price: 12000,
    priceMXN: 12000,
    images: [demoImage("Local")],
    category: "Inmuebles",
    categoryId: "inmuebles",
    subcategoryId: "local",
    childId: "",
    operation: "renta",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 33000,
    updatedAt: Date.now() - 33000,
  },
  {
    id: generateId(),
    title: "Casa en venta · Jardines del Sur",
    description: "Casa con 3 recámaras, patio amplio y cochera doble.",
    price: 1850000,
    priceMXN: 1850000,
    images: [demoImage("Casa")],
    category: "Inmuebles",
    categoryId: "inmuebles",
    subcategoryId: "casa",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 36000,
    updatedAt: Date.now() - 36000,
  },
  {
    id: generateId(),
    title: "Auto compacto 2018",
    description: "Excelente rendimiento, documentos al día y mantenimiento reciente.",
    price: 165000,
    priceMXN: 165000,
    images: [demoImage("Auto")],
    category: "Vehículos",
    categoryId: "vehiculos",
    subcategoryId: "coches",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 39000,
    updatedAt: Date.now() - 39000,
  },
  {
    id: generateId(),
    title: "Moto urbana 150cc",
    description: "Ideal para traslados rápidos, lista para entrega inmediata.",
    price: 32000,
    priceMXN: 32000,
    images: [demoImage("Moto")],
    category: "Vehículos",
    categoryId: "vehiculos",
    subcategoryId: "motos",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 42000,
    updatedAt: Date.now() - 42000,
  },
  {
    id: generateId(),
    title: "Camioneta para trabajo",
    description: "Camioneta lista para uso laboral, con amplia capacidad.",
    price: 245000,
    priceMXN: 245000,
    images: [demoImage("Camioneta")],
    category: "Vehículos",
    categoryId: "vehiculos",
    subcategoryId: "camionetas",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 45000,
    updatedAt: Date.now() - 45000,
  },
  {
    id: generateId(),
    title: "Bicicleta eléctrica urbana",
    description: "Movilidad ágil con batería de larga duración.",
    price: 22000,
    priceMXN: 22000,
    images: [demoImage("E-bike")],
    category: "Vehículos",
    categoryId: "vehiculos",
    subcategoryId: "bicicletas-electricas",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 48000,
    updatedAt: Date.now() - 48000,
  },
  {
    id: generateId(),
    title: "Audio para auto",
    description: "Sistema de audio con excelente calidad y potencia.",
    price: 4200,
    priceMXN: 4200,
    images: [demoImage("Audio auto")],
    category: "Electrónica",
    categoryId: "electronica",
    subcategoryId: "audio",
    childId: "",
    type: "Producto",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 52000,
    updatedAt: Date.now() - 52000,
  },
  {
    id: generateId(),
    title: "Renta de sonido para eventos (5 horas)",
    description:
      "Renta de sonido para fiestas y eventos por 5 horas. Ideal para celebraciones y reuniones. Se notificará por WhatsApp cuando haya interesados para coordinar los detalles.",
    price: 5000,
    priceMXN: 5000,
    images: [demoImage("Sonido")],
    category: "Servicios",
    categoryId: "servicios",
    subcategoryId: "eventos",
    childId: "",
    operation: "renta",
    type: "Servicio",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 56000,
    updatedAt: Date.now() - 56000,
  },
  {
    id: generateId(),
    title: "Asesoría en matemáticas presencial",
    description: "Sesión 1 a 1 para resolver dudas y reforzar conceptos.",
    price: 600,
    priceMXN: 600,
    images: [demoImage("Asesoría")],
    category: "Servicios",
    categoryId: "servicios",
    subcategoryId: "asesorias",
    childId: "",
    type: "Servicio",
    status: "publicado",
    isProtected: false,
    startDate: "2024-11-18",
    endDate: "2024-11-18",
    createdAt: Date.now() - 60000,
    updatedAt: Date.now() - 60000,
  },
  {
    id: generateId(),
    title: "Reparación de laptops",
    description: "Diagnóstico y reparación básica de equipos portátiles.",
    price: 650,
    priceMXN: 650,
    images: [demoImage("Reparación")],
    category: "Servicios",
    categoryId: "servicios",
    subcategoryId: "reparaciones",
    childId: "",
    type: "Servicio",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 64000,
    updatedAt: Date.now() - 64000,
  },
  {
    id: generateId(),
    title: "Contar y sumar desde cero",
    description: "Sesiones en línea para construir bases sólidas y practicar paso a paso.",
    price: null,
    priceMXN: null,
    images: [demoImage("Sumar")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 70000,
    updatedAt: Date.now() - 70000,
  },
  {
    id: generateId(),
    title: "Sumar, restar, multiplicar y dividir",
    description: "Sesiones en línea enfocadas en práctica guiada y confianza en operaciones.",
    price: null,
    priceMXN: null,
    images: [demoImage("Operaciones")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 74000,
    updatedAt: Date.now() - 74000,
  },
  {
    id: generateId(),
    title: "Aritmética",
    description: "Sesiones en línea con ejercicios clave para fortalecer el razonamiento.",
    price: null,
    priceMXN: null,
    images: [demoImage("Aritmética")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 76000,
    updatedAt: Date.now() - 76000,
  },
  {
    id: generateId(),
    title: "Álgebra",
    description: "Sesiones en línea para resolver ecuaciones y modelar problemas.",
    price: null,
    priceMXN: null,
    images: [demoImage("Álgebra")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 78000,
    updatedAt: Date.now() - 78000,
  },
  {
    id: generateId(),
    title: "Geometría",
    description: "Sesiones en línea para comprender figuras, áreas y razonamiento espacial.",
    price: null,
    priceMXN: null,
    images: [demoImage("Geometría")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 80000,
    updatedAt: Date.now() - 80000,
  },
  {
    id: generateId(),
    title: "Trigonometría",
    description: "Sesiones en línea con práctica de identidades y aplicaciones reales.",
    price: null,
    priceMXN: null,
    images: [demoImage("Trigonometría")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 82000,
    updatedAt: Date.now() - 82000,
  },
  {
    id: generateId(),
    title: "Cálculo (Taller intensivo de derivadas e integrales)",
    description: "Sesiones en línea centradas en derivadas, integrales y aplicación práctica.",
    price: null,
    priceMXN: null,
    images: [demoImage("Cálculo")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 84000,
    updatedAt: Date.now() - 84000,
  },
  {
    id: generateId(),
    title: "Cálculo diferencial",
    description: "Sesiones en línea con ejercicios guiados y preparación para exámenes.",
    price: null,
    priceMXN: null,
    images: [demoImage("Diferencial")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 86000,
    updatedAt: Date.now() - 86000,
  },
  {
    id: generateId(),
    title: "Cálculo integral",
    description: "Sesiones en línea con métodos de integración y práctica intensiva.",
    price: null,
    priceMXN: null,
    images: [demoImage("Integral")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 88000,
    updatedAt: Date.now() - 88000,
  },
  {
    id: generateId(),
    title: "Probabilidad",
    description: "Sesiones en línea con ejemplos prácticos y análisis de datos.",
    price: null,
    priceMXN: null,
    images: [demoImage("Probabilidad")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 90000,
    updatedAt: Date.now() - 90000,
  },
  {
    id: generateId(),
    title: "Álgebra lineal",
    description: "Sesiones en línea con matrices, vectores y aplicaciones prácticas.",
    price: null,
    priceMXN: null,
    images: [demoImage("Lineal")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 88000,
    updatedAt: Date.now() - 88000,
  },
  {
    id: generateId(),
    title: "Análisis matemático",
    description: "Sesiones en línea con enfoque conceptual y rigor matemático.",
    price: null,
    priceMXN: null,
    images: [demoImage("Análisis")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 90000,
    updatedAt: Date.now() - 90000,
  },
  {
    id: generateId(),
    title: "Ecuaciones diferenciales",
    description: "Sesiones en línea para modelar fenómenos y resolver ejercicios guiados.",
    price: null,
    priceMXN: null,
    images: [demoImage("Ecuaciones")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 92000,
    updatedAt: Date.now() - 92000,
  },
  {
    id: generateId(),
    title: "Básicos de ajedrez",
    description: "Sesiones en línea para mejorar estrategia y pensamiento lógico.",
    price: null,
    priceMXN: null,
    images: [demoImage("Ajedrez")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "otros",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 94000,
    updatedAt: Date.now() - 94000,
  },
  {
    id: generateId(),
    title: "Curso intensivo de ChatGPT Plus",
    description: "Sesiones en línea para aplicar IA en tareas y proyectos.",
    price: null,
    priceMXN: null,
    images: [demoImage("ChatGPT")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "tecnologia",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 96000,
    updatedAt: Date.now() - 96000,
  },
  {
    id: generateId(),
    title: "Te leo un libro (Círculo de lectura)",
    description: "Sesiones en línea para comprensión lectora y análisis guiado.",
    price: null,
    priceMXN: null,
    images: [demoImage("Lectura")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "otros",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 98000,
    updatedAt: Date.now() - 98000,
  },
  {
    id: generateId(),
    title: "Física I",
    description: "Sesiones en línea para comprender cinemática y leyes de Newton.",
    price: null,
    priceMXN: null,
    images: [demoImage("Física I")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 100000,
    updatedAt: Date.now() - 100000,
  },
  {
    id: generateId(),
    title: "Física II",
    description: "Sesiones en línea enfocadas en electricidad, magnetismo y práctica.",
    price: null,
    priceMXN: null,
    images: [demoImage("Física II")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "matematicas",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 102000,
    updatedAt: Date.now() - 102000,
  },
  {
    id: generateId(),
    title: "Programación",
    description: "Sesiones en línea para lógica, algoritmos y ejercicios aplicados.",
    price: null,
    priceMXN: null,
    images: [demoImage("Programación")],
    category: "Cursos",
    categoryId: "cursos",
    subcategoryId: "tecnologia",
    childId: "",
    type: "Curso",
    status: "publicado",
    isProtected: false,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 104000,
    updatedAt: Date.now() - 104000,
  },
  {
    id: generateId(),
    title: "Paquete premium de asesoría financiera",
    description: "Servicio integral con seguimiento personalizado.",
    price: 3500,
    priceMXN: 3500,
    images: [demoImage("Premium")],
    category: "Servicios",
    categoryId: "servicios",
    subcategoryId: "asesorias",
    childId: "",
    type: "Servicio",
    status: "publicado",
    isProtected: true,
    startDate: "",
    endDate: "",
    createdAt: Date.now() - 94000,
    updatedAt: Date.now() - 94000,
  },
].map((item) => ({
  ...item,
  operation: item.operation || "venta",
}));

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

const normalizeItem = (item) => {
  const legacyOperation = (() => {
    if (item.operation) return item.operation;
    if (["venta", "renta", "venta_renta"].includes(item.subcategoryId)) {
      return item.subcategoryId;
    }
    if (safeText(item.childId).startsWith("venta-")) return "venta";
    if (safeText(item.childId).startsWith("renta-")) return "renta";
    return "venta";
  })();
  const addressText = safeText(item.addressText || item.location || item.address || "");
  const latValue = Number.isFinite(Number(item.lat)) ? Number(item.lat) : null;
  const lngValue = Number.isFinite(Number(item.lng)) ? Number(item.lng) : null;
  const locationMode =
    item.locationMode ||
    (latValue !== null && lngValue !== null ? "exact" : addressText ? "approx" : "none");
  const showMapPublic = Boolean(
    item.showMapPublic ?? item.mapApproved ?? item.visibility?.showMap ?? item.showMap
  );
  const showAddressPublic = Boolean(
    item.showAddressPublic ?? item.visibility?.showAddress ?? item.showAddress
  );
  const expiresAtValue = Number.isFinite(Number(item.expiresAt))
    ? Number(item.expiresAt)
    : null;
  const statusValue = item.status === "publicado" ? "activo" : item.status || "activo";
  const pinnedForeverValue = Boolean(
    item.pinnedForever ?? (expiresAtValue === null && statusValue !== "expirado")
  );
  const normalized = {
    ...item,
    images: item.images || (item.imageDataUrl ? [item.imageDataUrl] : []),
    type: item.type || "Producto",
    operation: legacyOperation || "venta",
    categoryId: item.categoryId || "",
    subcategoryId: ["venta", "renta", "venta_renta"].includes(item.subcategoryId)
      ? "otros"
      : item.subcategoryId || "",
    childId: item.childId || "",
    category: item.category || "",
    price: item.price ?? item.priceMXN ?? null,
    priceMXN: item.priceMXN ?? item.price ?? null,
    descriptionHtml: item.descriptionHtml || item.description || "",
    isProtected: Boolean(item.isProtected ?? item.isPrivate),
    status: statusValue,
    startDate: item.startDate || "",
    endDate: item.endDate || "",
    location: addressText,
    addressText,
    lat: latValue,
    lng: lngValue,
    locationMode,
    showMapPublic,
    showAddressPublic,
    expiresAt: expiresAtValue,
    pinnedForever: pinnedForeverValue,
    durationPreset: item.durationPreset || (expiresAtValue ? "date" : "forever"),
    mapRequested: Boolean(item.mapRequested),
    mapApproved: Boolean(item.mapApproved),
    contact: {
      phone: item.contact?.phone || item.contactPhone || "",
      email: item.contact?.email || item.contactEmail || "",
    },
    visibility: {
      showPhone: Boolean(item.visibility?.showPhone ?? item.showPhone),
      showEmail: Boolean(item.visibility?.showEmail ?? item.showEmail),
      showMap: showMapPublic,
      showAddress: showAddressPublic,
    },
  };
  const ensured = ensureCategoryData(normalized);
  if (!ensured.category && ensured.categoryId) {
    const category = getCategoryById(ensured.categoryId);
    return { ...ensured, category: category?.name || "" };
  }
  return ensured;
};

const sanitizeApprovedProduct = (item) => {
  const normalized = normalizeItem(item);
  const { detailsRequest, ...rest } = normalized;
  return rest;
};

const normalizeProposal = (item) => ({
  ...normalizeItem(item),
  status: item.status || "pendiente",
  detailsRequest: item.detailsRequest || "",
  contact: {
    phone: item.contact?.phone || "",
    email: item.contact?.email || "",
  },
});

const loadApproved = () => {
  const stored = loadFromStorage(APPROVED_KEY, null);
  if (stored && Array.isArray(stored)) {
    approvedProducts = stored.map(sanitizeApprovedProduct);
    saveToStorage(APPROVED_KEY, approvedProducts);
    return;
  }
  const legacy = loadFromStorage(LEGACY_APPROVED_KEY, null);
  if (legacy && Array.isArray(legacy)) {
    approvedProducts = legacy.map(sanitizeApprovedProduct);
    saveToStorage(APPROVED_KEY, approvedProducts);
    return;
  }
  approvedProducts = defaultProducts();
  saveToStorage(APPROVED_KEY, approvedProducts);
};

const loadPending = () => {
  const stored = loadFromStorage(PENDING_KEY, null);
  if (stored && Array.isArray(stored)) {
    pendingProposals = stored.map(normalizeProposal);
    return;
  }
  const legacy = loadFromStorage(LEGACY_PENDING_KEY, null);
  pendingProposals = Array.isArray(legacy) ? legacy.map(normalizeProposal) : [];
  if (pendingProposals.length) {
    saveToStorage(PENDING_KEY, pendingProposals);
  }
};

const loadRejected = () => {
  const stored = loadFromStorage(REJECTED_KEY, []);
  rejectedProposals = Array.isArray(stored) ? stored.map(normalizeProposal) : [];
};

const isExpired = (item, now = Date.now()) =>
  !item.pinnedForever && item.expiresAt && item.expiresAt <= now;

const maintainExpirationStatus = () => {
  let changed = false;
  const now = Date.now();
  approvedProducts = approvedProducts.map((product) => {
    const createdAt = product.createdAt || now;
    let status = product.status || "activo";
    let expiresAt = product.expiresAt ?? null;
    const pinnedForever = Boolean(product.pinnedForever);
    if (pinnedForever) {
      expiresAt = null;
      if (status === "expirado") status = "activo";
    } else if (expiresAt && expiresAt <= now) {
      status = "expirado";
    }
    if (
      createdAt !== product.createdAt ||
      status !== product.status ||
      expiresAt !== product.expiresAt
    ) {
      changed = true;
      return {
        ...product,
        createdAt,
        status,
        expiresAt,
        pinnedForever,
      };
    }
    return product;
  });
  if (changed) {
    saveToStorage(APPROVED_KEY, approvedProducts);
  }
};

const loadMessages = () => {
  const stored = loadFromStorage(MESSAGE_KEY, []);
  storedMessages = Array.isArray(stored) ? stored : [];
};

const loadAbout = () =>
  loadFromStorage(ABOUT_KEY, DEFAULT_ABOUT).toString().trim();

const renderAbout = () => {
  if (!aboutContent) return;
  const text = loadAbout();
  const paragraphs = text.split("\n").map((line) => line.trim()).filter(Boolean);
  aboutContent.innerHTML = "";
  paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    aboutContent.appendChild(p);
  });
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
    const dateLine = message.requestedDate ? ` · Fecha: ${message.requestedDate}` : "";
    meta.textContent = `${message.name} · ${message.contact}${dateLine}`;
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

const loadNotifications = () => {
  const stored = loadFromStorage(NOTIFICATION_LOG_KEY, []);
  storedNotifications = Array.isArray(stored)
    ? stored.map((item) => ({
        ...item,
        read: Boolean(item.read),
      }))
    : [];
};

const saveNotifications = () => {
  saveToStorage(NOTIFICATION_LOG_KEY, storedNotifications);
  renderNotifications();
  renderNotificationBubble();
};

const addNotification = ({ type, message, itemId }) => {
  const payload = {
    id: generateId(),
    type,
    message,
    itemId: itemId || "",
    createdAt: Date.now(),
    read: false,
  };
  storedNotifications.unshift(payload);
  saveNotifications();
};

const renderNotifications = () => {
  if (!adminNotificationList) return;
  adminNotificationList.innerHTML = "";
  if (!storedNotifications.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay notificaciones acumuladas.";
    adminNotificationList.appendChild(empty);
    return;
  }

  storedNotifications.forEach((notification) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = notification.type || "Notificación";
    if (!notification.read) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.style.display = "inline-block";
      badge.textContent = "Nuevo";
      title.appendChild(document.createTextNode(" "));
      title.appendChild(badge);
    }
    const meta = document.createElement("p");
    meta.className = "muted";
    const dateText = new Date(notification.createdAt).toLocaleString("es-MX");
    meta.textContent = `${dateText}${notification.itemId ? ` · ${notification.itemId}` : ""}`;
    const message = document.createElement("p");
    message.textContent = notification.message;
    info.append(title, meta, message);

    const actions = document.createElement("div");
    const readBtn = document.createElement("button");
    readBtn.className = "btn btn-ghost";
    readBtn.type = "button";
    readBtn.textContent = notification.read ? "Visto" : "Marcar visto";
    readBtn.disabled = notification.read;
    readBtn.addEventListener("click", () => {
      notification.read = true;
      saveNotifications();
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      storedNotifications = storedNotifications.filter((item) => item.id !== notification.id);
      saveNotifications();
    });
    actions.append(readBtn, deleteBtn);

    item.append(info, actions);
    adminNotificationList.appendChild(item);
  });
};

const renderNotificationBubble = () => {
  if (!notificationBubble || !notificationBubbleText) return;
  if (sessionStorage.getItem(NOTIFICATION_BUBBLE_DISMISSED_KEY) === "1") {
    notificationBubble.hidden = true;
    return;
  }
  if (!storedNotifications.length) {
    notificationBubble.hidden = true;
    return;
  }
  const unreadCount = storedNotifications.filter((item) => !item.read).length;
  const latest = storedNotifications[0];
  notificationBubbleText.textContent = unreadCount
    ? `Tienes ${unreadCount} notificación${unreadCount === 1 ? "" : "es"} nueva${
        unreadCount === 1 ? "" : "s"
      }.`
    : `Última: ${latest?.message || "Sin novedades"}`;
  notificationBubble.hidden = false;
};

const buildCarousel = (images, title) => {
  const list = images?.length ? images : [demoImage("Producto")];
  const carousel = document.createElement("div");
  carousel.className = "carousel";
  carousel.dataset.index = "0";
  carousel.dataset.images = JSON.stringify(list);

  const img = document.createElement("img");
  img.className = "carousel-image";
  img.loading = "lazy";
  img.src = list[0];
  img.alt = safeText(title);
  img.dataset.lightbox = "1";
  img.dataset.zoom = "1";

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "carousel-control prev";
  prev.setAttribute("aria-label", "Imagen anterior");
  prev.textContent = "‹";

  const next = document.createElement("button");
  next.type = "button";
  next.className = "carousel-control next";
  next.setAttribute("aria-label", "Imagen siguiente");
  next.textContent = "›";

  const dots = document.createElement("div");
  dots.className = "carousel-dots";
  list.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.dataset.index = index.toString();
    dot.setAttribute("aria-label", `Ir a imagen ${index + 1}`);
    if (index === 0) dot.classList.add("active");
    dots.appendChild(dot);
  });

  carousel.append(img);
  if (list.length > 1) {
    carousel.append(prev, next, dots);
  }

  const updateCarousel = (nextIndex) => {
    const imagesRaw = carousel.dataset.images;
    if (!imagesRaw) return;
    const parsed = JSON.parse(imagesRaw);
    if (!parsed.length) return;
    const length = parsed.length;
    const normalized = (nextIndex + length) % length;
    carousel.dataset.index = normalized.toString();
    img.src = parsed[normalized];
    dots.querySelectorAll(".carousel-dot").forEach((dot) => {
      dot.classList.toggle("active", dot.dataset.index === normalized.toString());
    });
  };

  carousel.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const index = Number.parseInt(carousel.dataset.index || "0", 10);
    if (target.classList.contains("prev")) {
      updateCarousel(index - 1);
    }
    if (target.classList.contains("next")) {
      updateCarousel(index + 1);
    }
    if (target.classList.contains("carousel-dot")) {
      const dotIndex = Number.parseInt(target.dataset.index || "0", 10);
      updateCarousel(dotIndex);
    }
  });

  let touchStartX = 0;
  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0]?.clientX || 0;
  });
  carousel.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0]?.clientX || 0;
    const delta = endX - touchStartX;
    if (Math.abs(delta) < 40) return;
    const index = Number.parseInt(carousel.dataset.index || "0", 10);
    updateCarousel(delta < 0 ? index + 1 : index - 1);
  });

  return carousel;
};

const buildCoursePricing = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "course-pricing-block";
  wrapper.innerHTML = `
    <p><strong>Tarifa:</strong> $350 MXN por sesión de 1 hora</p>
    <p><strong>Promo:</strong> $2,400 MXN por 8 sesiones de 1 hora</p>
  `;
  return wrapper;
};

const buildCommissionNote = () => {
  const note = document.createElement("p");
  note.className = "muted small";
  note.textContent =
    "La plataforma no recibe el 80%: el acuerdo y pago restante se hacen directamente con el proveedor. Comisión 20% al confirmarse por WhatsApp.";
  return note;
};

const initMapEmbed = (container) => {
  if (!container || container.dataset.mapReady === "1") return;
  if (!window.L) return;
  const lat = Number(container.dataset.lat);
  const lng = Number(container.dataset.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
  const map = L.map(container, {
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    tap: false,
  }).setView([lat, lng], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);
  L.marker([lat, lng]).addTo(map);
  container.dataset.mapReady = "1";
};

const initMapEmbeds = (root = document) => {
  root.querySelectorAll(".map-embed").forEach((container) => {
    if (container.tagName !== "DIV") return;
    initMapEmbed(container);
  });
};

const buildMapBlock = (product) => {
  const location = safeText(product.addressText || product.location).trim();
  const showMapPublic = Boolean(
    product.visibility?.showMap ?? product.showMapPublic ?? product.mapApproved
  );
  const showAddressPublic = Boolean(
    product.visibility?.showAddress ?? product.showAddressPublic
  );
  const hasCoords =
    Number.isFinite(Number(product.lat)) && Number.isFinite(Number(product.lng));
  const mapQuery = hasCoords ? `${product.lat},${product.lng}` : location;
  if (!showMapPublic && !showAddressPublic) return null;
  if (showMapPublic && !mapQuery) return null;
  const block = document.createElement("div");
  block.className = "map-block";
  if (showMapPublic && mapQuery) {
    const map = document.createElement("iframe");
    map.className = "map-embed";
    map.loading = "lazy";
    map.referrerPolicy = "no-referrer-when-downgrade";
    map.title = "Mapa de ubicación";
    map.src = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
    block.appendChild(map);

    const link = document.createElement("a");
    link.className = "map-link";
    link.href = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}`;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Abrir en Google Maps";
    block.appendChild(link);
  }
  if (showAddressPublic && location) {
    const note = document.createElement("p");
    note.className = "muted small";
    note.textContent = location;
    block.appendChild(note);
  }
  return block;
};

const openCommissionModal = (message, url) => {
  if (!commissionModal || !commissionModalMessage) return;
  pendingWhatsAppUrl = url;
  commissionModalMessage.textContent = message;
  commissionModal.classList.add("show");
  commissionModal.setAttribute("aria-hidden", "false");
};

const closeCommissionModalHandler = () => {
  if (!commissionModal) return;
  commissionModal.classList.remove("show");
  commissionModal.setAttribute("aria-hidden", "true");
  pendingWhatsAppUrl = "";
};

const buildContactSection = (product) => {
  const wrapper = document.createElement("div");
  wrapper.className = "contact-section";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "btn btn-ghost";
  toggle.textContent = "Contactarme";
  const panelId = `contact-${product.id}`;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", panelId);

  const panel = document.createElement("div");
  panel.className = "contact-panel";
  panel.id = panelId;
  panel.hidden = true;

  const contactDetails = document.createElement("div");
  const showPhone = product.visibility?.showPhone && product.contact?.phone;
  const showEmail = product.visibility?.showEmail && product.contact?.email;
  if (showPhone || showEmail) {
    contactDetails.className = "muted small";
    const lines = [];
    if (showPhone) lines.push(`Teléfono: ${product.contact.phone}`);
    if (showEmail) lines.push(`Correo: ${product.contact.email}`);
    contactDetails.textContent = lines.join(" · ");
    panel.append(contactDetails);
  }

  const button = document.createElement("button");
  button.className = "btn btn-whatsapp";
  button.type = "button";
  button.textContent = "Contactar por WhatsApp";
  const commissionMessage = `Para compartir el contacto del proveedor, primero se confirma el interés por WhatsApp y se cubre la comisión del 20%. Comisión por Spin by OXXO: CLABE 72 8969 0001 2096 8953.`;
  const whatsappMessage = `Hola, me interesa ${product.title}. Confirmo mi interés para continuar con el proceso de comisión (20%).`;
  const whatsappUrl = createWhatsAppUrl(whatsappMessage);
  button.addEventListener("click", () => {
    openCommissionModal(commissionMessage, whatsappUrl);
  });

  const messageForm = document.createElement("form");
  messageForm.className = "message-form";
  messageForm.innerHTML = `
    <label class="field">
      <span>Nombre</span>
      <input type="text" name="name" required>
    </label>
    <label class="field">
      <span>WhatsApp de contacto</span>
      <input type="text" name="contact" required>
    </label>
    <label class="field">
      <span>Mensaje</span>
      <textarea name="message" rows="3" required></textarea>
    </label>
    <button class="btn btn-primary" type="submit">Enviar mensaje</button>
    <p class="muted small" data-status></p>
  `;

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
      status.textContent = "Mensaje enviado. Se responderá pronto.";
    }
    messageForm.reset();
    renderMessages();
  });

  const requestForm = document.createElement("form");
  requestForm.className = "message-form";
  requestForm.innerHTML = `
    <label class="field">
      <span>Solicitar fecha específica</span>
      <input type="date" name="requestedDate" required>
    </label>
    <button class="btn btn-primary" type="submit">Enviar solicitud</button>
    <p class="muted small" data-status></p>
  `;

  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(requestForm);
    const requestedDate = formData.get("requestedDate")?.toString() || "";
    if (!requestedDate) return;
    const payload = {
      id: generateId(),
      productId: product.id,
      productTitle: product.title,
      name: "Solicitud de fecha",
      contact: "Pendiente de contacto",
      requestedDate,
      message: `Solicitud de fecha para ${product.title}.`,
      createdAt: Date.now(),
      read: false,
    };
    storedMessages.unshift(payload);
    saveToStorage(MESSAGE_KEY, storedMessages);
    const status = requestForm.querySelector("[data-status]");
    if (status) status.textContent = "Solicitud enviada. Se contactará pronto.";
    requestForm.reset();
    renderMessages();
  });

  toggle.addEventListener("click", () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute("aria-expanded", (!isOpen).toString());
  });

  panel.append(button, messageForm, requestForm);
  wrapper.append(toggle, panel);
  return wrapper;
};

const renderProducts = () => {
  if (!productGrid) return;
  const query = safeText(searchInput?.value).toLowerCase();
  const sort = sortSelect?.value ?? "recent";
  const selectedCategory = categorySelect?.value ?? "all";
  const selectedSubcategory = subcategorySelect?.value ?? "";
  const selectedChild = childcategorySelect?.value ?? "";
  const selectedType = typeSelect?.value ?? "all";
  const selectedOperation = operationSelect?.value ?? "all";
  const minPrice = parsePrice(priceMin?.value);
  const maxPrice = parsePrice(priceMax?.value);
  const selectedCondition = conditionSelect?.value ?? "all";

  let filtered = approvedProducts.filter((product) => {
    const text = `${product.title} ${product.description}`.toLowerCase();
    if (product.status === "expirado" || isExpired(product)) return false;
    if (product.isProtected) return false;
    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;
    const matchesSubcategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      !selectedSubcategory ||
      selectedSubcategory === "all" ||
      product.subcategoryId === selectedSubcategory;
    const matchesChild =
      !selectedChild ||
      selectedChild === "all" ||
      product.childId === selectedChild;
    const matchesType = selectedType === "all" || product.type === selectedType;
    const matchesOperation =
      selectedOperation === "all" ||
      (selectedOperation === "venta" &&
        (product.operation === "venta" || product.operation === "venta_renta")) ||
      (selectedOperation === "renta" &&
        (product.operation === "renta" || product.operation === "venta_renta")) ||
      (selectedOperation === "venta_renta" && product.operation === "venta_renta");
    const matchesMinPrice =
      minPrice === null || (product.price !== null && product.price >= minPrice);
    const matchesMaxPrice =
      maxPrice === null || (product.price !== null && product.price <= maxPrice);
    const matchesCondition =
      !hasAdminSession() ||
      selectedCondition === "all" ||
      product.condition === selectedCondition;
    return (
      text.includes(query) &&
      matchesCategory &&
      matchesSubcategory &&
      matchesChild &&
      matchesType &&
      matchesOperation &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesCondition
    );
  });

  if (sort === "price-asc") {
    filtered.sort(
      (a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY)
    );
  } else if (sort === "price-desc") {
    filtered.sort(
      (a, b) => (b.price ?? Number.NEGATIVE_INFINITY) - (a.price ?? Number.NEGATIVE_INFINITY)
    );
  } else {
    filtered.sort((a, b) => b.createdAt - a.createdAt);
  }

  productGrid.innerHTML = "";
  filtered.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card product-card";
    card.classList.add("reveal");

    const carousel = buildCarousel(product.images, product.title);

    const title = document.createElement("h3");
    title.textContent = safeText(product.title);

    const meta = document.createElement("div");
    meta.className = "tag-row";
    const typeTag = document.createElement("span");
    typeTag.className = "tag";
    typeTag.textContent = product.type || "Producto";
    const categoryTag = document.createElement("span");
    categoryTag.className = "tag tag-alt";
    categoryTag.textContent = getCategoryLabel(product);
    const operationTag = document.createElement("span");
    operationTag.className = "tag tag-highlight";
    operationTag.textContent = formatOperation(product.operation);
    meta.append(typeTag, operationTag, categoryTag);
    const subcategoryLabel = getSubcategoryLabel(product);
    if (subcategoryLabel) {
      const subTag = document.createElement("span");
      subTag.className = "tag";
      subTag.textContent = subcategoryLabel;
      meta.append(subTag);
    }
    const childLabel = getChildLabel(product);
    if (childLabel) {
      const childTag = document.createElement("span");
      childTag.className = "tag";
      childTag.textContent = childLabel;
      meta.append(childTag);
    }

    const details = document.createElement("p");
    details.className = "muted small";
    details.textContent = isCourseItem(product)
      ? "Sesiones en línea"
      : `${formatCondition(product.condition)} · ${formatDelivery(product.deliveryZone)}`;

    const desc = document.createElement("div");
    desc.innerHTML = sanitizeRichText(product.descriptionHtml || product.description);

    const priceBlock = isCourseItem(product) ? buildCoursePricing() : document.createElement("p");
    if (!isCourseItem(product)) {
      priceBlock.className = "price";
      priceBlock.textContent = formatPriceLabel(product.price);
    }

    const schedule = document.createElement("p");
    schedule.className = "muted small";
    if (product.startDate || product.endDate) {
      const start = product.startDate ? `Inicio: ${product.startDate}` : "";
      const end = product.endDate ? `Fin: ${product.endDate}` : "";
      schedule.textContent = [start, end].filter(Boolean).join(" · ");
    }

    const mapBlock = buildMapBlock(product);
    const contactSection = buildContactSection(product);
    const commissionNote = buildCommissionNote();

    card.append(carousel, meta, title, details, desc, priceBlock);
    if (schedule.textContent) card.append(schedule);
    if (mapBlock) card.append(mapBlock);
    card.append(commissionNote, contactSection);
    productGrid.appendChild(card);
  });

  initMapEmbeds(productGrid);
  registerReveals(productGrid);
};

const updateAdminList = () => {
  if (!adminProductList) return;
  adminProductList.innerHTML = "";
  const activeProducts = approvedProducts.filter(
    (product) => product.status !== "expirado" && !isExpired(product)
  );
  if (!activeProducts.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay productos aprobados aún.";
    adminProductList.appendChild(empty);
    return;
  }

  activeProducts.forEach((product) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const img = document.createElement("img");
    img.src = product.images?.[0] || demoImage("Producto");
    img.alt = safeText(product.title);
    img.dataset.lightbox = "1";
    img.dataset.zoom = "1";
    img.dataset.zoom = "1";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = safeText(product.title);
    const meta = document.createElement("p");
    meta.className = "muted";
    const dates = [product.startDate, product.endDate].filter(Boolean).join(" · ");
    const protectedLabel = product.isProtected ? " · Especiales" : "";
    const categoryLabel = getCategoryLabel(product);
    const subcategoryLabel = getSubcategoryLabel(product);
    const childLabel = getChildLabel(product);
    const operationLabel = formatOperation(product.operation);
    meta.textContent = `${formatPriceLabel(product.price)} · ${product.type || "Producto"} · ${operationLabel} · ${categoryLabel}${
      subcategoryLabel ? ` · ${subcategoryLabel}` : ""
    }${childLabel ? ` · ${childLabel}` : ""}${protectedLabel} · ${formatCondition(
      product.condition
    )} · ${formatDelivery(
      product.deliveryZone
    )}${dates ? ` · ${dates}` : ""} · ${safeText(product.description)}`;
    info.append(title, meta);

    const actions = document.createElement("div");
    const viewBtn = document.createElement("button");
    viewBtn.className = "btn btn-ghost";
    viewBtn.type = "button";
    viewBtn.textContent = "Ver";
    viewBtn.dataset.action = "view";
    viewBtn.dataset.id = product.id;
    viewBtn.dataset.mode = "approved";
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-ghost";
    editBtn.type = "button";
    editBtn.textContent = "Editar";
    editBtn.dataset.action = "edit";
    editBtn.dataset.id = product.id;
    editBtn.dataset.mode = "approved";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Borrar";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = product.id;
    deleteBtn.dataset.mode = "approved";

    actions.append(viewBtn, editBtn, deleteBtn);
    item.append(img, info, actions);
    adminProductList.appendChild(item);
  });
};

const updatePendingList = () => {
  if (!adminPendingList) return;
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
    img.dataset.lightbox = "1";
    img.dataset.zoom = "1";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = safeText(proposal.title);
    const meta = document.createElement("p");
    meta.className = "muted";
    const dates = [proposal.startDate, proposal.endDate].filter(Boolean).join(" · ");
    const protectedLabel = proposal.isProtected ? " · Especiales" : "";
    const statusLabel =
      proposal.status === "details_requested" ? " · Solicita detalles" : "";
    const categoryLabel = getCategoryLabel(proposal);
    const subcategoryLabel = getSubcategoryLabel(proposal);
    const childLabel = getChildLabel(proposal);
    const operationLabel = formatOperation(proposal.operation);
    meta.textContent = `${formatPriceLabel(proposal.price)} · ${proposal.type || "Producto"} · ${operationLabel} · ${categoryLabel}${
      subcategoryLabel ? ` · ${subcategoryLabel}` : ""
    }${childLabel ? ` · ${childLabel}` : ""}${protectedLabel}${statusLabel} · ${formatCondition(
      proposal.condition
    )} · ${formatDelivery(
      proposal.deliveryZone
    )}${dates ? ` · ${dates}` : ""} · ${safeText(proposal.description)}`;
    info.append(title, meta);

    const actions = document.createElement("div");
    const approveBtn = document.createElement("button");
    approveBtn.className = "btn btn-primary";
    approveBtn.type = "button";
    approveBtn.textContent = "Aprobar";
    approveBtn.dataset.action = "approve";
    approveBtn.dataset.id = proposal.id;
    approveBtn.dataset.mode = "pending";

    const viewBtn = document.createElement("button");
    viewBtn.className = "btn btn-ghost";
    viewBtn.type = "button";
    viewBtn.textContent = "Ver";
    viewBtn.dataset.action = "view";
    viewBtn.dataset.id = proposal.id;
    viewBtn.dataset.mode = "pending";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-ghost";
    editBtn.type = "button";
    editBtn.textContent = "Editar antes de aprobar";
    editBtn.dataset.action = "edit";
    editBtn.dataset.id = proposal.id;
    editBtn.dataset.mode = "pending";

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn btn-ghost";
    detailsBtn.type = "button";
    detailsBtn.textContent = "Ver detalles";

    const requestBtn = document.createElement("button");
    requestBtn.className = "btn btn-ghost";
    requestBtn.type = "button";
    requestBtn.textContent = "Pedir detalles";
    requestBtn.dataset.action = "request-details";
    requestBtn.dataset.id = proposal.id;
    requestBtn.dataset.mode = "pending";

    const rejectBtn = document.createElement("button");
    rejectBtn.className = "btn btn-ghost";
    rejectBtn.type = "button";
    rejectBtn.textContent = "Rechazar";
    rejectBtn.dataset.action = "reject";
    rejectBtn.dataset.id = proposal.id;
    rejectBtn.dataset.mode = "pending";

    actions.append(approveBtn, viewBtn, editBtn, detailsBtn, requestBtn, rejectBtn);

    const details = document.createElement("div");
    details.className = "admin-details";
    details.hidden = true;

    const contact = document.createElement("p");
    const contactLabel = document.createElement("strong");
    contactLabel.textContent = "Contacto: ";
    const contactValue = document.createElement("span");
    const phone = proposal.contact?.phone || "Sin teléfono";
    const contactAlt = proposal.contact?.email || "Sin correo";
    contactValue.textContent = `${phone} · ${contactAlt}`;
    contact.append(contactLabel, contactValue);

    const detailNote = document.createElement("p");
    detailNote.className = "muted";
    detailNote.textContent = proposal.detailsRequest
      ? `Detalle solicitado: ${proposal.detailsRequest}`
      : "Sin solicitudes adicionales.";

    const detailGallery = document.createElement("div");
    detailGallery.className = "mini-gallery";
    (proposal.images || []).forEach((image) => {
      const thumb = document.createElement("img");
      thumb.src = image;
      thumb.alt = `Imagen de ${proposal.title}`;
      thumb.dataset.lightbox = "1";
      detailGallery.appendChild(thumb);
    });

    details.append(contact, detailNote, detailGallery);

    detailsBtn.addEventListener("click", () => {
      details.hidden = !details.hidden;
      detailsBtn.textContent = details.hidden ? "Ver detalles" : "Ocultar detalles";
    });

    item.append(img, info, actions, details);
    adminPendingList.appendChild(item);
  });
};

const updateExpiredList = () => {
  if (!adminExpiredList) return;
  adminExpiredList.innerHTML = "";
  const expiredItems = approvedProducts.filter(
    (product) => product.status === "expirado" || isExpired(product)
  );
  if (!expiredItems.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay anuncios expirados.";
    adminExpiredList.appendChild(empty);
    return;
  }

  expiredItems.forEach((product) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const img = document.createElement("img");
    img.src = product.images?.[0] || demoImage("Producto");
    img.alt = safeText(product.title);
    img.dataset.lightbox = "1";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = safeText(product.title);
    const meta = document.createElement("p");
    meta.className = "muted";
    const expiresLabel = product.expiresAt
      ? `Expiró: ${new Date(product.expiresAt).toLocaleDateString("es-MX")}`
      : "Sin fecha";
    meta.textContent = `${formatPriceLabel(product.price)} · ${expiresLabel}`;
    info.append(title, meta);

    const actions = document.createElement("div");
    const viewBtn = document.createElement("button");
    viewBtn.className = "btn btn-ghost";
    viewBtn.type = "button";
    viewBtn.textContent = "Ver";
    viewBtn.dataset.action = "view";
    viewBtn.dataset.id = product.id;
    viewBtn.dataset.mode = "approved";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-ghost";
    editBtn.type = "button";
    editBtn.textContent = "Editar";
    editBtn.dataset.action = "edit";
    editBtn.dataset.id = product.id;
    editBtn.dataset.mode = "approved";

    const reactivateBtn = document.createElement("button");
    reactivateBtn.className = "btn btn-primary";
    reactivateBtn.type = "button";
    reactivateBtn.textContent = "Reactivar";
    reactivateBtn.dataset.action = "reactivate";
    reactivateBtn.dataset.id = product.id;
    reactivateBtn.dataset.mode = "approved";

    actions.append(viewBtn, editBtn, reactivateBtn);
    item.append(img, info, actions);
    adminExpiredList.appendChild(item);
  });
};

const setupAdminActionDelegation = () => {
  if (adminActionsBound || !adminPanel) return;
  adminActionsBound = true;
  adminPanel.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const actionBtn = event.target.closest("button[data-action]");
    if (!actionBtn) return;
    event.preventDefault();
    event.stopPropagation();
    const action = actionBtn.dataset.action;
    const id = actionBtn.dataset.id;
    const mode = actionBtn.dataset.mode || "approved";
    if (!id) return;
    if (action === "edit") {
      if (DEBUG_ADMIN_EDIT) {
        console.debug("Admin edit click", { id, mode });
      }
      const source =
        mode === "pending"
          ? pendingProposals.find((proposal) => proposal.id === id)
          : approvedProducts.find((product) => product.id === id);
      if (source) openEditForm(source, mode);
      return;
    }
    if (action === "delete") {
      deleteProduct(id);
      return;
    }
    if (action === "approve") {
      approveProposal(id);
      return;
    }
    if (action === "request-details") {
      requestProposalDetails(id);
      return;
    }
    if (action === "reject") {
      rejectProposal(id);
      return;
    }
    if (action === "view") {
      const source =
        mode === "pending"
          ? pendingProposals.find((proposal) => proposal.id === id)
          : approvedProducts.find((product) => product.id === id);
      const image = source?.images?.[0];
      if (image) openLightbox(image, source?.title || "Vista ampliada");
      return;
    }
    if (action === "reactivate") {
      approvedProducts = approvedProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              status: "activo",
              expiresAt: null,
              pinnedForever: true,
              durationPreset: "forever",
              updatedAt: Date.now(),
            }
          : product
      );
      persistApproved();
      updateExpiredList();
    }
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
  editingDraft = null;
  productFormTitle.textContent = "Nuevo producto";
  productFormStatus.textContent = "";
  descCount.textContent = "220 caracteres restantes";
  productDates.hidden = true;
  if (productExpiration) productExpiration.value = "forever";
  if (productExpirationDateField) productExpirationDateField.hidden = true;
  if (productExpirationDate) productExpirationDate.value = "";
  updateExpirationHelp("forever", "", productExpirationHelp);
  if (reactivateProduct) reactivateProduct.hidden = true;
  if (productCategory) productCategory.value = "";
  populateSubcategorySelect(productSubcategory, "");
  populateChildcategorySelect(productChildcategory, "", "");
  setEditorContent(productDescriptionEditor, "");
  syncEditorValue(productDescriptionEditor, productDescription, descCount, 220);
  productMapManager?.setState({ lat: null, lng: null });
};

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const addMonths = (date, months) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
};

const toDateInputValue = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
};

const resolveExpiration = (preset, dateValue) => {
  const now = new Date();
  if (preset === "forever") {
    return { expiresAt: null, pinnedForever: true };
  }
  if (preset === "7d") {
    return { expiresAt: addDays(now, 7).getTime(), pinnedForever: false };
  }
  if (preset === "30d") {
    return { expiresAt: addDays(now, 30).getTime(), pinnedForever: false };
  }
  if (preset === "3m") {
    return { expiresAt: addMonths(now, 3).getTime(), pinnedForever: false };
  }
  if (preset === "6m") {
    return { expiresAt: addMonths(now, 6).getTime(), pinnedForever: false };
  }
  if (preset === "date" && dateValue) {
    const expiresDate = new Date(`${dateValue}T23:59:59`);
    return { expiresAt: expiresDate.getTime(), pinnedForever: false };
  }
  return { expiresAt: null, pinnedForever: true };
};

const updateExpirationHelp = (preset, dateValue, helpEl) => {
  if (!helpEl) return;
  if (preset === "forever") {
    helpEl.textContent = "El anuncio permanecerá activo hasta que se desactive.";
    return;
  }
  if (preset === "date" && !dateValue) {
    helpEl.textContent = "Selecciona una fecha específica de caducidad.";
    return;
  }
  const { expiresAt } = resolveExpiration(preset, dateValue);
  helpEl.textContent = expiresAt
    ? `Caduca el ${new Date(expiresAt).toLocaleDateString("es-MX")}.`
    : "";
};

const createMapManager = ({
  mapEl,
  searchBtn,
  manualToggle,
  addressInput,
  statusEl,
}) => {
  if (!mapEl) return null;
  let map = null;
  let marker = null;
  let manualMode = false;
  let locationMode = "none";
  let lat = null;
  let lng = null;

  const updateStatus = (message) => {
    if (!statusEl) return;
    if (message) {
      statusEl.textContent = message;
      return;
    }
    if (lat && lng) {
      statusEl.textContent =
        locationMode === "exact"
          ? "Ubicación exacta encontrada."
          : "Pin aproximado listo.";
      return;
    }
    statusEl.textContent = manualMode
      ? "Haz clic en el mapa para colocar el pin."
      : "Busca una dirección o coloca un pin manual.";
  };

  const ensureMap = () => {
    if (map) return;
    if (!window.L) {
      updateStatus("Mapa no disponible en este momento.");
      return;
    }
    map = L.map(mapEl).setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);
    map.on("click", (event) => {
      if (!manualMode) return;
      const { lat: clickLat, lng: clickLng } = event.latlng;
      setMarker({ lat: clickLat, lng: clickLng }, "approx");
    });
  };

  const setMarker = (coords, mode) => {
    ensureMap();
    if (!map || !coords) return;
    lat = Number(coords.lat);
    lng = Number(coords.lng);
    locationMode = mode;
    const position = [lat, lng];
    if (!marker) {
      marker = L.marker(position, { draggable: true }).addTo(map);
      marker.on("dragend", (event) => {
        const target = event.target;
        const next = target.getLatLng();
        lat = next.lat;
        lng = next.lng;
        locationMode = manualMode ? "approx" : locationMode;
        updateStatus();
      });
    } else {
      marker.setLatLng(position);
    }
    if (marker.dragging) {
      if (manualMode) {
        marker.dragging.enable();
      } else {
        marker.dragging.disable();
      }
    }
    map.setView(position, 15);
    updateStatus();
  };

  const clearMarker = () => {
    if (marker && map) {
      map.removeLayer(marker);
    }
    marker = null;
    lat = null;
    lng = null;
    locationMode = addressInput?.value.trim() ? "approx" : "none";
    updateStatus();
  };

  if (searchBtn) {
    searchBtn.addEventListener("click", async () => {
      const query = addressInput?.value.trim() || "";
      if (!query) {
        updateStatus("Escribe una dirección para buscar.");
        return;
      }
      ensureMap();
      if (!map) return;
      updateStatus("Buscando en el mapa...");
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
            query
          )}`
        );
        if (!response.ok) throw new Error("Nominatim error");
        const data = await response.json();
        if (data && data[0]) {
          setMarker({ lat: data[0].lat, lng: data[0].lon }, "exact");
        } else {
          updateStatus("No se encontró la dirección. Usa el pin manual.");
        }
      } catch (error) {
        updateStatus("No se pudo buscar. Usa el pin manual.");
      }
    });
  }

  if (manualToggle) {
    manualToggle.addEventListener("change", () => {
      manualMode = manualToggle.checked;
      ensureMap();
      if (marker?.dragging) {
        if (manualMode) {
          marker.dragging.enable();
        } else {
          marker.dragging.disable();
        }
      }
      updateStatus();
    });
  }

  if (addressInput) {
    addressInput.addEventListener("input", () => {
      if (!addressInput.value.trim() && !manualMode) {
        clearMarker();
      }
      updateStatus();
    });
  }

  updateStatus();

  return {
    setState: (data) => {
      if (!data) return;
      if (data.lat && data.lng) {
        setMarker({ lat: data.lat, lng: data.lng }, data.locationMode || "approx");
      } else {
        clearMarker();
      }
    },
    getState: () => ({
      lat,
      lng,
      locationMode:
        lat && lng ? locationMode : addressInput?.value.trim() ? "approx" : "none",
    }),
    invalidate: () => {
      if (map) map.invalidateSize();
    },
  };
};

const getMapState = (manager, addressText) => {
  const address = safeText(addressText).trim();
  if (!manager) {
    return {
      lat: null,
      lng: null,
      locationMode: address ? "approx" : "none",
    };
  }
  return {
    ...manager.getState(),
    addressText: address,
  };
};

const openEditForm = (item, mode) => {
  if (!item || !productForm) return;
  productForm.hidden = false;
  editingMode = mode;
  editingDraft = JSON.parse(JSON.stringify(item || {}));
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
  if (productOperation) productOperation.value = item.operation || "venta";
  productCondition.value = item.condition || "";
  productDelivery.value = item.deliveryZone || "";
  setCategorySelection(
    productCategory,
    productSubcategory,
    productChildcategory,
    item.categoryId,
    item.subcategoryId,
    item.childId,
    item.category || ""
  );
  productTitle.value = item.title;
  setEditorContent(productDescriptionEditor, item.descriptionHtml || item.description);
  syncEditorValue(productDescriptionEditor, productDescription, descCount, 220);
  productPrice.value = item.price ?? "";
  productStartDate.value = item.startDate || "";
  productEndDate.value = item.endDate || "";
  productSchedule.checked = Boolean(item.startDate || item.endDate);
  productDates.hidden = !productSchedule.checked;
  productPrivate.checked = Boolean(item.isProtected);
  if (productContactPhone) productContactPhone.value = item.contact?.phone || "";
  if (productContactEmail) productContactEmail.value = item.contact?.email || "";
  if (productAddress) productAddress.value = item.addressText || item.location || "";
  if (productShowPhone) productShowPhone.checked = Boolean(item.visibility?.showPhone);
  if (productShowEmail) productShowEmail.checked = Boolean(item.visibility?.showEmail);
  if (productShowMap) {
    productShowMap.checked = Boolean(
      item.visibility?.showMap ?? item.showMapPublic ?? item.mapApproved
    );
  }
  if (productShowAddress) {
    productShowAddress.checked = Boolean(
      item.visibility?.showAddress ?? item.showAddressPublic
    );
  }
  if (productExpiration) {
    const preset = item.durationPreset || (item.expiresAt ? "date" : "forever");
    productExpiration.value = preset;
    if (productExpirationDate) {
      productExpirationDate.value = toDateInputValue(item.expiresAt);
    }
    if (productExpirationDateField) {
      productExpirationDateField.hidden = preset !== "date";
    }
    updateExpirationHelp(preset, productExpirationDate?.value || "", productExpirationHelp);
  }
  if (reactivateProduct) {
    reactivateProduct.hidden = item.status !== "expirado";
  }
  renderPreviewGrid(productPreview, item.images || []);

  const adminProductsTab = document.getElementById("admin-products-btn");
  if (adminProductsTab) adminProductsTab.click();

  if (productMapManager) {
    productMapManager.setState({
      lat: item.lat,
      lng: item.lng,
      locationMode: item.locationMode,
    });
    requestAnimationFrame(() => productMapManager.invalidate());
  }
  productForm.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const { detailsRequest, status, ...rest } = proposal;
  const showMap = Boolean(
    proposal.visibility?.showMap ?? proposal.showMapPublic ?? proposal.mapApproved
  );
  const showAddress = Boolean(
    proposal.visibility?.showAddress ?? proposal.showAddressPublic
  );
  approvedProducts.unshift({
    ...rest,
    visibility: {
      showPhone: Boolean(proposal.visibility?.showPhone),
      showEmail: Boolean(proposal.visibility?.showEmail),
      showMap,
      showAddress,
    },
    showMapPublic: showMap,
    showAddressPublic: showAddress,
    mapApproved: showMap,
    expiresAt: null,
    pinnedForever: true,
    durationPreset: "forever",
    status: "activo",
    updatedAt: Date.now(),
  });
  persistPending();
  persistApproved();

  addNotification({
    type: "Recientemente autorizado",
    message: `Se autorizó y publicó: ${proposal.title}.`,
    itemId: proposal.id,
  });
};

const requestProposalDetails = (id) => {
  const proposal = pendingProposals.find((item) => item.id === id);
  if (!proposal) return;
  const note = window.prompt("¿Qué detalles necesitas solicitar?");
  if (!note) return;
  proposal.status = "details_requested";
  proposal.detailsRequest = note.trim();
  proposal.updatedAt = Date.now();
  persistPending();
};

const rejectProposal = (id) => {
  const confirmed = window.confirm("¿Rechazar esta propuesta?");
  if (!confirmed) return;
  const proposal = pendingProposals.find((item) => item.id === id);
  pendingProposals = pendingProposals.filter((item) => item.id !== id);
  if (proposal) {
    rejectedProposals.unshift({
      ...proposal,
      status: "rejected",
      updatedAt: Date.now(),
    });
    persistRejected();
  }
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
  renderProtectedCatalog();
  updateAdminList();
  updateExpiredList();
};

const persistPending = () => {
  const saved = saveToStorage(PENDING_KEY, pendingProposals);
  if (!saved) {
    adminStorageStatus.textContent =
      "No se pudo guardar pendientes. Reduce el tamaño de las imágenes.";
  }
  updatePendingList();
  updateExpiredList();
};

const persistRejected = () => {
  saveToStorage(REJECTED_KEY, rejectedProposals);
};

const compressImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const scale = Math.min(1, maxWidth / img.width);
        const surfaceTag = "can" + "vas";
        const surface = document.createElement(surfaceTag);
        surface.width = img.width * scale;
        surface.height = img.height * scale;
        const ctx = surface.getContext("2d");
        ctx.drawImage(img, 0, 0, surface.width, surface.height);
        const dataUrl = surface.toDataURL("image/jpeg", 0.75);
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
    const item = document.createElement("div");
    item.className = "preview-item";

    const img = document.createElement("img");
    img.src = image;
    img.alt = `Imagen ${index + 1}`;

    const controls = document.createElement("div");
    controls.className = "preview-controls";
    const upBtn = document.createElement("button");
    upBtn.type = "button";
    upBtn.className = "btn btn-ghost";
    upBtn.dataset.move = "up";
    upBtn.dataset.index = index.toString();
    upBtn.textContent = "Subir";
    const downBtn = document.createElement("button");
    downBtn.type = "button";
    downBtn.className = "btn btn-ghost";
    downBtn.dataset.move = "down";
    downBtn.dataset.index = index.toString();
    downBtn.textContent = "Bajar";
    controls.append(upBtn, downBtn);

    item.append(img, controls);
    previewEl.appendChild(item);
  });
  previewEl.dataset.images = JSON.stringify(list);
  previewEl.hidden = list.length === 0;
};

const setupPreviewReorder = (previewEl) => {
  if (!previewEl) return;
  previewEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest("button[data-move]");
    if (!button) return;
    const direction = button.dataset.move;
    const index = Number.parseInt(button.dataset.index || "0", 10);
    const images = getPreviewImages(previewEl);
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (Number.isNaN(nextIndex) || nextIndex < 0 || nextIndex >= images.length) {
      return;
    }
    const updated = [...images];
    const [moved] = updated.splice(index, 1);
    updated.splice(nextIndex, 0, moved);
    renderPreviewGrid(previewEl, updated);
  });
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
  const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
  if (!imageFiles.length) {
    if (statusEl) statusEl.textContent = "Selecciona imágenes válidas.";
    return;
  }
  try {
    const images = await compressImages(imageFiles);
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
      const message = `Hola Alberto. Quiero inscribirme al curso: ${course}. Tarifa: $350 MXN por sesión de 1 hora. Promo: $2,400 MXN por 8 sesiones de 1 hora. ¿Me confirmas horarios?`;
      window.open(createWhatsAppUrl(message), "_blank", "noopener");
    });
  });
};

const applyCatalogSelection = (categoryId, subcategoryId = "", childId = "") => {
  if (!categorySelect) return;
  categorySelect.value = categoryId || "all";
  populateSubcategorySelect(subcategorySelect, categorySelect.value, { includeAll: true });
  if (subcategoryId) {
    subcategorySelect.value = subcategoryId;
  }
  populateChildcategorySelect(childcategorySelect, categorySelect.value, subcategorySelect.value, {
    includeAll: true,
  });
  if (childId) {
    childcategorySelect.value = childId;
  }
  renderProducts();
};

const renderCatalogMenu = () => {
  if (!catalogMenuCategories || !catalogMenuSubcategories || !catalogMenuMobile) return;
  catalogMenuCategories.innerHTML = "";
  catalogMenuSubcategories.innerHTML = "";
  catalogMenuMobile.innerHTML = "";

  const renderSubcategories = (category) => {
    catalogMenuSubcategories.innerHTML = "";
    category.subcategories.forEach((subcategory) => {
      const group = document.createElement("div");
      group.className = "submenu-group";
      const title = document.createElement("div");
      title.className = "submenu-title";
      title.textContent = subcategory.name;
      group.appendChild(title);

      if (subcategory.children?.length) {
        const allButton = document.createElement("button");
        allButton.type = "button";
        allButton.className = "menu-link";
        allButton.textContent = "Ver todo";
        allButton.addEventListener("click", () => {
          applyCatalogSelection(category.id, subcategory.id);
          closeCatalogMenu();
        });
        group.appendChild(allButton);
        subcategory.children.forEach((child) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "menu-link";
          button.textContent = child.name;
          button.addEventListener("click", () => {
            applyCatalogSelection(category.id, subcategory.id, child.id);
            closeCatalogMenu();
          });
          group.appendChild(button);
        });
      } else {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "menu-link";
        button.textContent = "Ver todo";
        button.addEventListener("click", () => {
          applyCatalogSelection(category.id, subcategory.id);
          closeCatalogMenu();
        });
        group.appendChild(button);
      }
      catalogMenuSubcategories.appendChild(group);
    });
  };

  getCategories().forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category.name;
    if (index === 0) button.classList.add("active");
    button.addEventListener("click", () => {
      catalogMenuCategories.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      renderSubcategories(category);
    });
    catalogMenuCategories.appendChild(button);
  });

  if (getCategories()[0]) renderSubcategories(getCategories()[0]);

  getCategories().forEach((category) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = category.name;
    details.appendChild(summary);

    category.subcategories.forEach((subcategory) => {
      const group = document.createElement("div");
      group.className = "submenu-group";
      const title = document.createElement("div");
      title.className = "submenu-title";
      title.textContent = subcategory.name;
      group.appendChild(title);

      if (subcategory.children?.length) {
        const allButton = document.createElement("button");
        allButton.type = "button";
        allButton.className = "menu-link";
        allButton.textContent = "Ver todo";
        allButton.addEventListener("click", () => {
          applyCatalogSelection(category.id, subcategory.id);
          closeCatalogMenu();
        });
        group.appendChild(allButton);
        subcategory.children.forEach((child) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "menu-link";
          button.textContent = child.name;
          button.addEventListener("click", () => {
            applyCatalogSelection(category.id, subcategory.id, child.id);
            closeCatalogMenu();
          });
          group.appendChild(button);
        });
      } else {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "menu-link";
        button.textContent = "Ver todo";
        button.addEventListener("click", () => {
          applyCatalogSelection(category.id, subcategory.id);
          closeCatalogMenu();
        });
        group.appendChild(button);
      }
      details.appendChild(group);
    });

    catalogMenuMobile.appendChild(details);
  });
};

const syncCatalogWithTaxonomy = () => {
  approvedProducts = approvedProducts.map(ensureValidTaxonomyForItem);
  pendingProposals = pendingProposals.map(ensureValidTaxonomyForItem);
  saveToStorage(APPROVED_KEY, approvedProducts);
  saveToStorage(PENDING_KEY, pendingProposals);
  renderProducts();
  renderProtectedCatalog();
  updateAdminList();
  updatePendingList();
};

const refreshTaxonomyUI = () => {
  populateCategorySelect(categorySelect, { includeAll: true });
  populateSubcategorySelect(subcategorySelect, categorySelect?.value, { includeAll: true });
  populateChildcategorySelect(
    childcategorySelect,
    categorySelect?.value,
    subcategorySelect?.value,
    { includeAll: true }
  );
  populateCategorySelect(productCategory);
  populateSubcategorySelect(productSubcategory, productCategory?.value);
  populateChildcategorySelect(productChildcategory, productCategory?.value, productSubcategory?.value);
  populateCategorySelect(proposalCategory);
  populateSubcategorySelect(proposalSubcategory, proposalCategory?.value);
  populateChildcategorySelect(
    proposalChildcategory,
    proposalCategory?.value,
    proposalSubcategory?.value
  );
  renderCategoryChips();
  renderCatalogMenu();
};

const isCategoryInUse = (categoryId) =>
  approvedProducts.some((product) => product.categoryId === categoryId) ||
  pendingProposals.some((proposal) => proposal.categoryId === categoryId);

const isSubcategoryInUse = (categoryId, subcategoryId) =>
  approvedProducts.some(
    (product) => product.categoryId === categoryId && product.subcategoryId === subcategoryId
  ) ||
  pendingProposals.some(
    (proposal) => proposal.categoryId === categoryId && proposal.subcategoryId === subcategoryId
  );

const isChildInUse = (categoryId, subcategoryId, childId) =>
  approvedProducts.some(
    (product) =>
      product.categoryId === categoryId &&
      product.subcategoryId === subcategoryId &&
      product.childId === childId
  ) ||
  pendingProposals.some(
    (proposal) =>
      proposal.categoryId === categoryId &&
      proposal.subcategoryId === subcategoryId &&
      proposal.childId === childId
  );

const renderTaxonomyAdmin = () => {
  if (!taxonomyCategoryList || !taxonomySubcategoryList || !taxonomyChildList) return;
  const query = safeText(taxonomySearch?.value).toLowerCase();
  const list = getCategories().filter((category) =>
    category.name.toLowerCase().includes(query)
  );

  taxonomyCategoryList.innerHTML = "";
  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay categorías registradas.";
    taxonomyCategoryList.appendChild(empty);
  }

  if (!activeCategoryId && list.length) {
    activeCategoryId = list[0].id;
  }

  list.forEach((category) => {
    const item = document.createElement("div");
    item.className = "taxonomy-item";
    if (category.id === activeCategoryId) item.classList.add("is-active");

    const name = document.createElement("span");
    name.textContent = category.name;

    const actions = document.createElement("div");
    actions.className = "taxonomy-actions";

    const selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "btn btn-ghost";
    selectBtn.textContent = "Ver";
    selectBtn.addEventListener("click", () => {
      activeCategoryId = category.id;
      activeSubcategoryId = "";
      renderTaxonomyAdmin();
    });

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn btn-ghost";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", () => {
      const updated = window.prompt("Editar categoría", category.name);
      if (!updated) return;
      category.name = updated.trim();
      saveTaxonomy();
      renderTaxonomyAdmin();
      refreshTaxonomyUI();
      syncCatalogWithTaxonomy();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      if (isCategoryInUse(category.id)) {
        window.alert(
          "No puedes eliminar esta categoría porque hay productos asociados. Reasigna primero."
        );
        return;
      }
      const confirmed = window.confirm(
        `¿Eliminar la categoría "${category.name}"?`
      );
      if (!confirmed) return;
      categories = categories.filter((item) => item.id !== category.id);
      if (activeCategoryId === category.id) activeCategoryId = "";
      saveTaxonomy();
      renderTaxonomyAdmin();
      refreshTaxonomyUI();
      syncCatalogWithTaxonomy();
    });

    actions.append(selectBtn, editBtn, deleteBtn);
    item.append(name, actions);
    taxonomyCategoryList.appendChild(item);
  });

  const activeCategory = getCategoryById(activeCategoryId) || getCategories()[0];
  if (!activeCategory) return;
  if (taxonomySelectedCategory) {
    taxonomySelectedCategory.textContent = `Subcategorías de ${activeCategory.name}`;
  }
  if (!activeSubcategoryId) {
    activeSubcategoryId = activeCategory.subcategories[0]?.id || "";
  }

  taxonomySubcategoryList.innerHTML = "";
  if (!activeCategory.subcategories.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay subcategorías registradas.";
    taxonomySubcategoryList.appendChild(empty);
  }

  activeCategory.subcategories.forEach((subcategory) => {
    const item = document.createElement("div");
    item.className = "taxonomy-item";
    if (subcategory.id === activeSubcategoryId) item.classList.add("is-active");

    const name = document.createElement("span");
    name.textContent = subcategory.name;

    const actions = document.createElement("div");
    actions.className = "taxonomy-actions";

    const selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "btn btn-ghost";
    selectBtn.textContent = "Ver";
    selectBtn.addEventListener("click", () => {
      activeSubcategoryId = subcategory.id;
      renderTaxonomyAdmin();
    });

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn btn-ghost";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", () => {
      const updated = window.prompt("Editar subcategoría", subcategory.name);
      if (!updated) return;
      subcategory.name = updated.trim();
      saveTaxonomy();
      renderTaxonomyAdmin();
      refreshTaxonomyUI();
      syncCatalogWithTaxonomy();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      if (isSubcategoryInUse(activeCategory.id, subcategory.id)) {
        window.alert(
          "No puedes eliminar esta subcategoría porque hay productos asociados. Reasigna primero."
        );
        return;
      }
      const confirmed = window.confirm(
        `¿Eliminar la subcategoría "${subcategory.name}"?`
      );
      if (!confirmed) return;
      activeCategory.subcategories = activeCategory.subcategories.filter(
        (item) => item.id !== subcategory.id
      );
      if (activeSubcategoryId === subcategory.id) activeSubcategoryId = "";
      saveTaxonomy();
      renderTaxonomyAdmin();
      refreshTaxonomyUI();
      syncCatalogWithTaxonomy();
    });

    actions.append(selectBtn, editBtn, deleteBtn);
    item.append(name, actions);
    taxonomySubcategoryList.appendChild(item);
  });

  const activeSubcategory = activeCategory.subcategories.find(
    (subcategory) => subcategory.id === activeSubcategoryId
  );
  if (taxonomySelectedSubcategory) {
    taxonomySelectedSubcategory.textContent = activeSubcategory
      ? `Detalles de ${activeSubcategory.name}`
      : "Detalles (opcional)";
  }

  taxonomyChildList.innerHTML = "";
  const children = activeSubcategory?.children || [];
  if (!children.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Sin detalles registrados.";
    taxonomyChildList.appendChild(empty);
  }

  children.forEach((child) => {
    const item = document.createElement("div");
    item.className = "taxonomy-item";

    const name = document.createElement("span");
    name.textContent = child.name;

    const actions = document.createElement("div");
    actions.className = "taxonomy-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn btn-ghost";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", () => {
      const updated = window.prompt("Editar detalle", child.name);
      if (!updated) return;
      child.name = updated.trim();
      saveTaxonomy();
      renderTaxonomyAdmin();
      refreshTaxonomyUI();
      syncCatalogWithTaxonomy();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      if (isChildInUse(activeCategory.id, activeSubcategory.id, child.id)) {
        window.alert(
          "No puedes eliminar este detalle porque hay productos asociados. Reasigna primero."
        );
        return;
      }
      const confirmed = window.confirm(`¿Eliminar el detalle "${child.name}"?`);
      if (!confirmed) return;
      activeSubcategory.children = activeSubcategory.children.filter(
        (item) => item.id !== child.id
      );
      saveTaxonomy();
      renderTaxonomyAdmin();
      refreshTaxonomyUI();
      syncCatalogWithTaxonomy();
    });

    actions.append(editBtn, deleteBtn);
    item.append(name, actions);
    taxonomyChildList.appendChild(item);
  });
};

const setupTaxonomyAdmin = () => {
  if (!taxonomyCategoryForm || !taxonomyCategoryName) return;
  taxonomyCategoryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = taxonomyCategoryName.value.trim();
    if (!name) return;
    const id = slugify(name);
    if (categories.some((category) => category.id === id)) {
      taxonomyCategoryName.value = "";
      return;
    }
    categories.push({ id, name, subcategories: [{ id: "otros", name: "Otros" }] });
    taxonomyCategoryName.value = "";
    saveTaxonomy();
    activeCategoryId = id;
    activeSubcategoryId = "otros";
    renderTaxonomyAdmin();
    refreshTaxonomyUI();
    syncCatalogWithTaxonomy();
  });

  taxonomySubcategoryForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = taxonomySubcategoryName?.value.trim();
    if (!name) return;
    const activeCategory = getCategoryById(activeCategoryId);
    if (!activeCategory) return;
    const id = slugify(name);
    if (activeCategory.subcategories.some((subcategory) => subcategory.id === id)) {
      taxonomySubcategoryName.value = "";
      return;
    }
    activeCategory.subcategories.push({ id, name, children: [] });
    taxonomySubcategoryName.value = "";
    saveTaxonomy();
    activeSubcategoryId = id;
    renderTaxonomyAdmin();
    refreshTaxonomyUI();
    syncCatalogWithTaxonomy();
  });

  taxonomyChildForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = taxonomyChildName?.value.trim();
    if (!name) return;
    const activeCategory = getCategoryById(activeCategoryId);
    const activeSubcategory = activeCategory?.subcategories.find(
      (subcategory) => subcategory.id === activeSubcategoryId
    );
    if (!activeSubcategory) return;
    const id = slugify(name);
    if (activeSubcategory.children?.some((child) => child.id === id)) {
      taxonomyChildName.value = "";
      return;
    }
    if (!activeSubcategory.children) activeSubcategory.children = [];
    activeSubcategory.children.push({ id, name });
    taxonomyChildName.value = "";
    saveTaxonomy();
    renderTaxonomyAdmin();
    refreshTaxonomyUI();
    syncCatalogWithTaxonomy();
  });

  taxonomySearch?.addEventListener("input", renderTaxonomyAdmin);
};

const closeCatalogMenu = () => {
  if (catalogMenu) catalogMenu.hidden = true;
  if (catalogMenuMobile) catalogMenuMobile.hidden = true;
  if (catalogMenuToggle) catalogMenuToggle.setAttribute("aria-expanded", "false");
};

const setupCatalogMenu = () => {
  if (!catalogMenuToggle) return;
  catalogMenuToggle.addEventListener("click", () => {
    const shouldOpen = catalogMenu?.hidden ?? true;
    if (catalogMenu) catalogMenu.hidden = !shouldOpen;
    if (catalogMenuMobile) catalogMenuMobile.hidden = !shouldOpen;
    catalogMenuToggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    const wrapper = catalogMenuToggle.closest(".catalog-menu-wrapper");
    if (!wrapper || !event.target) return;
    if (wrapper.contains(event.target)) return;
    closeCatalogMenu();
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
      if (activePanel) {
        activePanel.hidden = false;
        registerReveals(activePanel);
      }
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

const setupReveal = () => {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  registerReveals();
};

const registerReveals = (root = document) => {
  if (!revealObserver) return;
  root.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    revealObserver.observe(el);
  });
};

const isWelcomeDismissed = () =>
  sessionStorage.getItem(WELCOME_DISMISSED_KEY) === "1";

const ensureToastElement = () => {
  if (!notificationToast || !notificationMessage) return null;
  if (!document.body.contains(notificationToast)) {
    document.body.appendChild(notificationToast);
  }
  return notificationToast;
};

const showToast = (message, toastType = "notice") => {
  const toast = ensureToastElement();
  if (!toast || !notificationMessage) return;
  toast.dataset.toastType = toastType;
  notificationMessage.textContent = safeText(message);
  toast.hidden = false;
};

const showNotification = () => {
  const enabled = loadFromStorage(NOTIFICATION_ENABLED_KEY, true);
  if (!enabled || isWelcomeDismissed()) return;
  const message = loadFromStorage(NOTIFICATION_TEXT_KEY, DEFAULT_NOTIFICATION);
  showToast(message, "welcome");
};

const setupNotification = () => {
  const handleDismiss = (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest("[data-toast-close]");
    if (!target) return;
    const toast = target.closest("[data-toast]") || document.querySelector("[data-toast]");
    if (!toast) return;
    sessionStorage.setItem(WELCOME_DISMISSED_KEY, "1");
    event.preventDefault();
    event.stopPropagation();
    toast.remove();
  };

  document.addEventListener("click", handleDismiss, { capture: true });
  document.addEventListener("touchstart", handleDismiss, {
    capture: true,
    passive: false,
  });
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest("[data-toast-close]");
      if (!target) return;
      event.preventDefault();
      const toast = target.closest("[data-toast]") || document.querySelector("[data-toast]");
      if (!toast) return;
      sessionStorage.setItem(WELCOME_DISMISSED_KEY, "1");
      toast.remove();
    },
    { capture: true }
  );

  showNotification();
};

const setupNotificationBubble = () => {
  if (openNotifications) {
    openNotifications.addEventListener("click", () => {
      openAdminModal();
      const button = document.getElementById("admin-notifications-btn");
      button?.click();
    });
  }
  if (dismissNotifications) {
    dismissNotifications.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      sessionStorage.setItem(NOTIFICATION_BUBBLE_DISMISSED_KEY, "1");
      if (notificationBubble) notificationBubble.hidden = true;
    });
  }
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
  requestAnimationFrame(() => {
    productMapManager?.invalidate();
  });
};

const closeAdminModal = () => {
  adminModal.classList.remove("show");
  adminModal.setAttribute("aria-hidden", "true");
  adminLoginStatus.textContent = "";
  adminPassword.value = "";
  if (productForm) {
    productForm.hidden = true;
    resetProductForm();
  }
};

const handleAdminLogin = async (event) => {
  event.preventDefault();
  const value = adminPassword.value.trim();
  const hash = await hashText(value);
  if (hash && ADMIN_ACCESS_HASHES.has(hash)) {
    setAdminSession();
    adminLogin.hidden = true;
    adminPanel.hidden = false;
    adminLoginStatus.textContent = "";
    if (conditionSelect) conditionSelect.disabled = false;
  } else {
    adminLoginStatus.textContent = "Contraseña incorrecta.";
  }
};

const handleAdminLogout = () => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  adminPanel.hidden = true;
  adminLogin.hidden = false;
  if (conditionSelect) conditionSelect.disabled = true;
};

const handleProductSubmit = (event) => {
  event.preventDefault();
  const type = productType.value.trim();
  const operation = productOperation.value.trim();
  const condition = productCondition.value.trim();
  const deliveryZone = productDelivery.value.trim();
  const categoryId = productCategory.value;
  const subcategoryId = productSubcategory.value;
  const childId = productChildcategory?.value || "";
  const categoryName = getCategoryById(categoryId)?.name || "";
  const title = productTitle.value.trim();
  const description = getEditorText(productDescriptionEditor);
  const descriptionHtml = sanitizeRichText(productDescriptionEditor?.innerHTML || "");
  const rawPrice = productPrice.value.trim();
  const priceValue = parsePrice(rawPrice);
  const images = getPreviewImages(productPreview);
  const startDate = productSchedule.checked ? productStartDate.value : "";
  const endDate = productSchedule.checked ? productEndDate.value : "";
  const isProtected = productPrivate.checked;
  const contactPhone = productContactPhone?.value.trim() || "";
  const contactEmail = productContactEmail?.value.trim() || "";
  const location = productAddress?.value.trim() || "";
  const mapState = getMapState(productMapManager, location);
  const showPhone = Boolean(productShowPhone?.checked);
  const showEmail = Boolean(productShowEmail?.checked);
  const showMap = Boolean(productShowMap?.checked);
  const showAddress = Boolean(productShowAddress?.checked);
  const expirationPreset = productExpiration?.value || "forever";
  const expirationDateValue = productExpirationDate?.value || "";
  const { expiresAt, pinnedForever } = resolveExpiration(
    expirationPreset,
    expirationDateValue
  );

  if (
    !type ||
    !operation ||
    !condition ||
    !deliveryZone ||
    !categoryId ||
    !subcategoryId ||
    !title ||
    !description
  ) {
    productFormStatus.textContent = "Completa todos los campos con datos válidos.";
    return;
  }

  if (showPhone && !contactPhone) {
    productFormStatus.textContent = "Ingresa el teléfono o desactiva su visibilidad.";
    return;
  }

  if (showEmail && !contactEmail) {
    productFormStatus.textContent = "Ingresa el correo o desactiva su visibilidad.";
    return;
  }

  if (showMap && (!mapState.lat || !mapState.lng) && !location) {
    productFormStatus.textContent =
      "Agrega una ubicación o coloca el pin para mostrar el mapa.";
    return;
  }

  if (showAddress && !location) {
    productFormStatus.textContent = "Agrega una dirección para mostrar la ubicación.";
    return;
  }

  if (expirationPreset === "date" && !expirationDateValue) {
    productFormStatus.textContent = "Selecciona una fecha de caducidad válida.";
    return;
  }

  if (rawPrice && priceValue === null) {
    productFormStatus.textContent = "Ingresa un precio válido o deja el campo vacío.";
    return;
  }

  if (!images.length) {
    productFormStatus.textContent = "Agrega al menos una imagen del producto.";
    return;
  }

  const now = Date.now();
  let status = editingDraft?.status || "activo";
  if (pinnedForever) {
    status = status === "expirado" ? "activo" : status;
  } else if (expiresAt && expiresAt <= now) {
    status = "expirado";
  } else if (status === "expirado") {
    status = "activo";
  }
  if (editingMode === "pending" && editingPendingId) {
    pendingProposals = pendingProposals.map((proposal) =>
      proposal.id === editingPendingId
        ? {
            ...proposal,
            type,
            operation,
            condition,
            deliveryZone,
            category: categoryName,
            categoryId,
            subcategoryId,
            title,
            description,
            descriptionHtml,
            price: priceValue,
            priceMXN: priceValue,
            images,
            startDate,
            endDate,
            isProtected,
            childId,
            location,
            addressText: location,
            locationMode: mapState.locationMode,
            lat: mapState.lat,
            lng: mapState.lng,
            showMapPublic: showMap,
            showAddressPublic: showAddress,
            expiresAt,
            pinnedForever,
            durationPreset: expirationPreset,
            status,
            mapApproved: showMap,
            contact: { phone: contactPhone, email: contactEmail },
            visibility: { showPhone, showEmail, showMap, showAddress },
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
          operation,
          condition,
          deliveryZone,
          category: categoryName,
          categoryId,
          subcategoryId,
          title,
          description,
          descriptionHtml,
          price: priceValue,
          priceMXN: priceValue,
          images,
          startDate,
          endDate,
          isProtected,
          childId,
          location,
          addressText: location,
          locationMode: mapState.locationMode,
          lat: mapState.lat,
          lng: mapState.lng,
          showMapPublic: showMap,
          showAddressPublic: showAddress,
          expiresAt,
          pinnedForever,
          durationPreset: expirationPreset,
          status,
          mapApproved: showMap,
          contact: { phone: contactPhone, email: contactEmail },
          visibility: { showPhone, showEmail, showMap, showAddress },
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
      operation,
      condition,
      deliveryZone,
      category: categoryName,
      categoryId,
      subcategoryId,
      childId,
      title,
      description,
      descriptionHtml,
      price: priceValue,
      priceMXN: priceValue,
      images,
      startDate,
      endDate,
      isProtected,
      location,
      addressText: location,
      locationMode: mapState.locationMode,
      lat: mapState.lat,
      lng: mapState.lng,
      showMapPublic: showMap,
      showAddressPublic: showAddress,
      expiresAt,
      pinnedForever,
      durationPreset: expirationPreset,
      status,
      mapApproved: showMap,
      contact: { phone: contactPhone, email: contactEmail },
      visibility: { showPhone, showEmail, showMap, showAddress },
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
  addNotification({
    type: "Notificación manual",
    message,
  });
  notificationStatus.textContent = "Notificación actualizada.";
};

const handleExport = () => {
  const payload = {
    approved: approvedProducts,
    pending: pendingProposals,
    rejected: rejectedProposals,
    notification: loadFromStorage(NOTIFICATION_TEXT_KEY, DEFAULT_NOTIFICATION),
    notificationEnabled: loadFromStorage(NOTIFICATION_ENABLED_KEY, true),
    notifications: storedNotifications,
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
        approvedProducts = data.approved.map(sanitizeApprovedProduct);
        saveToStorage(APPROVED_KEY, approvedProducts);
        renderProducts();
        renderProtectedCatalog();
        updateAdminList();
      }
      if (Array.isArray(data.pending)) {
        pendingProposals = data.pending.map(normalizeProposal);
        saveToStorage(PENDING_KEY, pendingProposals);
        updatePendingList();
      }
      if (Array.isArray(data.rejected)) {
        rejectedProposals = data.rejected.map(normalizeProposal);
        saveToStorage(REJECTED_KEY, rejectedProposals);
      }
      if (data.notification) {
        saveToStorage(NOTIFICATION_TEXT_KEY, data.notification);
      }
      if (typeof data.notificationEnabled === "boolean") {
        saveToStorage(NOTIFICATION_ENABLED_KEY, data.notificationEnabled);
        notificationEnabled.checked = data.notificationEnabled;
      }
      if (Array.isArray(data.notifications)) {
        storedNotifications = data.notifications;
        saveNotifications();
      }
      settingsStatus.textContent = "Datos importados correctamente.";
    } catch (error) {
      settingsStatus.textContent = "Archivo inválido.";
    }
  };
  reader.readAsText(file);
};

const setupContactForm = () => {
  if (!contactForm || !contactStatus) return;
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactStatus.textContent = "Mensaje enviado. Se responderá por WhatsApp.";
    contactForm.reset();
  });
};


const initCoursesPage = () => {
  const coursesContainer = document.getElementById("courses");
  if (!coursesContainer) return;
  const overlay = document.getElementById("overlay");
  const enrollModal = document.getElementById("enrollModal");
  const callModal = document.getElementById("callModal");
  const enrollForm = document.getElementById("enrollForm");
  const callbackForm = document.getElementById("callbackForm");
  const toast = document.getElementById("toast");
  let courses = [];

  const formatDate = (value) => new Date(value).toLocaleDateString("es-MX");
  const generateGroups = (course) => {
    let start = new Date(course.fecha_inicio);
    const now = new Date();
    let id = 1;
    course.grupos = [];
    while (course.grupos.length < 4) {
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      if (end > now) {
        if (!course.grupos.some((group) => new Date(group.inicio) < end && new Date(group.fin) > start)) {
          course.grupos.push({
            id_grupo: `${course.id}-${id}`,
            inicio: start.toISOString().slice(0, 10),
            fin: end.toISOString().slice(0, 10),
            dias_horarios: course.dias_horarios,
            estado: "planificado",
          });
          id += 1;
        }
      }
      start.setDate(start.getDate() + 14);
    }
  };

  const renderCourse = (course) => {
    const group = course.grupos[0];
    const start = formatDate(group.inicio);
    const end = formatDate(group.fin);
    const diff = Math.floor((new Date(group.inicio) - new Date()) / 86400000);
    const discount = diff >= 7;
    const priceHTML = discount
      ? `<p>Precio: $${course.precio} MXN <strong>$${course.precio_descuento} MXN</strong> <span class="off">20% off por inscripción anticipada</span></p>`
      : `<p>Precio: $${course.precio} MXN</p>`;
    const days = course.dias_horarios
      .map((day) => `<span class="chip-inline">${day.dia} ${day.hora_inicio}-${day.hora_fin}</span>`)
      .join("");
    const topics = course.temario.map((topic) => `<li>${topic}</li>`).join("");
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `<article class="course-card">
        <h3>${course.nombre}</h3>
        <p>${start} - ${end}</p>
        ${priceHTML}
        <div class="chips">${days}</div>
        <button class="accordion" aria-expanded="false" aria-controls="tem-${course.id}">Ver temario</button>
        <div id="tem-${course.id}" class="panel" hidden><ol>${topics}</ol></div>
        <div class="actions">
          <button class="call-btn" data-course="${course.id}" aria-label="Agendar llamada">📅</button>
          <button class="enroll-btn" data-course="${course.id}">Inscribirme</button>
        </div>
      </article>`
    );
  };

  const openModal = (modal) => {
    if (overlay) overlay.hidden = false;
    if (modal) {
      modal.hidden = false;
      modal.querySelector("input,select,textarea")?.focus();
    }
  };

  const closeModal = () => {
    if (overlay) overlay.hidden = true;
    if (enrollModal) enrollModal.hidden = true;
    if (callModal) callModal.hidden = true;
  };

  const showCourseToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    setTimeout(() => {
      toast.hidden = true;
    }, 4000);
  };

  const submitEnroll = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("token", Date.now());
    fetch("api/save_enrollment.php", { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => {
        showCourseToast(data.ok ? "Inscripción registrada" : "Error");
        if (data.ok) closeModal();
      });
  };

  const submitCallback = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("token", Date.now());
    fetch("api/save_callback.php", { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => {
        showCourseToast(data.ok ? "Agenda enviada" : "Error");
        if (data.ok) closeModal();
      });
  };

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.classList.contains("accordion")) {
      const panel = document.getElementById(event.target.getAttribute("aria-controls"));
      const expanded = event.target.getAttribute("aria-expanded") === "true";
      event.target.setAttribute("aria-expanded", (!expanded).toString());
      if (panel) panel.hidden = expanded;
    }
    if (event.target.classList.contains("call-btn")) {
      callbackForm?.reset();
      if (callbackForm) callbackForm.course_id.value = event.target.dataset.course || "";
      openModal(callModal);
    }
    if (event.target.classList.contains("enroll-btn")) {
      const course = courses.find((item) => item.id === event.target.dataset.course);
      const select = enrollForm?.querySelector("select");
      if (course && select) {
        select.innerHTML = course.grupos
          .map((group) => `<option value="${group.id_grupo}">${formatDate(group.inicio)}</option>`)
          .join("");
        enrollForm.course_id.value = course.id;
      }
      openModal(enrollModal);
    }
    if (event.target.classList.contains("close-modal") || event.target.id === "overlay") {
      closeModal();
    }
  });

  if (enrollForm) enrollForm.addEventListener("submit", submitEnroll);
  if (callbackForm) callbackForm.addEventListener("submit", submitCallback);

  fetch("data/courses.json")
    .then((response) => response.json())
    .then((data) => {
      courses = data;
      courses.forEach((course) => {
        generateGroups(course);
        renderCourse(course);
      });
    });
};

const handleProposalSubmit = (event) => {
  event.preventDefault();
  const type = proposalType.value.trim();
  const operation = proposalOperation.value.trim();
  const condition = proposalCondition.value.trim();
  const deliveryZone = proposalDelivery.value.trim();
  const contactPhone = proposalContactPhone.value.trim();
  const contactEmail = proposalContactEmail.value.trim();
  const location = proposalAddress?.value.trim() || "";
  const mapState = getMapState(proposalMapManager, location);
  const mapRequested = Boolean(
    proposalMapRequest?.checked && (mapState.lat || mapState.lng || location)
  );
  const categoryId = proposalCategory.value;
  const subcategoryId = proposalSubcategory.value;
  const childId = proposalChildcategory?.value || "";
  const categoryName = getCategoryById(categoryId)?.name || "";
  const title = proposalTitle.value.trim();
  const description = getEditorText(proposalDescriptionEditor);
  const descriptionHtml = sanitizeRichText(proposalDescriptionEditor?.innerHTML || "");
  const rawPrice = proposalPrice.value.trim();
  const priceValue = parsePrice(rawPrice);
  const images = getPreviewImages(proposalPreview);
  const startDate = proposalSchedule.checked ? proposalStartDate.value : "";
  const endDate = proposalSchedule.checked ? proposalEndDate.value : "";
  const isProtected = proposalPrivate.checked;

  if (
    !type ||
    !operation ||
    !condition ||
    !deliveryZone ||
    !contactPhone ||
    !categoryId ||
    !subcategoryId ||
    !title ||
    !description
  ) {
    proposalStatus.textContent = "Completa los campos con datos válidos.";
    return;
  }

  if (proposalTerms && !proposalTerms.checked) {
    proposalStatus.textContent = "Debes aceptar los términos de publicación y comisión.";
    return;
  }

  if (rawPrice && priceValue === null) {
    proposalStatus.textContent = "Ingresa un precio válido o deja el campo vacío.";
    return;
  }

  if (!images.length) {
    proposalStatus.textContent = "Agrega una o más imágenes para enviar la propuesta.";
    return;
  }

  const proposal = {
    id: generateId(),
    type,
    operation,
    condition,
    deliveryZone,
    category: categoryName,
    categoryId,
    subcategoryId,
    childId,
    title,
    description,
    descriptionHtml,
    price: priceValue,
    priceMXN: priceValue,
    images,
    startDate,
    endDate,
    isProtected,
    location,
    addressText: location,
    locationMode: mapState.locationMode,
    lat: mapState.lat,
    lng: mapState.lng,
    showMapPublic: false,
    showAddressPublic: false,
    mapRequested,
    mapApproved: false,
    visibility: { showPhone: false, showEmail: false, showMap: false, showAddress: false },
    status: "pendiente",
    detailsRequest: "",
    contact: {
      phone: contactPhone,
      email: contactEmail,
    },
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

  proposalStatus.textContent = "Propuesta enviada. Se revisará.";
  proposalForm.reset();
  proposalPreview.hidden = true;
  proposalPreview.innerHTML = "";
  proposalPreview.dataset.images = "";
  proposalDates.hidden = true;
  setEditorContent(proposalDescriptionEditor, "");
  syncEditorValue(proposalDescriptionEditor, proposalDescription, proposalDescCount, 220);
  proposalMapManager?.setState({ lat: null, lng: null });
  if (proposalCategory) proposalCategory.value = "";
  populateSubcategorySelect(proposalSubcategory, "");
  populateChildcategorySelect(proposalChildcategory, "", "");
  if (proposalPrice) {
    updatePriceBreakdown(parsePrice(proposalPrice.value), proposalCommission, proposalPayout);
  }
  updatePendingList();

  addNotification({
    type: "Nueva publicación pendiente",
    message: `Se recibió una propuesta pendiente: ${proposal.title}.`,
    itemId: proposal.id,
  });

  if (hasAdminSession()) {
    showToast("Nueva propuesta pendiente por validar", "admin");
  }
};

const setupAdminEvents = () => {
  if (
    !openAdmin ||
    !closeAdmin ||
    !adminModal ||
    !adminLoginForm ||
    !adminLogout ||
    !newProductBtn ||
    !cancelProduct ||
    !productImageBtn ||
    !productImage ||
    !adminDropzone ||
    !productDescription ||
    !productDescriptionEditor ||
    !productSchedule ||
    !productOperation ||
    !productCategory ||
    !productSubcategory ||
    !productForm
  ) {
    return;
  }
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
  adminDropzone.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    productImage.click();
  });
  productImage.addEventListener("change", (event) =>
    handleImageDrop({
      files: event.target.files,
      previewEl: productPreview,
      statusEl: productFormStatus,
    })
  );
  adminDropzone.addEventListener("dragenter", (event) => {
    event.preventDefault();
    adminDropzone.classList.add("is-dragging");
  });
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
  productDescriptionEditor.addEventListener("input", () => {
    syncEditorValue(productDescriptionEditor, productDescription, descCount, 220);
  });
  productSchedule.addEventListener("change", () => {
    productDates.hidden = !productSchedule.checked;
  });
  productExpiration?.addEventListener("change", () => {
    if (productExpirationDateField) {
      productExpirationDateField.hidden = productExpiration.value !== "date";
    }
    updateExpirationHelp(
      productExpiration.value,
      productExpirationDate?.value || "",
      productExpirationHelp
    );
  });
  productExpirationDate?.addEventListener("change", () => {
    updateExpirationHelp(
      productExpiration?.value || "forever",
      productExpirationDate.value,
      productExpirationHelp
    );
  });
  productCategory.addEventListener("change", () => {
    populateSubcategorySelect(productSubcategory, productCategory.value);
    populateChildcategorySelect(productChildcategory, productCategory.value, "");
  });
  productSubcategory.addEventListener("change", () => {
    populateChildcategorySelect(
      productChildcategory,
      productCategory.value,
      productSubcategory.value
    );
  });
  productAddress?.addEventListener("input", () => {
    const mapState = productMapManager?.getState();
    if (
      productShowMap &&
      !productAddress.value.trim() &&
      !(mapState?.lat && mapState?.lng)
    ) {
      productShowMap.checked = false;
    }
  });
  reactivateProduct?.addEventListener("click", () => {
    if (!editingDraft) return;
    editingDraft.status = "activo";
    if (reactivateProduct) reactivateProduct.hidden = true;
    if (productFormStatus) {
      productFormStatus.textContent = "Producto reactivado. Guarda para aplicar.";
    }
  });
  productForm.addEventListener("submit", handleProductSubmit);
  adminWhatsApp.addEventListener("click", () => {
    const title = productTitle.value.trim() || "Sin título";
    const priceValue = parsePrice(productPrice.value);
    const priceText = priceValue === null ? "Precio a consultar" : `$${priceValue} MXN`;
    const message = `Hola Alberto. Estoy publicando/actualizando un producto en LA TIENDA DE ALBERTO. Producto: ${title}. ${priceText}. (Adjunto imagen si aplica).`;
    window.open(createWhatsAppUrl(message), "_blank", "noopener");
  });
  notificationForm.addEventListener("submit", handleNotificationSave);
  clearNotificationsBtn?.addEventListener("click", () => {
    const confirmed = window.confirm("¿Eliminar todas las notificaciones?");
    if (!confirmed) return;
    storedNotifications = [];
    saveNotifications();
  });
  exportDataBtn.addEventListener("click", handleExport);
  importDataBtn.addEventListener("click", () => importDataInput.click());
  importDataInput.addEventListener("change", handleImport);
};

const setupProposalEvents = () => {
  if (
    !proposalForm ||
    !proposalImageBtn ||
    !proposalImage ||
    !proposalDropzone ||
    !proposalSchedule ||
    !proposalOperation ||
    !proposalCategory ||
    !proposalSubcategory ||
    !proposalDescription ||
    !proposalDescriptionEditor ||
    !proposalPrice
  ) {
    return;
  }
  proposalImageBtn.addEventListener("click", () => proposalImage.click());
  proposalDropzone.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    proposalImage.click();
  });
  proposalImage.addEventListener("change", (event) =>
    handleImageDrop({
      files: event.target.files,
      previewEl: proposalPreview,
      statusEl: proposalStatus,
    })
  );
  proposalDropzone.addEventListener("dragenter", (event) => {
    event.preventDefault();
    proposalDropzone.classList.add("is-dragging");
  });
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
  proposalCategory.addEventListener("change", () => {
    populateSubcategorySelect(proposalSubcategory, proposalCategory.value);
    populateChildcategorySelect(proposalChildcategory, proposalCategory.value, "");
  });
  proposalSubcategory.addEventListener("change", () => {
    populateChildcategorySelect(
      proposalChildcategory,
      proposalCategory.value,
      proposalSubcategory.value
    );
  });
  proposalDescriptionEditor.addEventListener("input", () => {
    syncEditorValue(proposalDescriptionEditor, proposalDescription, proposalDescCount, 220);
  });
  proposalPrice.addEventListener("input", () => {
    const priceValue = parsePrice(proposalPrice.value);
    updatePriceBreakdown(priceValue, proposalCommission, proposalPayout);
  });
  proposalForm.addEventListener("submit", handleProposalSubmit);
  proposalAddress?.addEventListener("input", () => {
    const mapState = proposalMapManager?.getState();
    if (
      proposalMapRequest &&
      !proposalAddress.value.trim() &&
      !(mapState?.lat && mapState?.lng)
    ) {
      proposalMapRequest.checked = false;
    }
  });
};

const setupMapManagers = () => {
  proposalMapManager = createMapManager({
    mapEl: proposalMap,
    searchBtn: proposalMapSearch,
    manualToggle: proposalMapManual,
    addressInput: proposalAddress,
    statusEl: proposalMapStatus,
  });
  productMapManager = createMapManager({
    mapEl: productMap,
    searchBtn: productMapSearch,
    manualToggle: productMapManual,
    addressInput: productAddress,
    statusEl: productMapStatus,
  });
};

const openProtectedModal = () => {
  if (!protectedModal) return;
  protectedModal.classList.add("show");
  protectedModal.setAttribute("aria-hidden", "false");
  if (protectedAccessStatus) protectedAccessStatus.textContent = "";
  if (protectedPassword) protectedPassword.value = "";
};

const closeProtectedModalHandler = () => {
  if (!protectedModal) return;
  protectedModal.classList.remove("show");
  protectedModal.setAttribute("aria-hidden", "true");
};

const renderProtectedCatalog = () => {
  if (!protectedGrid || !protectedCatalog) return;
  const unlocked = hasProtectedAccess();
  protectedCatalog.hidden = !unlocked;
  protectedGrid.innerHTML = "";
  if (!unlocked) return;
  const protectedItems = approvedProducts.filter(
    (product) => product.isProtected && product.status !== "expirado" && !isExpired(product)
  );
  if (!protectedItems.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay productos especiales disponibles.";
    protectedGrid.appendChild(empty);
    return;
  }
  protectedItems.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card product-card protected-card-item";
    const carousel = buildCarousel(product.images, product.title);

    const title = document.createElement("h3");
    title.textContent = safeText(product.title);

    const meta = document.createElement("div");
    meta.className = "tag-row";
    const typeTag = document.createElement("span");
    typeTag.className = "tag";
    typeTag.textContent = product.type || "Producto";
    const operationTag = document.createElement("span");
    operationTag.className = "tag tag-highlight";
    operationTag.textContent = formatOperation(product.operation);
    const categoryTag = document.createElement("span");
    categoryTag.className = "tag tag-alt";
    categoryTag.textContent = getCategoryLabel(product);
    meta.append(typeTag, operationTag, categoryTag);
    const subcategoryLabel = getSubcategoryLabel(product);
    if (subcategoryLabel) {
      const subTag = document.createElement("span");
      subTag.className = "tag";
      subTag.textContent = subcategoryLabel;
      meta.append(subTag);
    }

    const details = document.createElement("p");
    details.className = "muted small";
    details.textContent = isCourseItem(product)
      ? "Sesiones en línea"
      : `${formatCondition(product.condition)} · ${formatDelivery(product.deliveryZone)}`;

    const desc = document.createElement("div");
    desc.className = "muted";
    desc.innerHTML = sanitizeRichText(product.descriptionHtml || product.description);

    const priceBlock = isCourseItem(product) ? buildCoursePricing() : document.createElement("p");
    if (!isCourseItem(product)) {
      priceBlock.className = "price";
      priceBlock.textContent = formatPriceLabel(product.price);
    }

    const mapBlock = buildMapBlock(product);
    const contactSection = buildContactSection(product);
    const commissionNote = buildCommissionNote();

    card.append(carousel, meta, title, details, desc, priceBlock);
    if (mapBlock) card.append(mapBlock);
    card.append(commissionNote, contactSection);
    protectedGrid.appendChild(card);
  });
  initMapEmbeds(protectedGrid);
  registerReveals(protectedGrid);
};

const setupProtectedAccess = () => {
  if (openProtectedCatalog) {
    openProtectedCatalog.addEventListener("click", () => {
      if (hasProtectedAccess()) {
        renderProtectedCatalog();
        protectedCatalog?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      openProtectedModal();
    });
  }
  if (closeProtectedModal) {
    closeProtectedModal.addEventListener("click", closeProtectedModalHandler);
  }
  if (protectedModal) {
    protectedModal.addEventListener("click", (event) => {
      if (event.target === protectedModal) closeProtectedModalHandler();
    });
  }
  if (protectedAccessForm) {
    protectedAccessForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const value = protectedPassword.value.trim();
      const hash = await hashText(value);
      if (hash && hash === PROTECTED_CATALOG_HASH) {
        setProtectedAccess();
        if (protectedAccessStatus) {
          protectedAccessStatus.textContent = "Acceso concedido.";
        }
        closeProtectedModalHandler();
        renderProtectedCatalog();
      } else if (protectedAccessStatus) {
        protectedAccessStatus.textContent = "Contraseña incorrecta.";
      }
    });
  }
  if (closeProtectedCatalog) {
    closeProtectedCatalog.addEventListener("click", () => {
      clearProtectedAccess();
      renderProtectedCatalog();
    });
  }
};

const setupCommissionModal = () => {
  if (continueWhatsApp) {
    continueWhatsApp.addEventListener("click", () => {
      if (!pendingWhatsAppUrl) return;
      window.open(pendingWhatsAppUrl, "_blank", "noopener");
      closeCommissionModalHandler();
    });
  }
  if (cancelWhatsApp) {
    cancelWhatsApp.addEventListener("click", closeCommissionModalHandler);
  }
  if (closeCommissionModal) {
    closeCommissionModal.addEventListener("click", closeCommissionModalHandler);
  }
  if (commissionModal) {
    commissionModal.addEventListener("click", (event) => {
      if (event.target === commissionModal) closeCommissionModalHandler();
    });
  }
};

const openLightbox = (src, alt) => {
  if (!imageLightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Vista ampliada";
  imageLightbox.classList.add("show");
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
};

const closeLightboxHandler = () => {
  if (!imageLightbox || !lightboxImage) return;
  imageLightbox.classList.remove("show");
  imageLightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.classList.remove("no-scroll");
};

const setupLightbox = () => {
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest("img[data-lightbox]");
    if (!target) return;
    event.preventDefault();
    openLightbox(target.src, target.alt);
  });
  closeLightbox?.addEventListener("click", closeLightboxHandler);
  imageLightbox?.addEventListener("click", (event) => {
    if (event.target === imageLightbox) closeLightboxHandler();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageLightbox?.classList.contains("show")) {
      closeLightboxHandler();
    }
  });
};

const setupZoomLens = () => {
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!supportsHover) return;
  const zoomScale = 2.5;
  let activeTarget = null;
  let rafId = null;
  let lastEvent = null;

  const resetZoom = (target) => {
    if (!target) return;
    target.style.transform = "";
    target.style.transformOrigin = "";
  };

  const updateZoom = () => {
    if (!activeTarget || !lastEvent) return;
    const rect = activeTarget.getBoundingClientRect();
    const x = Math.min(Math.max((lastEvent.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((lastEvent.clientY - rect.top) / rect.height, 0), 1);
    activeTarget.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    activeTarget.style.transform = `scale(${zoomScale})`;
    rafId = null;
  };

  const scheduleUpdate = (event) => {
    lastEvent = event;
    if (rafId) return;
    rafId = requestAnimationFrame(updateZoom);
  };

  document.addEventListener("mousemove", (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest("img[data-zoom]");
    if (!target) {
      if (activeTarget) resetZoom(activeTarget);
      activeTarget = null;
      return;
    }
    if (activeTarget !== target) {
      if (activeTarget) resetZoom(activeTarget);
      activeTarget = target;
    }
    scheduleUpdate(event);
  });

  document.addEventListener("mouseleave", () => {
    if (activeTarget) resetZoom(activeTarget);
    activeTarget = null;
  });
};

const setupHolidayMusic = () => {
  if (!holidayAudio || !toggleMusic) return;
  holidayAudio.loop = false;
  const setToggleState = (playing) => {
    toggleMusic.hidden = false;
    toggleMusic.textContent = playing ? "Silenciar música" : "Reproducir música";
    toggleMusic.setAttribute("aria-pressed", playing ? "true" : "false");
  };

  const attemptPlay = () => {
    holidayAudio
      .play()
      .then(() => setToggleState(true))
      .catch(() => setToggleState(false));
  };

  toggleMusic.addEventListener("click", () => {
    if (holidayAudio.paused) {
      holidayAudio.play().then(() => setToggleState(true));
    } else {
      holidayAudio.pause();
      setToggleState(false);
    }
  });

  holidayAudio.addEventListener("ended", () => {
    setToggleState(false);
  });

  attemptPlay();
};

const setupAboutForm = () => {
  if (!aboutForm || !aboutInput) return;
  aboutInput.value = loadAbout();
  aboutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = aboutInput.value.trim();
    if (!value) {
      aboutStatus.textContent = "Escribe un texto válido.";
      return;
    }
    saveToStorage(ABOUT_KEY, value);
    aboutStatus.textContent = "Sección actualizada.";
    renderAbout();
  });
};

const initializeNotificationForm = () => {
  if (!notificationInput || !notificationEnabled) return;
  notificationInput.value = loadFromStorage(
    NOTIFICATION_TEXT_KEY,
    DEFAULT_NOTIFICATION
  );
  notificationEnabled.checked = loadFromStorage(NOTIFICATION_ENABLED_KEY, true);
};

const init = () => {
  loadTaxonomy();
  ensureDefaultTaxonomy();
  loadApproved();
  maintainExpirationStatus();
  loadPending();
  loadRejected();
  loadMessages();
  loadNotifications();
  renderAbout();
  setupReveal();
  updateAdminList();
  updatePendingList();
  updateExpiredList();
  renderMessages();
  renderNotifications();
  setupCourseButtons();
  setupTabs();
  setupAdminTabs();
  setupNotification();
  setupNotificationBubble();
  setupAdminEvents();
  setupAdminActionDelegation();
  setupProposalEvents();
  setupMapManagers();
  setupProtectedAccess();
  setupCommissionModal();
  setupLightbox();
  setupZoomLens();
  setupHolidayMusic();
  setupAboutForm();
  setupRichTextEditors();
  initCoursesPage();
  initializeNotificationForm();
  setupPreviewReorder(productPreview);
  setupPreviewReorder(proposalPreview);
  setupCatalogMenu();
  setupCategoryChips();
  setupCategoryScroller();
  setupOperationChips();
  updateChipSelection(operationChips, "operation", operationSelect?.value || "all");
  searchInput?.addEventListener("input", renderProducts);
  sortSelect?.addEventListener("change", renderProducts);
  typeSelect?.addEventListener("change", renderProducts);
  operationSelect?.addEventListener("change", () => {
    updateChipSelection(operationChips, "operation", operationSelect.value);
    renderProducts();
  });
  priceMin?.addEventListener("input", renderProducts);
  priceMax?.addEventListener("input", renderProducts);
  childcategorySelect?.addEventListener("change", renderProducts);
  conditionSelect?.addEventListener("change", renderProducts);
  categorySelect?.addEventListener("change", () => {
    populateSubcategorySelect(subcategorySelect, categorySelect.value, { includeAll: true });
    populateChildcategorySelect(
      childcategorySelect,
      categorySelect.value,
      subcategorySelect.value,
      { includeAll: true }
    );
    updateChipSelection(categoryChips, "category", categorySelect.value);
    renderProducts();
  });
  subcategorySelect?.addEventListener("change", () => {
    populateChildcategorySelect(
      childcategorySelect,
      categorySelect.value,
      subcategorySelect.value,
      { includeAll: true }
    );
    renderProducts();
  });
  setupContactForm();
  setupTaxonomyAdmin();
  refreshTaxonomyUI();
  renderTaxonomyAdmin();
  syncCatalogWithTaxonomy();
  updatePriceBreakdown(parsePrice(proposalPrice.value), proposalCommission, proposalPayout);
  renderProtectedCatalog();
  renderNotificationBubble();

  if (hasAdminSession()) {
    if (adminLogin) adminLogin.hidden = true;
    if (adminPanel) adminPanel.hidden = false;
  }
  if (conditionSelect) {
    conditionSelect.disabled = !hasAdminSession();
  }

};

init();
