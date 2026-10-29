/**
 * ============================================================================
 * XX Concurso de Proyectos de Innovación - ISC TecMM Zapopan
 * Lógica de Dinamismo, Interactividad y Accesibilidad (ES6+)
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCountdown();
  initProjectsShowcase();
  initFormValidation();
  initNavbarScroll();
  initBackToTop();
});

/* ----------------------------------------------------------------------------
 * 1. Selector de Tema: Modo Claro / Modo Oscuro
 * ---------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleButtons = document.querySelectorAll('#theme-toggle-btn, #mobile-theme-toggle');
  if (toggleButtons.length === 0) return;

  const htmlElement = document.documentElement;

  // Recuperar preferencia previa guardada o detectar preferencia del sistema
  const savedTheme = localStorage.getItem('isc-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  // Escuchar cambios del sistema en tiempo real si el usuario no tiene preferencia fija
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('isc-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Manejador para cada botón toggle
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('isc-theme', newTheme);
    });
  });

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    toggleButtons.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (theme === 'dark') {
        if (icon) icon.className = 'fa-solid fa-sun';
        btn.setAttribute('aria-label', 'Cambiar a modo claro');
        btn.setAttribute('title', 'Cambiar a modo claro');
      } else {
        if (icon) icon.className = 'fa-solid fa-moon';
        btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
        btn.setAttribute('title', 'Cambiar a modo oscuro');
      }
    });
  }
}

/* ----------------------------------------------------------------------------
 * 2. Contador Regresivo Dinámico en Tiempo Real
 * ---------------------------------------------------------------------------- */
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  const titleEl = document.getElementById('countdown-title');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Fecha del evento: 25 de noviembre de 2026 a las 09:00:00 AM
  const targetDate = new Date('2026-11-25T09:00:00').getTime();

  function updateClock() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';

      if (titleEl) {
        titleEl.textContent = '¡El XX Concurso de Proyectos está en curso!';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const padZero = (n) => String(n).padStart(2, '0');

    daysEl.textContent = padZero(days);
    hoursEl.textContent = padZero(hours);
    minutesEl.textContent = padZero(minutes);
    secondsEl.textContent = padZero(seconds);
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ----------------------------------------------------------------------------
 * 3. Catálogo Interactivo: Filtros, Búsqueda y Modal de Proyectos
 * ---------------------------------------------------------------------------- */
const projectsData = [
  {
    id: 1,
    title: 'EduSmart AI: Tutor Personalizado con LLMs',
    category: 'ai',
    categoryLabel: 'Inteligencia Artificial',
    semester: '7° Semestre',
    team: 'Equipo NeuralTech (Ana Soto, Carlos Pérez, Sofía Luna)',
    mentor: 'Mtra. Nancy Ruiz Monroy',
    shortDesc: 'Plataforma educativa que adapta ejercicios y evaluaciones en tiempo real según el ritmo de aprendizaje del estudiante.',
    fullDesc: 'EduSmart AI integra modelos de lenguaje generativo afinados y técnicas de Retrieval-Augmented Generation (RAG) para ofrecer tutorías en ciencias básicas. Permite a los docentes supervisar el progreso de los alumnos y detectar rezagos curriculares tempranamente mediante analítica predictiva.',
    techs: ['Python', 'FastAPI', 'PyTorch', 'React', 'PostgreSQL'],
    demoUrl: '#',
    repoUrl: 'https://github.com/tecmm-isc'
  },
  {
    id: 2,
    title: 'AgroTrack IoT: Monitoreo de Cultivos Hidropónicos',
    category: 'iot',
    categoryLabel: 'IoT & Embebidos',
    semester: '5° Semestre',
    team: 'GreenSys (David Morales, Mariana Cruz)',
    mentor: 'Ing. Quinatzin Reyes Gómez',
    shortDesc: 'Red de sensores inalámbricos para optimizar el riego, pH y nutrientes en invernaderos automatizados.',
    fullDesc: 'Sistema distribuido con microcontroladores ESP32 y sensores de conductividad eléctrica, humedad de sustrato y temperatura ambiental. La información se transmite por MQTT hacia un broker central con dashboards en tiempo real y alertas automáticas en Telegram para el agricultor.',
    techs: ['ESP32', 'C++', 'MQTT', 'Node.js', 'Grafana', 'InfluxDB'],
    demoUrl: '#',
    repoUrl: 'https://github.com/tecmm-isc'
  },
  {
    id: 3,
    title: 'MedChain: Expediente Clínico Descentralizado',
    category: 'security',
    categoryLabel: 'Ciberseguridad & Redes',
    semester: '8° Semestre',
    team: 'CypherBlock (Alejandro Mendoza, Valeria Ríos)',
    mentor: 'Mtro. José Luis García Cerpas',
    shortDesc: 'Sistema seguro de gestión de historiales médicos con criptografía asimétrica y control de acceso granular.',
    fullDesc: 'Arquitectura diseñada para garantizar confidencialidad, integridad y disponibilidad de registros de salud de acuerdo a la NOM-024-SSA3-2012. Utiliza firmas digitales PKI, hashing criptográfico de registros y túneles VPN Zero-Trust para la interconexión con centros hospitalarios.',
    techs: ['Node.js', 'WebCrypto API', 'Docker', 'OpenSSL', 'MongoDB'],
    demoUrl: '#',
    repoUrl: 'https://github.com/tecmm-isc'
  },
  {
    id: 4,
    title: 'Portal de Vinculación y Residencias Profesionales',
    category: 'software',
    categoryLabel: 'Desarrollo Web & Móvil',
    semester: '6° Semestre',
    team: 'DevZapopan (Fernando Ortiz, Diana García)',
    mentor: 'Dr. León Miguel Ramos Corchado',
    shortDesc: 'PWA institucional para conectar estudiantes con vacantes de residencias en empresas tecnológicas del estado.',
    fullDesc: 'Solución web progresiva optimizada para móviles con notificaciones push, gestión de convenios, seguimiento de bitácoras de residencia y firma electrónica de cartas de aceptación, reduciendo en un 80% los tiempos administrativos.',
    techs: ['TypeScript', 'Vue.js', 'TailwindCSS', 'Firebase', 'PWA'],
    demoUrl: '#',
    repoUrl: 'https://github.com/tecmm-isc'
  },
  {
    id: 5,
    title: 'VisionTraffic: Detección de Infracciones y Aforos',
    category: 'ai',
    categoryLabel: 'Inteligencia Artificial',
    semester: '7° Semestre',
    team: 'Team DeepVision (Raúl Gómez, Laura Sánchez)',
    mentor: 'Mtro. Rigoberto Cárdenas Larios',
    shortDesc: 'Algoritmo de visión computacional para conteo vehicular y detección de cruces peatonales indebidos.',
    fullDesc: 'Procesamiento de video en el borde (Edge Computing) empleando modelos YOLOv8 optimizados para inferencia en tiempo real sobre hardware embebido NVIDIA Jetson Nano. Genera mapas de calor del tráfico y métricas para movilidad urbana inteligente.',
    techs: ['OpenCV', 'YOLOv8', 'Python', 'CUDA', 'Flask'],
    demoUrl: '#',
    repoUrl: 'https://github.com/tecmm-isc'
  },
  {
    id: 6,
    title: 'SafeLab: Control de Acceso Biométrico para Laboratorios',
    category: 'iot',
    categoryLabel: 'IoT & Embebidos',
    semester: '4° Semestre',
    team: 'LabSecurity (Gabriel Hernández, Patricia Torres)',
    mentor: 'Mtra. Irma Toscano Barajas',
    shortDesc: 'Cerradura inteligente con reconocimiento facial y tarjeta RFID para los laboratorios de cómputo del Edificio L.',
    fullDesc: 'Dispositivo IoT que registra ingresos y salidas de estudiantes autorizados, integrándose directamente con la base de datos de horarios del TecMM. Incluye modo de emergencia automático y respaldo en batería ante cortes eléctricos.',
    techs: ['Raspberry Pi', 'Python', 'RFID', 'SQLite', 'TailwindCSS'],
    demoUrl: '#',
    repoUrl: 'https://github.com/tecmm-isc'
  }
];

function initProjectsShowcase() {
  const container = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.btn-filter');
  const searchInput = document.getElementById('project-search');
  const emptyState = document.getElementById('projects-empty');

  if (!container) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderProjects() {
    container.innerHTML = '';

    const filtered = projectsData.filter((item) => {
      const matchCategory = currentCategory === 'all' || item.category === currentCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.team.toLowerCase().includes(q) ||
        item.techs.some(t => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });

    if (emptyState) {
      emptyState.style.display = filtered.length === 0 ? 'block' : 'none';
    }

    filtered.forEach((project) => {
      const col = document.createElement('article');
      col.className = 'col-md-6 col-lg-4 project-card';
      col.setAttribute('data-category', project.category);

      const techBadges = project.techs
        .slice(0, 3)
        .map(t => `<span class="badge bg-secondary-subtle text-body border me-1">${escapeHtml(t)}</span>`)
        .join('');

      col.innerHTML = `
        <div class="card-custom p-4 d-flex flex-column h-100">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="badge-category">${escapeHtml(project.categoryLabel)}</span>
            <small class="text-muted fw-bold">${escapeHtml(project.semester)}</small>
          </div>
          <h3 class="h5 fw-bold mb-2">${escapeHtml(project.title)}</h3>
          <p class="text-muted small flex-grow-1 mb-3">${escapeHtml(project.shortDesc)}</p>
          <div class="mb-3">
            ${techBadges}
          </div>
          <div class="pt-2 border-top d-flex justify-content-between align-items-center">
            <span class="small text-muted"><i class="fa-solid fa-users me-1" aria-hidden="true"></i> ${escapeHtml(project.team.split('(')[0].trim())}</span>
            <button class="btn btn-sm btn-outline-primary rounded-pill px-3 btn-details" data-id="${project.id}">
              Detalles <i class="fa-solid fa-arrow-right ms-1" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      `;

      container.appendChild(col);
    });

    // Asignar listeners a los botones de detalles
    container.querySelectorAll('.btn-details').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        openProjectModal(id);
      });
    });
  }

  // Filtrado por categoría
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      renderProjects();
    });
  });

  // Búsqueda en tiempo real
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProjects();
    });
  }

  renderProjects();
}

