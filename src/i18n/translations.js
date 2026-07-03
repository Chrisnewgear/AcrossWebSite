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
    },

    nav: {
      inicio: "Inicio",
      servicios: "Servicios",
      rastreo: "Rastreo",
      cotizacion: "Cotización",
      contacto: "Contacto",
    },

    hero: {
      eyebrow: "Su socio en comercio internacional",
      line1: "Conexiones",
      line2: "Globales",
      tagline: "Confianza sin fronteras",
      sub: "Garantizamos la seguridad de tus operaciones mediante procesos claros, visibilidad absoluta y un respaldo constante.",
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
        text: "Transformamos la distancia en oportunidades globales. Simplificamos tus operaciones internacionales conectándote con soluciones eficientes en cualquier parte del mundo.",
      },
      vision: {
        title: "Nuestra Visión",
        text: "Ser el puente global que transforma fronteras en oportunidades, consolidándonos como el aliado estratégico más confiable, transparente y seguro para conectar mercados.",
      },
    },

    valores: {
      banner: "Nuestros Valores",
      items: [
        {
          name: "Responsabilidad",
          desc: "Asumimos cada proceso comercial con profesionalismo, garantizando una gestión eficiente y el cumplimiento de los estándares acordados.",
        },
        {
          name: "Crecimiento Compartido",
          desc: "Creemos en generar valor sostenible para clientes, proveedores, colaboradores y aliados estratégicos.",
        },
        {
          name: "Adaptabilidad",
          desc: "Respondemos con agilidad a los cambios del mercado global para ofrecer soluciones oportunas y competitivas.",
        },
      ],
    },

    ventajas: {
      title: "Por qué elegirnos",
      advantages: [
        {
          title: "Red Global de Proveedores",
          desc: "Contamos con una sólida red de fabricantes y proveedores internacionales cuidadosamente seleccionados, lo que nos permite ofrecer productos competitivos, confiables y adaptados a las necesidades de cada cliente.",
        },
        {
          title: "Eficiencia en la Gestión Comercial",
          desc: "Optimizamos cada etapa del proceso de importación, desde la búsqueda de proveedores hasta la entrega final, garantizando operaciones ágiles y seguras.",
        },
        {
          title: "Transparencia y Confianza",
          desc: "Trabajamos con total claridad en cada negociación, brindando información oportuna y acompañamiento constante para que nuestros clientes tomen decisiones con seguridad.",
        },
        {
          title: "Experiencia en Comercio Internacional",
          desc: "Nuestro conocimiento de los mercados globales, procesos aduaneros y logística internacional nos permite minimizar riesgos y generar oportunidades de negocio exitosas.",
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
      ],
    },

    footer: {
      brandDesc:
        "Su socio confiable en trading e intermediación internacional. Conectamos mercados desde Asia y Europa hasta su destino.",
      servicesTitle: "Servicios",
      companyTitle: "La Empresa",
      contactTitle: "Contacto",
      services: [
        "Transporte Marítimo",
        "Transporte Aéreo",
        "Transporte Terrestre",
        "Rastreo de Envíos",
        "Verificación Proveedores",
        "Inspección de Calidad",
      ],
      company: [
        "Nosotros",
        "Misión y Visión",
        "Presencia Internacional",
        "Cotización",
        "Contacto",
      ],
      address:
        "Av. del Bombero, La Vista de San Eduardo, Edificio 100A Of. 502, Guayaquil, Ecuador",
      copyright:
        "© 2026 Across Continents Trading. Todos los derechos reservados.",
    },

    servicios: {
      breadcrumb: "Servicios",
      heroLabel: "Nuestras capacidades",
      heroTitle: "Soluciones Logísticas Integrales",
      heroSub:
        "Desde el proveedor hasta su bodega — gestionamos cada paso de su cadena de suministro internacional.",
      ctaQuote: "Solicitar Cotización",
      ctaExpert: "Hablar con un Experto",
      complementaryRibbon: "Servicios Complementarios",
      complementary: [
        {
          title: "Búsqueda y Desarrollo de Proveedores Internacionales",
          desc: "Identificamos, evaluamos y seleccionamos fabricantes y proveedores confiables en mercados internacionales, garantizando calidad, competitividad y seguridad comercial.",
        },
        {
          title: "Gestión Integral de Importaciones",
          desc: "Coordinamos todo el ciclo de importación —trámites aduaneros, aranceles, permisos y logística— para que su mercancía llegue a destino sin contratiempos.",
        },
        {
          title: "Negociación y Compras Internacionales",
          desc: "Representamos los intereses de nuestros clientes en negociaciones comerciales, obteniendo las mejores condiciones de precio, calidad y plazos de entrega.",
        },
        {
          title: "Logística y Coordinación de Transporte Internacional",
          desc: "Gestionamos el transporte marítimo, aéreo y terrestre, asegurando una cadena logística eficiente y un seguimiento continuo de la mercancía.",
        },
        {
          title: "Asesoría en Comercio Exterior",
          desc: "Brindamos orientación especializada en normativas, documentación, requisitos aduaneros, aranceles y procesos de importación para minimizar riesgos.",
        },
        {
          title: "Inspección y Control de Calidad",
          desc: "Coordinamos verificaciones e inspecciones de productos antes del embarque para garantizar que cumplan con las especificaciones y estándares requeridos.",
        },
      ],
      inspectionRibbon: "Inspección de Calidad",
      inspHeading: "Control de Calidad AQL en Fábrica",
      inspPill:
        "Proteja su inversión antes de que la mercancía salga de origen.",
      inspIntro:
        "Realizamos inspecciones de calidad bajo estándares internacionales AQL (Acceptable Quality Limit) en las principales zonas industriales de China, verificando que los productos cumplan con las especificaciones acordadas antes del embarque.",
      tabsLabel: "Fases de inspección",
      prevPhase: "Fase anterior",
      nextPhase: "Fase siguiente",
      includesTag: "Incluye",
      benefitTag: "Beneficio para el cliente",
      phases: [
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
        {
          tab: "Durante Producción",
          subtitle: "Inspección en Planta (DUPRO)",
          desc: "Supervisamos el proceso de fabricación mientras su pedido se encuentra en producción, permitiendo detectar desviaciones, defectos o incumplimientos antes de que afecten la totalidad del lote.",
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
      ],
    },

    rastreo: {
      breadcrumb: "Rastreo",
      heroLabel: "Seguimiento en tiempo real",
      heroTitle: "Rastree su Envío",
      heroSub:
        "Ingrese su número de guía, contenedor o AWB para ver el estado en tiempo real de su carga.",
      searchLabel: "Búsqueda de Envío",
      searchTitle: "¿Dónde está su carga?",
      searchSubPre: "Pruebe con: ",
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
        "No encontramos un envío con ese número. Verifique e intente de nuevo, o contáctenos directamente.",
      notFoundCta: "Contactar a Operaciones",
      infoLabel: "Información de Rastreo",
      infoTitle: "Todo lo que necesita saber",
      info: [
        {
          title: "¿Qué puedo rastrear?",
          text: "Números de contenedor (BIC/ISO), AWB aéreos, Bill of Lading (BL) y números de guía interna Acrosscon.",
        },
        {
          title: "Notificaciones Automáticas",
          text: "Reciba actualizaciones por WhatsApp o correo en cada evento de su envío: zarpe, tránsito, llegada y entrega.",
        },
        {
          title: "¿No encuentra su envío?",
          text: "Contáctenos directamente. Nuestro equipo de operaciones tiene acceso a información en tiempo real de todos sus embarques.",
        },
      ],
      contactTitle: "¿Necesita ayuda con su envío?",
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
      heroTitle: "Cotice su Operación Internacional",
      heroSub:
        "Propuestas de pago personalizadas adaptadas a su situación financiera y volumen de operación.",
      howTitle: "¿Cómo funciona?",
      howSub:
        "Reciba una cotización detallada en menos de 24 horas hábiles con el mejor precio del mercado.",
      steps: [
        {
          title: "Complete el formulario",
          desc: "Indique tipo de servicio, origen, destino y datos de contacto.",
        },
        {
          title: "Análisis en 24h",
          desc: "Nuestro equipo revisa su solicitud y prepara una propuesta.",
        },
        {
          title: "Propuesta personalizada",
          desc: "Recibe cotización con opciones de pago adaptadas a su operación.",
        },
        {
          title: "Inicio de operación",
          desc: "Aprueba y comenzamos a trabajar en su importación o exportación.",
        },
      ],
      services: [
        "Marítimo",
        "Terrestre",
        "Inspección",
        "Aéreo",
        "Sourcing",
        "Trading",
      ],
      formTitle: "Solicitar Cotización",
      stepLabel: "Paso {n} de {total}",
      tilesHeading: "Tipo de Servicio y Ruta",
      labels: {
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
        origen: "Ej: Shanghai, China",
        destino: "Ej: Ecuador",
        incoterm: "Seleccionar...",
        peso: "Ej: 5000",
        descripcion:
          "Describa brevemente la mercancía, HS code si lo conoce, y cualquier consideración especial (peligrosa, refrigerada, frágil, etc.)",
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
        sub: "Hemos recibido su solicitud. Nuestro equipo la revisará y le enviará una propuesta personalizada en menos de 24 horas hábiles.",
        backHome: "Volver al Inicio",
      },
      fileHint: "Opcional · PDF, DOCX, XLSX, JPG, PNG · máx 10 MB",
      fileErrors: {
        type: "Formato no permitido. Use PDF, DOCX, XLSX, JPG o PNG.",
        size: "El archivo supera los 10 MB.",
      },
      error:
        "No se pudo enviar la solicitud. Intente nuevamente o escríbanos a info@acrosscon.com.",
    },

    contacto: {
      breadcrumb: "Contacto",
      headerBar: "Contacto",
      heroLabel: "Hablemos de su operación",
      heroTitle: "Contáctenos",
      heroSub:
        "Nuestro equipo de especialistas está listo para asesorarle en cada etapa de su operación internacional.",
      formTitle: "Envíenos un mensaje",
      formSub: "Le respondemos en menos de 24 horas hábiles.",
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
          "Cuéntenos sobre su operación: producto, origen, destino, volumen y cualquier consulta específica...",
      },
      asuntoPlaceholder: "Seleccionar motivo...",
      subjects: [
        "Cotización de flete",
        "Inspección de calidad",
        "Sourcing de proveedores",
        "Seguimiento de envío",
        "Trading / Intermediación",
        "Otro",
      ],
      otroPlaceholder: "Especifique el motivo de su consulta",
      submit: "Enviar Mensaje",
      submitting: "Enviando...",
      success: {
        title: "¡Mensaje Enviado!",
        sub: "Hemos recibido su mensaje. Un especialista se pondrá en contacto con usted en menos de 24 horas hábiles.",
      },
      error:
        "No se pudo enviar el mensaje. Intente nuevamente o escríbanos a info@acrosscon.com.",
      channelsTitle: "Canales de Atención",
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
      line1: "Global",
      line2: "Connections",
      tagline: "Trust without borders",
      sub: "We guarantee the security of your operations through clear processes, full visibility and constant support.",
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
        text: "We turn distance into global opportunities. We simplify your international operations by connecting you with efficient solutions anywhere in the world.",
      },
      vision: {
        title: "Our Vision",
        text: "To be the global bridge that turns borders into opportunities, establishing ourselves as the most reliable, transparent and secure strategic ally for connecting markets.",
      },
    },

    valores: {
      banner: "Our Values",
      items: [
        {
          name: "Responsibility",
          desc: "We take on every commercial process with professionalism, ensuring efficient management and compliance with the agreed standards.",
        },
        {
          name: "Shared Growth",
          desc: "We believe in generating sustainable value for clients, suppliers, partners and strategic allies.",
        },
        {
          name: "Adaptability",
          desc: "We respond swiftly to changes in the global market to deliver timely and competitive solutions.",
        },
      ],
    },

    ventajas: {
      title: "Why Choose Us",
      advantages: [
        {
          title: "Global Supplier Network",
          desc: "We have a solid network of carefully selected international manufacturers and suppliers, allowing us to offer competitive, reliable products tailored to each client's needs.",
        },
        {
          title: "Efficient Trade Management",
          desc: "We optimize every stage of the import process, from sourcing suppliers to final delivery, ensuring agile and secure operations.",
        },
        {
          title: "Transparency and Trust",
          desc: "We work with complete clarity in every negotiation, providing timely information and constant support so our clients can make decisions with confidence.",
        },
        {
          title: "International Trade Expertise",
          desc: "Our knowledge of global markets, customs processes and international logistics allows us to minimize risks and create successful business opportunities.",
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
      ],
    },

    footer: {
      brandDesc:
        "Your trusted partner in international trading and intermediation. We connect markets from Asia and Europe to your destination.",
      servicesTitle: "Services",
      companyTitle: "Company",
      contactTitle: "Contact",
      services: [
        "Ocean Freight",
        "Air Freight",
        "Ground Transport",
        "Shipment Tracking",
        "Supplier Verification",
        "Quality Inspection",
      ],
      company: [
        "About Us",
        "Mission & Vision",
        "International Presence",
        "Quote",
        "Contact",
      ],
      address:
        "Av. del Bombero, La Vista de San Eduardo, Edificio 100A Of. 502, Guayaquil, Ecuador",
      copyright: "© 2026 Across Continents Trading. All rights reserved.",
    },

    servicios: {
      breadcrumb: "Services",
      heroLabel: "Our capabilities",
      heroTitle: "Integrated Logistics Solutions",
      heroSub:
        "From the supplier to your warehouse — we manage every step of your international supply chain.",
      ctaQuote: "Request a Quote",
      ctaExpert: "Talk to an Expert",
      complementaryRibbon: "Complementary Services",
      complementary: [
        {
          title: "International Supplier Sourcing & Development",
          desc: "We identify, evaluate and select reliable manufacturers and suppliers in international markets, ensuring quality, competitiveness and commercial security.",
        },
        {
          title: "End-to-End Import Management",
          desc: "We coordinate the entire import cycle —customs procedures, tariffs, permits and logistics— so your goods reach their destination without setbacks.",
        },
        {
          title: "International Negotiation & Procurement",
          desc: "We represent our clients' interests in commercial negotiations, securing the best conditions in price, quality and delivery times.",
        },
        {
          title: "International Transport Logistics & Coordination",
          desc: "We manage ocean, air and ground transport, ensuring an efficient logistics chain and continuous tracking of the goods.",
        },
        {
          title: "Foreign Trade Advisory",
          desc: "We provide specialized guidance on regulations, documentation, customs requirements, tariffs and import processes to minimize risks.",
        },
        {
          title: "Quality Inspection & Control",
          desc: "We coordinate product verifications and inspections before shipment to ensure they meet the required specifications and standards.",
        },
      ],
      inspectionRibbon: "Quality Inspection",
      inspHeading: "AQL Quality Control at the Factory",
      inspPill: "Protect your investment before the goods leave origin.",
      inspIntro:
        "We perform quality inspections under international AQL (Acceptable Quality Limit) standards in China's main industrial zones, verifying that products meet the agreed specifications before shipment.",
      tabsLabel: "Inspection phases",
      prevPhase: "Previous phase",
      nextPhase: "Next phase",
      includesTag: "Includes",
      benefitTag: "Client benefit",
      phases: [
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
      services: ["Ocean", "Ground", "Inspection", "Air", "Sourcing", "Trading"],
      formTitle: "Request a Quote",
      stepLabel: "Step {n} of {total}",
      tilesHeading: "Service Type & Route",
      labels: {
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
    },

    contacto: {
      breadcrumb: "Contact",
      headerBar: "Contact",
      heroLabel: "Let's talk about your operation",
      heroTitle: "Contact Us",
      heroSub:
        "Our team of specialists is ready to advise you at every stage of your international operation.",
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
      subjects: [
        "Freight quote",
        "Quality inspection",
        "Supplier sourcing",
        "Shipment tracking",
        "Trading / Intermediation",
        "Other",
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
      channelsTitle: "Contact Channels",
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
