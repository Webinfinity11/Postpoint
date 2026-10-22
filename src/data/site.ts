// ფაზა 1: საიტის ყველა სტატიკური ტექსტი და წესი აქ იცვლება.
// ფაზა 2: ეს მონაცემები გადავა ადმინ პანელის "Site settings" გვერდზე.

import type { Unit } from "@/types";

export const site = {
  name: "RS Line",
  tagline: "ტექნოლოგია თქვენი ბიზნესისთვის.",
  description: "სალაროს ტექნიკა, მარკეტის ინვენტარი, საწყობის აღჭურვილობა და უსაფრთხოების სისტემები. კონსულტაცია, ტექნიკური და პროგრამული მხარდაჭერა.",
  logo: { src: "/logo.svg", width: 2822, height: 896 },

  currency: { symbol: "$", position: "before" as "before" | "after" },

  units: { pc: "ცალი", set: "კომპლექტი", roll: "რულონი", pack: "შეკვრა" } satisfies Record<Unit, string>,

  cart: {
    deliveryFee: 4.9,
    freeDeliveryThreshold: 50,
    maxQuantity: 99,
    coupon: { code: "WELCOME10", percent: 10 },
  },

  header: {
    searchPlaceholder: "მოძებნე პროდუქტი...",
    searchLabel: "პროდუქტის ძებნა",
    clearSearch: "ძებნის გასუფთავება",
    loved: "რჩეულები",
    cart: "კალათა",
    cartLabel: "კალათის გახსნა, {count} პროდუქტი",
    login: "შესვლა / რეგისტრაცია",
    home: "მთავარი გვერდი",
  },

  nav: {
    label: "მაღაზიის ნავიგაცია",
    infoLabel: "ინფორმაცია მომხმარებლისთვის",
    about: "ჩვენ შესახებ",
    catalog: "კატალოგი",
    contact: "კონტაქტი",
    allProducts: "ყველა პროდუქტი",
    policy: "წესები",
    faq: "ხშირი კითხვები",
    support: "დახმარება",
  },

  // მთავარი გვერდის კარუსელი.
  hero: {
    autoplayMs: 6000,
    prev: "წინა სლაიდი",
    next: "შემდეგი სლაიდი",
    goTo: "სლაიდი {n}",
    carouselLabel: "კარუსელი",
    slideLabel: "სლაიდი",
    slides: [
      {
        image: "/images/hero1.webp",
        imageAlt: "გადახდის ტერმინალი მაღაზიის დახლზე",
        eyebrow: "RS LINE",
        title: "სალარო სისტემები თქვენი ბიზნესისთვის",
        text: "სალარო ტექნიკის დიდი არჩევანი",
        button: "კატალოგი",
        action: "catalog" as "catalog" | "about",
      },
      {
        image: "/images/hero2.webp",
        imageAlt: "მომხმარებელი ბარათით იხდის ტერმინალზე",
        eyebrow: "RS LINE",
        title: "ყველაფერი თანამედროვე მაღაზიისთვის",
        text: "ტექნიკა და ინვენტარი ვაჭრობისთვის",
        button: "ვრცლად",
        action: "about" as "catalog" | "about",
      },
    ],
  },

  sections: {
    categories: "პოპულარული კატეგორიები",
    categoryCount: "{count} პროდუქტი",
    categoryCarousel: {
      label: "კარუსელი",
      slide: "სლაიდი",
      prev: "წინა კატეგორია",
      next: "შემდეგი კატეგორია",
    },
    freshPicks: "შერჩეული პროდუქცია",
    featuredDescription: "ტექნიკა და ინვენტარი ჩვენი ძირითადი მიმართულებებიდან.",
    featuredProductIds: ["pos-terminal", "receipt-printer", "data-terminal", "store-shelf", "upright-fridge", "shopping-cart", "warehouse-rack", "cctv-kit"],
    searchResults: "ძიების შედეგები",
    resultsCount: "{count} პროდუქტი",
    resultsQuery: "{count} პროდუქტი - „{query}“",
    weekly: "პროდუქცია კატეგორიების მიხედვით",
    weeklyTabs: "პროდუქციის კატეგორიები",
    weeklyDescription: "აირჩიეთ კატეგორია და ნახეთ შესაბამისი პროდუქცია.",
    viewCategory: "კატეგორიის ნახვა",
    bestSellers: "ყველაზე გაყიდვადი პროდუქტები",
    showAll: "ყველას ნახვა",
    showLess: "ნაკლების ჩვენება",
    clearFilters: "ფილტრის გასუფთავება",
    freshPicksLimit: 8,
    weeklyLimit: 5,
    weeklyDefaultCategory: "pos",
  },

  homeAbout: {
    eyebrow: "ტექნიკა და მხარდაჭერა ერთ სივრცეში",
    services: ["კონსულტაცია", "ტექნიკური მომსახურება", "პროგრამული მხარდაჭერა"],
  },

  empty: {
    title: "პროდუქტი ვერ მოიძებნა",
    text: "სცადე სხვა სიტყვა ან დაათვალიერე ყველა პროდუქტი.",
    button: "ყველა პროდუქტის ნახვა",
  },

  product: {
    addToCart: "კალათაში დამატება",
    addLabel: "{name} - კალათაში დამატება",
    addOne: "კიდევ ერთი: {name}",
    removeOne: "ერთით ნაკლები: {name}",
    quantity: "{name} - რაოდენობა",
    view: "{name} - დეტალურად",
    save: "{name} - რჩეულებში დამატება",
    unsave: "{name} - რჩეულებიდან წაშლა",
    fallbackCategory: "RS LINE",
    detailCaption: "სანიმუშო პროდუქტი - ფასი და აღწერა დროებითია.",
    demoCaption: "სატესტო ფასი. კონკრეტული მოდელი და კომპლექტაცია დააზუსტეთ კონსულტაციისას.",
  },

  produceBanner: {
    title: ["ახალი ხილი და ბოსტნეული.", "მიწოდება ყოველდღე."],
    text: "ყველაფერს, რაც გჭირდება, პირდაპირ კარამდე მოგიტანთ.",
    button: "ხილი და ბოსტნეული",
    filterCategory: "pos",
    image: "/images/produce-basket.webp",
    imageAlt: "კალათა ახალი ხილითა და ბოსტნეულით",
    decoration: "/images/broccoli.webp",
    label: "RS Line-ის აქციები",
  },

  closing: {
    title: ["მზად ხარ, შეავსო კალათა", "სიახლით?"],
    text: "ახალი პროდუქტები, ყოველდღიური საჭიროებები და ექსკლუზიური შეთავაზებები - პირდაპირ კარამდე.",
    button: "დაიწყე შოპინგი",
    image: "/images/basket-footer.webp",
    imageAlt: "კალათა ახალი პროდუქტებით",
  },

  footer: {
    ctaTitle: "მოვაწყოთ თქვენი ბიზნესი.",
    ctaText: "შევარჩიოთ თქვენი სივრცისთვის საჭირო ტექნიკა და ინვენტარი.",
    ctaButton: "დაგვიკავშირდით",
    description: "სალარო ტექნიკა, მარკეტის ინვენტარი და საწყობის აღჭურვილობა თქვენი ბიზნესისთვის.",
    company: "კომპანია",
    information: "ინფორმაცია",
    contact: "დაგვიკავშირდით",
    social: "Facebook",
    rights: "ყველა უფლება დაცულია.",
    backToTop: "ზემოთ დაბრუნება",
  },

  cartDrawer: {
    eyebrow: "შენი არჩეული პროდუქტები",
    title: "შენი კალათა",
    close: "კალათის დახურვა",
    emptyTitle: "კალათა ცარიელია.",
    emptyText: "დაამატე საყვარელი პროდუქტები და ყველაფერი აქ ერთად დაგხვდება.",
    emptyButton: "პროდუქტების ნახვა",
    freeDelivery: "შენს შეკვეთაზე მიწოდება უფასოა.",
    awayFromFree: "უფასო მიწოდებამდე დაგრჩა {amount}.",
    subtotal: "ჯამი",
    discount: "{code} · {percent}% ფასდაკლება",
    delivery: "მიწოდება",
    free: "უფასო",
    total: "სულ",
    checkout: "შეკვეთის გაფორმება",
    remove: "წაშლა",
    removeLabel: "{name} - კალათიდან წაშლა",
    note: "სადემონსტრაციო კალათა. გადახდა არ ხდება.",
  },

  // ---------- გვერდები ----------
  catalogPage: {
    eyebrow: "RS LINE",
    title: "კატალოგი",
    text: "ტექნიკა და ინვენტარი ვაჭრობის ავტომატიზაციისთვის.",
    demoNotice: "ფასები სატესტოა, ფოტოები კი საილუსტრაციო. მოდელი და კომპლექტაცია დააზუსტეთ კონსულტაციისას.",
    sidebarTitle: "მიმართულებები",
    all: "ყველა პროდუქტი",
    empty: "ამ მიმართულებაში პროდუქტები მალე დაემატება.",
  },

  productPage: {
    related: "მსგავსი პროდუქტები",
    category: "კატეგორია",
    unit: "ერთეული",
    brand: "ბრენდი",
    code: "კოდი",
    quantity: "რაოდენობა",
    viewCart: "კალათის ნახვა",
    save: "რჩეულებში",
    saved: "რჩეულებშია",
    discount: "-{percent}%",
  },

  breadcrumbs: { home: "მთავარი", label: "ნავიგაციის ბილიკი" },

  // წყარო: https://darkred-gaur-221374.hostingersite.com/contact/
  contactPage: {
    eyebrow: "კონტაქტი",
    title: "კონტაქტი",
    text: "დაგვიკავშირდით - ერთად შევარჩიოთ თქვენი ბიზნესისთვის საჭირო აღჭურვილობა.",
    intro: {
      title: ["მოვაწყოთ", "თქვენი ბიზნესი."],
      text: "გაგვიზიარეთ თქვენი ამოცანა.\nერთად შევარჩიოთ სწორი აღჭურვილობა.",
      button: "მოგვწერეთ",
      href: "mailto:info@rsline.ge",
    },
    channels: {
      phone: { title: "დაგვირეკეთ", text: "შევარჩიოთ საჭირო აღჭურვილობა ერთად." },
      email: { title: "მოგვწერეთ", text: "გაგვიზიარეთ თქვენი კითხვა ან მოთხოვნა." },
    },
    social: { title: "ვიყოთ კავშირზე", text: "სიახლეები ჩვენს Facebook გვერდზე" },
    items: [
      { type: "phone", label: "ტელეფონი", value: "+995 322 05 25 25", href: "tel:+995322052525" },
      { type: "phone", label: "მობილური", value: "+995 555 18 96 00", href: "tel:+995555189600" },
      { type: "email", label: "ზოგადი ინფორმაცია", value: "info@rsline.ge", href: "mailto:info@rsline.ge" },
      { type: "email", label: "გაყიდვები", value: "sale@rsline.ge", href: "mailto:sale@rsline.ge" },
      { type: "address", label: "მისამართი", value: "თბილისი, ანა პოლიტკოვსკაიას ქ. 8ა", href: "https://maps.app.goo.gl/ub2ZSREJ3pLXSNcW6" },
      { type: "facebook", label: "სოციალური ქსელი", value: "Facebook / RS Line", href: "https://www.facebook.com/RSline.ge" },
    ],
    location: {
      eyebrow: "როგორ გვიპოვოთ",
      title: "გვეწვიეთ თბილისში",
      address: "ანა პოლიტკოვსკაიას ქ. 8ა",
      button: "მარშრუტის ნახვა",
      href: "https://maps.app.goo.gl/ub2ZSREJ3pLXSNcW6",
      mapTitle: "RS Line - თბილისი, ანა პოლიტკოვსკაიას ქ. 8ა",
      mapSrc: "https://maps.google.com/maps?q=41.7196211%2C44.713616&hl=ka&z=17&output=embed",
      loading: "რუკა იტვირთება...",
      unavailable: "მდებარეობის სანახავად გახსენით Google Maps.",
      openMap: "Google Maps-ში გახსნა",
    },
  },

  notFound: {
    title: "გვერდი ვერ მოიძებნა",
    text: "შესაძლოა ბმული შეცვლილია ან პროდუქტი აღარ არის კატალოგში.",
    home: "მთავარზე დაბრუნება",
    catalog: "კატალოგი",
  },

  toasts: {
    added: "{name} დაემატა კალათაში",
    saved: "დაემატა რჩეულებში",
    removed: "წაიშალა რჩეულებიდან",
    coupon: "კუპონი {code} გააქტიურდა",
  },

  modals: {
    close: "დახურვა",
    policy: {
      eyebrow: "ინფორმაცია შეკვეთაზე",
      title: "შეკვეთის წესები",
      intro: "ეს საიტი ინტერაქტიული პროტოტიპია. პროდუქტების ინფორმაცია, ფასები, ფასდაკლებები და მიწოდების ღირებულება სანიმუშოა.",
    },
    faq: { eyebrow: "დახმარება", title: "ხშირად დასმული კითხვები" },
    support: {
      eyebrow: "ჩვენ გვერდით ვართ",
      title: "დახმარება",
      text: "დაათვალიერე სანიმუშო პროდუქტები. ძებნით იპოვე სასურველი, შეინახე რჩეულებში ან გახსენი კალათა შეკვეთის სანახავად.",
      button: "ხშირი კითხვები",
      caption: "პროტოტიპი ჯერ არ არის დაკავშირებული მომხმარებელთა მხარდაჭერის სერვისთან.",
    },
    favorites: {
      eyebrow: "შენი რჩეულები ერთად",
      title: "რჩეული პროდუქტები",
      empty: "შეინახე პროდუქტი მოგვიანებისთვის - დააჭირე გულს ნებისმიერ პროდუქტზე.",
      emptyButton: "პროდუქტების ნახვა",
      add: "დამატება",
      removeLabel: "{name} - რჩეულებიდან წაშლა",
    },
    auth: {
      eyebrow: "მოგესალმებით RS LINE-ში",
      loginTitle: "კეთილი იყოს შენი დაბრუნება.",
      signupTitle: "შექმენი ანგარიში.",
      loginTab: "შესვლა",
      signupTab: "რეგისტრაცია",
      name: "სახელი",
      namePlaceholder: "შენი სახელი",
      email: "ელ. ფოსტა",
      emailPlaceholder: "you@example.com",
      loginButton: "შესვლა",
      signupButton: "რეგისტრაცია",
      caption: "ეს ვიზუალური პროტოტიპია. ანგარიში არ იქმნება და წერილი არ იგზავნება.",
      successLogin: "შესვლის პრევიუ მზადაა.",
      successSignup: "რეგისტრაციის პრევიუ მზადაა.",
      successText: "ასე გამოიყურება ეს ნაბიჯი RS Line-ში. ანგარიში არ შექმნილა და წერილი არ გაგზავნილა.",
      successButton: "შოპინგის გაგრძელება",
    },
    coupon: { apply: "გააქტიურება", applied: "გააქტიურდა ✓" },
    checkout: {
      eyebrow: "ბოლო ნაბიჯი",
      title: "შეკვეთის გაფორმება",
      summary: "კალათაში {count} პროდუქტია",
      name: "სახელი",
      namePlaceholder: "შენი სახელი",
      address: "მიწოდების მისამართი",
      addressPlaceholder: "მაგ. რუსთაველის გამზ. 1",
      time: "მიწოდების დრო",
      slots: ["დღეს · 16:00 - 18:00", "დღეს · 18:00 - 20:00", "ხვალ · 09:00 - 11:00"],
      button: "შეკვეთის დადასტურება",
      caption: "გამოიყენე სანიმუშო მონაცემები. ფორმა არსად იგზავნება და თანხა არ ჩამოგეჭრება.",
    },
    success: {
      eyebrow: "მზადაა - მხოლოდ პრევიუ",
      title: "შეკვეთა მიღებულია.",
      summary: "შენს სანიმუშო შეკვეთაში {count} პროდუქტია, ჯამში {total}.",
      text: "რეალური შეკვეთა არ გაგზავნილა და თანხა არ ჩამოჭრილა. კალათა შენახულია.",
      button: "მთავარზე დაბრუნება",
    },
  },
};

export type Site = typeof site;
