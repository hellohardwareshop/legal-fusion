# Legal Manager Reference UI Match

## Goal
Match the Legal Manager end-to-end to the visual system in `creator-s-launchpad` while preserving every existing data source, action, workflow, mutation, and navigation item.

## Implementation
- Replace the current mixed styling tokens with the reference project's exact navy surfaces, electric-blue gradient, border, shadow, radius, typography, and density values.
- Standardize both Legal Manager entry points on the same 264px desktop sidebar and mobile drawer treatment; remove the separate desktop top bar while preserving all existing navigation targets.
- Use one full-width blue module banner on every screen, with the active section title, parent label, description, icon, and existing actions where available.
- Remove duplicate in-page title blocks so each screen has one clear banner and then starts directly with its operational content.
- Normalize shared KPI tiles, cards, tables, search/filter controls, badges, pagination, drawers, loading states, and empty/error states to the reference spacing and surface treatment.
- Replace remaining hardcoded visual colors in Legal Manager presentation code with semantic status/design tokens; preserve the meaning and behavior of every state.
- Keep all current Legal Manager modules and submenus. Do not add auth, new modules, demo content, fake data, or business-logic changes.

## Validation
- Check dashboard plus representative catalogue, AI, settings, document, compliance, and legacy screens at desktop and mobile widths.
- Verify sidebar navigation, accordions, tables, filters, drawers, and action confirmations still work.
- Confirm no overflow/overlap, no duplicate headings, and a clean build/runtime state.

## Technical details
- Primary shared surfaces: global design tokens, page shell/banner, enterprise sidebar, catalogue scaffold/table, and both Legal Manager layouts.
- The reference repository is used only for UI tokens and composition; application data hooks and mutations remain unchanged.