/* Abrir modal dinámico de proyecto */
function openProjectModal(id) {
  const project = projectsData.find((p) => p.id === id);
  if (!project) return;

  const modalTitle = document.getElementById('projectModalTitle');
  const modalCategory = document.getElementById('projectModalCategory');
  const modalSemester = document.getElementById('projectModalSemester');
  const modalTeam = document.getElementById('projectModalTeam');
  const modalMentor = document.getElementById('projectModalMentor');
  const modalDesc = document.getElementById('projectModalDesc');
  const modalTechs = document.getElementById('projectModalTechs');

  if (modalTitle) modalTitle.textContent = project.title;
  if (modalCategory) modalCategory.textContent = project.categoryLabel;
  if (modalSemester) modalSemester.textContent = project.semester;
  if (modalTeam) modalTeam.textContent = project.team;
  if (modalMentor) modalMentor.textContent = project.mentor;
  if (modalDesc) modalDesc.textContent = project.fullDesc;

  if (modalTechs) {
    modalTechs.innerHTML = project.techs
      .map(t => `<span class="badge bg-primary text-white me-1 mb-1 px-2 py-1">${escapeHtml(t)}</span>`)
      .join('');
  }

  const modalEl = document.getElementById('projectDetailModal');
  if (modalEl && window.bootstrap) {
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.show();
  }
}

