'use client';
import { createContext, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';

// ../../lib/service-category-inference.ts
function normalizeCategoryLabel(raw) {
  const t = raw.trim().replace(/\s+/g, " ");
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

// ../../lib/salon-service-categories.ts
function resolveServiceCategory(service) {
  return normalizeCategoryLabel(service.category ?? "");
}
function enrichServiceCategories(services) {
  const out = services.map((s) => ({
    ...s,
    category: resolveServiceCategory(s) || void 0
  }));
  let last = "";
  for (const item of out) {
    if (item.category) {
      last = item.category;
    } else if (last) {
      item.category = last;
    }
  }
  return out;
}
function buildServiceCategoryTabs(services) {
  const labels = /* @__PURE__ */ new Set();
  for (const svc of services) {
    const cat = resolveServiceCategory(svc);
    if (cat) labels.add(cat);
  }
  const sorted = [...labels].sort((a, b) => a.localeCompare(b, "bg"));
  return [{ id: null, label: "\u0412\u0441\u0438\u0447\u043A\u0438" }, ...sorted.map((cat) => ({ id: cat, label: cat }))];
}
function serviceMatchesCategory(service, selectedCategory) {
  if (!selectedCategory) return true;
  return resolveServiceCategory(service) === selectedCategory;
}

// ../../locales/bg.json
var bg_default = {
  booking: {
    modal: {
      ariaLabel: "\u0420\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F",
      titleDefault: "\u0420\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F",
      titleWithStaff: "\u043F\u0440\u0438 {name}",
      closeAria: "\u0417\u0430\u0442\u0432\u043E\u0440\u0438",
      confirmClose: "\u0421\u0438\u0433\u0443\u0440\u043D\u0438 \u043B\u0438 \u0441\u0442\u0435, \u0447\u0435 \u0438\u0441\u043A\u0430\u0442\u0435 \u0434\u0430 \u0437\u0430\u0442\u0432\u043E\u0440\u0438\u0442\u0435 \u0440\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F\u0442\u0430?",
      stepService: "\u0423\u0441\u043B\u0443\u0433\u0430",
      stepSpecialist: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442",
      stepTime: "\u0427\u0430\u0441",
      stepDetails: "\u0414\u0430\u043D\u043D\u0438",
      stepAria: "\u0421\u0442\u044A\u043F\u043A\u0430 {n}: {label}",
      selectedServices: "\u0418\u0437\u0431\u0440\u0430\u043D\u0438 \u0443\u0441\u043B\u0443\u0433\u0438",
      services: "\u0423\u0441\u043B\u0443\u0433\u0438",
      serviceCountOne: "{count} \u0443\u0441\u043B\u0443\u0433\u0430",
      serviceCountMany: "{count} \u0443\u0441\u043B\u0443\u0433\u0438",
      minSuffix: "\u043C\u0438\u043D",
      remove: "\u041F\u0440\u0435\u043C\u0430\u0445\u043D\u0438",
      removeAria: "\u041F\u0440\u0435\u043C\u0430\u0445\u043D\u0438 \u0443\u0441\u043B\u0443\u0433\u0430",
      addMoreServices: "\u0414\u043E\u0431\u0430\u0432\u0438 \u043E\u0449\u0435 \u0443\u0441\u043B\u0443\u0433\u0438",
      hideList: "\u0421\u043A\u0440\u0438\u0439 \u0441\u043F\u0438\u0441\u044A\u043A\u0430 \xB7 {count} \u0438\u0437\u0431\u0440\u0430\u043D\u0438",
      add: "\u0414\u043E\u0431\u0430\u0432\u0438",
      addService: "\u0414\u043E\u0431\u0430\u0432\u0438 \u0443\u0441\u043B\u0443\u0433\u0430",
      noServicesInCategory: "\u041D\u044F\u043C\u0430 \u0443\u0441\u043B\u0443\u0433\u0438 \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u0430\u0442\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F.",
      selectSpecialist: "\u0418\u0437\u0431\u0435\u0440\u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442",
      availableFor: "\u041D\u0430\u043B\u0438\u0447\u043D\u0438 \u0437\u0430",
      serviceUnavailable: "\u0422\u0430\u0437\u0438 \u0443\u0441\u043B\u0443\u0433\u0430 \u043D\u0435 \u0435 \u043D\u0430\u043B\u0438\u0447\u043D\u0430 \u0437\u0430 \u0440\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F \u0432 \u043C\u043E\u043C\u0435\u043D\u0442\u0430.",
      selectOtherService: "\u0418\u0437\u0431\u0435\u0440\u0438 \u0434\u0440\u0443\u0433\u0430 \u0443\u0441\u043B\u0443\u0433\u0430",
      dateTime: "\u0414\u0430\u0442\u0430 \u0438 \u0447\u0430\u0441",
      timeWithStaff: "\u0427\u0430\u0441 \u043F\u0440\u0438 {name}",
      date: "\u0414\u0430\u0442\u0430",
      time: "\u0427\u0430\u0441",
      selectDateFirst: "\u041F\u044A\u0440\u0432\u043E \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0434\u0430\u0442\u0430.",
      dayClosed: "\u0412 \u0442\u043E\u0437\u0438 \u0434\u0435\u043D \u0441\u0430\u043B\u043E\u043D\u044A\u0442 \u0435 \u0437\u0430\u0442\u0432\u043E\u0440\u0435\u043D.",
      noSlots: "\u041D\u044F\u043C\u0430 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0438 \u0447\u0430\u0441\u043E\u0432\u0435 \u0437\u0430 \u0438\u0437\u0431\u0440\u0430\u043D\u0438\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0438.",
      selectServiceFirst: "\u041F\u044A\u0440\u0432\u043E \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0430.",
      contactDetails: "\u0414\u0430\u043D\u043D\u0438 \u0437\u0430 \u043A\u043E\u043D\u0442\u0430\u043A\u0442",
      name: "\u0418\u043C\u0435",
      phone: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
      email: "\u0418\u043C\u0435\u0439\u043B",
      notes: "\u0411\u0435\u043B\u0435\u0436\u043A\u0438 (\u043F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u0435)",
      smsConsentPre: "\u0421\u044A\u0433\u043B\u0430\u0441\u044F\u0432\u0430\u043C \u0441\u0435 \u0434\u0430 \u043F\u043E\u043B\u0443\u0447\u0430\u0432\u0430\u043C SMS \u043D\u0430\u043F\u043E\u043C\u043D\u044F\u043D\u0438\u044F \u0437\u0430 \u0440\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F\u0442\u0430 \u043E\u0442",
      smsConsentPost: "\u043D\u0430 \u043F\u043E\u0441\u043E\u0447\u0435\u043D\u0438\u044F \u0442\u0435\u043B\u0435\u0444\u043E\u043D. \u041F\u0440\u043E\u0447\u0435\u0442\u043E\u0445",
      smsConsentAnd: "\u0438",
      terms: "\u041E\u0431\u0449\u0438\u0442\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F",
      privacy: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430\u0442\u0430 \u0437\u0430 \u043F\u043E\u0432\u0435\u0440\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442",
      smsConsentNote: "\u0411\u0435\u0437 \u043E\u0442\u043C\u0435\u0442\u043A\u0430 \u0440\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F\u0442\u0430 \u0432\u0438 \u043E\u0441\u0442\u0430\u0432\u0430 \u0432\u0430\u043B\u0438\u0434\u043D\u0430, \u043D\u043E \u043D\u044F\u043C\u0430 \u0434\u0430 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 SMS \u043D\u0430\u043F\u043E\u043C\u043D\u044F\u043D\u0438\u0435 \u043E\u0442 \u0441\u0430\u043B\u043E\u043D\u0430.",
      totalDuration: "\u041E\u0431\u0449\u043E: {min} \u043C\u0438\u043D",
      totalPrice: "\u041E\u0431\u0449\u043E: {price}",
      startTime: "\u0421\u0442\u0430\u0440\u0442 {start} \xB7 \u0413\u043E\u0442\u043E\u0432\u0438 \u043E\u043A\u043E\u043B\u043E {end}",
      depositRequired: "\u0418\u0437\u0438\u0441\u043A\u0432\u0430 \u0441\u0435 \u0434\u0435\u043F\u043E\u0437\u0438\u0442 \u043E\u0442",
      paymentFrom: "\u041F\u043B\u0430\u0449\u0430\u043D\u0435 \u043E\u0442",
      securePayment: "\u0417\u0430\u0449\u0438\u0442\u0435\u043D\u043E \u043F\u043B\u0430\u0449\u0430\u043D\u0435 \u0447\u0440\u0435\u0437",
      back: "\u041D\u0430\u0437\u0430\u0434",
      continue: "\u041F\u0440\u043E\u0434\u044A\u043B\u0436\u0438",
      sendRequest: "\u0418\u0437\u043F\u0440\u0430\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0430",
      payAndBook: "\u041F\u043B\u0430\u0442\u0438 \u0438 \u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u0430\u0439",
      disclaimerPre: "\u0417\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0438\u0448 \u0440\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F\u0442\u0430 \u0441\u0430 \u043D\u0443\u0436\u043D\u0438 \u0438\u043C\u0435, \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0438 \u0438\u043C\u0435\u0439\u043B \u2014 \u0438\u0437\u043F\u043E\u043B\u0437\u0432\u0430\u043C\u0435 \u0433\u0438 \u0441\u0430\u043C\u043E \u0437\u0430 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u0440\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F\u0442\u0430, \u043F\u043E\u0442\u0432\u044A\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0438 \u043D\u0430\u043F\u043E\u043C\u043D\u044F\u043D\u0438\u044F.",
      disclaimerAccept: "\u0421 \u0438\u0437\u043F\u0440\u0430\u0449\u0430\u043D\u0435\u0442\u043E \u043F\u0440\u0438\u0435\u043C\u0430\u0448"
    },
    success: {
      confirmed: "\u0420\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F\u0442\u0430 \u0435 \u043F\u043E\u0442\u0432\u044A\u0440\u0434\u0435\u043D\u0430",
      waitingAt: "\u041E\u0447\u0430\u043A\u0432\u0430\u043C\u0435 \u0432\u0438 \u0432",
      labelService: "\u0423\u0441\u043B\u0443\u0433\u0430",
      labelWhen: "\u041A\u043E\u0433\u0430",
      timeFormat: "{date}, {time} \u0447.",
      done: "\u0413\u043E\u0442\u043E\u0432\u043E"
    },
    errors: {
      noService: "\u041C\u043E\u043B\u044F, \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043F\u043E\u043D\u0435 \u0435\u0434\u043D\u0430 \u0443\u0441\u043B\u0443\u0433\u0430.",
      noName: "\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0432\u0430\u0448\u0435\u0442\u043E \u0438\u043C\u0435.",
      noPhone: "\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435\u043D \u043D\u043E\u043C\u0435\u0440.",
      noEmail: "\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0438\u043C\u0435\u0439\u043B.",
      noDate: "\u041C\u043E\u043B\u044F, \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0434\u0430\u0442\u0430.",
      noTime: "\u041C\u043E\u043B\u044F, \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0447\u0430\u0441.",
      saveFailed: "\u0420\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F\u0442\u0430 \u043D\u0435 \u043C\u043E\u0436\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u0430. \u041C\u043E\u043B\u044F \u043E\u043F\u0438\u0442\u0430\u0439\u0442\u0435 \u043E\u0442\u043D\u043E\u0432\u043E.",
      httpError: "\u0413\u0440\u0435\u0448\u043A\u0430 {status}",
      paymentFailed: "\u0413\u0440\u0435\u0448\u043A\u0430 \u043F\u0440\u0438 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u0430\u043D\u0435 \u043D\u0430 \u043F\u043B\u0430\u0449\u0430\u043D\u0435\u0442\u043E.",
      generic: "\u0413\u0440\u0435\u0448\u043A\u0430 \u043F\u0440\u0438 \u0440\u0435\u0437\u0435\u0440\u0432\u0430\u0446\u0438\u044F."
    }
  },
  adminAuth: {
    loading: "\u0417\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435\u2026",
    signIn: {
      title: "\u0412\u0445\u043E\u0434",
      subtitle: "\u0412\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0438\u043C\u0435\u0439\u043B \u0438 \u043F\u0430\u0440\u043E\u043B\u0430 \u0437\u0430 \u0434\u043E\u0441\u0442\u044A\u043F \u0434\u043E \u043F\u0430\u043D\u0435\u043B\u0430.",
      emailLabel: "\u0418\u043C\u0435\u0439\u043B",
      emailPlaceholder: "ime@example.com",
      passwordLabel: "\u041F\u0430\u0440\u043E\u043B\u0430",
      passwordPlaceholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      showPassword: "\u041F\u043E\u043A\u0430\u0436\u0438 \u043F\u0430\u0440\u043E\u043B\u0430\u0442\u0430",
      hidePassword: "\u0421\u043A\u0440\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u0430\u0442\u0430",
      submit: "\u0412\u043B\u0435\u0437",
      submitting: "\u0412\u043B\u0438\u0437\u0430\u043D\u0435\u2026",
      forgot: "\u0417\u0430\u0431\u0440\u0430\u0432\u0435\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u0430?",
      errorGeneric: "\u0413\u0440\u0435\u0448\u043A\u0430",
      errorLogin: "\u0413\u0440\u0435\u0448\u043A\u0430 \u043F\u0440\u0438 \u0432\u0445\u043E\u0434"
    },
    forgot: {
      back: "\u2190 \u041D\u0430\u0437\u0430\u0434",
      title: "\u0417\u0430\u0431\u0440\u0430\u0432\u0435\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u0430",
      subtitle: "\u0412\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0438\u043C\u0435\u0439\u043B\u0430 \u043D\u0430 \u0430\u043A\u0430\u0443\u043D\u0442\u0430. \u0429\u0435 \u0438\u0437\u043F\u0440\u0430\u0442\u0438\u043C \u043B\u0438\u043D\u043A \u0437\u0430 \u0437\u0430\u0434\u0430\u0432\u0430\u043D\u0435 \u043D\u0430 \u043D\u043E\u0432\u0430 \u043F\u0430\u0440\u043E\u043B\u0430.",
      submit: "\u0418\u0437\u043F\u0440\u0430\u0442\u0438 \u043B\u0438\u043D\u043A",
      submitting: "\u0418\u0437\u043F\u0440\u0430\u0449\u0430\u043D\u0435\u2026",
      sentTitle: "\u041F\u0440\u043E\u0432\u0435\u0440\u0438 \u043F\u043E\u0449\u0430\u0442\u0430 \u0441\u0438",
      sentBody: "\u0418\u0437\u043F\u0440\u0430\u0442\u0438\u0445\u043C\u0435 \u043B\u0438\u043D\u043A \u0437\u0430 \u0437\u0430\u0434\u0430\u0432\u0430\u043D\u0435 \u043D\u0430 \u043D\u043E\u0432\u0430 \u043F\u0430\u0440\u043E\u043B\u0430.",
      backToSignIn: "\u041D\u0430\u0437\u0430\u0434 \u043A\u044A\u043C \u0432\u0445\u043E\u0434"
    },
    setPassword: {
      invalidLink: "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043B\u0438\u043D\u043A.",
      invalidLinkHint: "\u041F\u043E\u0438\u0441\u043A\u0430\u0439\u0442\u0435 \u043D\u043E\u0432 \u043E\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0442\u0430 \u0437\u0430 \u0432\u0445\u043E\u0434.",
      titleCreate: "\u0417\u0430\u0434\u0430\u0439 \u043F\u0430\u0440\u043E\u043B\u0430",
      titleReset: "\u041D\u043E\u0432\u0430 \u043F\u0430\u0440\u043E\u043B\u0430",
      subtitleCreate: "\u0412\u044A\u0432\u0435\u0434\u0438 \u0438\u043C\u0435\u0442\u043E \u0441\u0438 \u0438 \u0438\u0437\u0431\u0435\u0440\u0438 \u043F\u0430\u0440\u043E\u043B\u0430 \u0437\u0430 \u0434\u043E\u0441\u0442\u044A\u043F \u0434\u043E \u043F\u0430\u043D\u0435\u043B\u0430.",
      subtitleReset: "\u0412\u044A\u0432\u0435\u0434\u0438 \u043D\u043E\u0432\u0430 \u043F\u0430\u0440\u043E\u043B\u0430 \u0437\u0430 \u0442\u0432\u043E\u044F \u043F\u0430\u043D\u0435\u043B.",
      nameLabel: "\u0418\u043C\u0435",
      namePlaceholder: "\u0412\u0430\u0448\u0435\u0442\u043E \u0438\u043C\u0435",
      emailLabel: "\u0418\u043C\u0435\u0439\u043B",
      emailPlaceholder: "ime@example.com",
      passwordLabel: "\u041F\u0430\u0440\u043E\u043B\u0430",
      passwordPlaceholder: "\u041F\u043E\u043D\u0435 8 \u0441\u0438\u043C\u0432\u043E\u043B\u0430",
      confirmLabel: "\u041F\u043E\u0442\u0432\u044A\u0440\u0434\u0438 \u043F\u0430\u0440\u043E\u043B\u0430\u0442\u0430",
      confirmPlaceholder: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438 \u043F\u0430\u0440\u043E\u043B\u0430\u0442\u0430",
      show: "\u041F\u043E\u043A\u0430\u0436\u0438",
      hide: "\u0421\u043A\u0440\u0438\u0439",
      submitCreate: "\u0421\u044A\u0437\u0434\u0430\u0439 \u0430\u043A\u0430\u0443\u043D\u0442 \u2192",
      submitReset: "\u0421\u043C\u0435\u043D\u0438 \u043F\u0430\u0440\u043E\u043B\u0430\u0442\u0430 \u2192",
      submittingCreate: "\u0421\u044A\u0437\u0434\u0430\u0432\u0430\u043D\u0435\u2026",
      submittingReset: "\u0417\u0430\u043F\u0430\u0437\u0432\u0430\u043D\u0435\u2026",
      mismatch: "\u041F\u0430\u0440\u043E\u043B\u0438\u0442\u0435 \u043D\u0435 \u0441\u044A\u0432\u043F\u0430\u0434\u0430\u0442.",
      doneCreate: "\u0410\u043A\u0430\u0443\u043D\u0442\u044A\u0442 \u0435 \u0441\u044A\u0437\u0434\u0430\u0434\u0435\u043D!",
      doneReset: "\u041F\u0430\u0440\u043E\u043B\u0430\u0442\u0430 \u0435 \u0441\u043C\u0435\u043D\u0435\u043D\u0430!",
      doneRedirect: "\u0412\u043B\u0438\u0437\u0430\u0448 \u0432 \u043F\u0430\u043D\u0435\u043B\u0430\u2026",
      haveAccount: "\u0412\u0435\u0447\u0435 \u0438\u043C\u0430\u0448 \u0430\u043A\u0430\u0443\u043D\u0442?",
      signInLink: "\u0412\u043B\u0435\u0437",
      errorGeneric: "\u0413\u0440\u0435\u0448\u043A\u0430"
    }
  }
};

// ../../locales/en.json
var en_default = {
  booking: {
    modal: {
      ariaLabel: "Booking",
      titleDefault: "Book",
      titleWithStaff: "with {name}",
      closeAria: "Close",
      confirmClose: "Are you sure you want to close the booking?",
      stepService: "Service",
      stepSpecialist: "Specialist",
      stepTime: "Time",
      stepDetails: "Details",
      stepAria: "Step {n}: {label}",
      selectedServices: "Selected services",
      services: "Services",
      serviceCountOne: "{count} service",
      serviceCountMany: "{count} services",
      minSuffix: "min",
      remove: "Remove",
      removeAria: "Remove service",
      addMoreServices: "Add more services",
      hideList: "Hide list \xB7 {count} selected",
      add: "Add",
      addService: "Add service",
      noServicesInCategory: "No services in this category.",
      selectSpecialist: "Choose a specialist",
      availableFor: "Available for",
      serviceUnavailable: "This service is not available for booking right now.",
      selectOtherService: "Choose a different service",
      dateTime: "Date & time",
      timeWithStaff: "Time with {name}",
      date: "Date",
      time: "Time",
      selectDateFirst: "Please select a date first.",
      dayClosed: "The salon is closed on this day.",
      noSlots: "No available slots for the selected services.",
      selectServiceFirst: "Please select a service first.",
      contactDetails: "Your details",
      name: "Name",
      phone: "Phone",
      email: "Email",
      notes: "Notes (optional)",
      smsConsentPre: "I agree to receive SMS reminders for this booking from",
      smsConsentPost: "to the phone number provided. I have read the",
      smsConsentAnd: "and",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      smsConsentNote: "Without this, your booking is still valid \u2014 you just won't receive SMS reminders from the salon.",
      totalDuration: "Total: {min} min",
      totalPrice: "Total: {price}",
      startTime: "Starts {start} \xB7 Done around {end}",
      depositRequired: "Deposit required:",
      paymentFrom: "Payment of",
      securePayment: "Secure payment via",
      back: "Back",
      continue: "Continue",
      sendRequest: "Request booking",
      payAndBook: "Pay & book",
      disclaimerPre: "To complete your booking we need your name, phone and email \u2014 used only to manage your appointment, send confirmations and reminders.",
      disclaimerAccept: "By submitting you accept the"
    },
    success: {
      confirmed: "Booking confirmed",
      waitingAt: "We'll see you at",
      labelService: "Service",
      labelWhen: "When",
      timeFormat: "{date} at {time}",
      done: "Done"
    },
    errors: {
      noService: "Please select at least one service.",
      noName: "Please enter your name.",
      noPhone: "Please enter your phone number.",
      noEmail: "Please enter your email.",
      noDate: "Please select a date.",
      noTime: "Please select a time.",
      saveFailed: "Your booking could not be saved. Please try again.",
      httpError: "Error {status}",
      paymentFailed: "Could not initialise payment. Please try again.",
      generic: "Something went wrong. Please try again."
    }
  },
  adminAuth: {
    loading: "Loading\u2026",
    signIn: {
      title: "Sign in",
      subtitle: "Enter your email and password to access the panel.",
      emailLabel: "Email",
      emailPlaceholder: "name@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      showPassword: "Show password",
      hidePassword: "Hide password",
      submit: "Sign in",
      submitting: "Signing in\u2026",
      forgot: "Forgot password?",
      errorGeneric: "Error",
      errorLogin: "Sign-in failed"
    },
    forgot: {
      back: "\u2190 Back",
      title: "Forgot password",
      subtitle: "Enter the account email. We will send a link to set a new password.",
      submit: "Send link",
      submitting: "Sending\u2026",
      sentTitle: "Check your inbox",
      sentBody: "We sent a link to set a new password.",
      backToSignIn: "Back to sign in"
    },
    setPassword: {
      invalidLink: "Invalid link.",
      invalidLinkHint: "Request a new one from the sign-in page.",
      titleCreate: "Set password",
      titleReset: "New password",
      subtitleCreate: "Enter your name and choose a password to access the panel.",
      subtitleReset: "Enter a new password for your panel.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "name@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "At least 8 characters",
      confirmLabel: "Confirm password",
      confirmPlaceholder: "Repeat the password",
      show: "Show",
      hide: "Hide",
      submitCreate: "Create account \u2192",
      submitReset: "Change password \u2192",
      submittingCreate: "Creating\u2026",
      submittingReset: "Saving\u2026",
      mismatch: "Passwords do not match.",
      doneCreate: "Account created!",
      doneReset: "Password changed!",
      doneRedirect: "Signing you in\u2026",
      haveAccount: "Already have an account?",
      signInLink: "Sign in",
      errorGeneric: "Error"
    }
  }
};

// ../../lib/i18n.ts
var dict = { bg: bg_default, en: en_default };
function resolve(obj, keys) {
  let cur = obj;
  for (const k of keys) {
    if (cur == null || typeof cur !== "object") return void 0;
    cur = cur[k];
  }
  return typeof cur === "string" ? cur : void 0;
}
function interpolate(str, vars) {
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
function normalizeLocale(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "en" || normalized.startsWith("en-") ? "en" : "bg";
}
function getT(locale) {
  const translations = dict[locale] ?? dict.bg;
  return function t(key, vars) {
    const parts = key.split(".");
    let value = resolve(translations, parts);
    if (value === void 0) {
      value = resolve(dict.bg, parts) ?? key;
    }
    return vars ? interpolate(value, vars) : value;
  };
}
var I18nContext = createContext(getT("bg"));
function I18nProvider({ locale, children }) {
  const t = getT(locale);
  return /* @__PURE__ */ jsx(I18nContext.Provider, { value: t, children });
}
function useT() {
  return useContext(I18nContext);
}

export { I18nProvider, buildServiceCategoryTabs, enrichServiceCategories, normalizeLocale, serviceMatchesCategory, useT };
//# sourceMappingURL=chunk-CANVXBHW.js.map
//# sourceMappingURL=chunk-CANVXBHW.js.map