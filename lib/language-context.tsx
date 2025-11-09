"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "pt-BR" | "en" | "es"

export type Currency = {
  symbol: string
  code: string
  monthlyPrice: string
  annualPrice: string
  annualTotal: string
}

const currencies: Record<Language, Currency> = {
  "pt-BR": {
    symbol: "R$",
    code: "BRL",
    monthlyPrice: "29,90",
    annualPrice: "19,90",
    annualTotal: "238,80",
  },
  en: {
    symbol: "$",
    code: "USD",
    monthlyPrice: "7.99",
    annualPrice: "4.99",
    annualTotal: "59.88",
  },
  es: {
    symbol: "€",
    code: "EUR",
    monthlyPrice: "6,99",
    annualPrice: "4,49",
    annualTotal: "53,88",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  currency: Currency
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt-BR")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && ["pt-BR", "en", "es"].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const currency = currencies[language]

  const translations: Record<string, Record<Language, string>> = {
    // Language selector
    languageCode: { "pt-BR": "PT", en: "EN", es: "ES" },

    // Welcome page
    welcomeTitle: {
      "pt-BR": "Controle suas calorias de forma fácil",
      en: "Control your calories the easy way",
      es: "Controla tus calorías de forma fácil",
    },
    startQuiz: { "pt-BR": "Iniciar Quiz", en: "Start Quiz", es: "Iniciar Quiz" },
    haveAccount: {
      "pt-BR": "Já tem uma conta? Entre aqui",
      en: "Already have an account? Sign in here",
      es: "¿Ya tienes una cuenta? Entra aquí",
    },

    installApp: { "pt-BR": "Instale o App", en: "Install the App", es: "Instala la App" },
    installDescription: {
      "pt-BR":
        "Para melhor experiência, instale o CalorIA na tela inicial do seu celular antes de continuar. A IA que vê seu prato e conta as calorias.",
      en: "For the best experience, install CalorIA on your phone's home screen before continuing. AI that sees your plate and counts the calories.",
      es: "Para una mejor experiencia, instala CalorIA en la pantalla de inicio de tu teléfono antes de continuar. La IA que ve tu plato y cuenta las calorías.",
    },
    howToInstall: { "pt-BR": "Como instalar:", en: "How to install:", es: "Cómo instalar:" },
    installStep1: {
      "pt-BR": "Toque no botão 'Instalar App' abaixo",
      en: "Tap the 'Install App' button below",
      es: "Toca el botón 'Instalar App' abajo",
    },
    installStep2: {
      "pt-BR": "Confirme a instalação quando solicitado",
      en: "Confirm the installation when prompted",
      es: "Confirma la instalación cuando se solicite",
    },
    installStep3: {
      "pt-BR": "O ícone do CalorIA aparecerá na sua tela inicial",
      en: "The CalorIA icon will appear on your home screen",
      es: "El ícono de CalorIA aparecerá en tu pantalla de inicio",
    },
    cantSeeInstall: {
      "pt-BR": "Não vê a opção de instalar?",
      en: "Can't see the install option?",
      es: "¿No ves la opción de instalar?",
    },
    installIOS: {
      "pt-BR": "No iOS/Safari: Toque em Compartilhar → Adicionar à Tela de Início",
      en: "On iOS/Safari: Tap Share → Add to Home Screen",
      es: "En iOS/Safari: Toca Compartir → Agregar a la pantalla de inicio",
    },
    installAndroid: {
      "pt-BR": "No Android/Chrome: Toque em ⋮ → Instalar app",
      en: "On Android/Chrome: Tap ⋮ → Install app",
      es: "En Android/Chrome: Toca ⋮ → Instalar app",
    },
    installAppButton: { "pt-BR": "Instalar App", en: "Install App", es: "Instalar App" },
    skipForNow: { "pt-BR": "Pular por enquanto", en: "Skip for now", es: "Saltar por ahora" },

    // Quiz steps
    step1Title: {
      "pt-BR": "Quantos treinos você faz por semana?",
      en: "How many workouts do you do per week?",
      es: "¿Cuántos entrenamientos haces por semana?",
    },
    step1Subtitle: {
      "pt-BR": "Isso será usado para calibrar seu plano personalizado",
      en: "This will be used to calibrate your personalized plan",
      es: "Esto se usará para calibrar tu plan personalizado",
    },
    step1Option1: { "pt-BR": "0-2", en: "0-2", es: "0-2" },
    step1Option1Sub: {
      "pt-BR": "Treinos de vez em quando",
      en: "Occasional workouts",
      es: "Entrenamientos ocasionales",
    },
    step1Option2: { "pt-BR": "3-5", en: "3-5", es: "3-5" },
    step1Option2Sub: {
      "pt-BR": "Alguns treinos por semana",
      en: "Some workouts per week",
      es: "Algunos entrenamientos por semana",
    },
    step1Option3: { "pt-BR": "6+", en: "6+", es: "6+" },
    step1Option3Sub: {
      "pt-BR": "Atleta dedicado",
      en: "Dedicated athlete",
      es: "Atleta dedicado",
    },

    step2Title: { "pt-BR": "Qual é seu objetivo?", en: "What is your goal?", es: "¿Cuál es tu objetivo?" },
    step2Subtitle: {
      "pt-BR": "Escolha seu objetivo principal",
      en: "Choose your main goal",
      es: "Elige tu objetivo principal",
    },
    step2Option1: { "pt-BR": "Perder Peso", en: "Lose Weight", es: "Perder Peso" },
    step2Option2: { "pt-BR": "Manter Peso", en: "Maintain Weight", es: "Mantener Peso" },
    step2Option3: { "pt-BR": "Ganhar Peso", en: "Gain Weight", es: "Ganar Peso" },

    step3Title: { "pt-BR": "Escolha seu Gênero", en: "Choose your Gender", es: "Elige tu Género" },
    step3Subtitle: {
      "pt-BR": "Isso será usado para calibrar seu plano personalizado",
      en: "This will be used to calibrate your personalized plan",
      es: "Esto se usará para calibrar tu plan personalizado",
    },
    step3Option1: { "pt-BR": "Masculino", en: "Male", es: "Masculino" },
    step3Option2: { "pt-BR": "Feminino", en: "Female", es: "Femenino" },
    step3Option3: { "pt-BR": "Outro", en: "Other", es: "Otro" },

    step3InfoTitle: {
      "pt-BR": "CalorIA cria resultados duradouros",
      en: "CalorIA creates lasting results",
      es: "CalorIA crea resultados duraderos",
    },
    step3InfoSubtitle: {
      "pt-BR": "80% dos usuários do CalorIA mantêm seu peso estável mesmo depois de 6 meses",
      en: "80% of CalorIA users maintain their stable weight even after 6 months",
      es: "80% de los usuarios de CalorIA mantienen su peso estable incluso después de 6 meses",
    },

    step4Title: { "pt-BR": "Altura & Peso", en: "Height & Weight", es: "Altura y Peso" },
    step4Subtitle: {
      "pt-BR": "Isso será usado para calibrar seu plano personalizado",
      en: "This will be used to calibrate your personalized plan",
      es: "Esto se usará para calibrar tu plan personalizado",
    },
    height: { "pt-BR": "Altura (cm)", en: "Height (cm)", es: "Altura (cm)" },
    weight: { "pt-BR": "Peso (kg)", en: "Weight (kg)", es: "Peso (kg)" },

    step7Title: {
      "pt-BR": "Qual é seu peso desejado?",
      en: "What is your target weight?",
      es: "¿Cuál es tu peso deseado?",
    },
    step7Lose: { "pt-BR": "Perder peso", en: "Lose weight", es: "Perder peso" },
    step7Gain: { "pt-BR": "Ganhar peso", en: "Gain weight", es: "Ganar peso" },
    step7Maintain: { "pt-BR": "Manter peso", en: "Maintain weight", es: "Mantener peso" },

    step6Title: { "pt-BR": "Quando você nasceu?", en: "When were you born?", es: "¿Cuándo naciste?" },
    step6Subtitle: {
      "pt-BR": "Isso será usado para calibrar seu plano personalizado",
      en: "This will be used to calibrate your personalized plan",
      es: "Esto se usará para calibrar tu plan personalizado",
    },
    day: { "pt-BR": "Dia", en: "Day", es: "Día" },
    month: { "pt-BR": "Mês", en: "Month", es: "Mes" },
    year: { "pt-BR": "Ano", en: "Year", es: "Año" },

    step8Title: {
      "pt-BR": "Onde você ouviu falar do CalorIA?",
      en: "Where did you hear about CalorIA?",
      es: "¿Dónde escuchaste sobre CalorIA?",
    },
    step8Subtitle: {
      "pt-BR": "Isso nos ajuda a melhorar nossa comunicação",
      en: "This helps us improve our communication",
      es: "Esto nos ayuda a mejorar nuestra comunicación",
    },

    other: { "pt-BR": "Outro", en: "Other", es: "Otro" },

    continue: { "pt-BR": "Continuar", en: "Continue", es: "Continuar" },

    // Subscription page
    choosePlan: { "pt-BR": "Escolha seu plano", en: "Choose your plan", es: "Elige tu plan" },
    planSubtitle: {
      "pt-BR": "Plano anual com 3 dias grátis, cancele quando quiser",
      en: "Annual plan with 3 days free, cancel anytime",
      es: "Plan anual con 3 días gratis, cancela cuando quieras",
    },
    recommended: { "pt-BR": "RECOMENDADO", en: "RECOMMENDED", es: "RECOMENDADO" },
    save33: { "pt-BR": "Economize 33%", en: "Save 33%", es: "Ahorra 33%" },
    perMonth: { "pt-BR": "/mês", en: "/month", es: "/mes" },
    perYear: { "pt-BR": "/ano", en: "/year", es: "/año" },
    annual: { "pt-BR": "Anual", en: "Annual", es: "Anual" },
    monthly: { "pt-BR": "Mensal", en: "Monthly", es: "Mensual" },
    freeTrial: { "pt-BR": "✓ 3 dias grátis", en: "✓ 3 days free", es: "✓ 3 días gratis" },
    whatsIncluded: { "pt-BR": "O que está incluído:", en: "What's included:", es: "Qué está incluido:" },
    feature1: {
      "pt-BR": "Análise ilimitada de fotos",
      en: "Unlimited photo analysis",
      es: "Análisis ilimitado de fotos",
    },
    feature2: {
      "pt-BR": "Banco de dados de pratos brasileiros",
      en: "Brazilian dishes database",
      es: "Base de datos de platos brasileños",
    },
    feature3: {
      "pt-BR": "Histórico completo de refeições",
      en: "Complete meal history",
      es: "Historial completo de comidas",
    },
    feature4: {
      "pt-BR": "Relatórios nutricionais detalhados",
      en: "Detailed nutritional reports",
      es: "Informes nutricionales detallados",
    },
    feature5: { "pt-BR": "Metas personalizadas", en: "Personalized goals", es: "Metas personalizadas" },
    feature6: { "pt-BR": "Suporte prioritário", en: "Priority support", es: "Soporte prioritario" },
    trialInfo: {
      "pt-BR": "3 dias grátis, depois",
      en: "3 days free, then",
      es: "3 días gratis, luego",
    },
    trialInfoEnd: {
      "pt-BR": "Cancele a qualquer momento.",
      en: "Cancel anytime.",
      es: "Cancela en cualquier momento.",
    },
    monthlyInfo: { "pt-BR": "Cobrança de", en: "Charge of", es: "Cargo de" },
    startTrial: { "pt-BR": "Começar teste grátis", en: "Start free trial", es: "Comenzar prueba gratis" },
    subscribeNow: { "pt-BR": "Assinar agora", en: "Subscribe now", es: "Suscribirse ahora" },
    processing: { "pt-BR": "Processando...", en: "Processing...", es: "Procesando..." },
    terms: {
      "pt-BR": "Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade",
      en: "By continuing, you agree to our Terms of Service and Privacy Policy",
      es: "Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad",
    },
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, currency, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
