# Create a GitHub Action Using TypeScript

[![GitHub Super-Linter](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/check-dist.yml/badge.svg)](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/WarperSan/action-thunderstore-check/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

A GitHub Action for verifying if a mod is valid to be published on Thunderstore

## Thunderstore's format

This action tries to replicate the format required by TS:

### Icon
A `256x256` image named `icon.png`.

### README
Only requires that a `README.md` is present.

### Manifest

```json

```