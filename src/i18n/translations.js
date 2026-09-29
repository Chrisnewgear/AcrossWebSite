// Central translation dictionaries for the whole site.
// Structure: translations[lang].<namespace>.<key>
// Icons, routes and numeric/proper-noun data stay in the components; only
// human-readable copy lives here. Arrays are index-aligned with the component.

export const translations = {
  es: {
    common: {
      home: "Inicio",
      language: "Idioma",
      navMain: "Navegación principal",
      menuMobile: "Menú móvil",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      themeToLight: "Cambiar al tema claro",
      themeToDark: "Cambiar al tema oscuro",
    },

    nav: {
      inicio: "Inicio",
      servicios: "Servicios",
      rastreo: "Rastreo",
      cotizacion: "Cotización",
      contacto: "Contacto",
    },

    hero: {
      eyebrow: "Tu socio en comercio internacional",
      line1: "Conectamos",
      line2: "Mercados",
      tagline: "Garantizamos el Éxito de tus Importaciones",
      sub: "Simplificamos tus operaciones de comercio internacional desde el sourcing hasta la carga, con presencia global.",
      ctaQuote: "Solicitar Cotización",
      ctaServices: "Nuestros Servicios",
      badges: [
        "500+ Clientes Activos",
        "Presencia en 4 Países",
        "Carga Asegurada",
      ],
    },

    stats: {
      labels: [
        "Clientes Activos",
        "Países con Oficinas",
        "Envíos Completados",
        "Años de Experiencia",
      ],
    },

    misionVision: {
      banner: "Lo que nos define",
      mision: {
        title: "Nuestra Misión",
        // text: "Transformamos la distancia en oportunidades globales. Simplificamos tus operaciones internacionales conectándote con soluciones eficientes en cualquier parte del mundo.",
        text: "Impulsar y proteger el comercio internacional de nuestros clientes, transformando sus operaciones de importación y exportación en procesos seguros, rentables y eficientes, respaldados por un estricto control de calidad e intermediación transparente en origen.",
      },
      vision: {
        title: "Nuestra Visión",
        // text: "Ser el puente global que transforma fronteras en oportunidades, consolidándonos como el aliado estratégico más confiable, transparente y seguro para conectar mercados.",
        text: "Posicionarnos como la firma de trading e intermediación de referencia en la región, reconocida por construir alianzas sólidas y sostenibles entre proveedores globales y empresas",
      },
    },

    valores: {
      banner: "Nuestros Valores",
      items: [
        {
          name: "Experiencia y Rigor",
          desc: "Dominio profundo de cada etapa del proceso de importación y exportación, respaldado por rigurosos controles de calidad en origen (AQL).",
        },
        {
          name: "Lealtad y Confidencialidad",
          desc: "Compromiso absoluto con nuestros clientes y proveedores. Protegemos la identidad de tus fabricantes y la seguridad de tu inversión.",
        },
        {
          name: "Mejora Continua y Eficiencia",
          desc: "Optimización constante de la cadena de suministro, ofreciendo soluciones financieras flexibles y respuestas oportunas en el comercio global.",
        },
      ],
    },

    ventajas: {
      title: "¿Por qué elegirnos?",
      intro:
        "Transformamos la incertidumbre de las compras internacionales en una operación estructurada, transparente y rentable. Como firma de intermediación comercial, conectamos a tu empresa de forma directa con los mercados globales gracias a nuestra presencia con oficinas estratégicas en China, EE. UU., India y Perú.",
      advantages: [
        {
          title: "Verificación Directa en Mercados Clave",
          desc: "Visitamos y evaluamos a los fabricantes en sus propias instalaciones dentro de nuestros destinos de operación. Revisamos la legalidad de la empresa, sus equipos y su capacidad real de producción antes de que realices cualquier pago.",
        },
        {
          title: "Negociación Estratégica y Optimización de Costos",
          desc: "Contamos con la experiencia y la capacidad técnica para negociar directo con los fabricantes. Dominamos las dinámicas del comercio local en cada origen para eliminar sobrecostos comerciales, ajustar mínimos de producción (MOQ) y asegurar términos contractuales firmes que protegen el margen de tu operación.",
        },
        {
          title: "Inspección Técnica de Calidad",
          desc: "Auditamos la producción mediante estándares AQL (DUPRO y PSI). Verificamos especificaciones, empaque y etiquetado normativo antes de autorizar el pago final y la salida del contenedor.",
        },
        {
          title: "Control Logístico y Aduanero",
          desc: "Supervisamos la carga de contenedores (CLS), gestionamos el transporte internacional y validamos la documentación de importación para asegurar un despacho sin multas ni retrasos.",
        },
      ],
      commissions: [
        {
          rate: "5%",
          type: "Comisión Estándar",
          label: "Pedidos entre $20K y $50K FOB",
        },
        {
          rate: "3.5%",
          type: "Comisión Premium",
          label: "Pedidos superiores a $50K FOB",
        },
        {
          rate: "$150",
          type: "Verificación",
          label: "Auditoría de proveedor + IVA",
        },
      ],
    },

    presenciaGlobal: {
      badge: "Presencia Internacional",
      title: "Conectados con el Mundo",
      subtitle1: "Oficinas estratégicas en los principales centros",
      subtitle2: "de manufactura y comercio global.",
      dotsLabel: "Seleccionar oficina",
      offices: [
        { city: "Shanghai", country: "China" },
        { city: "Plantation", country: "Florida, USA" },
        { city: "Guayaquil", country: "Ecuador" },
        { city: "Mumbai", country: "India" },
        { city: "Lima", country: "Perú" },
        { city: "Atenas", country: "Grecia" },
        { city: "Roma", country: "Italia" },
        { city: "Jerusalén", country: "Israel" },
        { city: "Santiago", country: "Chile" },
        { city: "Brasilia", country: "Brasil" },
      ],
    },

    footer: {
      brandDesc:
        "Tu socio estratégico en trading e intermediación internacional. Conectamos tu empresa con centros industriales y proveedores calificados a nivel global, sin fronteras para tu cadena de suministro.",
      servicesTitle: "Servicios",
      companyTitle: "La Empresa",
      contactTitle: "Contacto",
      // Ordered as the process runs — source, negotiate, inspect, ship, clear
      // customs, advise — not as the Servicios page grid is laid out.
      services: [
        "Sourcing de Proveedores",
        "Negociación y Compras",
        "Inspección y Control de Calidad",
        "Logística Internacional",
        "Gestión Aduanera",
        "Consultoría en Comercio Exterior",
      ],
      company: ["Nosotros", "Misión y Visión", "Contacto"],
      phone: "043900680",
      address:
        "Av. del Bombero, La Vista de San Eduardo, Edificio 100A Of. 502, Guayaquil, Ecuador",
      copyright:
        "© 2026 Across Continents Trading. Todos los derechos reservados.",
    },

    servicios: {
      breadcrumb: "Servicios",
      heroLabel: "Servicios y Soluciones Globales",
      heroTitle: "Soluciones Integrales en Comercio Exterior",
      heroSub:
        "Desde la localización de proveedores en origen hasta la entrega final: conectamos tu empresa con los centros de producción más competitivos del mundo mediante un control riguroso de calidad, seguridad comercial y gestión logística eficientes.",
      ctaQuote: "Solicitar Cotización",
      ctaExpert: "Contactar a un Asesor",
      complementaryRibbon: "Nuestros Servicios",
      complementary: [
        {
          title: "Sourcing y Representación en Origen",
          desc: "Actuamos como tu oficina de compras en el extranjero. Localizamos fabricantes directos, realizamos auditorías físicas e inspección de instalaciones en planta, y gestionamos el contacto inicial.",
        },
        {
          title: "Revisión Documental y Gestión Aduanera",
          desc: "Revisamos y validamos toda la documentación de importación (facturas comerciales, listas de empaque, certificados de origen y permisos) antes de que la carga navegue. Garantizamos el cumplimiento estricto de las normativas locales para asegurar un despacho aduanero fluido.",
        },
        {
          title: "Negociación Comercial y Gestión de Compras",
          desc: "Representamos los intereses económicos de tu empresa frente a las fábricas. Negociamos precios, plazos de pago y términos contractuales para obtener las condiciones más favorables.",
        },
        {
          title: "Coordinación Logística y Embarque Internacional",
          desc: "Gestionamos la cadena de transporte internacional (vía marítima, aérea o terrestre). Negociamos fletes, coordinamos reservas de espacio, optimizamos tiempos de tránsito y supervisamos el consolidado y llenado de contenedores en puerto de origen.",
        },
        {
          title: "Asesoría en Comercio Exterior",
          desc: "Acompañamiento especializado en la estructuración de compras internacionales, evaluación de requisitos aduaneros y cumplimiento normativo para escalar tu cadena de suministro con total certeza.",
        },
        {
          title: "Control de Calidad e Inspección en Planta (AQL)",
          desc: "Supervisamos el proceso de producción directamente en la fábrica. Realizamos auditorías de materia prima, inspecciones en línea y revisiones pre-embarque bajo estándares AQL, verificando empaque, etiquetado y especificaciones técnicas.",
        },
      ],
      inspectionRibbon: "Inspección de Calidad",
      inspHeading: "Control de Calidad AQL en Fábrica",
      inspPill: "Protección de capital y control técnico previo al embarque",
      inspIntro:
        "Realizamos inspecciones de calidad bajo estándares internacionales AQL (Acceptable Quality Limit) en los principales hubs de manufactura internacional, verificando que los productos cumplan con las especificaciones acordadas antes del embarque.",
      tabsLabel: "Fases de inspección",
      prevPhase: "Fase anterior",
      nextPhase: "Fase siguiente",
      includesTag: "Incluye",
      benefitTag: "Beneficio para el cliente",
      phases: [
        {
          tab: "Durante Producción",
          subtitle: "Inspección en Planta (DUPRO)",
          desc: "Supervisamos el proceso de fabricación mientras tu pedido se encuentra en producción, permitiendo detectar desviaciones, defectos o incumplimientos antes de que afecten la totalidad del lote.",
          includes: [
            "Verificación del avance de producción.",
            "Revisión de materias primas y componentes.",
            "Evaluación de procesos de fabricación.",
            "Detección temprana de defectos.",
            "Informe detallado con evidencia fotográfica.",
          ],
          benefit:
            "Reduce riesgos, evita retrasos y permite aplicar acciones correctivas antes de finalizar la producción.",
        },
        {
          tab: "Post Producción",
          subtitle: "Inspección Final Pre-Embarque",
          desc: "Realizamos una evaluación completa del lote terminado antes de su despacho, utilizando criterios de muestreo AQL para verificar que los productos cumplan con los estándares de calidad establecidos.",
          includes: [
            "Control de calidad visual y funcional.",
            "Verificación de cantidades y referencias.",
            "Revisión de etiquetado, marcados y códigos.",
            "Inspección de empaque y embalaje.",
            "Informe técnico con fotografías y resultados de inspección.",
          ],
          benefit:
            "Garantiza que la mercancía enviada corresponde a lo solicitado y minimiza reclamaciones, devoluciones y pérdidas económicas.",
        },
        {
          tab: "Carga de Contenedor",
          subtitle: "Supervisión de Estiba y Carga",
          desc: "Verificamos que la mercancía sea cargada correctamente en el contenedor, asegurando la integridad de los productos durante el transporte internacional.",
          includes: [
            "Verificación del estado del contenedor.",
            "Confirmación de cantidades cargadas.",
            "Supervisión de manipulación y estiba.",
            "Control de distribución y aseguramiento de la carga.",
            "Registro fotográfico completo del proceso.",
          ],
          benefit:
            "Evita daños durante el transporte, reduce riesgos logísticos y proporciona evidencia documental del estado de la mercancía al momento del embarque.",
        },
      ],
    },

    rastreo: {
      breadcrumb: "Rastreo",
      heroLabel: "Seguimiento en tiempo real",
      heroTitle: "Rastrea tu Envío",
      heroSub:
        "Ingresa tu número de guía, contenedor o AWB para ver el estado en tiempo real de tu carga.",
      searchLabel: "Búsqueda de Envío",
      searchTitle: "¿Dónde está tu carga?",
      searchSubPre: "Prueba con: ",
      searchSubPost: " para ver un ejemplo de seguimiento en vivo.",
      placeholder: "Ej: MSKU7845213 / AWB-987654 / BL-2026-GYE",
      searchBtn: "Rastrear",
      examplesLabel: "Ejemplos:",
      resultLabels: {
        origen: "Origen",
        destino: "Destino",
        tipo: "Tipo",
        eta: "ETA",
      },
      notFound:
        "No encontramos un envío con ese número. Verifica e intenta de nuevo, o contáctanos directamente.",
      notFoundCta: "Contactar a Operaciones",
      infoLabel: "Información de Rastreo",
      infoTitle: "Todo lo que necesitas saber",
      info: [
        {
          title: "¿Qué puedo rastrear?",
          text: "Números de contenedor (BIC/ISO), AWB aéreos, Bill of Lading (BL) y números de guía interna Acrosscon.",
        },
        {
          title: "Notificaciones Automáticas",
          text: "Recibe actualizaciones por WhatsApp o correo en cada evento de tu envío: zarpe, tránsito, llegada y entrega.",
        },
        {
          title: "¿No encuentras tu envío?",
          text: "Contáctanos directamente. Nuestro equipo de operaciones tiene acceso a información en tiempo real de todos tus embarques.",
        },
      ],
      contactTitle: "¿Necesitas ayuda con tu envío?",
      contactText:
        "Nuestro equipo de operaciones está disponible de lunes a sábado, 8am – 6pm (GMT-5)",
      contactCta: "Formulario de Contacto",
      demo: {
        id: "MSKU7845213",
        origin: "Shanghai, China",
        destination: "Guayaquil, Ecuador",
        type: "Marítimo — FCL 20'",
        eta: "15 Jun 2026",
        statusLabel: "En Tránsito",
        events: [
          {
            state: "done",
            date: "01 May 2026 — 09:00",
            event: "Orden de compra confirmada",
            location: "Shanghai, China",
          },
          {
            state: "done",
            date: "08 May 2026 — 14:30",
            event: "Inspección de calidad completada",
            location: "Guangzhou, China",
          },
          {
            state: "done",
            date: "12 May 2026 — 08:00",
            event: "Cargado en contenedor MSKU7845213",
            location: "Puerto de Shanghai",
          },
          {
            state: "done",
            date: "14 May 2026 — 22:15",
            event: "Zarpe desde Shanghai",
            location: "Terminal SIPG, Shanghai",
          },
          {
            state: "active",
            date: "24 May 2026 — 11:00",
            event: "En tránsito — Océano Pacífico",
            location: "Lat: -3.2, Lon: -140.8",
          },
          {
            state: "pending",
            date: "Aprox. 10 Jun 2026",
            event: "Arribo al Canal de Panamá",
            location: "Miraflores, Panamá",
          },
          {
            state: "pending",
            date: "Aprox. 13 Jun 2026",
            event: "Llegada a Puerto Bolívar",
            location: "Puerto Bolívar, Ecuador",
          },
          {
            state: "pending",
            date: "Aprox. 15 Jun 2026",
            event: "Entrega en bodega cliente",
            location: "Guayaquil, Ecuador",
          },
        ],
      },
    },

    cotizacion: {
      breadcrumb: "Cotización",
      headerBar: "Cotización",
      heroLabel: "Solicitud de cotización",
      heroTitle: "Cotiza tu Operación Internacional",
      heroSub:
        "Propuestas de pago personalizadas adaptadas a tu situación financiera y volumen de operación.",
      howTitle: "¿Cómo funciona?",
      howSub:
        "Recibe una cotización detallada en menos de 24 horas hábiles con el mejor precio del mercado.",
      steps: [
        {
          title: "Completa el formulario",
          desc: "Indica tipo de servicio, origen, destino y datos de contacto.",
        },
        {
          title: "Análisis en 24h",
          desc: "Nuestro equipo revisa tu solicitud y prepara una propuesta.",
        },
        {
          title: "Propuesta personalizada",
          desc: "Recibe cotización con opciones de pago adaptadas a tu operación.",
        },
        {
          title: "Inicio de operación",
          desc: "Aprueba y comenzamos a trabajar en tu importación o exportación.",
        },
      ],
      services: ["Inspección", "Sourcing", "Trading"],
      formTitle: "Solicitar Cotización",
      stepLabel: "Paso {n} de {total}",
      labels: {
        servicio: "Tipo de Servicio *",
        origen: "Ciudad / Puerto de Origen *",
        destino: "País de Destino *",
        incoterm: "Incoterm",
        peso: "Peso estimado (kg)",
        descripcion: "Descripción del Producto *",
        nombre: "Nombres y Apellidos *",
        empresa: "Empresa",
        email: "Correo Electrónico *",
        telefono: "Teléfono / WhatsApp",
        comentarios: "Comentarios adicionales",
        documento: "Documento adjunto",
      },
      placeholders: {
        servicio: "Seleccionar...",
        origen: "Ej: Shanghai, China",
        destino: "Ej: Ecuador",
        incoterm: "Seleccionar...",
        peso: "Ej: 5000",
        descripcion:
          "Describe brevemente la mercancía, HS code si lo conoces, y cualquier consideración especial (peligrosa, refrigerada, frágil, etc.)",
        nombre: "Juan García",
        empresa: "Mi Empresa S.A.",
        email: "su@empresa.com",
        telefono: "+593 99 000 0000",
        comentarios:
          "¿Tiene alguna fecha límite, consideración especial o pregunta?",
      },
      sectionDatos: "Datos de Contacto",
      sectionConfirmar: "Confirmar Solicitud",
      buttons: {
        continuar: "Continuar",
        revisar: "Revisar",
        atras: "Atrás",
        enviar: "Enviar Cotización",
        enviando: "Enviando...",
      },
      review: {
        servicio: "Servicio",
        ruta: "Ruta",
        incoterm: "Incoterm",
        peso: "Peso estimado",
        contacto: "Contacto",
        empresa: "Empresa",
        dash: "—",
        kg: "kg",
      },
      success: {
        title: "¡Cotización Enviada!",
        sub: "Hemos recibido tu solicitud. Nuestro equipo la revisará y te enviará una propuesta personalizada en menos de 24 horas hábiles.",
        backHome: "Volver al Inicio",
      },
      fileHint: "Opcional · PDF, DOCX, XLSX, JPG, PNG · máx 10 MB",
      fileErrors: {
        type: "Formato no permitido. Use PDF, DOCX, XLSX, JPG o PNG.",
        size: "El archivo supera los 10 MB.",
      },
      error:
        "No se pudo enviar la solicitud. Intente nuevamente o escríbanos a info@acrosscon.com.",
      errorRate:
        "Ha enviado demasiadas solicitudes. Espere unos minutos o escríbanos a info@acrosscon.com.",
    },

    contacto: {
      breadcrumb: "Contacto",
      headerBar: "Contacto",
      heroLabel: "Atención y consultas B2B",
      heroTitle: "Conecta con Nuestro Equipo",
      heroSub:
        "Evaluamos las necesidades de tu empresa para ofrecerte soluciones de intermediación, calidad y logística a medida.",
      formTitle: "Envíanos un mensaje",
      formSub: "Te respondemos en menos de 24 horas hábiles.",
      labels: {
        nombre: "Nombres y Apellidos *",
        empresa: "Empresa",
        email: "Correo Electrónico *",
        telefono: "Teléfono / WhatsApp",
        asunto: "Asunto *",
        mensaje: "Mensaje *",
      },
      placeholders: {
        nombre: "Ej: Juan García",
        empresa: "Empresa S.A.",
        email: "su@empresa.com",
        telefono: "0987654321",
        mensaje:
          "Cuéntanos sobre tu operación: producto, origen, destino, volumen y cualquier consulta específica...",
      },
      asuntoPlaceholder: "Seleccionar motivo...",
      // `id` is the stable form value — never translate it, or switching
      // language mid-form would clear the user's selection.
      subjects: [
        { id: "sourcing", label: "Sourcing y Desarrollo de Proveedores" },
        { id: "inspeccion", label: "Control de Calidad (AQL / Inspección)" },
        { id: "logistica", label: "Coordinación Logística / Embarque" },
        { id: "consultoria", label: "Consultoría / Asesoría Integral" },
        { id: "otro", label: "Otro" },
      ],
      otroPlaceholder: "Especifique el motivo de tu consulta",
      submit: "Enviar Mensaje",
      submitting: "Enviando...",
      success: {
        title: "¡Mensaje Enviado!",
        sub: "Hemos recibido tu mensaje. Un especialista se pondrá en contacto contigo en menos de 24 horas hábiles.",
      },
      error:
        "No se pudo enviar el mensaje. Intente nuevamente o escríbanos a info@acrosscon.com.",
      errorRate:
        "Ha enviado demasiados mensajes. Espere unos minutos o escríbanos a info@acrosscon.com.",
      channelsTitle: "Canales de Atención",
      phoneLabel: "Teléfono",
      phoneAction: "Llamar",
      channels: [
        {
          icon: "mail",
          label: "Información General",
          value: "info@acrosscon.com",
          action: "Enviar email",
          href: "mailto:info@acrosscon.com",
        },
        {
          icon: "mail",
          label: "Documentación",
          value: "documentacion@acrosscon.com",
          action: "Enviar email",
          href: "mailto:documentacion@acrosscon.com",
        },
        {
          icon: "mail",
          label: "Comercio Exterior",
          value: "comex@acrosscon.com",
          action: "Enviar email",
          href: "mailto:comex@acrosscon.com",
        },
      ],
      // The address itself lives in `footer.address` — the Contacto page reads
      // it from there so both places always show the same one.
      officeTitle: "Ubicación de Oficina",
      officeLabel: "Oficina Principal",
      officeAction: "Ver en mapa",
      hoursTitle: "Horario de Atención",
      hours: [
        { day: "Lunes – Viernes", time: "08:00 – 18:00" },
        { day: "Sábado", time: "08:00 – 13:00" },
        { day: "Domingo", time: "Cerrado" },
      ],
      hoursNote:
        "Zona horaria GMT-5 (Ecuador). Operaciones Asia disponibles por WhatsApp fuera de horario.",
    },
  },

  en: {
    common: {
      home: "Home",
      language: "Language",
      navMain: "Main navigation",
      menuMobile: "Mobile menu",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      themeToLight: "Switch to light theme",
      themeToDark: "Switch to dark theme",
    },

    nav: {
      inicio: "Home",
      servicios: "Services",
      rastreo: "Tracking",
      cotizacion: "Quote",
      contacto: "Contact",
    },

    hero: {
      eyebrow: "Your partner in international trade",
      line1: "Connecting",
      line2: "Markets",
      tagline: "We Guarantee Your Import Success",
      sub: "We simplify your international trade operations, from sourcing to cargo loading, with a global presence.",
      ctaQuote: "Request a Quote",
      ctaServices: "Our Services",
      badges: [
        "500+ Active Clients",
        "Presence in 4 Countries",
        "Insured Cargo",
      ],
    },

    stats: {
      labels: [
        "Active Clients",
        "Countries with Offices",
        "Completed Shipments",
        "Years of Experience",
      ],
    },

    misionVision: {
      banner: "What Defines Us",
      mision: {
        title: "Our Mission",
        text: "To drive and protect our clients' international trade, turning their import and export operations into secure, profitable and efficient processes, backed by strict quality control and transparent intermediation at origin.",
      },
      vision: {
        title: "Our Vision",
        text: "To position ourselves as the leading trading and intermediation firm in the region, recognized for building solid, sustainable partnerships between global suppliers and companies",
      },
    },

    valores: {
      banner: "Our Values",
      items: [
        {
          name: "Expertise and Rigor",
          desc: "Deep command of every stage of the import and export process, backed by rigorous quality controls at origin (AQL).",
        },
        {
          name: "Loyalty and Confidentiality",
          desc: "Absolute commitment to our clients and suppliers. We protect the identity of your manufacturers and the security of your investment.",
        },
        {
          name: "Continuous Improvement and Efficiency",
          desc: "Constant optimization of the supply chain, offering flexible financing solutions and timely responses in global trade.",
        },
      ],
    },

    ventajas: {
      title: "Why Choose Us",
      intro:
        "We turn the uncertainty of international purchasing into a structured, transparent and profitable operation. As a commercial intermediation firm, we connect your company directly with global markets through our strategic offices in China, the USA, India and Peru.",
      advantages: [
        {
          title: "Direct Verification in Key Markets",
          desc: "We visit and assess manufacturers at their own facilities across our operating destinations. We review the company's legal standing, its equipment and its real production capacity before you make any payment.",
        },
        {
          title: "Strategic Negotiation and Cost Optimization",
          desc: "We have the experience and technical capacity to negotiate directly with manufacturers. We master the dynamics of local trade at each origin to eliminate commercial overcharges, adjust minimum order quantities (MOQ) and secure firm contractual terms that protect your operation's margin.",
        },
        {
          title: "Technical Quality Inspection",
          desc: "We audit production under AQL standards (DUPRO and PSI). We verify specifications, packaging and regulatory labeling before authorizing final payment and the container's departure.",
        },
        {
          title: "Logistics and Customs Control",
          desc: "We supervise container loading (CLS), manage international transport and validate import documentation to ensure clearance with no fines or delays.",
        },
      ],
      commissions: [
        {
          rate: "5%",
          type: "Standard Commission",
          label: "Orders between $20K and $50K FOB",
        },
        {
          rate: "3.5%",
          type: "Premium Commission",
          label: "Orders above $50K FOB",
        },
        { rate: "$150", type: "Verification", label: "Supplier audit + VAT" },
      ],
    },

    presenciaGlobal: {
      badge: "International Presence",
      title: "Connected to the World",
      subtitle1: "Strategic offices in the world's leading centers",
      subtitle2: "of manufacturing and global trade.",
      dotsLabel: "Select office",
      offices: [
        { city: "Shanghai", country: "China" },
        { city: "Plantation", country: "Florida, USA" },
        { city: "Guayaquil", country: "Ecuador" },
        { city: "Mumbai", country: "India" },
        { city: "Lima", country: "Peru" },
        { city: "Athens", country: "Greece" },
        { city: "Rome", country: "Italy" },
        { city: "Jerusalem", country: "Israel" },
        { city: "Santiago", country: "Chile" },
        { city: "Brasilia", country: "Brazil" },
      ],
    },

    footer: {
      brandDesc:
        "Your strategic partner in international trading and intermediation. We connect your company with industrial centers and qualified suppliers worldwide, with no borders for your supply chain.",
      servicesTitle: "Services",
      companyTitle: "Company",
      contactTitle: "Contact",
      // Ordered as the process runs — source, negotiate, inspect, ship, clear
      // customs, advise — not as the Servicios page grid is laid out.
      services: [
        "Supplier Sourcing",
        "Negotiation & Procurement",
        "Quality Inspection & Control",
        "International Logistics",
        "Customs Management",
        "Foreign Trade Consulting",
      ],
      company: ["About Us", "Mission & Vision", "Contact"],
      phone: "043900680",
      address:
        "Av. del Bombero, La Vista de San Eduardo, Edificio 100A Of. 502, Guayaquil, Ecuador",
      copyright: "© 2026 Across Continents Trading. All rights reserved.",
    },

    servicios: {
      breadcrumb: "Services",
      heroLabel: "Global Services and Solutions",
      heroTitle: "Comprehensive Foreign Trade Solutions",
      heroSub:
        "From sourcing suppliers at origin to final delivery: we connect your company with the world's most competitive production centers through rigorous quality control, commercial security and efficient logistics management.",
      ctaQuote: "Request a Quote",
      ctaExpert: "Contact an Advisor",
      complementaryRibbon: "Our Services",
      complementary: [
        {
          title: "Sourcing & Representation at Origin",
          desc: "We act as your purchasing office abroad. We locate direct manufacturers, carry out physical audits and on-site facility inspections, and handle the initial contact.",
        },
        {
          title: "Document Review & Customs Management",
          desc: "We review and validate all import documentation (commercial invoices, packing lists, certificates of origin and permits) before the cargo sails. We ensure strict compliance with local regulations for smooth customs clearance.",
        },
        {
          title: "Commercial Negotiation & Procurement Management",
          desc: "We represent your company's economic interests before the factories. We negotiate prices, payment terms and contractual conditions to secure the most favorable terms.",
        },
        {
          title: "Logistics Coordination & International Shipping",
          desc: "We manage the international transport chain (ocean, air or ground). We negotiate freight rates, coordinate space bookings, optimize transit times and supervise consolidation and container loading at the port of origin.",
        },
        {
          title: "Foreign Trade Advisory",
          desc: "Specialized support in structuring international purchases, assessing customs requirements and regulatory compliance so you can scale your supply chain with complete certainty.",
        },
        {
          title: "Quality Control & In-Plant Inspection (AQL)",
          desc: "We supervise the production process directly at the factory. We perform raw material audits, in-line inspections and pre-shipment reviews under AQL standards, verifying packaging, labeling and technical specifications.",
        },
      ],
      inspectionRibbon: "Quality Inspection",
      inspHeading: "AQL Quality Control at the Factory",
      inspPill: "Capital protection and technical control prior to shipment",
      inspIntro:
        "We perform quality inspections under international AQL (Acceptable Quality Limit) standards in the leading international manufacturing hubs, verifying that products meet the agreed specifications before shipment.",
      tabsLabel: "Inspection phases",
      prevPhase: "Previous phase",
      nextPhase: "Next phase",
      includesTag: "Includes",
      benefitTag: "Client benefit",
      phases: [
        {
          tab: "During Production",
          subtitle: "In-Plant Inspection (DUPRO)",
          desc: "We supervise the manufacturing process while your order is in production, allowing deviations, defects or non-compliance to be detected before they affect the entire batch.",
          includes: [
            "Verification of production progress.",
            "Review of raw materials and components.",
            "Evaluation of manufacturing processes.",
            "Early detection of defects.",
            "Detailed report with photographic evidence.",
          ],
          benefit:
            "Reduces risks, avoids delays and allows corrective actions to be applied before finishing production.",
        },
        {
          tab: "Post Production",
          subtitle: "Final Pre-Shipment Inspection",
          desc: "We carry out a complete evaluation of the finished batch before dispatch, using AQL sampling criteria to verify that products meet the established quality standards.",
          includes: [
            "Visual and functional quality control.",
            "Verification of quantities and references.",
            "Review of labeling, markings and codes.",
            "Inspection of packaging and packing.",
            "Technical report with photos and inspection results.",
          ],
          benefit:
            "Ensures the goods shipped match what was ordered and minimizes claims, returns and financial losses.",
        },
        {
          tab: "Container Loading",
          subtitle: "Stowage & Loading Supervision",
          desc: "We verify that the goods are loaded correctly into the container, ensuring product integrity during international transport.",
          includes: [
            "Verification of the container's condition.",
            "Confirmation of loaded quantities.",
            "Supervision of handling and stowage.",
            "Control of load distribution and securing.",
            "Complete photographic record of the process.",
          ],
          benefit:
            "Prevents damage during transport, reduces logistics risks and provides documentary evidence of the goods' condition at the time of shipment.",
        },
      ],
    },

    rastreo: {
      breadcrumb: "Tracking",
      heroLabel: "Real-time tracking",
      heroTitle: "Track Your Shipment",
      heroSub:
        "Enter your tracking, container or AWB number to see the real-time status of your cargo.",
      searchLabel: "Shipment Search",
      searchTitle: "Where is your cargo?",
      searchSubPre: "Try: ",
      searchSubPost: " to see a live tracking example.",
      placeholder: "e.g. MSKU7845213 / AWB-987654 / BL-2026-GYE",
      searchBtn: "Track",
      examplesLabel: "Examples:",
      resultLabels: {
        origen: "Origin",
        destino: "Destination",
        tipo: "Type",
        eta: "ETA",
      },
      notFound:
        "We couldn't find a shipment with that number. Please check and try again, or contact us directly.",
      notFoundCta: "Contact Operations",
      infoLabel: "Tracking Information",
      infoTitle: "Everything you need to know",
      info: [
        {
          title: "What can I track?",
          text: "Container numbers (BIC/ISO), air AWBs, Bills of Lading (BL) and Acrosscon internal tracking numbers.",
        },
        {
          title: "Automatic Notifications",
          text: "Receive updates by WhatsApp or email at every event of your shipment: departure, transit, arrival and delivery.",
        },
        {
          title: "Can't find your shipment?",
          text: "Contact us directly. Our operations team has real-time access to information on all your shipments.",
        },
      ],
      contactTitle: "Need help with your shipment?",
      contactText:
        "Our operations team is available Monday to Saturday, 8am – 6pm (GMT-5)",
      contactCta: "Contact Form",
      demo: {
        id: "MSKU7845213",
        origin: "Shanghai, China",
        destination: "Guayaquil, Ecuador",
        type: "Ocean — FCL 20'",
        eta: "Jun 15, 2026",
        statusLabel: "In Transit",
        events: [
          {
            state: "done",
            date: "May 01, 2026 — 09:00",
            event: "Purchase order confirmed",
            location: "Shanghai, China",
          },
          {
            state: "done",
            date: "May 08, 2026 — 14:30",
            event: "Quality inspection completed",
            location: "Guangzhou, China",
          },
          {
            state: "done",
            date: "May 12, 2026 — 08:00",
            event: "Loaded into container MSKU7845213",
            location: "Port of Shanghai",
          },
          {
            state: "done",
            date: "May 14, 2026 — 22:15",
            event: "Departure from Shanghai",
            location: "SIPG Terminal, Shanghai",
          },
          {
            state: "active",
            date: "May 24, 2026 — 11:00",
            event: "In transit — Pacific Ocean",
            location: "Lat: -3.2, Lon: -140.8",
          },
          {
            state: "pending",
            date: "Approx. Jun 10, 2026",
            event: "Arrival at the Panama Canal",
            location: "Miraflores, Panama",
          },
          {
            state: "pending",
            date: "Approx. Jun 13, 2026",
            event: "Arrival at Puerto Bolívar",
            location: "Puerto Bolívar, Ecuador",
          },
          {
            state: "pending",
            date: "Approx. Jun 15, 2026",
            event: "Delivery at client warehouse",
            location: "Guayaquil, Ecuador",
          },
        ],
      },
    },

    cotizacion: {
      breadcrumb: "Quote",
      headerBar: "Quote",
      heroLabel: "Quote request",
      heroTitle: "Quote Your International Operation",
      heroSub:
        "Personalized payment proposals tailored to your financial situation and operation volume.",
      howTitle: "How does it work?",
      howSub:
        "Receive a detailed quote in under 24 business hours with the best price on the market.",
      steps: [
        {
          title: "Complete the form",
          desc: "Enter service type, origin, destination and contact details.",
        },
        {
          title: "Analysis within 24h",
          desc: "Our team reviews your request and prepares a proposal.",
        },
        {
          title: "Personalized proposal",
          desc: "Receive a quote with payment options tailored to your operation.",
        },
        {
          title: "Operation kickoff",
          desc: "Approve and we begin working on your import or export.",
        },
      ],
      services: ["Inspection", "Sourcing", "Trading"],
      formTitle: "Request a Quote",
      stepLabel: "Step {n} of {total}",
      labels: {
        servicio: "Service Type *",
        origen: "City / Port of Origin *",
        destino: "Destination Country *",
        incoterm: "Incoterm",
        peso: "Estimated weight (kg)",
        descripcion: "Product Description *",
        nombre: "Full Name *",
        empresa: "Company",
        email: "Email Address *",
        telefono: "Phone / WhatsApp",
        comentarios: "Additional comments",
        documento: "Attachment",
      },
      placeholders: {
        servicio: "Select...",
        origen: "e.g. Shanghai, China",
        destino: "e.g. Ecuador",
        incoterm: "Select...",
        peso: "e.g. 5000",
        descripcion:
          "Briefly describe the goods, HS code if you know it, and any special considerations (hazardous, refrigerated, fragile, etc.)",
        nombre: "John Smith",
        empresa: "My Company Inc.",
        email: "you@company.com",
        telefono: "+593 99 000 0000",
        comentarios:
          "Do you have a deadline, special consideration or question?",
      },
      sectionDatos: "Contact Details",
      sectionConfirmar: "Confirm Request",
      buttons: {
        continuar: "Continue",
        revisar: "Review",
        atras: "Back",
        enviar: "Send Quote",
        enviando: "Sending...",
      },
      review: {
        servicio: "Service",
        ruta: "Route",
        incoterm: "Incoterm",
        peso: "Estimated weight",
        contacto: "Contact",
        empresa: "Company",
        dash: "—",
        kg: "kg",
      },
      success: {
        title: "Quote Sent!",
        sub: "We've received your request. Our team will review it and send you a personalized proposal in under 24 business hours.",
        backHome: "Back to Home",
      },
      fileHint: "Optional · PDF, DOCX, XLSX, JPG, PNG · max 10 MB",
      fileErrors: {
        type: "File type not allowed. Use PDF, DOCX, XLSX, JPG or PNG.",
        size: "The file exceeds 10 MB.",
      },
      error:
        "Your request could not be sent. Please try again or email us at info@acrosscon.com.",
      errorRate:
        "You have sent too many requests. Please wait a few minutes or email us at info@acrosscon.com.",
    },

    contacto: {
      breadcrumb: "Contact",
      headerBar: "Contact",
      heroLabel: "B2B support and inquiries",
      heroTitle: "Connect With Our Team",
      heroSub:
        "We assess your company's needs to offer tailored intermediation, quality and logistics solutions.",
      formTitle: "Send us a message",
      formSub: "We reply in under 24 business hours.",
      labels: {
        nombre: "Full Name *",
        empresa: "Company",
        email: "Email Address *",
        telefono: "Phone / WhatsApp",
        asunto: "Subject *",
        mensaje: "Message *",
      },
      placeholders: {
        nombre: "e.g. John Smith",
        empresa: "My Company Inc.",
        email: "you@company.com",
        telefono: "0987654321",
        mensaje:
          "Tell us about your operation: product, origin, destination, volume and any specific questions...",
      },
      asuntoPlaceholder: "Select a reason...",
      // `id` must match the Spanish list — it is the stable form value.
      subjects: [
        { id: "sourcing", label: "Supplier Sourcing & Development" },
        { id: "inspeccion", label: "Quality Control (AQL / Inspection)" },
        { id: "logistica", label: "Logistics Coordination / Shipping" },
        { id: "consultoria", label: "Consulting / Comprehensive Advisory" },
        { id: "otro", label: "Other" },
      ],
      otroPlaceholder: "Specify the reason for your inquiry",
      submit: "Send Message",
      submitting: "Sending...",
      success: {
        title: "Message Sent!",
        sub: "We've received your message. A specialist will contact you in under 24 business hours.",
      },
      error:
        "Your message could not be sent. Please try again or email us at info@acrosscon.com.",
      errorRate:
        "You have sent too many messages. Please wait a few minutes or email us at info@acrosscon.com.",
      channelsTitle: "Contact Channels",
      phoneLabel: "Phone",
      phoneAction: "Call",
      channels: [
        {
          icon: "mail",
          label: "General Inquiries",
          value: "info@acrosscon.com",
          action: "Send email",
          href: "mailto:info@acrosscon.com",
        },
        {
          icon: "mail",
          label: "Documentation",
          value: "documentacion@acrosscon.com",
          action: "Send email",
          href: "mailto:documentacion@acrosscon.com",
        },
        {
          icon: "mail",
          label: "Foreign Trade",
          value: "comex@acrosscon.com",
          action: "Send email",
          href: "mailto:comex@acrosscon.com",
        },
      ],
      // The address itself lives in `footer.address` — the Contacto page reads
      // it from there so both places always show the same one.
      officeTitle: "Office Location",
      officeLabel: "Head Office",
      officeAction: "View on map",
      hoursTitle: "Business Hours",
      hours: [
        { day: "Monday – Friday", time: "08:00 – 18:00" },
        { day: "Saturday", time: "08:00 – 13:00" },
        { day: "Sunday", time: "Closed" },
      ],
      hoursNote:
        "GMT-5 timezone (Ecuador). Asia operations available via WhatsApp outside business hours.",
    },
  },
};
