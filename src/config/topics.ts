import type { Locale } from "./i18n";

export const topics = ["Governance", "Engineering", "AI", "FinOps", "Data-Quality", "DevOps"] as const;

export type Topic = (typeof topics)[number];

export const topicSlug = (topic: Topic) => topic.toLowerCase().replace(/\s+/g, "-");

interface TopicInfo {
  label: string;
  summary: string;
}

export const topicMeta: Record<Locale, Record<Topic, TopicInfo>> = {
  es: {
    Governance: { label: "Governanza", summary: "Control, seguridad y gestion de datos en Snowflake." },
    Engineering: { label: "Engineering", summary: "Pipelines, SQL avanzado y mejores practicas." },
    AI: { label: "AI", summary: "Cortex AI, modelos y funciones inteligentes." },
    FinOps: { label: "FinOps", summary: "Costes, creditos y optimizacion de consumo." },
    "Data-Quality": { label: "Data Quality", summary: "Calidad de datos, DMFs y monitorizacion." },
    DevOps: { label: "DevOps", summary: "CI/CD, Git, despliegues y automatizacion." },
  },
  en: {
    Governance: { label: "Governance", summary: "Data control, security, and governance in Snowflake." },
    Engineering: { label: "Engineering", summary: "Pipelines, advanced SQL, and best practices." },
    AI: { label: "AI", summary: "Cortex AI, models, and intelligent functions." },
    FinOps: { label: "FinOps", summary: "Costs, credits, and consumption optimization." },
    "Data-Quality": { label: "Data Quality", summary: "Data quality, DMFs, and monitoring." },
    DevOps: { label: "DevOps", summary: "CI/CD, Git, deployments, and automation." },
  },
  it: {
    Governance: { label: "Governance", summary: "Controllo, sicurezza e gestione dei dati in Snowflake." },
    Engineering: { label: "Engineering", summary: "Pipeline, SQL avanzato e best practice." },
    AI: { label: "AI", summary: "Cortex AI, modelli e funzioni intelligenti." },
    FinOps: { label: "FinOps", summary: "Costi, crediti e ottimizzazione dei consumi." },
    "Data-Quality": { label: "Data Quality", summary: "Qualita dei dati, DMF e monitoraggio." },
    DevOps: { label: "DevOps", summary: "CI/CD, Git, deploy e automazione." },
  },
};

export function getTopicMeta(topic: Topic, locale: Locale): TopicInfo {
  return topicMeta[locale]?.[topic] ?? topicMeta.es[topic];
}
