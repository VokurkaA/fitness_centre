# Systém pro správu fitness centra

## Zadání
Navrhněte systém pro správu fitness centra, který umožní zákazníkům rezervovat si cvičební lekce, spravovat členství a sledovat osobní tréninkové plány. Trenéři budou mít možnost vytvářet a spravovat tréninkové plány pro jednotlivé členy. Recepční bude spravovat registrace členů a administrátor bude sledovat statistiky o využití služeb fitness centra.

## Aktéři
- **Člen** – může si rezervovat lekce, upravovat svůj tréninkový plán a spravovat své členství.
- **Trenér** – vytváří a spravuje tréninkové plány pro členy.
- **Recepční** – spravuje registrace členů a kontroluje přístup.
- **Administrátor** – generuje statistiky o využití služeb a spravuje celý systém.

## Use Case
- **Registrace nového člena** – recepční zaregistruje nového člena do systému.
- **Rezervace lekce** – člen si může rezervovat lekci (např. jógu, spinning, atd.).
- **Správa tréninkového plánu** – trenér vytváří a upravuje tréninkový plán pro člena.
- **Check-in na lekci** – člen se hlásí na rezervovanou lekci při příchodu do fitness centra.
- **Platba za členství** – člen platí za své členství.
- **Generování reportů** – administrátor generuje reporty o využití služeb.
- **Zobrazení rozvrhu lekcí** – člen zobrazuje dostupné lekce.
- **Změna členství** – člen může měnit své členství (např. z měsíčního na roční).

## Doménový model
### Entity
- Člen
- Trenér
- Lekce
- Tréninkový plán
- Rezervace
- Členství
- Platba
- Administrátor
- Recepční

### Vztahy
- Člen má více rezervací 
- Trenér má více tréninkových plánů 
- Lekce má více rezervací 

## Třídní diagram
### Třídy
- Člen
- Trenér
- Lekce
- Rezervace
- Tréninkový plán
- Platba
- Členství
- Administrátor
- Recepční

### Vztahy
- Agregace mezi **Členem** a **Členstvím**
- Asociace mezi **Členem** a **Rezervací**
- Kompozice mezi **Trenérem** a **Tréninkovým plánem**