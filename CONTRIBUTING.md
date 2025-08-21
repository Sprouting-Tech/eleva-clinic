# Contributing — Git & PR Workflow

A lightweight workflow intended for interns: fast iteration while keeping the code readable and reviewable.

## Branch Naming

- `feature/<area>-<short>` — new feature  
  _e.g._ `feature/home-promotions`, `feature/reviews-swiper`
- `fix/<short>` — small bug fixes
- `chore/<short>` — config/moves/cleanup

## Conventional Commits

- `feat:` new feature
- `fix:` bug fix
- `refactor:` internal changes without behavior change
- `docs:` README/docs
- `style:` formatting only (no logic)
- `chore:` misc/config
- `perf:` performance tweaks (if any)

**Examples**

```
feat: home promotions slider
fix: wrong spacing on testimonial card
refactor: extract AccordionItem component
```

## Local Checks (must pass before PR)

```bash
npm run typecheck
npm run lint
npm run build   # must pass
```

If you add images, place them under `public/images/...` and use `next/image`.

## Opening a PR

1. Push your branch
2. Open a PR and fill out the PR template
3. Assign **Reviewer = FULL**
4. Attach screenshots/video (mobile 360–430px) showing the result

## Merge Conditions

- 1 approval from **FULL**
- Local `npm run build` passes
- No console errors on the changed pages

## Recommended PR Size

- Aim for ≤ ~300 lines (diff)
- If larger, split by component/page (e.g., split card components vs. page shell)

## Code Style (short)

- Prettier + ESLint as configured in the repo
- Small, focused components; clear file names (kebab-case)
- Meaningful prop/type names (avoid `any` when possible)

## Assets

- Put images under `public/images/<section>/<slug>.jpg`
- Sizes: hero ~1600w; card 800–1200w
- Use `next/image` with width/height

## After Merge

- Delete the branch
- Update the Notion board (move card to **Done**, add PR link)
