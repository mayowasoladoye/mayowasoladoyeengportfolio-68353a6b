# Recovering the 3D "Chemical Engineering" hero version

## What I found (answer to your question)

Yes — your theory matches the evidence.

- Every commit in this project's code storage was created on 12 August 2026, and the very first one is "Create README.md" (a repo containing only a README).
- Nothing before that date exists: no March/April/May/June history, and no orphaned/unreferenced commits from the old app. The only unreferenced commits in storage are Lovable's stock starter templates, not your portfolio.
- That pattern is exactly what happens when a project is re-linked to a fresh/empty GitHub repository: the empty repo's history replaced the project history, so the three.js hero, "CHEMICAL ENGINEERING" hero section, and all the original components were overwritten.

So there is no earlier commit for me to `revert` to from the code side. Two recovery routes remain.

## Route 1 (try this first, it is a true revert)

Lovable's History tab keeps version snapshots that are separate from git and can go back further than the repo does. Open History, scroll back toward March/April, and restore the version showing the 3D mesh hero. If a snapshot from that period is there, that restores the original code exactly — no rebuilding.

## Route 2 (rebuild, only if History has nothing that far back)

I still hold the saved project memory with the exact hero specification, so a rebuild would be faithful rather than a guess:

- Dark blue background `#0a1628`, thermal palette (deep blue, cyan, green, yellow, red).
- Interactive displaced plane mesh, 120 segments, metalness 0.3, roughness 0.4, white wireframe overlay at 0.06 opacity, HSL band mapping.
- Camera at `[0, 3, 6]`, fov 60; hover creates fluid troughs and crests.
- Overlay text uses `pointer-events-none` so the pointer hits the 3D surface.
- Hero copy: "CHEMICAL ENGINEERING" with Mayowa Soladoye branding, nav labels PROJECTS / SKILLS, plus the profile, skills (AutoCAD, Fusion 360, Python, MATLAB, Simulink, Excel, Word, ASPEN HYSYS) and contact links.

What is not recoverable from memory: the precise original wording of body copy and any images that lived in the old repo.

Nothing else on the current site would be removed — the sub-portfolio pages (Video Editing, Data Analytics, Data Engineering, Data Science, Music Production, Photography, Social Media Management) and the projects/admin setup stay as they are, with the recovered hero on the front page.

## Technical notes

- Add `three`, `@react-three/fiber`, `@react-three/drei`.
- New `src/components/Hero.tsx` containing the Canvas, displaced-plane shader/vertex logic and overlay, mounted at the top of `src/pages/Index.tsx`.
- Restore the dark-blue theme tokens in `src/index.css` / `tailwind.config.ts` rather than hardcoded colour classes.
- Existing routes in `src/App.tsx` are untouched.

## Recommendation

Check History first. Tell me what the oldest available version there looks like; if the mesh version is missing, approve this plan and I will rebuild the hero from the saved specification.
