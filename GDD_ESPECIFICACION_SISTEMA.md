# Game Design Document (GDD) & Especificación de Sistema
## **Sugar Sprint: La Búsqueda del Cristal de Caramelo**

---

### **1. Visión General del Proyecto y Premisa Narrativa**

#### **1.1 Visión del Juego**
* **Título**: *Sugar Sprint: La Búsqueda del Cristal de Caramelo*
* **Género**: Plataformas 3D Isométrico / Aventura Casual de Acción sobre raíles con niveles fijos.
* **Target Audience**: Jugadores casuales y amantes del género plataformas (todas las edades), apasionados de estéticas vibrantes tipo *Candy Crush Saga*, *Super Mario 3D World* y *Sackboy*.
* **Pilar Principal**: Sensación jugosa (*Juicy Game Feel*), retroalimentación física inmediata (Squash & Stretch), colores hiperbrillantes y una experiencia de juego gratificante de 30 a 45 minutos.

#### **1.2 Sinopsis Argumental y Lore**
En las profundidades del multiverso confitado se erige el reino de **Dulcelandia**. El equilibrio biológico y físico de esta dimensión depende enteramente del **"Corazón de Azúcar Glaseado"**, una estructura monolítica de sacarosa pura y cristalina suspendida sobre la Gran Fuente Dulce. Este monolito emana ondas de sacarosa espiritual que otorgan elasticidad a los habitantes de gominola, fluidez a las corrientes de jarabe y textura esponjosa al algodón de azúcar.

Una sombra desecante irrumpió desde las desérticas Salinas del Norte: **Lord Salitre**, un ser incorrupto de sal marina opaca y corrosiva. Envidioso de la alegría pegajosa de Dulcelandia, fragmentó el Corazón de Azúcar en tres **Esquirlas Cristalinas**, provocando la deshidratación del reino.
* Sin la Esquirla de Fresa: El Bosque de Algodón de Azúcar pierde su viento dulce y sus copas elásticas se endurecen.
* Sin la Esquirla de Lima: El Río de Gominola se espesa en pez negra y nacen estalactitas punzantes de salmuera.
* Sin la Esquirla de Cacao: La Cumbre de Chocolate Negro entra en erupción con vapores de canela abrasadores y suelos de barquillo quebradizo.

El jugador encarna a **Pipo**, el osito de gominola rojo más elástico y optimista del reino, en una expedición de tres etapas para recuperar las esquirlas, derrotar a Lord Salitre y purificar la Gran Fuente Dulce.

#### **1.3 Clímax Narrativo, Epílogo y Cliffhanger de Continuidad**
Tras vencer a Lord Salitre en la Cumbre de Chocolate, las tres esquirlas convergen sobre la Gran Fuente Dulce desatando una sinfonía de luz sacarina y cascadas de almíbar reluciente. Sin embargo, la aparente victoria no es el fin del viaje:
* **El Terremoto Sacarino**: Cuando los habitantes de Dulcelandia comienzan las celebraciones, las profundidades de la fuente crujen violentamente. Una fractura sísmica de tonalidad salina se expande bajo el lecho de almíbar.
* **La Revelación del Océano Amargo**: Se escucha la voz ominosa de una deidad ancestral del desierto salino: *"Salitre no era más que un grano de sal en nuestra marea... El Gran Océano Amargo consumirá cada átomo de vuestro azúcar"*.
* **El Teaser de Expansión (DLC 1.5 - El Valle de los Masmelos Olvidados)**: Antes de la invasión total, Pipo debe viajar a las islas místicas del cielo para desenterrar los Cristales Efervescentes ancestrales que protegerán a Dulcelandia.
* **El Teaser de Secuela (Sugar Sprint 2: El Despertar del Océano Amargo)**: Anuncio oficial in-game del segundo título de la saga con mecánicas acuáticas de jarabe, nuevos mundos y batallas cooperativas contra los Titanes de Salmuera.

---

### **2. Menú Principal, Tienda de Skins y UI/UX**

#### **2.1 Menú Principal de Dulcelandia**
* **Estética**: Inspirada fielmente en la interfaz jugosa y redondeada de *Candy Crush Saga* con un gran medallón central y tipografía festiva 3D.
* **Elementos Centrales**:
  * **Título Prominente**: *"SUGAR SPRINT: La Búsqueda del Cristal de Caramelo"* en gradientes fucsia y turquesa esmaltado.
  * **Botón 'JUGAR'**: Abre de inmediato el mapa de islas navegable.
  * **Botón 'TIENDA'**: Abre el vestidor interactivo de Pipo para desbloquear atuendos con Bolitas de Anís.
  * **Botón 'OPCIONES'**: Despliega el panel de sonido y volumen con pruebas de audio procedural.

#### **2.2 Tienda de Skins Dulces**
Permite equipar y comprar variantes cosméticas de la gominola de Pipo mediante la moneda *Bolitas de Anís*:
1. **Pipo Fresa Real**: Sabor fresa original, translúcido con brillo especular (Gratis / Equipado).
2. **Pipo Menta Fresca**: Color verde esmeralda con fragancia refrescante ($40 \text{ monedas}$).
3. **Pipo Mora Azul**: Caramelo masticable azul índigo con destellos mágicos ($75 \text{ monedas}$).
4. **Pipo Oro Glaseado**: Baño de sirope de miel pura y purpurina dorada ($150 \text{ monedas}$).

