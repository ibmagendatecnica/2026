export interface Event {
  id: string;
  contactEmail: string;
  focusArea: string;
  audience: string;
  attendees: string;
  dateString: string;
  date: Date | null; // Parsed date for sorting
  city: string;
  country: string;
  duration: string;
  title: string;
  registrationUrl?: string;
}

const rawData = `Event Details Contact;Focus Area;Audiencia;How many attendees do you expect?;Approximate Start Date;Ciudad;Pais;Duracion;Nombre del Evento;URL Registro;;;;;
gemma_munoz@es.ibm.com;Z;Customers;20-40;12 de febrero de 2026;Madrid;España;1 day;IBM Data&AI on z/OS, an IBM TechXchange Workshop;https://www.ibm.com/events/reg/flow/ibm/YXCNXJMB/landing/page/landing;;;;;
"julian.garcia@es.ibm.com, david.nunez@ibm.com";Automation;Customers, Business Partners;20-40;11 de marzo de 2026;Madrid;España;0.5 day;AI for Networking, an IBM TechXchange Workshop;https://www.ibm.com/events/reg/flow/ibm/K65HDZMB/landing/page/landing;;;;;
"enrique.parra@es.ibm.com, david.ezagury@ibm.com";Automation;Customers, Business Partners;10-20;26 de marzo de 2026;Madrid;España;1 day;Observabilidad end2end - Instana, SevOne, Concert;;;;;;
Richard.podlas@ibm.com;Data and AI;Customers, Business Partners;20-40;30 de marzo de 2026;Tel Aviv;Israel;0.5 day;Quantum Safe For the Financial Sector;;;;;;
gemma_munoz@es.ibm.com;Z;Customers;10-20;8 de abril de 2026;Madrid;España;1 day;IBM Data&AI on z/OS, an IBM TechXchange Workshop in Barcelona;;;;;;
ivancantero@es.ibm.com;Data and AI;Customers, Business Partners;20-40;8 de abril de 2026;Madrid;España;0.5 day;PQC / Quantum Safe: Introducción, retos y soluciones;;;;;;
Richard.podlas@ibm.com;Data and AI;Customers;20-40;13 de abril de 2026;Tel Aviv;Israel;1 day;DataStax - Scale for the sky;;;;;;
pascal_viguie@es.ibm.com;Data and AI;Customers;20-43;15 de abril de 2026;Madrid;España;0.5 day;Workspace Reports and Analysis Deep Dive;;;;;;
Matan.Dadon@ibm.com;Automation;Customers;20-40;16 de abril de 2026;Tel Aviv;Israel;0.5 day;Integration Workshop (webMethods);;;;;;
luis.navarro@ibm.com;Data and AI;Customers;20-44;20 de abril de 2026;Madrid;España;Less than 0.5 day;Evaluación y monitorización continua de sistemas de IA con watsonx.governance;;;;;;
"javier.garcia-samaniego@ibm.com; Luis.Gomez@ibm.com";Data and AI;Customers;10-20;21 de abril de 2026;Madrid;España;0.5 day;Data Mesh Approach, creation of governed data products with watsonx.data intelligence;;;;;;
"marco.langa.penalba@ibm.com, sonia_marquez@es.ibm.com, antonio.palacios@ibm.com";Data and AI;Customers;20-40;22 de abril de 2026;Madrid;España;1 day;Data Security for Z;;;;;;
arturo.guerrero@es.ibm.com;Cloud;Customers, Business Partners;75-125;22 de abril de 2026;Madrid;España;1 day;VMware attack (title to be defined);;;;;;
Matan.Dadon@ibm.com;Automation;Customers;20-40;23 de abril de 2026;Tel Aviv;Israel;0.5 day;CISOs raund table (Verify, Vault, Data Security);;;;;;
sandralazaroperez@ibm.com;Z;Customers;20-40;23 de abril de 2026;Madrid;España;1 day;Mainframe applications modernization with DevOps and AI tools ;;;;;;
miguelalcala@ibm.com;Data and AI;Customers, Business Partners;20-40;27 de abril de 2026;Madrid;España;0.5 day;Better data, smarter AI. The only hybrid, open data lakehouse for enterprise AI and analytics;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;28 de abril de 2026;Madrid;España;0.5 day;B2B & MFT workshops;;;;;;
"julian.garcia@es.ibm.com, david.nunez@ibm.com";Automation;Customers;20-40;29 de abril de 2026;Madrid;España;0.5 day;Trusteer Connect Day, an IBM TechXchange Workshop;;;;;;
Matan.Dadon@ibm.com;Automation;Customers, Business Partners;40-75;30 de abril de 2026;Tel Aviv;Israel;0.5 day;DevOps Bootcamp - Including Hand On (Terraform, Vault, Instana);;;;;;
George.diasakos@ibm.com;Power;Business Partners;20-40;5 de mayo de 2026;Atenas;Grecia;1 day;PowerVS enablement;;;;;;
"dri.costa@ibm.com,maria.pais.chaves@ibm.com,susanadsfranco@ibm.com";Automation;Customers, Business Partners;10-20;5 de mayo de 2026;Madrid;España;1 day;Gestión financiera del IT - Apptio;;;;;;
"dri.costa@ibm.com,maria.pais.chaves@ibm.com,susanadsfranco@ibm.com";Automation;Customers, Business Partners;10-20;12 de mayo de 2026;Madrid;España;1 day;FinOps - Cloudability, Kubecost, Turbonomic;;;;;;
"franclim.bento@pt.ibm.com, Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;13 de mayo de 2026;Madrid;España;1 day;AI Powered DevOps - BOB;;;;;;
"miguelalcala@ibm.com, Javier.Frances@ibm.com";Data and AI;Customers, Business Partners;20-40;13 de mayo de 2026;Madrid;España;0.5 day;IBM Bob in action;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;14 de mayo de 2026;Madrid;España;0.5 day;Modernización MQ;;;;;;
benito.martin@ibm.com;Data and AI;Customers;20-43;20 de mayo de 2026;Madrid;España;0.5 day;Business Automation con IA: La Nueva Generación de Procesos;;;;;;
pascal_viguie@es.ibm.com;Data and AI;Customers;20-43;20 de mayo de 2026;Madrid;España;Less than 0.5 day;Gobernar Excel Empresarial con IBM Planning Analytics;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers;20-40;28 de mayo de 2026;Madrid;España;0.5 day; API Management Customer forum;;;;;;
"robert.kende@es.ibm.com, julio.cesar.casas@ibm.com";Data and AI;Customers, Business Partners;10-20;2 de junio de 2026;Madrid;España;0.5 day;Master Data for the AI Agent Era: From Fragmented Sources to Seamless AI Access;;;;;;
"julian.garcia@es.ibm.com, david.nunez@ibm.com";Automation;Customers;20-40;3 de junio de 2026;Madrid;España;0.5 day;TechXChange: Securing Identities, the new frontier;;;;;;
giovanni.rafael.vuolo@ibm.com;Automation;Customers, Business Partners;10-20;24 de junio de 2026;Madrid;España;1 day;Zerotouch IT Operations - Terraform, Ansible, Turbonomic, Instana, Concert;;;;;;
benito.martin@ibm.com;Data and AI;Customers;20-41;5 de julio de 2026;Madrid;España;0.5 day;Create Predictive Models Visually with SPSS;;;;;;
luis.navarro@ibm.com;Data and AI;Customers;20-43;10 de agosto de 2026;Madrid;España;0.5 day;De Asistentes a Agentes: La Revolución de la Productividad con IA;;;;;;
"alvaro.cg@ibm.com, fernando.diaz@es.ibm.com";Storage;Customers;20-40;3 de septiembre de 2026;Madrid;España;2.5 days;Workshop IBM Flash System;;;;;;
eduard.sule@ibm.com;Data and AI;Customers;20-40;4 de septiembre de 2026;Madrid;España;Less than 0.5 day;IA Segura y Responsable: Cumple el EU AI Act y Minimiza Riesgos;;;;;;
stoupage@gr.ibm.com;Power;Customers, Business Partners;30-50;15 de septiembre de 2026;Atenas;Grecia;1 day;Power11 BP - Customer enablement - Final name to de decided;;;;;;
benito.martin@ibm.com;Data and AI;Customers;20-42;16 de septiembre de 2026;Madrid;España;1 day;Del Papel a la Realidad: Automatización End-to-End;;;;;;
"arancha_ocana@es.ibm.com, irene.marquet@ibm.com";Data and AI;Customers, Business Partners;20-40;23 de septiembre de 2026;Madrid;España;1 day;Unified batch and real-time data integration and observability across structured, semi‑structured, and unstructured data;;;;;;
hugo.fernandez@es.ibm.com;Z;Customers;20-40;24 de septiembre de 2026;Madrid;España;1 day;Mainframe applications Integration in the hybrid cloud ;;;;;;
"irene.marquet@ibm.com, George.Cassar@ibm.com";Data and AI;Customers, Business Partners;10-20;30 de septiembre de 2026;Madrid;España;0.5 day;Federated analytics, FinOps, embedded BI, and engine‑level telemetry in the corporate lakehouse;;;;;;
"marco.langa.penalba@ibm.com, sonia_marquez@es.ibm.com; antonio.palacios@ibm.com";Data and AI;Customers, Business Partners;20-40;13 de octubre de 2026;Madrid;España;1 day;Guardium User Group;;;;;;
"marco.langa.penalba@ibm.com, sonia_marquez@es.ibm.com; antonio.palacios@ibm.com";Data and AI;Business Partners;20-40;14 de octubre de 2026;Madrid;España;2 days;Guardium tech training - SMEs;;;;;;
benito.martin@ibm.com;Data and AI;Customers;20-43;1 de octubre de 2026;Madrid;España;0.5 day;Lleva tus Decisiones Operativas al Siguiente Nivel con CPLEX y Bob;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;16 de abril de 2026;Madrid;España;0.5 day;Hybrid API Management with IBM;;;;;;
yuval_feller@il.ibm.com;Automation;Customers;20-40;Abril;Tel Aviv;Israel;0.5 day;IBM Verify for strengthening identity security in a hybrid world;;;;;;
yohan.bensoussan@ibm.com;Data and AI;BP, Customers;20-40;Abril;Tel Aviv;Israel;1 day;The BOB Challenge; ;;;;;
yoramb@il.ibm.com;Data and AI;Customers;20-40;Abril;Tel Aviv;Israel;0.5 day;Data Security;;;;;;
yuval_feller@il.ibm.com;Data and AI;Customers;20-40;Abril;Tel Aviv;Israel;0.5 day;IBM Data Security for Banking Regulatory Requirements;;;;;;
"alvaro.cg@ibm.com, rcatalina@es.ibm.com";Storage;Customers, Business Partners;20-40;Abril;Madrid;España;1.5 days;Workshop Storage for Openshift;;;;;;
DEVOLDWI@gr.ibm.com;Z;Customers;20-40;Diciembre;Atenas;Grecia;1 day;Netview, System Automation and Workload Scheduler update;;;;;;
cristinabm@es.ibm.com;Z;Customers;20-40;Julio;Madrid;España;1 day;Do more at the core with IBM z17 & LinuxONE in Lisbon;;;;;;
cristinabm@es.ibm.com;Z;Customers;20-40;Julio;Madrid;España;1 day;Do more at the core with IBM z17 & LinuxONE in Athens;;;;;;
david.ezagury@ibm.com;Automation;Customers, Business Partners;10-20;Junio;Madrid;España;0.5 day;Opentelemetry with Instana;;;;;;
Francisco.Mesa@ibm.com;Z;Customers;20-40;Junio;Madrid;España;1 day;Protecting your most valueable asset: zSecurity;;;;;;
"Georgia.Karoutsou1@ibm.com; menicos.mavrommatis1@ibm.com";Automation;Customers, Business Partners;20-40;Marzo;Atenas;Grecia;1 day;Hashicorp - The automation story;;;;;;
Andrea.Nunez@ibm.com;Z;Customers;20-40;Marzo;Madrid;España;1 day;Meet LinuxONE;;;;;;
"franclim.bento@pt.ibm.com, Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;Marzo;Madrid;España;1 day;Integración Híbrida - IWHI;;;;;;
"alvaro.cg@ibm.com, fernando.diaz@es.ibm.com";Storage;Business Partners;20-40;Mayo;Madrid;España;2.5 days;Workshop IBM Flash System;;;;;;
George.Mavrovitis@ibm.com;Automation;Customers, Business Partners;20-40;Mayo;Atenas;Grecia;1 day;Instana, Turbonomic & AIOps - end to end insights;;;;;;
Pablo.Paniagua1@ibm.com;Z;Customers;20-40;Mayo;Madrid;España;1 day;Getting the best of OCP with LinuxONE;;;;;;
guillermo.gutierrez@es.ibm.com;Automation;Customers, Business Partners;10-20;Mayo;Madrid;España;1 day;Gestión de Activos - Maximo;;;;;;
"franclim.bento@pt.ibm.com, Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;Mayo;Madrid;España;1 day;GitLab;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;Mayo;Madrid;España;0.5 day;Greece, IBM Integration Key Enabler for Innovation;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;Mayo;Atenas;Grecia;0.5 day;Greece, iPaaS (APIs & Connect) hands-on workshops, Q2?​;;;;;;
"rcatalina@es.ibm.com, jordi.caubet@es.ibm.com";Storage;Customers;20-40;Mayo;Madrid;España;2.5 days;Unstructured data Workshop;;;;;;
HABANI@il.ibm.com;Z;Customers;20-40;Noviembre;Tel Aviv;Israel;1 day;Do more at the core with IBM z17 & LinuxONE in Tel Aviv;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers;20-40;Noviembre;Madrid;España;0.5 day;Safer Payments Customer forum;;;;;;
"alvaro.cg@ibm.com, fernando.diaz@es.ibm.com";Storage;Customers;20-40;Noviembre;Madrid;España;2.5 days;Workshop IBM Flash System;;;;;;
"rcatalina@es.ibm.com, jordi.caubet@es.ibm.com";Storage;Business Partners;20-40;Noviembre;Madrid;España;2.5 days;Unstructured data Workshop;;;;;;
Jessica.Martin@ibm.com;Z;Customers;20-40;Octubre;Madrid;España;1 day;What's new whith AIOps in the mainframe;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers;20-40;Octubre;Madrid;España;0.5 day;Sterling Customer forum;;;;;;
"alvaro.cg@ibm.com, fernando.diaz@es.ibm.com";Storage;Customers;20-40;Octubre;Madrid;España;2.5 days;Workshop IBM Flash System;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers;20-40;Septiembre;Lisboa;Portugal;0.5 day;Portugal, IBM Integration Key Enabler for Innovation;;;;;;
jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;Septiembre;Madrid;España;0.5 day;iPaaS (APIs & Connect) hands-on workshops, Septiembre​;;;;;;
"marco.langa.penalba@ibm.com, sonia_marquez@es.ibm.com, antonio.palacios@ibm.com";Data and AI;Customers;10-20;TBD;Madrid;España;0.5 day;Get the most of Guardium Assessment;;;;;;
francisco.ramos.do.o@ibm.com;Cloud;Customers, Business Partners;20-40;Septiembre;Lisboa;Portugal;1 day;Meet Bob! (with Data&AI + Automation teams);;2.000;Yes;Q2;;
francisco.ramos.do.o@ibm.com;Cloud;Customers, Business Partners;20-40;Diciembre;Lisboa;Portugal;1 day;Meet Bob! (with Data&AI + Automation teams);;2.000;Yes;Q2;;
alejandro.delgado@es.ibm.com;Cloud;Customers, Business Partners;20-40;Mayo;Madrid;España;0.5 day;Landing Zone para IA en IBM Cloud;;;;;;
Albert_Valls@es.ibm.com;Power;Customers, Business Partners;10-20;Mayo;Madrid;España;0.5 day;Cybervault on Power ;;;;;;
Sara.andres1@ibm.com;Power;Customers, Business Partners;20-40;Septiembre;Madrid;España;1 day;Hybrid Infrastructure, new consumption models: PowerVS;;;;;;
alejandro.delgado@es.ibm.com;Power;Customers, Business Partners;20-40;Julio;Madrid;España;0.5 day;Preparación certificación PowerVS L2/L3;;;;;;
"castillo.armando@ibm.com,luisperez@es.ibm.com";Cloud;Customers, Business Partners;20-40;Junio;Madrid;España;0.5 day;Despliegue de Landing Zone en IBM Cloud;;;;;;
alejandro.delgado@es.ibm.com;Cloud;Customers, Business Partners;20-40;Septiembre;Madrid;España;0.5 day;Landing Zone para IA en IBM Cloud;;;;;;
"javier.de.la.puente@ibm.com, diego.bernabe@ibm.com";Cloud;Customers, Business Partners;20-40;Mayo;Madrid;España;0.5 day;Onboarding a IBM Cloud;;;;;;
"lucia.deancos.villa@ibm.com, Jaime.R.Lara@ibm.com";Cloud;Customers, Business Partners;20-40;Mayo;Madrid;España;0.5 day;Serverless Fleets;;;;;;
alejandro.delgado@es.ibm.com;Power;Customers, Business Partners;20-40;Noviembre;Madrid;España;0.5 day;Preparación certificación PowerVS L2 / L3;;;;;;
"javier.de.la.puente@ibm.com, castillo.armando@ibm.com";Cloud;Customers, Business Partners;20-40;Septiembre;Madrid;España;0.5 day;Maximo Application Suite sobre IBM Cloud;;;;;;
castillo.armando@ibm.com;Cloud;Customers, Business Partners;20-40;Octubre;Madrid;España;0.5 day;Virtualización en IBM Cloud on VPC (VSI/Baremetal);;;;;;
luisperez@es.ibm.com;Cloud;Customers, Business Partners;20-40;Octubre;Madrid;España;0.5 day;Virtualización en IBM Cloud on ROVE;;;;;;
"lucia.deancos.villa@ibm.com, Jaime.R.Lara@ibm.com";Cloud;Customers, Business Partners;20-40;Ocutbre;Madrid;España;0.5 day;Serverless Fleets;;;;;;
luisperez@es.ibm.com;Cloud;Customers, Business Partners;20-40;Mayo;Madrid;España;0.5 day;Virtualización en IBM Cloud on ROVE;;;;;;
"javier.de.la.puente@ibm.com, diego.bernabe@ibm.com";Cloud;Customers, Business Partners;20-40;Junio;Madrid;España;0.5 day;Landing Zone para PowerVS en IBM Cloud;;;;;;
Albert_Valls@es.ibm.com;Power;Customers, Business Partners;10-20;Septiembre;Madrid;España;0.5 day;Cybervault on Power ;;;;;;
luisperez@es.ibm.com, alejandro.delgado@es.ibm.com;Cloud;Customers, Business Partners;20-40;Noviembre;Madrid;España;0.5 day;Nube Soberana con IBM Cloud y Security & Compliance Center Workload Protect;;;;;;
luisperez@es.ibm.com, alejandro.delgado@es.ibm.com;Cloud;Customers, Business Partners;20-40;Julio;Madrid;España;0.5 day;Nube Soberana con IBM Cloud y Security & Compliance Center Workload Protect;;;;;;
castillo.armando@ibm.com;Cloud;Customers, Business Partners;20-40;Mayo;Madrid;España;0.5 day;Virtualización en IBM Cloud on VPC (VSI/Baremetal);;;;;;
"javier.de.la.puente@ibm.com, diego.bernabe@ibm.com";Cloud;Customers, Business Partners;20-40;Octubre;Madrid;España;0.5 day;Onboarding a IBM Cloud;;;;;;
"javier.de.la.puente@ibm.com, diego.bernabe@ibm.com";Cloud;Customers, Business Partners;20-40;Noviembre;Madrid;España;0.5 day;Landing Zone para PowerVS en IBM Cloud;;;;;;`;

