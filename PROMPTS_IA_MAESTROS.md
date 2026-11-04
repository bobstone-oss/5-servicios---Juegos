# Documento de Prompts Maestros e Instrucción de Rol para IA Generativa
## **Sugar Sprint: La Búsqueda del Cristal de Caramelo**

---

### **1. Instrucción de Rol Maestra (System Prompt y Prompt de Rol)**

```text
SYSTEM PROMPT / PROMPT DE ROL / ROLE INSTRUCTION:
Actúa como un Diseñador de Juegos Senior y Director de Arte especializado en títulos casuales y de plataformas con estética visual inspirada directamente en Candy Crush Saga, Super Mario 3D World y Katamari Damacy.
Tu objetivo es dirigir, diseñar y estructurar assets de arte 3D, lógica de juego, efectos sonoros, paleta visual y narrativa para un título de aventura lineal corto de estética confitada y jugosa (juicy game feel).

Especialidades requeridas:
1. Dirección de Arte 3D: Superficies de caramelo pulido, materiales traslúcidos tipo goma, dispersión bajo la superficie (Subsurface Scattering), iluminaciones pastel suaves y reflejos especulares de glaseado recien horneado.
2. Diseño de Sistemas de Juego: Movimiento elástico, dinámicas de Squash & Stretch, curvas de dificultad gratificantes y batallas de jefes basadas en patrones telegrafiados.
3. Audio y Feedback Sensorial: Paisajes sonoros alegres, efectos de sonido sintetizados jugosos (bouncy SFX) y partículas de confeti/chispas de azúcar al interactuar.

Cuando respondas o generes especificaciones para este proyecto, mantén una terminología técnica precisa de gamedev (hitboxes, shaders, webgl, easing functions) fusionada con metáforas gastronómicas de repostería y confitería.
```

---

### **2. Prompts de Generación de Arte 3D y Concept Art (Midjourney v6 / DALL-E 3)**

#### **2.1 Menú Principal y Pantalla de Título Candy Crush**
```text
PROMPT MIDJOURNEY / DALL-E 3:
Mobile casual platformer game title screen and main menu mockup for "SUGAR SPRINT: La Búsqueda del Cristal de Caramelo". Huge glossy 3D letters made of strawberry glazed candy with golden sugar sparkles and rainbow syrup dripping. In the center, three juicy rounded candy buttons labeled "JUGAR", "TIENDA", "OPCIONES" with thick cartoonish borders and 3D squash depth. In the pastel background, floating pink cotton candy clouds and shiny lollipop hills, Candy Crush Saga and Super Mario 3D World art style, vibrant chromatic palette, volumetric lighting, 8k render --ar 16:9 --v 6.0
```

#### **2.2 Protagonista: Pipo, el Héroe de Gominola con Barba de Chocolate**
```text
PROMPT MIDJOURNEY / DALL-E 3:
3D isometric character render of Pipo, a brave stylized adventurer hero made of hyper-glossy translucent strawberry red jelly gummy material, completely smooth and shiny head reflecting studio highlights, lush sculpted dark chocolate and licorice beard with a curly confectionery moustache, glossy candy eyes, wearing a tiny cape made of shiny metallic gold candy wrapper and a small waffle-textured backpack. Jumping across floating candy islands with clouds, Candy Crush Saga and Super Mario 3D World mobile game art style, studio lighting, soft pastel shadows, octane render, 8k resolution, ultra-detailed candy texture, vibrant chromatic color palette --ar 1:1 --v 6.0
```

#### **2.3 Villano: Lord Salitre**
```text
PROMPT MIDJOURNEY / DALL-E 3:
3D isometric villain render of Lord Salt, a dry angular sea salt crystal warrior, rough matte grey and white salt texture, wearing dark burnt sugar coal armor, holding a dry pretzel staff. Strong aesthetic contrast with glossy juicy candy world, sharp geometric salt crystals, Candy Crush Saga antagonist style, octane render, clean edges, studio lighting --ar 1:1 --v 6.0
```

#### **2.4 Cinemática de Epílogo y Teaser de la Expansión (El Valle de los Masmelos Olvidados - DLC 1.5)**
```text
PROMPT MIDJOURNEY / DALL-E 3:
Isometric concept art for a fantasy candy expansion level: "The Valley of the Forgotten Marshmallows". High-altitude sky islands made of giant toasted marshmallow mounds floating over meringue fluff, elastic bubblegum ziplines connecting fluffy cliffs, effervescent soda crystal geysers shooting colorful sparkling bubbles into a lavender sky, cute, whimsical and adventurous, studio lighting, octane render 8k --ar 16:9 --v 6.0
```

