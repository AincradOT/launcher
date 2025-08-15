# Usage

## Overview

This project uses a Makefile to simplify common development tasks for the Electron game launcher. All commands are executed using `make <target>` from the project root.

## Make Targets

### Help

List all available `make` targets:

```bash
make help
```

### Setup

Install project dependencies and prepare the development environment:

```bash
make setup
```

This verifies Node.js/npm installation and installs dependencies in the `app/` directory.

### Run

Start the Electron development server:

```bash
make run
```

This launches the Electron app in development mode with hot reloading.

### Lint

Run ESLint with auto-fix enabled:

```bash
make lint
```

Automatically fixes linting issues where possible.

### Format

Automatically format code using Prettier:

```bash
make format
```

Formats TypeScript, React, CSS, and Markdown files.

### Test

Execute the test suite using Vitest:

```bash
make test
```

Runs tests located in `app/src/__tests__/` directory.

### Build

Build and package the Electron application:

```bash
make build
```

Compiles TypeScript, builds web assets, and packages the app using electron-builder.

### Clean

Remove all build artifacts and caches (requires confirmation):

```bash
make clean
```

Removes `dist/`, `dist-electron/`, `node_modules/`, and other generated files.

## Development Workflow

1. **Setup**: Run `make setup` after cloning
2. **Development**: Use `make run` for development with hot reload
3. **Quality**: Run `make lint` and `make format` before committing
4. **Testing**: Use `make test` to verify changes
5. **Build**: Use `make build` to create distributable packages
