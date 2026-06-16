# Maintenance Guide

## Update Profile Text

Edit `profile.summary`, `profile.roles`, and `profile.contact` in `assets/data/site-data.js`.

## Update Publications

Edit the `publications` array in `assets/data/site-data.js`.

Use short selected entries on the website and keep full publication lists linked through Google Scholar and the University of Twente research profile.

## Add A Supervision Entry Later

Use this pattern in `site-data.js`:

```js
{
  level: "MSc thesis",
  title: "Project title",
  student: "Student name",
  year: "2026",
  topic: "Short topic label",
  summary: "Two-sentence public summary.",
  links: [
    { label: "Thesis", url: "https://..." },
    { label: "Demo", url: "https://..." }
  ]
}
```

Before adding a student entry, confirm the thesis/demo/presentation is public and does not expose private assessment, medical, personal, or administrative information.

## Add Demo Media Later

Prefer linking to a public video host or compressed public demo file. Avoid committing large videos directly to the GitHub Pages repository.

If a video must be hosted in the repository, keep it small and place it under `assets/media/`.
