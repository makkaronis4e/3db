export interface Markup {
  js: string;
  css: string;
  html: string;
}

export interface TemplateModel {
  id?: string;
  markup: Markup;
  name: string;
  channel: string;
  default: boolean;
  responsive: boolean;
}
