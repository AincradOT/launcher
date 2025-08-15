# Setup

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) – Version 18 or higher
- [Git](https://git-scm.com/downloads) – Version control system
- [Make](https://www.gnu.org/software/make/#download) – Build automation tool

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/AincradOT/launcher
cd launcher
```

## Setup

Install dependencies and prepare the project:

```bash
make setup
```

This command will:

- Verify Node.js and npm are installed
- Install all npm dependencies in the `app/` directory
- Set up the development environment

## Project Structure

```
launcher/
├── app/                   # Main Electron application
│   ├── src/               # React source code
│   ├── electron/          # Electron main process
│   ├── dist-electron/     # Built Electron files (auto-generated)
│   └── dist/              # Built web assets (auto-generated)
├── docs/                  # Documentation
├── .github/workflows/     # CI/CD pipelines
└── Makefile               # Build automation
```

## Next Steps

Once setup is complete, check out the [usage guide](https://AincradOT.github.io/launcher/usage) to learn how to use the project, or see the [contributing guide](https://AincradOT.github.io/launcher/contributing) if you'd like to contribute.