const months: { [key: string]: number } = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function parseDate(dateStr: string): Date | null {
  if (!dateStr || dateStr.trim() === "" || dateStr.includes("TBD")) return null;

  const lowerStr = dateStr.toLowerCase().trim();
  
  // Handle "12 de febrero de 2026"
  const specificDateMatch = lowerStr.match(/(\d+)\s+de\s+(\w+)\s+de\s+(\d+)/);
  if (specificDateMatch) {
    const day = parseInt(specificDateMatch[1], 10);
    const monthStr = specificDateMatch[2];
    const year = parseInt(specificDateMatch[3], 10);
    if (months[monthStr] !== undefined) {
      return new Date(year, months[monthStr], day);
    }
  }

  // Handle "Abril" (Assume 2026, end of month for sorting so it appears after specific dates)
  if (months[lowerStr] !== undefined) {
    // Set to last moment of the month
    return new Date(2026, months[lowerStr] + 1, 0, 23, 59, 59);
  }

  return null;
}

// Helper to parse CSV lines handling quotes and semicolons
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === ';' && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  
  return result.map(part => {
    const trimmed = part.trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      return trimmed.slice(1, -1).trim();
    }
    return trimmed;
  });
}

// To add a new event, simply add a new line to the `rawData` string above.
// Format: Contact;Focus Area;Audience;Attendees;Date;City;Country;Duration;Title;Registration URL
// Use double quotes if a field contains semicolons (e.g. "email1; email2").