#### **2.5 Cinemática de Cliffhanger y Teaser de la Secuela (Sugar Sprint 2: El Despertar del Océano Amargo)**
```text
PROMPT MIDJOURNEY / DALL-E 3:
Cinematic concept art for game sequel cliffhanger: "Sugar Sprint 2: The Bitter Ocean Awakening". A gigantic dark abyss opening in a radiant pink syrup sea, ominous white salt brine tides rising against candy shorelines. In the distant shadows, a titanic colossal salt sea monster with a crown of jagged crystal salt and dark licorice tentacles rises from the bitter brine depth. In the foreground, Pipo on a tiny waffle sailboat gripping his golden wrapper cape looking bravely into the storm, dramatic contrast between juicy candy and dark saline doom, 8k octane render, cinematic lighting --ar 16:9 --v 6.0
```

#### **2.6 Tienda de Skins de Pipo**
```text
PROMPT MIDJOURNEY / DALL-E 3:
Casual mobile game wardrobe skin shop screen for gummy bear adventurer. Four podiums made of frosted macarons displaying cosmetic variants: Strawberry Red (default), Fresh Spearmint Green, Indigo Blueberry Gum, and Glazed Honey Gold with sugar glitter. Golden anise candy coin counter in the top bar, glossy user interface, juicy candy buttons, clean isometric composition, octane render --ar 16:9 --v 6.0
```

---

### **3. Prompts para Generación de Audio y Música (Stable Audio / Suno / Udio)**

#### **3.1 BGM Mundo 1 (Bosque de Algodón de Azúcar)**
```text
PROMPT STABLE AUDIO / SUNO:
Upbeat casual platformer background music, cheerful marimba, plucky xylophone, soft bouncy synth bassline, whimsical whistling melodies, cute and joyful candy world atmosphere, 120 BPM, clean game soundtrack mix.
```

#### **3.2 BGM Mundo 3 & Batalla contra Lord Salitre**
```text
PROMPT STABLE AUDIO / SUNO:
Epic casual boss battle music in a chocolate volcano, intense orchestral marimba, brass hits, fast bouncy tempo, playful yet dramatic orchestral percussion, candy kingdom showdown, 140 BPM, high energy.
```

#### **3.3 Fanfarria de Victoria y Fanfarria Ominosa de Cliffhanger (Epílogo)**
```text
PROMPT STABLE AUDIO / SUNO:
Grand triumphant orchestral candy fanfare transitioning into sudden ominous deep sub-bass tremor, mysterious saline wind ambiance, echoing dramatic chord revealing a sequel teaser, cinematic trailer audio cue, 30 seconds.
```

---

### **4. Prompts para Asistentes de Código y Motor 3D (Three.js / WebGL / Physics)**

#### **4.1 Prompt de Generación de Material Gominola (Three.js Shader / Material)**
```text
PROMPT LLM CODE GENERATOR:
Write a JavaScript function in Three.js that returns a MeshPhysicalMaterial configured for a strawberry gummy hero.
Requirements:
- Roughness: 0.1
- Metalness: 0.05
- Color: `#FF1E43` (Vibrant Strawberry Red)
- Transmission: 0.65
- Opacity: 1.0
- IOR: 1.45 (Gelatin index)
- Reflectivity: 0.9
- Clearcoat: 1.0
- ClearcoatRoughness: 0.1
- Subsurface Scattering emulation via thickness: 0.8
Return the code as a modular ES6 class exported material utility.
```

#### **4.2 Prompt de Generación del Sistema de Partículas de Confeti**
```text
PROMPT LLM CODE GENERATOR:
Write a Three.js ParticleSystem class for candy confetti burst upon coin collection.
Requirements:
- Emits 20 small colorful square planes (`#FF69B4`, `#32CD32`, `#FFD700`, `#00FFFF`).
- Particles burst radially with random initial velocities in XYZ.
- Apply gravity ($Y = -9.8 \text{ m/s}^2$) and rotation spin on particle update.
- Recycle or dispose particles after 0.8 seconds lifetime.
- Fast performance, non-blocking render loop.
```
