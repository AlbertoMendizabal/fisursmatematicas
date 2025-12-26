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
const ADMIN_SESSION_KEY = "LTA_ADMIN_SESSION_V1";
const MESSAGE_KEY = "LTA_MESSAGES_V1";
const PROTECTED_CATALOG_KEY = "protectedCatalogUnlocked";
const PROTECTED_CATALOG_HASH = "db55da3fc3098e9c42311c6013304ff36b19ef73d12ea932054b5ad51df4f49d";
const ADMIN_ACCESS_HASHES = new Set([
  "7d12ba56e9f8b3dc64f77c87318c4f37bc12cfbf1a37573cdf3e4fa683f20155",
  "b2b2f104d32c638903e151a9b20d6e27b41d8c0c84cf8458738f83ca2f1dd744",
]);
const ABOUT_KEY = "LTA_ABOUT_V1";

const DEFAULT_NOTIFICATION =
  "Bienvenida a LA TIENDA DE ALBERTO. Aquí puedes consultar cursos y productos disponibles.";
const DEFAULT_ABOUT =
  "Soy Alberto. Aquí encontrarás cursos en línea y asesorías, además de un catálogo para vender o rentar productos y servicios.\n\nCada propuesta se revisa para mantener calidad y confianza. Los productos se muestran de forma profesional, con precios transparentes y fechas claras.\n\nEste proyecto nació para dar visibilidad a emprendedores y personas que desean promover asesorías, cursos o artículos especializados. La prioridad es que el proceso sea simple, directo y seguro.\n\nSi tienes dudas o necesitas ayuda para subir tu producto, puedes contactarte para recibir apoyo en el proceso.";