export const events: Event[] = rawData
  .split("\n")
  .map(line => line.trim())
  .filter((line) => line !== "" && !line.startsWith("Event Details Contact")) // Skip empty lines and header
  .map((line, index): Event | null => {
    const cleanParts = parseCSVLine(line);

    if (cleanParts.length < 9 || !cleanParts[8]) return null;

    const contactEmail = cleanParts[0] || "";
    const focusArea = cleanParts[1] || "";
    const audience = cleanParts[2] || "";
    const attendees = cleanParts[3] || "";
    const dateString = cleanParts[4] || "";
    const city = cleanParts[5] || "";
    const country = cleanParts[6] || "";
    const duration = cleanParts[7] || "";
    const title = cleanParts[8] || "";
    const registrationUrl = cleanParts[9] || undefined;

    return {
      id: index.toString(),
      contactEmail,
      focusArea,
      audience,
      attendees,
      dateString,
      date: parseDate(dateString),
      city,
      country,
      duration,
      title,
      registrationUrl,
    };
  })
  .filter((e): e is Event => e !== null)
  .sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1; // Put TBD at the end
    if (!b.date) return -1;
    return a.date.getTime() - b.date.getTime(); // Ascending: Jan -> Dec
  });

export function isEventPast(event: Event): boolean {
  if (!event.date) return false;
  const now = new Date();
  // Reset time to start of day for comparison to be fair
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return event.date < today;
}

