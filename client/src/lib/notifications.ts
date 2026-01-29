export type NotificationKind = "promo" | "tip";

export type CmsNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  url?: string;
  image?: string;
  createdAt: string; // ISO
};

type LocalizedNotifications = {
  en: CmsNotification[];
  de: CmsNotification[];
};

const localizedNotifications: LocalizedNotifications = {
  en: [
    {
      id: "promo-vaccination-program",
      kind: "promo",
      title: "Vaccination Program",
      body: `Stay protected with our **comprehensive vaccination services**. Our certified healthcare professionals are ready to help you stay up-to-date with all recommended immunizations.

## Available Vaccines

We offer a *full range* of vaccinations for every stage of life:

- **Seasonal flu shots** — Updated annually for maximum protection
- **Travel vaccines** — Hepatitis A & B, typhoid, yellow fever, and more
- **Routine immunizations** — Tetanus, MMR, and childhood vaccines
- **COVID-19 boosters** — Latest formulations available

![Healthcare professional preparing vaccine](https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=400&fit=crop)

## Why Choose Our Program?

### Convenience First

Book your vaccination appointment in just a few taps. Choose a time that works for you, and we'll send you a reminder before your visit.

### Digital Records

Your vaccination history is stored securely in the app. *No more paper cards* — access your records anytime, anywhere.

---

## How It Works

- Select your vaccination type in the app
- Choose a convenient date and location
- Receive confirmation and pre-visit instructions
- Get vaccinated by certified professionals
- Your digital record updates automatically

**Book your appointment today** and take the first step toward better protection for you and your loved ones.`,
      image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=400&h=300&fit=crop",
      createdAt: "2026-01-26T12:00:00Z",
    },
    {
      id: "promo-free-check-week",
      kind: "promo",
      title: "Free Health Check Week",
      body: `**This week only** — complimentary basic health screenings for all DocliQ members. Take advantage of this *limited-time opportunity* to check in on your health.

## What's Included

Your free screening covers essential health markers:

- **Blood pressure measurement** — Early detection of hypertension
- **BMI calculation** — Understanding your body composition
- **Blood glucose test** — Screening for diabetes risk
- **Cholesterol check** — Heart health indicator
- **Personalized recommendations** — Next steps based on your results

![Doctor reviewing health results with patient](https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop)

## Why Regular Checkups Matter

### Early Detection Saves Lives

Many serious conditions — including *heart disease, diabetes, and hypertension* — show no symptoms in early stages. Regular screenings catch problems before they become serious.

### Know Your Numbers

Understanding your baseline health metrics helps you make **informed decisions** about diet, exercise, and lifestyle.

---

## Participating Locations

- Central Medical Center — *Extended hours available*
- Riverside Family Clinic — *Walk-ins welcome*
- Westside Health Hub — *Parking available*
- Downtown Express Care — *Near public transit*

### How to Book

- Open the DocliQ app
- Navigate to **Appointments**
- Select *Free Health Check*
- Choose your preferred location and time

**Slots are limited** and filling up fast. Book your free health check now!`,
      url: "https://example.com/free-health-check",
      image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
      createdAt: "2026-01-20T14:01:00Z",
    },
    {
      id: "promo-new-clinic-partner",
      kind: "promo",
      title: "Welcome Riverside Clinic",
      body: `We're excited to announce that **DocliQ is now available at Riverside Clinic**, expanding our network to serve you better in the eastern district.

## About Riverside Clinic

Riverside Clinic has been serving the community for over *25 years*, combining experienced medical professionals with modern facilities.

![Riverside Clinic exterior](https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=400&fit=crop)

### Specialties Available

- **Family Medicine** — Care for all ages
- **Pediatrics** — Child-focused healthcare
- **Women's Health** — Comprehensive gynecological services
- **Preventive Care** — Screenings and wellness programs
- **Minor Procedures** — Same-day treatments

---

## Clinic Features

### Modern Facilities

The recently renovated clinic features *state-of-the-art diagnostic equipment* and comfortable patient areas designed with your wellbeing in mind.

### Convenient Access

- **Extended hours** — Open until 8pm on weekdays
- **Weekend appointments** — Saturday mornings available
- **Free parking** — 50+ spaces in attached garage
- **Public transit** — 5-minute walk from Central Station

### Multilingual Staff

Our team speaks German, English, Turkish, and Arabic to ensure **clear communication** with all patients.

## Seamless Integration

As a DocliQ member, you can:

- Book appointments directly through the app
- Access your complete medical history
- Receive digital prescriptions
- Get automatic appointment reminders

**Your records sync automatically** across all partner locations. Experience the same seamless healthcare, now closer to home.`,
      url: "https://example.com/clinic-partner",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
      createdAt: "2026-01-12T09:15:00Z",
    },
    {
      id: "promo-refer-friend",
      kind: "promo",
      title: "Refer a Friend Program",
      body: `Share the DocliQ experience with friends and family. When you invite someone to join, **you both benefit**!

## How It Works

Getting started is simple:

- Share your *unique referral link* with friends
- Your friend signs up and completes their first booking
- You **both** receive €10 credit in your DocliQ wallet
- Use your credit for any appointment or service

![Friends sharing healthcare app](https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&h=400&fit=crop)

## Unlimited Rewards

There's *no limit* to how many friends you can refer. The more you share, the more you earn!

### Referral Milestones

- **5 referrals** — Bronze status + €50 total credit
- **10 referrals** — Silver status + priority booking
- **25 referrals** — Gold status + exclusive health perks

---

## Why Your Friends Will Thank You

### Convenient Healthcare

- Book appointments in seconds
- Skip the phone queues
- Get reminders automatically

### Digital Prescriptions

- *No more paper prescriptions*
- Send directly to any pharmacy
- Track medication history

### Growing Network

- 200+ partner clinics
- Specialists in every field
- Telehealth options available

## Start Sharing Today

- Open your DocliQ app
- Go to **Profile** → **Refer Friends**
- Copy your personal link or share directly
- Track your referrals and rewards

**Help the people you care about** access better healthcare while earning rewards for yourself.`,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
      createdAt: "2026-01-08T16:54:00Z",
    },
    {
      id: "tip-hydration",
      kind: "tip",
      title: "Hydration reminder",
      body: "Aim for 6 to 8 cups today.",
      createdAt: "2026-01-07T08:00:00Z",
    },
    {
      id: "tip-sleep-routine",
      kind: "tip",
      title: "Sleep routine",
      body: "Try consistent sleep and wake times.",
      createdAt: "2026-01-05T18:30:00Z",
    },
    {
      id: "tip-cold-season",
      kind: "tip",
      title: "Cold season",
      body: "Wash hands, rest, and hydrate.",
      createdAt: "2026-01-02T10:10:00Z",
    },
  ],
  de: [
    {
      id: "promo-vaccination-program",
      kind: "promo",
      title: "Impfprogramm",
      body: `Bleiben Sie geschützt mit unseren **umfassenden Impfservices**. Unsere zertifizierten Gesundheitsfachkräfte helfen Ihnen, bei allen empfohlenen Impfungen auf dem neuesten Stand zu bleiben.

## Verfügbare Impfungen

Wir bieten eine *vollständige Palette* an Impfungen für jede Lebensphase:

- **Grippeimpfung** — Jährlich aktualisiert für maximalen Schutz
- **Reiseimpfungen** — Hepatitis A & B, Typhus, Gelbfieber und mehr
- **Routineimpfungen** — Tetanus, MMR und Kinderimpfungen
- **COVID-19-Auffrischung** — Neueste Formulierungen verfügbar

![Gesundheitsfachkraft bereitet Impfstoff vor](https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=400&fit=crop)

## Warum unser Programm wählen?

### Komfort zuerst

Buchen Sie Ihren Impftermin mit nur wenigen Klicks. Wählen Sie eine Zeit, die für Sie passt, und wir senden Ihnen vor Ihrem Besuch eine Erinnerung.

### Digitale Aufzeichnungen

Ihre Impfhistorie wird sicher in der App gespeichert. *Keine Papierausweise mehr* — greifen Sie jederzeit und überall auf Ihre Unterlagen zu.

---

## So funktioniert es

- Wählen Sie Ihre Impfart in der App
- Wählen Sie ein passendes Datum und einen Ort
- Erhalten Sie Bestätigung und Vorab-Anweisungen
- Lassen Sie sich von zertifizierten Fachleuten impfen
- Ihr digitaler Nachweis wird automatisch aktualisiert

**Buchen Sie noch heute Ihren Termin** und machen Sie den ersten Schritt zu besserem Schutz für sich und Ihre Lieben.`,
      image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=400&h=300&fit=crop",
      createdAt: "2026-01-26T12:00:00Z",
    },
    {
      id: "promo-free-check-week",
      kind: "promo",
      title: "Kostenlose Gesundheitscheck-Woche",
      body: `**Nur diese Woche** — kostenlose Basis-Gesundheitsuntersuchungen für alle DocliQ-Mitglieder. Nutzen Sie diese *zeitlich begrenzte Gelegenheit*, um Ihre Gesundheit zu überprüfen.

## Was ist enthalten

Ihre kostenlose Untersuchung umfasst wichtige Gesundheitsmarker:

- **Blutdruckmessung** — Früherkennung von Bluthochdruck
- **BMI-Berechnung** — Verständnis Ihrer Körperzusammensetzung
- **Blutzuckertest** — Screening auf Diabetesrisiko
- **Cholesterincheck** — Herzgesundheitsindikator
- **Persönliche Empfehlungen** — Nächste Schritte basierend auf Ihren Ergebnissen

![Arzt bespricht Gesundheitsergebnisse mit Patient](https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop)

## Warum regelmäßige Vorsorge wichtig ist

### Früherkennung rettet Leben

Viele schwere Erkrankungen — einschließlich *Herzerkrankungen, Diabetes und Bluthochdruck* — zeigen in frühen Stadien keine Symptome. Regelmäßige Untersuchungen erkennen Probleme, bevor sie ernst werden.

### Kennen Sie Ihre Werte

Das Verständnis Ihrer grundlegenden Gesundheitswerte hilft Ihnen, **fundierte Entscheidungen** über Ernährung, Bewegung und Lebensstil zu treffen.

---

## Teilnehmende Standorte

- Zentrales Medizinzentrum — *Erweiterte Öffnungszeiten*
- Riverside Familienpraxis — *Ohne Termin willkommen*
- Westside Gesundheitszentrum — *Parkplätze vorhanden*
- Downtown Express Care — *In der Nähe öffentlicher Verkehrsmittel*

### So buchen Sie

- Öffnen Sie die DocliQ-App
- Navigieren Sie zu **Termine**
- Wählen Sie *Kostenloser Gesundheitscheck*
- Wählen Sie Ihren bevorzugten Standort und Zeit

**Die Plätze sind begrenzt** und füllen sich schnell. Buchen Sie jetzt Ihren kostenlosen Gesundheitscheck!`,
      url: "https://example.com/free-health-check",
      image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
      createdAt: "2026-01-20T14:01:00Z",
    },
    {
      id: "promo-new-clinic-partner",
      kind: "promo",
      title: "Willkommen Riverside Klinik",
      body: `Wir freuen uns, Ihnen mitteilen zu können, dass **DocliQ jetzt in der Riverside Klinik verfügbar ist** und unser Netzwerk erweitert, um Sie im östlichen Bezirk besser zu betreuen.

## Über die Riverside Klinik

Die Riverside Klinik betreut die Gemeinde seit über *25 Jahren* und kombiniert erfahrene Mediziner mit modernen Einrichtungen.

![Riverside Klinik Außenansicht](https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=400&fit=crop)

### Verfügbare Fachgebiete

- **Allgemeinmedizin** — Versorgung für alle Altersgruppen
- **Pädiatrie** — Kinderorientierte Gesundheitsversorgung
- **Frauengesundheit** — Umfassende gynäkologische Leistungen
- **Vorsorge** — Untersuchungen und Wellness-Programme
- **Kleine Eingriffe** — Behandlungen am selben Tag

---

## Klinikmerkmale

### Moderne Einrichtungen

Die kürzlich renovierte Klinik verfügt über *modernste Diagnosegeräte* und komfortable Patientenbereiche, die auf Ihr Wohlbefinden ausgerichtet sind.

### Bequemer Zugang

- **Erweiterte Öffnungszeiten** — Geöffnet bis 20 Uhr an Wochentagen
- **Wochenendtermine** — Samstagvormittags verfügbar
- **Kostenlose Parkplätze** — 50+ Plätze in der angeschlossenen Garage
- **Öffentliche Verkehrsmittel** — 5 Minuten zu Fuß vom Hauptbahnhof

### Mehrsprachiges Personal

Unser Team spricht Deutsch, Englisch, Türkisch und Arabisch, um **klare Kommunikation** mit allen Patienten zu gewährleisten.

## Nahtlose Integration

Als DocliQ-Mitglied können Sie:

- Termine direkt über die App buchen
- Auf Ihre vollständige Krankengeschichte zugreifen
- Digitale Rezepte erhalten
- Automatische Terminerinnerungen bekommen

**Ihre Unterlagen synchronisieren sich automatisch** über alle Partnerstandorte. Erleben Sie die gleiche nahtlose Gesundheitsversorgung, jetzt näher an Ihrem Zuhause.`,
      url: "https://example.com/clinic-partner",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
      createdAt: "2026-01-12T09:15:00Z",
    },
    {
      id: "promo-refer-friend",
      kind: "promo",
      title: "Freunde-werben-Programm",
      body: `Teilen Sie das DocliQ-Erlebnis mit Freunden und Familie. Wenn Sie jemanden einladen beizutreten, **profitieren Sie beide**!

## So funktioniert es

Der Einstieg ist einfach:

- Teilen Sie Ihren *einzigartigen Empfehlungslink* mit Freunden
- Ihr Freund registriert sich und schließt seine erste Buchung ab
- Sie **beide** erhalten 10 € Guthaben in Ihrer DocliQ-Wallet
- Verwenden Sie Ihr Guthaben für jeden Termin oder Service

![Freunde teilen Gesundheits-App](https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&h=400&fit=crop)

## Unbegrenzte Belohnungen

Es gibt *kein Limit*, wie viele Freunde Sie empfehlen können. Je mehr Sie teilen, desto mehr verdienen Sie!

### Empfehlungs-Meilensteine

- **5 Empfehlungen** — Bronze-Status + 50 € Gesamtguthaben
- **10 Empfehlungen** — Silber-Status + Prioritätsbuchung
- **25 Empfehlungen** — Gold-Status + exklusive Gesundheitsvorteile

---

## Warum Ihre Freunde Ihnen danken werden

### Bequeme Gesundheitsversorgung

- Termine in Sekunden buchen
- Keine Telefonwarteschlangen
- Automatische Erinnerungen erhalten

### Digitale Rezepte

- *Keine Papierrezepte mehr*
- Direkt an jede Apotheke senden
- Medikamentenhistorie verfolgen

### Wachsendes Netzwerk

- 200+ Partnerkliniken
- Spezialisten in jedem Bereich
- Telemedizin-Optionen verfügbar

## Heute noch teilen

- Öffnen Sie Ihre DocliQ-App
- Gehen Sie zu **Profil** → **Freunde werben**
- Kopieren Sie Ihren persönlichen Link oder teilen Sie direkt
- Verfolgen Sie Ihre Empfehlungen und Belohnungen

**Helfen Sie den Menschen, die Ihnen wichtig sind**, Zugang zu besserer Gesundheitsversorgung zu erhalten, während Sie selbst Belohnungen verdienen.`,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
      createdAt: "2026-01-08T16:54:00Z",
    },
    {
      id: "tip-hydration",
      kind: "tip",
      title: "Trink-Erinnerung",
      body: "Trinken Sie heute 6 bis 8 Gläser Wasser.",
      createdAt: "2026-01-07T08:00:00Z",
    },
    {
      id: "tip-sleep-routine",
      kind: "tip",
      title: "Schlafroutine",
      body: "Versuchen Sie, regelmäßige Schlaf- und Aufwachzeiten einzuhalten.",
      createdAt: "2026-01-05T18:30:00Z",
    },
    {
      id: "tip-cold-season",
      kind: "tip",
      title: "Erkältungszeit",
      body: "Hände waschen, ausruhen und viel trinken.",
      createdAt: "2026-01-02T10:10:00Z",
    },
  ],
};

export function getNotifications(locale: "en" | "de" = "en"): CmsNotification[] {
  return localizedNotifications[locale] || localizedNotifications.en;
}

// For backward compatibility
export const demoNotifications = localizedNotifications.en;

export function sortByCreatedAtDesc(items: CmsNotification[]): CmsNotification[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
