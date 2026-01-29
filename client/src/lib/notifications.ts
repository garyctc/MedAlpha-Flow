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

export const demoNotifications: CmsNotification[] = [
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
];

export function sortByCreatedAtDesc(items: CmsNotification[]): CmsNotification[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

