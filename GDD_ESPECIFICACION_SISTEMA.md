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

---

### **2. Arquitectura de Niveles y Diseño de Mundos**

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

#### **2.1 Mundo 1: Bosque de Algodón de Azúcar**
* **Tema y Estética**: Entorno primaveral y esponjoso. Flores de chupachups esmaltados, rocío de sirope transparente y copas de árboles pastel.
* **Paleta de Colores**:
  * Rosa Chicle (`#FF69B4`)
  * Celeste Pastel (`#AEC6CF`)
  * Blanco Nube (`#F8F9FA`)
  * Verde Menta (`#98FF98`)
* **Mecánicas e Interacciones**:
  * **Camas Elásticas de Masmelo**: Permiten realizar saltos gigantescos con respuesta sonora elástica.
  * **Puentes de Regaliz Trenzado**: Balancines dinámicos que vibran bajo las pisadas de Pipo.
  * **Ráfagas de Viento Dulce**: Zonas de flujo donde el aire rosado empuja al jugador suavemente en una dirección.
* **Curva de Aprendizaje**: Tutorial invisible de movimiento de 8 direcciones, salto básico y rebote de gominola.

#### **2.2 Mundo 2: Río de Gominola y Rocas Caramelo**
* **Tema y Estética**: Cañón translúcido de sabores. Ríos viscosos de almíbar que reflejan la luz como prismas de gelatina.
* **Paleta de Colores**:
  * Lima Brillante (`#32CD32`)
  * Naranja Traslúcido (`#FF7F50`)
  * Ámbar Esmerilado (`#FFBF00`)
  * Violeta Arándano (`#8A2BE2`)
* **Mecánicas e Interacciones**:
  * **Balsas de Caramelo sobre Jarabe**: Plataformas móviles que flotan sobre líquido lento.
  * **Estalactitas de Salmuera y Azúcar Quebradizo**: Picos que caen cuando el jugador pasa por debajo.
  * **Charcos de Jalea Viscosa**: Áreas que reducen la velocidad de desplazamiento a la mitad y requieren saltos repetidos para escapar.

#### **2.3 Mundo 3: Cumbre de Chocolate Negro (Clímax y Batalla)**
* **Tema y Estética**: Volcán gastronómico dramático. Cascadas de cacao trufa caliente, vetas de caramelo ardiente y nubes de canela.
* **Paleta de Colores**:
  * Marrón Trufa (`#3D2314`)
  * Dorado Hoja de Oro (`#FFD700`)
  * Carmesí Intenso (`#DC143C`)
  * Sal Gris Obscura (`#4A4A4A`)
* **Mecánicas e Interacciones**:
  * **Suelo de Barquillo Crujiente**: Placas de galleta con temporizador de fractura (se destruyen tras 1.5 segundos de ser pisadas).
  * **Géiseres de Canela**: Chorros de vapor caliente periódicos que dañan a Pipo si no calcula el tiempo.
  * **Cascadas de Cacao Fundido**: Ríos letales donde caer supone la reaparición inmediata en el Puesto de Bastón de Caramelo.

---

### **3. Especificación de Personajes y Entidades**

| Personaje | Rol | Aspecto / Material Shader | Mecánica Especial / Ataque |
| :--- | :--- | :--- | :--- |
| **Pipo** | Protagonista | Osito Gominola Rojo Fresa, Subsurface Scattering, Capa de Celofán metalizado | *Rebote de Gelatina* (Ground Pound), *Chicletazo* (Agarrador elástico) |
| **Lord Salitre** | Villano / Boss Final | Cristal de Sal Marina grisáceo opaco, Armadura de Carbón Dulce | *Ráfaga Salina* (Rayos deshidratantes), Invocación de Minions de Sal |
| **Minions Salinos** | Enemigos Menores | Cubos de sal áspera con púas | Embestida rectilínea simple |

#### **3.1 Protagonista: Pipo (Aventurero de Gominola Calvo con Barba)**
* **Arquetipo y Aspecto**: Figura de gominola sabor fresa hiperbrillante y translúcida con cabeza calva reflectante de caramelo pulido, barba prominente y bigote esculpido en chocolate y regaliz, ojos de azúcar glaseado y capa dorada de papel de bombón con física reactiva.
* **Entorno y Plataformas**: Islas flotantes tridimensionales suspendidas sobre un vasto océano de nubes esponjosas de malvavisco y confeti en deriva continua.
* **Controles Móviles & Touch**: Soporte completo para dispositivos móviles mediante joystick táctil dinámico 360° y botones dedicados en pantalla táctil con respuesta inmediata.
* **Dimensiones Hitbox**: Cápsula de $0.8 \times 1.2$ unidades.
* **Propiedades de Física**:
  * Velocidad Máxima: $8.0 \text{ unidades/s}$.
  * Aceleración: $30.0 \text{ unidades/s}^2$.
  * Fricción de Suelo: $12.0$.
  * Fuerza de Salto Base: $10.0 \text{ m/s}$.
  * Gravedad Personalizada: $25.0 \text{ m/s}^2$.
* **Mecánicas Clave**:
  1. **Rebote de Gelatina (Slam)**: Al presionar 'Barra Espaciadora' o botón táctil de salto en el aire, Pipo se comprime y cae velozmente. Al golpear superficies o enemigos, inflige daño de área y sale despedido a doble altura.
  2. **Chicletazo (Elastic Whip)**: Estira su brazo elástico hacia el frente (rango: 4.0 unidades) para recoger ítems distantes o activar palancas de caramelo duro.

