# **Arquitectura del Proyecto: Hugo \+ Tailwind Portfolio**

Este documento describe la estructura y el flujo de datos del proyecto para garantizar mantenibilidad y escalabilidad.

## **1\. Diagrama de Flujo de Datos**

graph TD  
    Data\[Data Files (data/\*.yaml)\] \--\> Hugo  
    I18n\[Traducciones (i18n/\*.yaml)\] \--\> Hugo  
    Layouts\[HTML Templates (layouts/)\] \--\> Hugo  
    Tailwind\[Tailwind Config\] \--\> PostCSS \--\> CSS Final  
    Hugo \--\>|Build| Public\[HTML Estático (public/)\]

## **2\. Estructura de Directorios**

* **data/**: La "Base de Datos" del sitio.  
  * experience.yaml: Lista de roles laborales.  
  * projects.yaml: Lista de proyectos destacados.  
  * stack.yaml: Categorías y herramientas tecnológicas.  
* **i18n/**: Textos de la interfaz (UI).  
  * es.yaml: Fuente de la verdad para español.  
  * en.yaml: Fuente de la verdad para inglés.  
* **layouts/**: Lógica de presentación.  
  * index.html: Layout principal (Single Page Application feel).  
  * partials/: Componentes reutilizables (Head, Nav, Footer, Cards).  
* **assets/css/**: Punto de entrada para Tailwind (main.css).

## **3\. Estrategia de Componentes**

Para evitar repetición de código HTML con muchas clases de Tailwind, usamos **Partials de Hugo**.

Ejemplo de uso:  
En lugar de repetir el HTML de una tarjeta de proyecto 6 veces, creamos layouts/partials/project-card.html y le pasamos el objeto de datos:  
{{ range .Site.Data.projects }}  
  {{ partial "project-card.html" . }}  
{{ end }}

## **4\. Pipeline de Construcción (Build)**

El proyecto utiliza NPM para gestionar las dependencias de desarrollo (Tailwind) y Hugo para la generación del sitio.

1. npm run dev: Ejecuta Hugo server y Tailwind en modo watch.  
2. npm run build: Compila Tailwind para producción (minificado) y genera el sitio estático en public/.