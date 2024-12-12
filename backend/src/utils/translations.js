export const translations = {
  en: {
    welcome: "Welcome Back",
    signInContinue: "Sign in to Continue your Journey",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    signIn: "Sign In",
    invalidCredentials: "Invalid email or password",
    // Add more translations
  },
  bn: {
    welcome: "ফিরে আসার জন্য স্বাগতম",
    signInContinue: "আপনার যাত্রা চালিয়ে যেতে সাইন ইন করুন",
    email: "ইমেইল",
    password: "পাসওয়ার্ড",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    signIn: "সাইন ইন",
    invalidCredentials: "ভুল ইমেইল অথবা পাসওয়ার্ড",
    // Add more translations
  }
};

export const getTranslation = (key, language = 'en') => {
  return translations[language]?.[key] || translations.en[key] || key;
};