#### **3.2 Villano: Lord Salitre**
* **Fases del Boss**:
  * **Fase 1**: Lanza proyectiles salinos directos. Pipo debe esquivarlos y usar el *Chicletazo* para derribar pilares de azúcar que le caigan encima.
  * **Fase 2**: Cubre el suelo con charcos de deshidratación salina. Invoca Minions de Sal.
  * **Fase 3**: Lanza la *Gran Ráfaga Salina*. Pipo debe usar su escudo de celofán brillante desvío reflectante para devolver el rayo y purificar a Lord Salitre.

---

### **4. Mecánicas de Juego, Economía e Interacción**

#### **4.1 Meta-Progresión y Sistema de Desbloqueo de Islas**
El juego incorpora una economía circular de persistencia (`localStorage: sugarsprint_save`) donde las monedas recolectadas permiten comprar el acceso a nuevas islas flotantes en el **Mapa de Dulcelandia**:
* **Isla 1 (Bosque de Algodón)**: Desbloqueada por defecto ($0 \text{ monedas}$).
* **Isla 2 (Río de Gominola)**: Requiere $50 \text{ Bolitas de Anís}$ para retirar el candado de caramelo amargo.
* **Isla 3 (Cumbre de Chocolate Negro)**: Requiere $120 \text{ Bolitas de Anís}$ para abrir el portal volcánico a la guarida de Lord Salitre.
* **Recompensa por Victoria**: Superar cualquier nivel otorga un bonus estelar de $+30 \text{ Bolitas de Anís}$ directas a la cartera del jugador, incentivando la rejugabilidad para desbloquear las etapas superiores.

#### **4.2 Coleccionables**
* **Bolitas de Anís (Moneda Común)**:
  * Valor: +10 puntos y moneda de curso legal para desbloqueo de islas.
  * Ubicación: Línea dorada de guiado por todo el nivel.
* **Chispas Dulces (Puntos Clave)**:
  * Cantidad: 3 por nivel.
  * Función: Desbloquear skins especiales en el menú principal (Pipo Menta, Pipo Mora Azul, Pipo Dorado).
* **Fresas Glaseadas (Curación)**:
  * Función: Restaura 1 Corazón de Azúcar de la **Barra de Dulzor** (Máximo 3 Corazones).

#### **4.2 Barreras y Checkpoints**
* **Barreras de Regaliz**: Puertas de caramelo reforzado que requieren realizar un *Rebote de Gelatina* sobre el interruptor principal.
* **Puestos de Bastón de Caramelo (Checkpoints)**: Postes en espiral blanca y roja que se encienden con chispas de confeti al ser tocados. Guardan la posición del jugador inmediatamente.

---

### **5. Juicy Game Feel, VFX, Optimización y Shaders**

#### **5.1 Técnicas de "Juicy Game Feel"**
1. **Squash & Stretch Dinámico**:
   * Al saltar: Escala $(X: 0.7, Y: 1.4, Z: 0.7)$.
   * Al aterrizar: Escala $(X: 1.4, Y: 0.6, Z: 1.4)$.
   * Interpolación elástica tipo $EaseOutElastic$.
2. **Sistema de Partículas de Confeti**:
   * Al recoger Bolitas de Anís: Explosión radial de 15 micro-partículas cuadradas multicolor (`#FF1493`, `#00FFFF`, `#FFD700`).
   * Al aterrizar con *Rebote de Gelatina*: Anillo de ondas de azúcar en polvo (`#FFFFFF`).

#### **5.2 Mejoras de Rendimiento y Optimización Gráfica**
* **Reutilización de Geometrías y Materiales (Instancing / Shared Assets)**: Instancias compartidas para monedas, chispas y plataformas de nivel, minimizando draw calls.
* **Ajuste de Pixel Ratio**: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` para evitar sobrecoste en pantallas 4K y móviles de alta densidad.
* **Frustum Culling y Sombras Optimizadas**: Mapas de sombra acotados a la zona jugable con `PCFSoftShadowMap` para sombras suaves y de alto rendimiento.
* **Garbage Collection Optimization**: Reutilización de vectores temporales (`THREE.Vector3`) en el loop de actualización (`animate`) para mantener 60 FPS estables sin hipos de memoria.

#### **5.3 Renderizado y Shaders en Three.js**
* **Material Gominola (Pipo)**:
  * `MeshPhysicalMaterial` con `roughness: 0.1`, `metalness: 0.1`, `transmission: 0.6`, `ior: 1.4`, `clearcoat: 1.0`, `thickness: 0.8`.
* **Iluminación**:
  * Luz Ambiental pastel suave (`#FFF0F5`, intensidad 0.8).
  * Luz Direccional Principal (`#FFFFFF`, intensidad 1.5) con sombras suavemente filtradas (*PCFSoftShadowMap*).

#### **5.4 Especificación de Audio Sintético (Web Audio API)**
* **Jump Sound**: Frecuencia ascendente rápida de $150 \text{ Hz}$ a $600 \text{ Hz}$ tipo sine wave con envolvente corta ($0.15 \text{ s}$).
* **Coin Pickup**: Arpegio rápido de dos tonos ($1046 \text{ Hz}$ - C6 y $1318 \text{ Hz}$ - E6) tipo triangle wave.
* **Bounce Sound**: Frecuencia descendente-ascendente elástica tipo boing.
* **Hit Damage**: Ruido blanco filtrado paso bajo con envolvente rápida.