---

### **3. Arquitectura de Niveles y Diseño de Mundos**

```
+-----------------------------------------------------------------------------------+
|                              MAPA DE DULCELANDIA                                  |
|                                                                                   |
|  [ Mundo 1: Bosque Algodón ]  --->  [ Mundo 2: Río Gominola ]  ---> [ Mundo 3 ]    |
|   - Copas Elásticas                  - Jarabe Lento Sticky        - Chocolate Peak |
|   - Puentes Regaliz                  - Estalactitas Cristal       - Barquillos      |
|   - Viento Dulce                     - Trampas Jalea              - BOSS: SALITRE   |
+-----------------------------------------------------------------------------------+
```

#### **3.1 Mundo 1: Bosque de Algodón de Azúcar**
* **Tema y Estética**: Entorno primaveral y esponjoso. Flores de chupachups esmaltados, rocío de sirope transparente y copas de árboles pastel.
* **Paleta de Colores**: Rosa Chicle (`#FF69B4`), Celeste Pastel (`#AEC6CF`), Blanco Nube (`#F8F9FA`), Verde Menta (`#98FF98`).
* **Mecánicas**: Camas elásticas de masmelo, puentes colgantes de regaliz trenzado y corrientes de viento dulce.

#### **3.2 Mundo 2: Río de Gominola y Rocas Caramelo**
* **Tema y Estética**: Cañón translúcido de sabores. Ríos viscosos de almíbar que reflejan la luz como prismas de gelatina.
* **Paleta de Colores**: Lima Brillante (`#32CD32`), Naranja Traslúcido (`#FF7F50`), Ámbar Esmerilado (`#FFBF00`), Violeta Arándano (`#8A2BE2`).
* **Mecánicas**: Balsas de caramelo flotante, estalactitas de azúcar quebradizo y charcos de jalea viscosa.

#### **3.3 Mundo 3: Cumbre de Chocolate Negro (Clímax y Batalla)**
* **Tema y Estética**: Volcán gastronómico dramático. Cascadas de cacao trufa caliente, vetas de caramelo ardiente y nubes de canela.
* **Paleta de Colores**: Marrón Trufa (`#3D2314`), Dorado Hoja de Oro (`#FFD700`), Carmesí Intenso (`#DC143C`), Sal Gris Obscura (`#4A4A4A`).
* **Mecánicas**: Suelo de barquillo crujiente con temporizador de colapso, géiseres de canela y combate multicapa contra Lord Salitre.

---

### **4. Especificación de Personajes y Entidades**

| Personaje | Rol | Aspecto / Material Shader | Mecánica Especial / Ataque |
| :--- | :--- | :--- | :--- |
| **Pipo** | Protagonista | Osito Gominola Rojo Fresa, Bigote y Barba de Chocolate, Capa de Celofán metalizado | *Rebote de Gelatina* (Ground Pound), *Chicletazo* (Agarrador elástico) |
| **Lord Salitre** | Villano / Boss Final | Cristal de Sal Marina grisáceo opaco, Armadura de Carbón Dulce | *Ráfaga Salina* (Rayos deshidratantes), Invocación de Minions de Sal |
| **Minions Salinos** | Enemigos Menores | Cubos de sal áspera con púas | Embestida rectilínea simple |

---

### **5. Especificación de la Expansión (DLC 1.5) y la Secuela (Sugar Sprint 2)**

#### **5.1 Expansión DLC 1.5: "El Valle de los Masmelos Olvidados"**
* **Contexto**: Ambientado en el estrato aéreo superior de Dulcelandia, sobre las copas de nubes de azúcar quemado.
* **Contenido Clave**:
  * 5 nuevas islas flotantes interconectadas por tirolinas de chicle estirable.
  * Nueva mecánica de triple rebote sincronizado sobre almohadillas de nube de merengue.
  * 3 nuevas apariencias coleccionables: *Pipo Algodón Nube*, *Pipo Regaliz Negro* y *Pipo Caramelo Salado Purificado*.
  * 15 nuevas Chispas de Luz Sacarina ocultas en enigmas de plataformas.

#### **5.2 Secuela: "Sugar Sprint 2: El Despertar del Océano Amargo"**
* **Sinopsis**: El Gran Océano Amargo ha comenzado su crecida marina, anegando las costas del reino bajo mareas de salmuera ácida. Pipo construye un barco de barquillo acorazado y zarpa hacia las profundidades.
* **Nuevas Mecánicas Planificadas**:
  * **Buceo en Almíbar Líquido**: Físicas de natación con flotabilidad elástica.
  * **Armas de Caramelo Efervescente**: Burbujas de soda efervescentes para neutralizar las mareas de salmuera.
  * **Modo Cooperativo para 2 Jugadores**: Pipo junto a su compañera "Lola" (Osita de Gominola de Limón).
  * **Jefes Titánicos**: Los 4 Generales de Salmuera y el Monarca del Océano Amargo.
