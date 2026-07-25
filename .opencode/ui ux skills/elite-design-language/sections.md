# Page Sections

> Rewritten from scratch, following the hero in `hero.md`. Every section below implements one beat of the emotional arc from `philosophy.md`'s Story Arc and Rhythm Pattern — not a generic feature/testimonial/pricing template. Each section states the exact feeling the customer should carry *into* it and *out of* it, and the exact worry it is responsible for removing.

---

## Section Order & Background Rhythm

Per `visual-language.md` (White → Soft → White → Navy → White) and `philosophy.md`'s Rhythm Pattern:

```
1. Hero                    — Navy gradient (see hero.md)          [Navy use #1 of 2]
2. How Installation Works  — White (--bg-base)
3. Products & Pricing      — Soft (--bg-soft)
4. Response Promise        — Navy (--bg-navy)                     [Navy use #2 of 2]
5. Testimonials            — White (--bg-base)
6. FAQ                     — Soft (--bg-soft)
7. Closing CTA             — White (--bg-base)
8. Footer                  — Muted (--bg-muted)
```

Note: Response Promise is placed *before* Testimonials here (not after, as philosophy.md's abstract list shows) because brand.md names responsiveness as "the exact point where our named competitors are weakest — it must be visible everywhere, not just claimed once." Placing the high-contrast promise mid-page, right after price is shown, answers the objection at the moment it's most likely to surface (immediately after seeing a number), then testimonials arrive as third-party proof of that same claim. This ordering is a deliberate deviation, justified by philosophy.md's own Decision Justification Template:

```
Decision: Response Promise section placed before Testimonials, not after
Alternative: Follow philosophy.md's listed order literally (Testimonials → Response Promise)
Reason: The moment right after price is shown is exactly when doubt about
        "what if something goes wrong" peaks — answering it immediately keeps
        the page's worry-reduction sequence airtight
Principle: philosophy.md — "Every section should reduce a worry, not create one"
Trade-off: Slight deviation from the literal listed order, accepted because it
           serves the same document's own stated principle more directly
```

---

## Section 2 — How Installation Works

### Emotional Job
- **Feeling before:** Skeptical. The visitor has seen a plain, calm hero — but plain claims are cheap. They're wondering "is this actually going to be done properly, or am I trusting a stranger with an install in my car / across 40 fleet vehicles?"
- **Feeling after:** Reassured through *specificity*, not adjectives. They should think "I know exactly what happens, in what order, and by whom" — not "this sounds professional."
- **Worry removed:** Quality/competence fear (brand.md's second named customer fear, alongside price).

### Structure (per philosophy.md: "step-by-step, spacious")
Three steps, numbered, generous whitespace between them (per spacing.md rhythm) — not a dense feature grid. `philosophy.md` Simplicity Rule: "If a section has 6 features, show 3."

```
H2: دقیقاً همین‌طور نصب می‌شود
    ("This is exactly how it's installed")

Step 1 — بازدید و انتخاب دستگاه مناسب
  "تکنسین ما با توجه به نوع خودرو یا تعداد ناوگان شما، دستگاه مناسب را
   پیشنهاد می‌دهد؛ نه گران‌ترین گزینه، مناسب‌ترین گزینه."
  ("Our technician recommends the right device for your vehicle or fleet size —
    not the most expensive option, the right one.")

Step 2 — نصب توسط تکنسین، نه راهنمای ویدیویی
  "نصب توسط خود تکنسین انجام می‌شود و پیش از خروج، عملکرد سیگنال
   جلوی چشم شما تست می‌شود."
  ("Installed by our technician in person, and signal is tested in front of
    you before we leave.")

Step 3 — تایید مختصات، همان لحظه
  "همان لحظه مختصات دستگاه روی گوشی شما تایید می‌شود — دقیقا همین که
   بالای صفحه دیدید."
  ("Your coordinates are confirmed on your phone in that same moment —
    exactly what you saw at the top of this page.")
```

Step 3's copy deliberately calls back to the hero's live-fix panel — the "proof" established in the hero is *referenced*, not repeated with a new gimmick, keeping the page's single signature idea coherent end-to-end.

### Visual Notes
- No icons-only; each step has a one-line label per typography.md ("icons have labels").
- No Fix Mark here — it isn't a confirmed *fact* (price, years, response time, install status), it's a process description. Reserve the glyph for its four approved uses only.

---

## Section 3 — Products & Pricing

### Emotional Job
- **Feeling before:** Guarded. Every fear named in brand.md converges here — this is the moment they expect to be upsold or find a hidden number.
- **Feeling after:** Disarmed, specifically because nothing was hidden. Per philosophy.md's "No Hidden Cost Test," they should be able to answer, without a sales call: "which tier is for me, and what does year one actually cost."
- **Worry removed:** Price opacity + hidden subscription fee (the #1 named fear in brand.md and philosophy.md, called out twice for a reason).

### Structure
Three tiers, described **by who they're for**, not ranked "best/better/best" (per brand.md's Fair-Pricing Signals). Cards sit on `--bg-base` (white) since the section background is `--bg-soft`, per visual-language.md's card-contrast rule.

```
H2: قیمت کامل، همین‌جا — نه در مرحله پرداخت
    ("The full price, right here — not at checkout")
Subhead: قیمت دستگاه به‌علاوه هزینه سالانه، همیشه با هم نمایش داده می‌شود.
         ("Device price plus the annual fee — always shown together.")

Card A — برای یک خودرو، حداکثر اطمینان
  "دوام بالا، مناسب کسی که نگران گم‌شدن یا سرقت خودروی شخصی‌اش است."
  [device price] + [annual fee] shown at equal visual weight (typography.md
  Hierarchy Rule #2), total price beside a Fix Mark glyph               [Fix use #3/3]

Card B — پرکاربردترین انتخاب
  "برای اکثر خانواده‌ها و کسب‌وکارهای کوچک؛ تعادل قیمت و امکانات."

Card C — برای ناوگان بزرگ و سازمانی
  "برای مدیرانی که چند ده خودرو را همزمان مدیریت می‌کنند؛ گزارش‌گیری ساده‌تر."
```

Only Card A carries the Fix Mark (total first-year price is the single confirmed number that most needs it — the "entry" tier is where trust is hardest-won for a first-time buyer). This is the **third and final** Fix Mark use on the page — the hero already used two (live coordinate + "12 years" line, see `hero.md`). Do not add a fourth anywhere in this page, including footer.

```
Decision: Only one product card carries the Fix Mark, not all three
Alternative: Put the glyph beside every card's total price for consistency
Reason: visual-language.md caps Fix Mark at 3 uses per page; hero already
        spends 2, leaving exactly 1 for the entire rest of the page
Principle: visual-language.md — "Maximum three per page," colors.md — same cap
Trade-off: Slight visual inconsistency across the three pricing cards,
           accepted because the alternative breaks a hard system rule
```

### CTA per card
```
مشاهده جزئیات و شروع سفارش
("See details and start your order")
```
Not "خرید کنید" ("Buy now") — avoids any push/urgency tone per brand.md Voice Rule #1.

---

## Section 4 — Response Promise (Navy, high-contrast)

### Emotional Job
- **Feeling before:** Cautiously convinced on price and process, but still holding the brand's sharpest named competitive gap in mind: "what happens the day something actually goes wrong?"
- **Feeling after:** Confident specifically about *support*, separate from confidence about price/install — brand.md is explicit these deserve independent signals, not folded into generic "trust" language.
- **Worry removed:** Fear of being ignored after purchase — the exact place brand.md says competitors are weakest.

### Structure
This is the second and final navy section (visual-language.md's 2-section cap). High-contrast, calm, not alarming.

```
H2 (white): وقتی چیزی درست کار نکرد، تلفن را جواب می‌دهیم
            ("When something isn't working, we pick up the phone")

Body (white/90): پشتیبانی ما در ساعات کاری در همان تماس اول پاسخ می‌دهد،
                  نه با ربات، با یک نفر که واقعاً می‌تواند کمک کند.
  ("Our support answers on the first call during business hours —
    not a bot, a person who can actually help.")

Stated commitment + Fix Mark: NOT used here — this page's 3-mark budget is
already spent (2 in hero, 1 in pricing). Instead, the commitment is stated
in plain white/rust-free text, matching visual-language.md's own ceiling.
```

```
Decision: State the response-time commitment here without a Fix Mark
Alternative: Add a 4th Fix Mark instance beside the commitment
Reason: The 3-per-page ceiling is a hard system rule, not a soft guideline
Principle: visual-language.md — "Maximum: one visible per viewport, maximum
           three per page total"
Trade-off: This section's fact reads slightly less "signature" than the
           others, accepted because breaking the cap would flatten the
           glyph's entire meaning (rare = trustworthy)
```

CTA here is secondary, not primary — this section's job is reassurance, not conversion:
```
شماره تماس پشتیبانی را ببینید
("See the support phone number")
```

---

## Section 5 — Testimonials

### Emotional Job
- **Feeling before:** Rationally convinced (price, process, support all addressed) but still relying on the brand's own word for all of it.
- **Feeling after:** Convinced by someone *like them*, unscripted — per philosophy.md Act 3: "trust through longevity and unscripted words, not manufactured hype."
- **Worry removed:** "Is this brand just telling me what I want to hear?"

### Structure
Real-register copy, imperfect grammar kept intentionally (per brand.md Tone Rules: "Real customer words, kept as they were said").

```
H2: مشتری‌های واقعی، حرف‌های واقعی
    ("Real customers, real words")

Quote 1 (individual owner):
  "راستش اولش فکر می‌کردم ردیاب یعنی یه چیز پیچیده‌ست. تا وقتی که واقعاً
   لازمش شدم نفهمیدم چقدر ساده جواب می‌ده."
  ("Honestly at first I thought a tracker was some complicated thing.
    I didn't get how simple it was until I actually needed it.")

Quote 2 (fleet manager):
  "چیزی که برام مهم بود این بود که وقتی زنگ می‌زنم، یکی جواب بده.
   تا الان همیشه جواب دادن."
  ("What mattered to me was that when I call, someone answers.
    So far, they always have.")
```

No star ratings, no "5.0 ★★★★★" badges — colors.md explicitly retires amber from all badge/rating use; testimonials rely on the words alone, not a decorative score.

---

## Section 6 — FAQ

### Emotional Job
- **Feeling before:** Nearly ready, holding one or two specific leftover objections (renewal price? which tier exactly? what if I have 3 vehicles, not 1 or 40?).
- **Feeling after:** No open questions left — per philosophy.md's "No Hidden Cost Test" item 3: renewal price must be as visible as first-year price.
- **Worry removed:** Any remaining ambiguity about renewal cost or tier fit.

### Sample entries (plain-spoken, no jargon per brand.md Voice Rule #4)
```
Q: هزینه سال دوم به بعد چقدره؟
A: همان هزینه اشتراک سالانه‌ای که در صفحه قیمت‌گذاری دیدید، بدون تغییر
   پنهان یا افزایش ناگهانی.
   ("What does the second year onward cost? The same annual fee you saw
     on the pricing page — no hidden change, no sudden increase.")

Q: اگه بین دو تا از دستگاه‌ها مطمئن نیستم چی؟
A: با پشتیبانی تماس بگیرید؛ بر اساس تعداد خودرو و نوع استفاده، یکی رو
   پیشنهاد می‌دیم — نه گران‌ترین رو.
   ("Not sure which device fits me? Call support — we'll recommend one
     based on your actual use, not the most expensive option.")
```

---

## Section 7 — Closing CTA

### Emotional Job
- **Feeling before:** Ready, but this brand never pushes at the finish line.
- **Feeling after:** Invited, calmly — per philosophy.md Act 4: "No pressure, no countdown, no 'only today.'"
- **Worry removed:** None — this section adds nothing new, it only opens the door.

```
H2: آماده‌اید؟ قیمت را ببینید، یا با ما صحبت کنید
    ("Ready? See the price, or talk to us")

Body: هیچ فروشنده‌ای پشت خط نیست. یک نفر که واقعاً می‌تواند کمک کند، جواب می‌دهد.
  ("No salesperson on the other end. Someone who can actually help answers.")

Primary CTA: مشاهده قیمت دقیق   (same phrase as hero — consistency, not novelty)
Secondary CTA: صحبت با پشتیبانی
```

No countdown, no "only 3 technicians available this week," no discount badge — all explicitly forbidden per brand.md and philosophy.md.

---

## Section 8 — Footer

### Emotional Job
- **Feeling before:** Convinced, possibly not converting today.
- **Feeling after:** Reassured this is a real, findable, long-standing business — not a landing page that vanishes tomorrow.
- **Worry removed:** "Is this a fly-by-night operation?"

```
۱۲ سال است در همین کار هستیم.   ("We've been doing exactly this for 12 years.")
[contact phone, visible, not just an icon]
[physical/service area info]
```

No Fix Mark here (budget fully spent in hero + pricing). "12 years" appears as plain text in the footer, consistent with visual-language.md's own note that the fact can be *stated* without the glyph — the glyph marks it once, prominently, in the hero; repeating it everywhere would cheapen the signature (visual-language.md: "Used more than once per distinct fact... " is a forbidden pattern).

---

## Cross-Section Consistency Checklist

1. **Fix Mark total = 3** across the entire page (2 in hero, 1 in pricing) — verified against visual-language.md and colors.md hard caps.
2. **Navy total = 2 sections** (hero, response promise) — verified against visual-language.md's cap.
3. **One accent color (teal) per section maximum** — all CTAs across every section above use teal only; rust never appears on a CTA.
4. **Total cost never separated from device name** — enforced in Section 3 per typography.md Hierarchy Rule #2.
5. **No countdown, scarcity, or badge language anywhere** — verified section by section above.
6. **Every section's copy is customer-facing, not system-facing** — no "GPS module," "firmware," "API," or internal terminology anywhere in this file.