const CATEGORIES = [
  {
    id: "inmuebles",
    name: "Inmuebles",
    subcategories: [
      {
        id: "venta",
        name: "Venta",
        children: [
          { id: "venta-casas", name: "Casas" },
          { id: "venta-departamentos", name: "Departamentos" },
          { id: "venta-terrenos", name: "Terrenos" },
          { id: "venta-oficinas", name: "Oficinas" },
          { id: "venta-locales", name: "Locales" },
          { id: "venta-bodegas", name: "Bodegas" },
        ],
      },
      {
        id: "renta",
        name: "Renta",
        children: [
          { id: "renta-casas", name: "Casas" },
          { id: "renta-departamentos", name: "Departamentos" },
          { id: "renta-oficinas", name: "Oficinas" },
          { id: "renta-locales", name: "Locales" },
          { id: "renta-bodegas", name: "Bodegas" },
        ],
      },
    ],
  },
  {
    id: "vehiculos",
    name: "Vehículos",
    subcategories: [
      {
        id: "venta",
        name: "Venta",
        children: [
          { id: "venta-coches", name: "Coches" },
          { id: "venta-motos", name: "Motos" },
          { id: "venta-camionetas", name: "Camionetas" },
        ],
      },
      {
        id: "renta",
        name: "Renta",
        children: [
          { id: "renta-coches", name: "Coches" },
          { id: "renta-motos", name: "Motos" },
        ],
      },
      {
        id: "electricos",
        name: "Eléctricos",
        children: [
          { id: "electricos-coches", name: "Coches eléctricos" },
          { id: "electricos-motos", name: "Motos eléctricas" },
          { id: "electricos-bicicletas", name: "Bicicletas eléctricas" },
          { id: "electricos-scooters", name: "Scooters eléctricos" },
        ],
      },
      {
        id: "refacciones",
        name: "Refacciones y accesorios",
        children: [
          { id: "refacciones", name: "Refacciones" },
          { id: "llantas", name: "Llantas" },
          { id: "cascos-equipo", name: "Cascos y equipo" },
        ],
      },
    ],
  },
  {
    id: "electronica",
    name: "Electrónica",
    subcategories: [
      { id: "celulares", name: "Celulares" },
      { id: "tablets", name: "Tablets" },
      { id: "laptops", name: "Laptops" },
      { id: "computo", name: "Cómputo" },
      { id: "audio", name: "Audio" },
    ],
  },
  {
    id: "hogar",
    name: "Hogar y muebles",
    subcategories: [
      { id: "muebles", name: "Muebles" },
      { id: "electrodomesticos", name: "Electrodomésticos" },
      { id: "cocina", name: "Cocina" },
      { id: "decoracion", name: "Decoración" },
      { id: "jardin", name: "Jardín" },
      { id: "herramientas", name: "Herramientas" },
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
    ],
  },
  {
    id: "salud",
    name: "Salud y belleza",
    subcategories: [
      { id: "cuidado", name: "Cuidado personal" },
      { id: "perfumes", name: "Perfumes" },
      { id: "barberia", name: "Barbería" },
      { id: "fitness", name: "Fitness" },
    ],
  },
  {
    id: "servicios",
    name: "Servicios",
    subcategories: [
      { id: "eventos", name: "Eventos" },
      { id: "asesorias", name: "Asesorías" },
      { id: "reparaciones", name: "Reparaciones" },
      { id: "otros", name: "Otros" },
    ],
  },
  {
    id: "cursos",
    name: "Cursos",
    subcategories: [
      { id: "matematicas", name: "Matemáticas" },
      { id: "tecnologia", name: "Tecnología" },
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
const proposalCategory = document.getElementById("proposalCategory");
const proposalSubcategory = document.getElementById("proposalSubcategory");
const proposalChildcategory = document.getElementById("proposalChildcategory");
const proposalTitle = document.getElementById("proposalTitle");
const proposalDescription = document.getElementById("proposalDescription");
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
const productPrice = document.getElementById("productPrice");
const productPrivate = document.getElementById("productPrivate");
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
const adminNotificationList = document.getElementById("adminNotificationList");

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
const protectedCatalog = document.getElementById("protectedCatalog");
const protectedGrid = document.getElementById("protectedGrid");
const closeProtectedCatalog = document.getElementById("closeProtectedCatalog");
const aboutContent = document.getElementById("aboutContent");
const aboutForm = document.getElementById("aboutForm");
const aboutInput = document.getElementById("aboutInput");
const aboutStatus = document.getElementById("aboutStatus");

let approvedProducts = [];
let pendingProposals = [];
let rejectedProposals = [];
let editingApprovedId = null;
let editingPendingId = null;
let editingMode = "approved";
let storedMessages = [];
let storedNotifications = [];
let revealObserver = null;

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

const getCategoryById = (id) => CATEGORIES.find((category) => category.id === id);

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

  CATEGORIES.forEach((category) => {
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
  CATEGORIES.forEach((category) => {
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
  const fallbackId = category.subcategories[0]?.id || "otros";
  const legacyOverrides = {
    vehiculos: {
      coches: { subcategoryId: "venta", childId: "venta-coches" },
      motos: { subcategoryId: "venta", childId: "venta-motos" },
    },
    electronica: {
      computo: { subcategoryId: "computo", childId: "" },
      accesorios: { subcategoryId: "computo", childId: "" },
      monitores: { subcategoryId: "computo", childId: "" },
      consolas: { subcategoryId: "computo", childId: "" },
      audio: { subcategoryId: "audio", childId: "" },
    },
    servicios: {
      asesoria: { subcategoryId: "asesorias", childId: "" },
    },
  };
  const legacyMatch = legacyOverrides[categoryId]?.[subcategoryId];
  if (legacyMatch) return legacyMatch;
  if (childId) {
    return { subcategoryId: subcategoryId || fallbackId, childId };
  }
  const direct = category.subcategories.find((subcategory) => subcategory.id === subcategoryId);
  if (direct) {
    return { subcategoryId: direct.id, childId: "" };
  }
  const childMatch = category.subcategories.find((subcategory) =>
    subcategory.children?.some((child) => child.id === subcategoryId)
  );
  if (childMatch) {
    return { subcategoryId: childMatch.id, childId: subcategoryId };
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
  const matched = mapLegacySubcategory(fallbackCategoryId, fallbackSubcategoryId);
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
    subcategoryId: "renta",
    childId: "renta-departamentos",
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
    subcategoryId: "renta",
    childId: "renta-locales",
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
    subcategoryId: "venta",
    childId: "venta-casas",
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
    subcategoryId: "venta",
    childId: "venta-coches",
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
    subcategoryId: "venta",
    childId: "venta-motos",
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
    subcategoryId: "venta",
    childId: "venta-camionetas",
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
    subcategoryId: "electricos",
    childId: "electricos-bicicletas",
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
    description: "Sesiones en línea con explicación clara y práctica guiada.",
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
    description: "Sesiones en línea para dominar operaciones fundamentales.",
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
    description: "Sesiones en línea con ejemplos paso a paso.",
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
    description: "Sesiones en línea con práctica guiada.",
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
    title: "Cálculo",
    description: "Sesiones en línea para afianzar conceptos clave.",
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
    createdAt: Date.now() - 80000,
    updatedAt: Date.now() - 80000,
  },
  {
    id: generateId(),
    title: "Cálculo diferencial",
    description: "Sesiones en línea con ejercicios guiados.",
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
    createdAt: Date.now() - 82000,
    updatedAt: Date.now() - 82000,
  },
  {
    id: generateId(),
    title: "Cálculo integral",
    description: "Sesiones en línea con resolución detallada.",
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
    createdAt: Date.now() - 84000,
    updatedAt: Date.now() - 84000,
  },
  {
    id: generateId(),
    title: "Probabilidad",
    description: "Sesiones en línea con ejemplos prácticos.",
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
    createdAt: Date.now() - 86000,
    updatedAt: Date.now() - 86000,
  },
  {
    id: generateId(),
    title: "Álgebra lineal",
    description: "Sesiones en línea con matrices y vectores.",
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
    description: "Sesiones en línea con enfoque conceptual.",
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
    description: "Sesiones en línea con ejemplos guiados.",
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
    description: "Sesiones en línea para aprender movimientos y estrategia básica.",
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
    description: "Sesiones en línea para usar ChatGPT Plus de forma práctica.",
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
    description: "Sesiones en línea: explicación guiada del libro y resolución de dudas.",
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
  const normalized = {
    ...item,
    images: item.images || (item.imageDataUrl ? [item.imageDataUrl] : []),
    type: item.type || "Producto",
    operation: item.operation || "venta",
    categoryId: item.categoryId || "",
    subcategoryId: item.subcategoryId || "",
    childId: item.childId || "",
    category: item.category || "",
    price: item.price ?? item.priceMXN ?? null,
    priceMXN: item.priceMXN ?? item.price ?? null,
    isProtected: Boolean(item.isProtected ?? item.isPrivate),
    status: item.status || "publicado",
    startDate: item.startDate || "",
    endDate: item.endDate || "",
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
  const { contact, detailsRequest, ...rest } = normalized;
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
  storedNotifications = Array.isArray(stored) ? stored : [];
};

const saveNotifications = () => {
  saveToStorage(NOTIFICATION_LOG_KEY, storedNotifications);
  renderNotifications();
};

const addNotification = ({ type, message, itemId }) => {
  const payload = {
    id: generateId(),
    type,
    message,
    itemId: itemId || "",
    createdAt: Date.now(),
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
    const meta = document.createElement("p");
    meta.className = "muted";
    const dateText = new Date(notification.createdAt).toLocaleString("es-MX");
    meta.textContent = `${dateText}${notification.itemId ? ` · ${notification.itemId}` : ""}`;
    const message = document.createElement("p");
    message.textContent = notification.message;
    info.append(title, meta, message);

    const actions = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      storedNotifications = storedNotifications.filter((item) => item.id !== notification.id);
      saveNotifications();
    });
    actions.append(deleteBtn);

    item.append(info, actions);
    adminNotificationList.appendChild(item);
  });
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
    "Entrega y pago del resto: acuerdo directo entre interesado y proveedor. Comisión 20% al confirmarse por WhatsApp.";
  return note;
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

  const button = document.createElement("a");
  button.className = "btn btn-whatsapp";
  button.target = "_blank";
  button.rel = "noopener";
  button.textContent = "Contactar por WhatsApp";
  const priceText = isCourseItem(product)
    ? "Tarifa: $350 MXN por sesión de 1 hora. Promo: $2,400 MXN por 8 sesiones de 1 hora."
    : product.price === null || product.price === undefined
    ? "Precio a consultar."
    : `Precio: $${product.price} MXN.`;
  const message = `Hola Alberto. Me interesa este ${
    product.type?.toLowerCase() || "producto"
  }: ${product.title}. ${priceText} ¿Cómo procedemos?`;
  button.href = createWhatsAppUrl(message);

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

    const desc = document.createElement("p");
    desc.textContent = safeText(product.description);

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

    const contactSection = buildContactSection(product);
    const commissionNote = buildCommissionNote();

    card.append(carousel, meta, title, details, desc, priceBlock);
    if (schedule.textContent) card.append(schedule);
    card.append(commissionNote, contactSection);
    productGrid.appendChild(card);
  });

  registerReveals(productGrid);
};

const updateAdminList = () => {
  if (!adminProductList) return;
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
    approveBtn.addEventListener("click", () => approveProposal(proposal.id));

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-ghost";
    editBtn.type = "button";
    editBtn.textContent = "Editar antes de aprobar";
    editBtn.addEventListener("click", () => openEditForm(proposal, "pending"));

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn btn-ghost";
    detailsBtn.type = "button";
    detailsBtn.textContent = "Ver detalles";

    const requestBtn = document.createElement("button");
    requestBtn.className = "btn btn-ghost";
    requestBtn.type = "button";
    requestBtn.textContent = "Pedir detalles";
    requestBtn.addEventListener("click", () => requestProposalDetails(proposal.id));

    const rejectBtn = document.createElement("button");
    rejectBtn.className = "btn btn-ghost";
    rejectBtn.type = "button";
    rejectBtn.textContent = "Rechazar";
    rejectBtn.addEventListener("click", () => rejectProposal(proposal.id));

    actions.append(approveBtn, editBtn, detailsBtn, requestBtn, rejectBtn);

    const details = document.createElement("div");
    details.className = "admin-details";
    details.hidden = true;

    const contact = document.createElement("p");
    const contactLabel = document.createElement("strong");
    contactLabel.textContent = "Contacto: ";
    const contactValue = document.createElement("span");
    const phone = proposal.contact?.phone || "Sin teléfono";
    const contactAlt = proposal.contact?.email || "Sin contacto alterno";
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
  if (productCategory) productCategory.value = "";
  populateSubcategorySelect(productSubcategory, "");
  populateChildcategorySelect(productChildcategory, "", "");
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
  productDescription.value = item.description;
  productPrice.value = item.price ?? "";
  descCount.textContent = `${item.description.length}/220`;
  productStartDate.value = item.startDate || "";
  productEndDate.value = item.endDate || "";
  productSchedule.checked = Boolean(item.startDate || item.endDate);
  productDates.hidden = !productSchedule.checked;
  productPrivate.checked = Boolean(item.isProtected);
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
  const { contact, detailsRequest, status, ...rest } = proposal;
  approvedProducts.unshift({
    ...rest,
    updatedAt: Date.now(),
  });
  persistPending();
  persistApproved();
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
};

const persistPending = () => {
  const saved = saveToStorage(PENDING_KEY, pendingProposals);
  if (!saved) {
    adminStorageStatus.textContent =
      "No se pudo guardar pendientes. Reduce el tamaño de las imágenes.";
  }
  updatePendingList();
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

  CATEGORIES.forEach((category, index) => {
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

  if (CATEGORIES[0]) renderSubcategories(CATEGORIES[0]);

  CATEGORIES.forEach((category) => {
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
  const description = productDescription.value.trim();
  const rawPrice = productPrice.value.trim();
  const priceValue = parsePrice(rawPrice);
  const images = getPreviewImages(productPreview);
  const startDate = productSchedule.checked ? productStartDate.value : "";
  const endDate = productSchedule.checked ? productEndDate.value : "";
  const isProtected = productPrivate.checked;

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

  if (rawPrice && priceValue === null) {
    productFormStatus.textContent = "Ingresa un precio válido o deja el campo vacío.";
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
            operation,
            condition,
            deliveryZone,
            category: categoryName,
            categoryId,
            subcategoryId,
            title,
            description,
            price: priceValue,
            priceMXN: priceValue,
            images,
            startDate,
            endDate,
            isProtected,
            childId,
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
          price: priceValue,
          priceMXN: priceValue,
          images,
          startDate,
          endDate,
          isProtected,
          childId,
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
      price: priceValue,
      priceMXN: priceValue,
      images,
      startDate,
      endDate,
      isProtected,
      status: "publicado",
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
  const categoryId = proposalCategory.value;
  const subcategoryId = proposalSubcategory.value;
  const childId = proposalChildcategory?.value || "";
  const categoryName = getCategoryById(categoryId)?.name || "";
  const title = proposalTitle.value.trim();
  const description = proposalDescription.value.trim();
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
    !contactEmail ||
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
    price: priceValue,
    priceMXN: priceValue,
    images,
    startDate,
    endDate,
    isProtected,
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
  if (proposalCategory) proposalCategory.value = "";
  populateSubcategorySelect(proposalSubcategory, "");
  populateChildcategorySelect(proposalChildcategory, "", "");
  if (proposalDescCount) {
    proposalDescCount.textContent = "220 caracteres restantes";
  }
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
  productDescription.addEventListener("input", () => {
    descCount.textContent = `${productDescription.value.length}/220`;
  });
  productSchedule.addEventListener("change", () => {
    productDates.hidden = !productSchedule.checked;
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
  productForm.addEventListener("submit", handleProductSubmit);
  adminWhatsApp.addEventListener("click", () => {
    const title = productTitle.value.trim() || "Sin título";
    const priceValue = parsePrice(productPrice.value);
    const priceText = priceValue === null ? "Precio a consultar" : `$${priceValue} MXN`;
    const message = `Hola Alberto. Estoy publicando/actualizando un producto en LA TIENDA DE ALBERTO. Producto: ${title}. ${priceText}. (Adjunto imagen si aplica).`;
    window.open(createWhatsAppUrl(message), "_blank", "noopener");
  });
  notificationForm.addEventListener("submit", handleNotificationSave);
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
  proposalDescription.addEventListener("input", () => {
    const remaining = 220 - proposalDescription.value.length;
    proposalDescCount.textContent = `${Math.max(remaining, 0)} caracteres restantes`;
  });
  proposalPrice.addEventListener("input", () => {
    const priceValue = parsePrice(proposalPrice.value);
    updatePriceBreakdown(priceValue, proposalCommission, proposalPayout);
  });
  proposalForm.addEventListener("submit", handleProposalSubmit);
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
  const protectedItems = approvedProducts.filter((product) => product.isProtected);
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

    const desc = document.createElement("p");
    desc.className = "muted";
    desc.textContent = safeText(product.description);

    const priceBlock = isCourseItem(product) ? buildCoursePricing() : document.createElement("p");
    if (!isCourseItem(product)) {
      priceBlock.className = "price";
      priceBlock.textContent = formatPriceLabel(product.price);
    }

    const contactSection = buildContactSection(product);
    const commissionNote = buildCommissionNote();

    card.append(carousel, meta, title, details, desc, priceBlock, commissionNote, contactSection);
    protectedGrid.appendChild(card);
  });
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
  loadApproved();
  loadPending();
  loadRejected();
  loadMessages();
  loadNotifications();
  renderAbout();
  setupReveal();
  updateAdminList();
  updatePendingList();
  renderMessages();
  renderNotifications();
  setupCourseButtons();
  setupTabs();
  setupAdminTabs();
  setupNotification();
  setupAdminEvents();
  setupProposalEvents();
  setupProtectedAccess();
  setupAboutForm();
  initCoursesPage();
  initializeNotificationForm();
  setupPreviewReorder(productPreview);
  setupPreviewReorder(proposalPreview);
  renderCatalogMenu();
  setupCatalogMenu();
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
  setupCategoryChips();
  setupCategoryScroller();
  setupOperationChips();
  updateChipSelection(operationChips, "operation", operationSelect?.value || "all");
  renderProducts();
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
  if (proposalDescCount) {
    proposalDescCount.textContent = "220 caracteres restantes";
  }
  updatePriceBreakdown(parsePrice(proposalPrice.value), proposalCommission, proposalPayout);
  renderProtectedCatalog();

  if (hasAdminSession()) {
    if (adminLogin) adminLogin.hidden = true;
    if (adminPanel) adminPanel.hidden = false;
  }
  if (conditionSelect) {
    conditionSelect.disabled = !hasAdminSession();
  }

};

init();
