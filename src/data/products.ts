import type { Product } from "@/types";

// Source names, descriptions, specifications and photos imported from:
// https://darkred-gaur-221374.hostingersite.com/products/
// Prices are demo values; these entries are not confirmed offers.
export const products: Product[] = [
  {
    "id": "pos-terminal",
    "name": "POS ტერმინალი",
    "categoryId": "pos",
    "image": "/images/products/pos.webp",
    "price": 650,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "ინდუსტრიული კომპიუტერი, რომელიც უზრუნველყოფს სალარო წერტილის უწყვეტ და შეუფერხებელ მუშაობას 24-საათიანი დატვირთვის პირობებში.",
    "isWeeklyPick": true,
    "bestSellerRank": 1
  },
  {
    "id": "receipt-printer",
    "name": "თერმული პრინტერი",
    "categoryId": "pos",
    "image": "/images/products/thermal-printer.webp",
    "price": 180,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "მომხმარებლისთვის დეტალური ჩეკის დასაბეჭდად.",
    "isWeeklyPick": true,
    "bestSellerRank": 3
  },
  {
    "id": "barcode-scanner",
    "name": "შტრიხკოდის სკანერი",
    "categoryId": "pos",
    "image": "/images/products/scanners.webp",
    "price": 120,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "სასაქონლო კოდის სკანირებით პროდუქტი მომენტალურად აისახება სავაჭრო პროგრამაში, რაც ზრდის გაყიდვის სისწრაფეს.",
    "bestSellerRank": 2
  },
  {
    "id": "cash-drawer",
    "name": "ფულის უჯრა",
    "categoryId": "pos",
    "image": "/images/products/cash-drawer.webp",
    "price": 95,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "მექანიკური ან ელექტრონული გახსნის ფუნქციით. ზრდის მომსახურების ხარისხს და ამარტივებს ნაღდი ფულის მიღებასა და ხურდის გაცემას.",
    "specs": [
      {
        "label": "დიდი",
        "value": "40 × 41 × 11"
      },
      {
        "label": "მცირე",
        "value": "35 × 30 × 11"
      }
    ]
  },
  {
    "id": "label-scale",
    "name": "ელექტრონული სასწორი",
    "categoryId": "pos",
    "image": "/images/products/scale.webp",
    "price": 490,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "ინტეგრირებული შტრიხკოდის პრინტერით. უზრუნველყოფს ასაწონი და საცალო პროდუქტების შტრიხკოდით მარკირებას და სალაროზე მარტივად გატარებას."
  },
  {
    "id": "data-terminal",
    "name": "მობილური ტერმინალი",
    "categoryId": "warehouse-tech",
    "image": "/images/products/mobile-terminal.webp",
    "price": 540,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "გამოიყენება სასაქონლო მარაგების აღწერისა და კონტროლისთვის.",
    "isWeeklyPick": true
  },
  {
    "id": "label-printer",
    "name": "შტრიხკოდის პრინტერი",
    "categoryId": "warehouse-tech",
    "image": "/images/products/barcode-printer.webp",
    "price": 260,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "საქონლის შტრიხკოდიანი ეტიკეტების დასაბეჭდად, როგორც საცალო, ასევე საბითუმო ვაჭრობაში.",
    "isWeeklyPick": true
  },
  {
    "id": "consumables",
    "name": "სახარჯი მასალები",
    "categoryId": "warehouse-tech",
    "image": "/images/products/consumables.webp",
    "price": 12,
    "unit": "pack",
    "source": "RS Line",
    "isDemo": true,
    "description": "თვითწებადი ეტიკეტები, სასწორის რულონები და სალაროს ლენტები."
  },
  {
    "id": "store-shelf",
    "name": "დარბაზის კედლის თაროები",
    "categoryId": "market-equipment",
    "image": "/images/products/wall-shelf.webp",
    "price": 220,
    "unit": "set",
    "source": "RS Line",
    "isDemo": true,
    "description": "კედლის გასწვრივ პროდუქციის განთავსებისთვის.",
    "isWeeklyPick": true,
    "specs": [
      {
        "label": "სიმაღლე",
        "value": "1200-2250 მმ"
      },
      {
        "label": "სიგრძე",
        "value": "500-1330 მმ"
      },
      {
        "label": "სიღრმე",
        "value": "300-700 მმ"
      }
    ]
  },
  {
    "id": "double-sided-shelf",
    "name": "დარბაზის ორმხრივი თაროები",
    "categoryId": "market-equipment",
    "image": "/images/products/double-shelf.webp",
    "price": 390,
    "unit": "set",
    "source": "RS Line",
    "isDemo": true,
    "description": "სავაჭრო დარბაზში ორმხრივი განლაგებისთვის.",
    "isWeeklyPick": true,
    "specs": [
      {
        "label": "სიმაღლე",
        "value": "1200-2250 მმ"
      },
      {
        "label": "სიგრძე",
        "value": "500-1330 მმ"
      },
      {
        "label": "სიღრმე",
        "value": "300-700 მმ"
      }
    ]
  },
  {
    "id": "produce-shelf",
    "name": "ხილბოსტნის თაროები",
    "categoryId": "market-equipment",
    "image": "/images/products/produce-shelf.webp",
    "price": 520,
    "unit": "set",
    "source": "RS Line",
    "isDemo": true,
    "description": "ხილისა და ბოსტნეულის განთავსებისთვის.",
    "specs": [
      {
        "label": "სიმაღლე",
        "value": "2250 მმ"
      },
      {
        "label": "სიგრძე",
        "value": "500-1330 მმ"
      },
      {
        "label": "სიღრმე",
        "value": "500-600 მმ"
      }
    ]
  },
  {
    "id": "bread-shelf",
    "name": "პურის თაროები",
    "categoryId": "market-equipment",
    "image": "/images/products/bread-shelf.webp",
    "price": 460,
    "unit": "set",
    "source": "RS Line",
    "isDemo": true,
    "description": "პურისა და საცხობი პროდუქციისთვის.",
    "specs": [
      {
        "label": "სიმაღლე",
        "value": "2250 მმ"
      },
      {
        "label": "სიგრძე",
        "value": "500-1330 მმ"
      },
      {
        "label": "სიღრმე",
        "value": "500-600 მმ"
      }
    ]
  },
  {
    "id": "checkout-counter",
    "name": "სალაროს მაგიდა",
    "categoryId": "market-equipment",
    "image": "/images/products/checkout.webp",
    "price": 780,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "სალარო სივრცის ორგანიზებისთვის.",
    "specs": [
      {
        "label": "სიმაღლე",
        "value": "850 მმ"
      },
      {
        "label": "სიგრძე",
        "value": "1500-2400 მმ"
      },
      {
        "label": "სიღრმე",
        "value": "1000 მმ"
      }
    ]
  },
  {
    "id": "upright-fridge",
    "name": "ვერტიკალური მაცივარი",
    "categoryId": "market-equipment",
    "image": "/images/products/upright-fridge.webp",
    "price": 1450,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "გარე ან ინტეგრირებული ძრავით.",
    "specs": [
      {
        "label": "სიმაღლე",
        "value": "2050-2200 მმ"
      },
      {
        "label": "სიგრძე",
        "value": "820-1050 მმ"
      },
      {
        "label": "სიღრმე",
        "value": "500-600 მმ"
      }
    ]
  },
  {
    "id": "display-fridge",
    "name": "დახლ-მაცივარი",
    "categoryId": "market-equipment",
    "image": "/images/products/display-fridge.webp",
    "price": 1850,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "გარე ან ინტეგრირებული ძრავით.",
    "specs": [
      {
        "label": "სიმაღლე",
        "value": "930-1265 მმ"
      },
      {
        "label": "სიგრძე",
        "value": "1350-2600 მმ"
      },
      {
        "label": "სიღრმე",
        "value": "780-1120 მმ"
      }
    ]
  },
  {
    "id": "entry-gate",
    "name": "შესასვლელის მოწყობა",
    "categoryId": "market-equipment",
    "image": "/images/products/entry.webp",
    "price": 250,
    "unit": "set",
    "source": "RS Line",
    "isDemo": true,
    "description": "გასასვლელის შემზღუდველები და შესასვლელი ჭიშკრები."
  },
  {
    "id": "shopping-cart",
    "name": "საყიდლების ურიკები",
    "categoryId": "market-accessories",
    "image": "/images/products/carts.webp",
    "price": 85,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "მეტალის საყიდლების ურიკები და საბავშვო მოდელები.",
    "isWeeklyPick": true,
    "bestSellerRank": 4
  },
  {
    "id": "shopping-basket",
    "name": "საყიდლების კალათები",
    "categoryId": "market-accessories",
    "image": "/images/products/baskets.webp",
    "price": 9,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "პლასტმასისა და მავთულის კალათები; მოდელები ბორბლებითა და გასაწევი სახელურით.",
    "isWeeklyPick": true
  },
  {
    "id": "wire-display-basket",
    "name": "პროდუქციის კალათები",
    "categoryId": "market-accessories",
    "image": "/images/products/wire-bin.webp",
    "price": 65,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "მავთულის კალათები სადგამით."
  },
  {
    "id": "warehouse-rack",
    "name": "საწყობის თაროები",
    "categoryId": "shelving",
    "image": "/images/products/warehouse-shelf.webp",
    "price": 340,
    "unit": "set",
    "source": "RS Line",
    "isDemo": true,
    "description": "სასაწყობე სივრცის ორგანიზებისთვის.",
    "isWeeklyPick": true,
    "specs": [
      {
        "label": "მინიმალური დატვირთვა",
        "value": "300 კგ"
      },
      {
        "label": "მაქსიმალური დატვირთვა",
        "value": "4000 კგ"
      }
    ]
  },
  {
    "id": "archive-shelf",
    "name": "საარქივე თაროები",
    "categoryId": "shelving",
    "image": "/images/products/archive-shelf.webp",
    "price": 210,
    "unit": "set",
    "source": "RS Line",
    "isDemo": true,
    "description": "დოკუმენტებისა და საარქივე მასალის შესანახად.",
    "isWeeklyPick": true,
    "specs": [
      {
        "label": "მინიმალური დატვირთვა",
        "value": "90 კგ"
      },
      {
        "label": "მაქსიმალური დატვირთვა",
        "value": "330 კგ"
      }
    ]
  },
  {
    "id": "metal-cabinet",
    "name": "მეტალის კარადები",
    "categoryId": "shelving",
    "image": "/images/products/cabinets.webp",
    "price": 320,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "გასახდელის, საარქივე და ინდივიდუალური შესანახი კარადები."
  },
  {
    "id": "cctv-kit",
    "name": "სამეთვალყურეო კამერები და ჩამწერები",
    "categoryId": "security",
    "image": "/images/products/cctv.webp",
    "price": 480,
    "unit": "set",
    "source": "RS Line",
    "isDemo": true,
    "description": "მაღალი გარჩევადობის პროფესიონალური სამეთვალყურეო კამერები და ჩამწერები.",
    "isWeeklyPick": true,
    "bestSellerRank": 5
  },
  {
    "id": "eas-gate",
    "name": "SENSORMATIC",
    "categoryId": "security",
    "image": "/images/products/eas.webp",
    "price": 750,
    "unit": "set",
    "source": "RS Line",
    "isDemo": true,
    "description": "პროდუქციის მოპარვის საწინააღმდეგო სისტემა.",
    "isWeeklyPick": true
  },
  {
    "id": "people-counter",
    "name": "მომხმარებლის მთვლელი",
    "categoryId": "security",
    "image": "/images/products/people-counter.webp",
    "price": 280,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "საშუალებას იძლევა მოხდეს სავაჭრო ობიექტზე შემოსული მომხმარებლის რაოდენობის დათვლა და სტატისტიკის წარმოება."
  },
  {
    "id": "attendance-terminal",
    "name": "თანამშრომლების აღრიცხვის სისტემა",
    "categoryId": "security",
    "image": "/images/products/attendance.webp",
    "price": 195,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "იძლევა საშუალებას მოხდეს პერსონალის სამუშაო დროის კონტროლი. იდენტიფიკაციისთვის შესაძლებელია გამოყენებულ იქნეს პერსონალური უკონტაქტო ბარათი ან თითის ანაბეჭდი."
  },
  {
    "id": "money-counter",
    "name": "ფულის და ხურდის მთვლელი აპარატები",
    "categoryId": "security",
    "image": "/images/products/money-counter.webp",
    "price": 230,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "ფულის და ხურდის დათვლისთვის."
  },
  {
    "id": "uv-detector",
    "name": "ყალბი კუპიურების დეტექტორი",
    "categoryId": "security",
    "image": "/images/products/uv-detector.webp",
    "price": 45,
    "unit": "pc",
    "source": "RS Line",
    "isDemo": true,
    "description": "UV Detection - ყალბი კუპიურების დეტექტორი."
  }
];
