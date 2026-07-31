# MeteSec

Source for [metesec.github.io](https://metesec.github.io/), a personal cybersecurity site built around one idea: **Build. Break. Defend.**

The site documents practical projects, technical deep dives, commentary, and an honest learning journey across security engineering, offensive security, and cyber defense.

## Stack

- [Hugo](https://gohugo.io/)
- [Blowfish](https://blowfish.page/) theme
- GitHub Actions and GitHub Pages

## Local development

Clone the repository including its theme submodule, then run:

```bash
hugo server --minify -D -E -F
```

## Content model

Articles use one editorial category—`Build`, `Break`, `Defend`, `Journey`, or `Commentary`—and up to four terms from the controlled tag vocabulary documented on the site.
