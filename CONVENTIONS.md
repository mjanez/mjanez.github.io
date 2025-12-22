# **Convenciones de Código**

## **1\. Naming Conventions**

* **Archivos:** kebab-case (ej. project-card.html, main-header.html).  
* **Claves i18n:** snake\_case con prefijo de sección (ej. hero\_title, nav\_about, project\_btn\_more).  
* **Variables Hugo:** PascalCase cuando son propias de Hugo (.Site.Title), camelCase para variables locales ($currentIndex).

## **2\. Tailwind CSS**

* **Orden:** Sigue el orden lógico: Layout \-\> Box Model \-\> Typography \-\> Visuals \-\> Misc.  
  * *Bien:* flex items-center justify-between p-4 bg-white rounded  
  * *Mal:* bg-white p-4 flex rounded justify-between  
* **Colores:** Usa las variables semánticas definidas en tailwind.config.js (primary, secondary, dark-bg) en lugar de colores arbitrarios (blue-500), para facilitar cambios de tema globales.

## **3\. Internacionalización (i18n)**

* Nunca dejes huecos vacíos en un idioma. Si agregas una clave en es.yaml, agrégala inmediatamente en en.yaml (aunque sea en español temporalmente con un comentario TODO).  
* Usa HTML seguro dentro de las traducciones solo si es necesario (ej. para poner una palabra en negrita dentro de una frase: "Hola \<b\>Mundo\</b\>"), y renderízalo con {{ T "key" | safeHTML }}.

## **4\. Git Messages**

* Usa [Conventional Commits](https://www.conventionalcommits.org/):  
  * feat: add new project section  
  * fix: mobile navigation overlap  
  * docs: update architecture diagram  
  * chore: upgrade hugo version