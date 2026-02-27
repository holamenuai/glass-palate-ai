export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'zh' | 'ar' | 'pl';

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  zh: '简体中文',
  ar: 'العربية',
  pl: 'Polski',
};

type TranslationKeys = {
  title: string;
  subtitle: string;
  howCanIHelp: string;
  speak: string;
  write: string;
  selectAllergies: string;
  quickAsk: string;
  veggie: string;
  findMyVibe: string;
  vegan: string;
  findSafeDishes: string;
  disclaimer: string;
  poweredBy: string;
  language: string;
  gluten: string;
  crustaceans: string;
  eggs: string;
  fish: string;
  peanuts: string;
  soy: string;
  dairy: string;
  nuts: string;
  celery: string;
  mustard: string;
  sesame: string;
  sulphites: string;
  lupin: string;
  molluscs: string;
  // Query phrase templates
  queryVeggiePrefix: string;
  queryVeggieStandalone: string;
  queryVibePrefix: string;
  queryVibeStandalone: string;
  queryVeganPrefix: string;
  queryVeganStandalone: string;
  queryAllergyOnly: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    title: 'Franco Manca',
    subtitle: 'Your AI Dining Concierge. Specialized in allergy safety, ingredients, and finding your perfect dish.',
    howCanIHelp: 'How can I help you?',
    speak: 'Speak',
    write: 'Write',
    selectAllergies: 'SELECT ALLERGIES',
    quickAsk: 'QUICK ASK',
    veggie: 'Veggie',
    findMyVibe: 'Find My Vibe',
    vegan: 'Vegan',
    findSafeDishes: 'Find Safe Dishes',
    disclaimer: 'While we take every precaution, we cannot fully guarantee a cross-contamination-free environment.',
    poweredBy: 'Powered by',
    language: 'Language',
    gluten: 'Gluten', crustaceans: 'Crustaceans', eggs: 'Eggs', fish: 'Fish', peanuts: 'Peanuts',
    soy: 'Soy', dairy: 'Dairy', nuts: 'Nuts', celery: 'Celery', mustard: 'Mustard',
    sesame: 'Sesame', sulphites: 'Sulphites', lupin: 'Lupin', molluscs: 'Molluscs',
    queryVeggiePrefix: 'Show me vegetarian dishes that are also free from:',
    queryVeggieStandalone: 'Show me vegetarian options from the menu.',
    queryVibePrefix: 'Show me popular dishes that are also free from:',
    queryVibeStandalone: 'Help me find my vibe.',
    queryVeganPrefix: 'Show me vegan dishes that are also free from:',
    queryVeganStandalone: 'Show me vegan options from the menu.',
    queryAllergyOnly: 'I am allergic to {allergies}. Based on the menu, what can I safely eat?',
  },
  es: {
    title: 'Franco Manca',
    subtitle: 'Tu Concierge Gastronómico IA. Especializado en seguridad alérgica, ingredientes y encontrar tu plato perfecto.',
    howCanIHelp: '¿Cómo puedo ayudarte?',
    speak: 'Hablar',
    write: 'Escribir',
    selectAllergies: 'SELECCIONAR ALERGIAS',
    quickAsk: 'PREGUNTA RÁPIDA',
    veggie: 'Vegetariano',
    findMyVibe: 'Mi Estilo',
    vegan: 'Vegano',
    findSafeDishes: 'Buscar Platos Seguros',
    disclaimer: 'Aunque tomamos todas las precauciones, no podemos garantizar completamente un entorno libre de contaminación cruzada.',
    poweredBy: 'Desarrollado por',
    language: 'Idioma',
    gluten: 'Gluten', crustaceans: 'Crustáceos', eggs: 'Huevos', fish: 'Pescado', peanuts: 'Cacahuetes',
    soy: 'Soja', dairy: 'Lácteos', nuts: 'Frutos secos', celery: 'Apio', mustard: 'Mostaza',
    sesame: 'Sésamo', sulphites: 'Sulfitos', lupin: 'Altramuz', molluscs: 'Moluscos',
    queryVeggiePrefix: 'Muéstrame platos vegetarianos que también estén libres de:',
    queryVeggieStandalone: 'Muéstrame opciones vegetarianas del menú.',
    queryVibePrefix: 'Muéstrame platos populares que también estén libres de:',
    queryVibeStandalone: 'Ayúdame a encontrar mi estilo.',
    queryVeganPrefix: 'Muéstrame platos veganos que también estén libres de:',
    queryVeganStandalone: 'Muéstrame opciones veganas del menú.',
    queryAllergyOnly: 'Soy alérgico a {allergies}. Según el menú, ¿qué puedo comer de forma segura?',
  },
  fr: {
    title: 'Franco Manca',
    subtitle: 'Votre Concierge Culinaire IA. Spécialisé dans la sécurité allergique, les ingrédients et la recherche de votre plat parfait.',
    howCanIHelp: 'Comment puis-je vous aider ?',
    speak: 'Parler',
    write: 'Écrire',
    selectAllergies: 'SÉLECTIONNER LES ALLERGIES',
    quickAsk: 'QUESTION RAPIDE',
    veggie: 'Végétarien',
    findMyVibe: 'Mon Style',
    vegan: 'Végan',
    findSafeDishes: 'Trouver des Plats Sûrs',
    disclaimer: 'Bien que nous prenions toutes les précautions, nous ne pouvons pas garantir un environnement totalement exempt de contamination croisée.',
    poweredBy: 'Propulsé par',
    language: 'Langue',
    gluten: 'Gluten', crustaceans: 'Crustacés', eggs: 'Œufs', fish: 'Poisson', peanuts: 'Arachides',
    soy: 'Soja', dairy: 'Laitier', nuts: 'Noix', celery: 'Céleri', mustard: 'Moutarde',
    sesame: 'Sésame', sulphites: 'Sulfites', lupin: 'Lupin', molluscs: 'Mollusques',
    queryVeggiePrefix: 'Montrez-moi des plats végétariens qui sont aussi sans:',
    queryVeggieStandalone: 'Montrez-moi les options végétariennes du menu.',
    queryVibePrefix: 'Montrez-moi des plats populaires qui sont aussi sans:',
    queryVibeStandalone: 'Aidez-moi à trouver mon style.',
    queryVeganPrefix: 'Montrez-moi des plats végétaliens qui sont aussi sans:',
    queryVeganStandalone: 'Montrez-moi les options végétaliennes du menu.',
    queryAllergyOnly: 'Je suis allergique à {allergies}. D\'après le menu, que puis-je manger en toute sécurité?',
  },
  de: {
    title: 'Franco Manca',
    subtitle: 'Ihr KI-Dining-Concierge. Spezialisiert auf Allergiesicherheit, Zutaten und die Suche nach Ihrem perfekten Gericht.',
    howCanIHelp: 'Wie kann ich Ihnen helfen?',
    speak: 'Sprechen',
    write: 'Schreiben',
    selectAllergies: 'ALLERGIEN AUSWÄHLEN',
    quickAsk: 'SCHNELLE FRAGE',
    veggie: 'Vegetarisch',
    findMyVibe: 'Mein Stil',
    vegan: 'Vegan',
    findSafeDishes: 'Sichere Gerichte Finden',
    disclaimer: 'Obwohl wir alle Vorsichtsmaßnahmen treffen, können wir eine kreuzfreie Umgebung nicht vollständig garantieren.',
    poweredBy: 'Bereitgestellt von',
    language: 'Sprache',
    gluten: 'Gluten', crustaceans: 'Krebstiere', eggs: 'Eier', fish: 'Fisch', peanuts: 'Erdnüsse',
    soy: 'Soja', dairy: 'Milch', nuts: 'Nüsse', celery: 'Sellerie', mustard: 'Senf',
    sesame: 'Sesam', sulphites: 'Sulfite', lupin: 'Lupine', molluscs: 'Weichtiere',
    queryVeggiePrefix: 'Zeig mir vegetarische Gerichte, die auch frei von:',
    queryVeggieStandalone: 'Zeig mir vegetarische Optionen aus der Speisekarte.',
    queryVibePrefix: 'Zeig mir beliebte Gerichte, die auch frei von:',
    queryVibeStandalone: 'Hilf mir, meinen Stil zu finden.',
    queryVeganPrefix: 'Zeig mir vegane Gerichte, die auch frei von:',
    queryVeganStandalone: 'Zeig mir vegane Optionen aus der Speisekarte.',
    queryAllergyOnly: 'Ich bin allergisch gegen {allergies}. Was kann ich laut Speisekarte sicher essen?',
  },
  it: {
    title: 'Franco Manca',
    subtitle: 'Il tuo Concierge Gastronomico IA. Specializzato nella sicurezza allergica, ingredienti e nella ricerca del tuo piatto perfetto.',
    howCanIHelp: 'Come posso aiutarti?',
    speak: 'Parla',
    write: 'Scrivi',
    selectAllergies: 'SELEZIONA ALLERGIE',
    quickAsk: 'DOMANDA RAPIDA',
    veggie: 'Vegetariano',
    findMyVibe: 'Il Mio Stile',
    vegan: 'Vegano',
    findSafeDishes: 'Trova Piatti Sicuri',
    disclaimer: 'Pur prendendo ogni precauzione, non possiamo garantire completamente un ambiente privo di contaminazione incrociata.',
    poweredBy: 'Powered by',
    language: 'Lingua',
    gluten: 'Glutine', crustaceans: 'Crostacei', eggs: 'Uova', fish: 'Pesce', peanuts: 'Arachidi',
    soy: 'Soia', dairy: 'Latticini', nuts: 'Frutta a guscio', celery: 'Sedano', mustard: 'Senape',
    sesame: 'Sesamo', sulphites: 'Solfiti', lupin: 'Lupino', molluscs: 'Molluschi',
    queryVeggiePrefix: 'Mostrami piatti vegetariani che siano anche privi di:',
    queryVeggieStandalone: 'Mostrami le opzioni vegetariane dal menu.',
    queryVibePrefix: 'Mostrami piatti popolari che siano anche privi di:',
    queryVibeStandalone: 'Aiutami a trovare il mio stile.',
    queryVeganPrefix: 'Mostrami piatti vegani che siano anche privi di:',
    queryVeganStandalone: 'Mostrami le opzioni vegane dal menu.',
    queryAllergyOnly: 'Sono allergico a {allergies}. In base al menu, cosa posso mangiare in sicurezza?',
  },
  zh: {
    title: 'Franco Manca',
    subtitle: '您的AI用餐管家。专注于过敏安全、食材和为您找到完美的菜肴。',
    howCanIHelp: '我能帮您什么？',
    speak: '语音',
    write: '文字',
    selectAllergies: '选择过敏原',
    quickAsk: '快速提问',
    veggie: '素食',
    findMyVibe: '我的风格',
    vegan: '纯素',
    findSafeDishes: '查找安全菜肴',
    disclaimer: '虽然我们采取了一切预防措施，但我们无法完全保证无交叉污染的环境。',
    poweredBy: '技术支持',
    language: '语言',
    gluten: '麸质', crustaceans: '甲壳类', eggs: '鸡蛋', fish: '鱼', peanuts: '花生',
    soy: '大豆', dairy: '乳制品', nuts: '坚果', celery: '芹菜', mustard: '芥末',
    sesame: '芝麻', sulphites: '亚硫酸盐', lupin: '羽扇豆', molluscs: '软体动物',
    queryVeggiePrefix: '请展示不含以下成分的素食菜品：',
    queryVeggieStandalone: '请展示菜单中的素食选项。',
    queryVibePrefix: '请展示不含以下成分的热门菜品：',
    queryVibeStandalone: '帮我找到适合我的风格。',
    queryVeganPrefix: '请展示不含以下成分的纯素菜品：',
    queryVeganStandalone: '请展示菜单中的纯素选项。',
    queryAllergyOnly: '我对{allergies}过敏。根据菜单，我可以安全地吃什么？',
  },
  ar: {
    title: 'Franco Manca',
    subtitle: 'مساعدك الذكي لتناول الطعام. متخصص في سلامة الحساسية والمكونات وإيجاد طبقك المثالي.',
    howCanIHelp: 'كيف يمكنني مساعدتك؟',
    speak: 'تحدث',
    write: 'اكتب',
    selectAllergies: 'اختر الحساسية',
    quickAsk: 'سؤال سريع',
    veggie: 'نباتي',
    findMyVibe: 'أسلوبي',
    vegan: 'نباتي صرف',
    findSafeDishes: 'ابحث عن أطباق آمنة',
    disclaimer: 'على الرغم من اتخاذ جميع الاحتياطات، لا يمكننا ضمان بيئة خالية تمامًا من التلوث المتبادل.',
    poweredBy: 'مدعوم من',
    language: 'اللغة',
    gluten: 'غلوتين', crustaceans: 'قشريات', eggs: 'بيض', fish: 'سمك', peanuts: 'فول سوداني',
    soy: 'صويا', dairy: 'ألبان', nuts: 'مكسرات', celery: 'كرفس', mustard: 'خردل',
    sesame: 'سمسم', sulphites: 'كبريتات', lupin: 'ترمس', molluscs: 'رخويات',
    queryVeggiePrefix: 'أرني أطباقاً نباتية خالية أيضاً من:',
    queryVeggieStandalone: 'أرني الخيارات النباتية من القائمة.',
    queryVibePrefix: 'أرني أطباقاً شائعة خالية أيضاً من:',
    queryVibeStandalone: 'ساعدني في إيجاد أسلوبي.',
    queryVeganPrefix: 'أرني أطباقاً نباتية صرفة خالية أيضاً من:',
    queryVeganStandalone: 'أرني الخيارات النباتية الصرفة من القائمة.',
    queryAllergyOnly: 'أنا أعاني من حساسية تجاه {allergies}. بناءً على القائمة، ماذا يمكنني أن آكل بأمان؟',
  },
  pl: {
    title: 'Franco Manca',
    subtitle: 'Twój AI Concierge Gastronomiczny. Specjalizacja w bezpieczeństwie alergicznym, składnikach i znajdowaniu idealnego dania.',
    howCanIHelp: 'Jak mogę Ci pomóc?',
    speak: 'Mów',
    write: 'Pisz',
    selectAllergies: 'WYBIERZ ALERGIE',
    quickAsk: 'SZYBKIE PYTANIE',
    veggie: 'Wegetariański',
    findMyVibe: 'Mój Styl',
    vegan: 'Wegański',
    findSafeDishes: 'Znajdź Bezpieczne Dania',
    disclaimer: 'Pomimo wszelkich środków ostrożności, nie możemy w pełni zagwarantować środowiska wolnego od zanieczyszczeń krzyżowych.',
    poweredBy: 'Wspierane przez',
    language: 'Język',
    gluten: 'Gluten', crustaceans: 'Skorupiaki', eggs: 'Jajka', fish: 'Ryby', peanuts: 'Orzeszki',
    soy: 'Soja', dairy: 'Nabiał', nuts: 'Orzechy', celery: 'Seler', mustard: 'Musztarda',
    sesame: 'Sezam', sulphites: 'Siarczyny', lupin: 'Łubin', molluscs: 'Mięczaki',
    queryVeggiePrefix: 'Pokaż mi dania wegetariańskie, które są również wolne od:',
    queryVeggieStandalone: 'Pokaż mi opcje wegetariańskie z menu.',
    queryVibePrefix: 'Pokaż mi popularne dania, które są również wolne od:',
    queryVibeStandalone: 'Pomóż mi znaleźć mój styl.',
    queryVeganPrefix: 'Pokaż mi dania wegańskie, które są również wolne od:',
    queryVeganStandalone: 'Pokaż mi opcje wegańskie z menu.',
    queryAllergyOnly: 'Mam alergię na {allergies}. Na podstawie menu, co mogę bezpiecznie zjeść?',
  },
};