/* ----------------------------------------------------------------------------
 * 4. Validación de Formulario de Registro / Contacto en Tiempo Real
 * ---------------------------------------------------------------------------- */
function initFormValidation() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  const fields = {
    projectName: {
      el: document.getElementById('reg-project-name'),
      validate: (val) => val.trim().length >= 4,
      errorMsg: 'El nombre del proyecto debe tener al menos 4 caracteres.'
    },
    leaderName: {
      el: document.getElementById('reg-leader-name'),
      validate: (val) => val.trim().length >= 3 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val),
      errorMsg: 'Ingresa un nombre válido (mínimo 3 letras, sin números).'
    },
    email: {
      el: document.getElementById('reg-email'),
      validate: (val) => {
        const regex = /^[a-zA-Z0-9._%+-]+@(zapopan\.tecmm\.edu\.mx|tecmm\.edu\.mx)$/i;
        return regex.test(val.trim());
      },
      errorMsg: 'Ingresa un correo institucional válido (@zapopan.tecmm.edu.mx o @tecmm.edu.mx).'
    },
    category: {
      el: document.getElementById('reg-category'),
      validate: (val) => Boolean(val && val !== ''),
      errorMsg: 'Por favor selecciona una categoría de proyecto.'
    },
    semester: {
      el: document.getElementById('reg-semester'),
      validate: (val) => Boolean(val && val !== ''),
      errorMsg: 'Por favor selecciona el semestre actual.'
    },
    summary: {
      el: document.getElementById('reg-summary'),
      validate: (val) => val.trim().length >= 20,
      errorMsg: 'La descripción debe tener al menos 20 caracteres.'
    }
  };

  // Validar campos en blur y al escribir
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (!field.el) return;

    field.el.addEventListener('blur', () => validateField(key));
    field.el.addEventListener('input', () => {
      if (field.el.classList.contains('is-invalid')) {
        validateField(key);
      }
    });
  });

  function validateField(key) {
    const field = fields[key];
    if (!field || !field.el) return true;

    const isValid = field.validate(field.el.value);
    const feedbackEl = field.el.parentElement.querySelector('.invalid-feedback');

    if (isValid) {
      field.el.classList.remove('is-invalid');
      field.el.classList.add('is-valid');
      field.el.setAttribute('aria-invalid', 'false');
    } else {
      field.el.classList.remove('is-valid');
      field.el.classList.add('is-invalid');
      field.el.setAttribute('aria-invalid', 'true');
      if (feedbackEl) {
        feedbackEl.textContent = field.errorMsg;
      }
    }
    return isValid;
  }

  // Manejo de envío
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    Object.keys(fields).forEach((key) => {
      const valid = validateField(key);
      if (!valid) allValid = false;
    });

    if (!allValid) {
      // Poner foco en el primer campo inválido
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // Simular envío asíncrono seguro
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Registrando proyecto...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Código de registro simulado
      const regCode = 'ISC-' + Math.floor(1000 + Math.random() * 9000);
      const alertContainer = document.getElementById('form-alert-container');

      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
            <h5 class="alert-heading fw-bold mb-1"><i class="fa-solid fa-circle-check me-2"></i>¡Proyecto Registrado con Éxito!</h5>
            <p class="mb-1">Tu solicitud ha sido recibida correctamente con el folio de seguimiento <strong>${regCode}</strong>.</p>
            <p class="small mb-0 text-muted">Hemos enviado las instrucciones y el formato de rúbrica a <strong>${escapeHtml(fields.email.el.value)}</strong>.</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
          </div>
        `;
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Limpiar formulario
      form.reset();
      Object.keys(fields).forEach((key) => {
        fields[key].el.classList.remove('is-valid');
      });
    }, 1200);
  });
}

/* ----------------------------------------------------------------------------
 * 5. Barra de Navegación: Efecto Scroll y Enlace Activo
 * ---------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Cerrar menú móvil al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show') && window.bootstrap) {
        const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
        if (collapseInstance) {
          collapseInstance.hide();
        }
      }
    });
  });

  // IntersectionObserver para marcar enlaces activos
  const sections = document.querySelectorAll('section[id], header[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach((sec) => observer.observe(sec));
  }
}

/* ----------------------------------------------------------------------------
 * 6. Botón Volver Arriba
 * ---------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  const handleScroll = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ----------------------------------------------------------------------------
 * Helper: Escapar caracteres HTML para prevención XSS
 * ---------------------------------------------------------------------------- */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
