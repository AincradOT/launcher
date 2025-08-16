PROJECT_NAME ?= $(notdir $(CURDIR))
DIST         ?= dist
VERSION      ?= dev

.ONESHELL:
BASH := $(shell command -v bash 2>/dev/null || echo /bin/sh)
SHELL := $(BASH)

ifeq ($(notdir $(SHELL)),bash)
  SHELLFLAGS := -eu -o pipefail -c
else
  SHELLFLAGS := -eu -c
endif

BOLD   := $(shell tput bold 2>/dev/null || echo "")
RED    := $(shell tput setaf 1 2>/dev/null || echo "")
GREEN  := $(shell tput setaf 2 2>/dev/null || echo "")
YELLOW := $(shell tput setaf 3 2>/dev/null || echo "")
BLUE   := $(shell tput setaf 4 2>/dev/null || echo "")
RESET  := $(shell tput sgr0 2>/dev/null || echo "")

setup-debian: ## Set up project dependencies
	@echo "$(GREEN)Setting up project dependencies...$(RESET)"
	@echo "$(BLUE)Checking and installing system dependencies...$(RESET)"
	@if ! command -v dpkg-deb >/dev/null 2>&1; then \
		echo "$(BLUE)Installing Debian build tools...$(RESET)"; \
		sudo apt-get update && sudo apt-get install -y dpkg-dev; \
	else \
		echo "$(GREEN)Debian build tools already installed$(RESET)"; \
	fi
	@echo "$(BLUE)Installing additional dependencies for cross-platform builds...$(RESET)"
	@sudo apt-get update && sudo apt-get install -y \
		libfuse2 \
		fuse \
		squashfs-tools \
		genisoimage \
		wine \
		wine64 \
		wine32 \
		winbind \
		imagemagick \
		librsvg2-bin
	@echo "$(BLUE)Installing Wine dependencies for Windows builds...$(RESET)"
	@sudo dpkg --add-architecture i386
	@sudo apt-get update
	@sudo apt-get install -y \
		wine32 \
		wine64 \
		libwine:i386 \
		fonts-wine
	@echo "$(BLUE)Checking Node.js and npm installation...$(RESET)"
	@if ! command -v node >/dev/null 2>&1; then \
		echo "$(RED)ERROR: Node.js is not installed. Please install Node.js first.$(RESET)"; \
		exit 1; \
	fi
	@if ! command -v npm >/dev/null 2>&1; then \
		echo "$(RED)ERROR: npm is not installed. Please install npm first.$(RESET)"; \
		exit 1; \
	fi
	@echo "$(GREEN)Node.js version: $(shell node --version)$(RESET)"
	@echo "$(GREEN)npm version: $(shell npm --version)$(RESET)"
	@echo "$(BLUE)Installing npm packages...$(RESET)"
	@cd app && npm install
	@echo "$(GREEN)Setup completed successfully!$(RESET)"

run-debian: ## Run the project
	@echo "$(GREEN)Starting development server...$(RESET)"
	@cd app && npm run dev

lint-debian: ## Run code linting
	@echo "$(GREEN)Running linting...$(RESET)"
	@cd app && npm run lint

format-debian: ## Format code
	@echo "$(GREEN)Formatting code files...$(RESET)"
	@cd app && npm run format

test-debian: ## Run tests
	@echo "$(GREEN)Running tests...$(RESET)"
	@cd app && npm run test

build-debian: ## Build the project
	@echo "$(GREEN)Building project...$(RESET)"
	@cd app && (\
		echo "$(BLUE)Building renderer and electron...$(RESET)" && \
		npm run build:renderer && npm run build:electron && \
		echo "$(BLUE)Building packages for Linux and Windows...$(RESET)" && \
		npm run package:all || echo "$(YELLOW)Some package builds failed, check output above for details$(RESET)" \
	)
	@echo "$(GREEN)Build completed!$(RESET)"
	@echo "$(BLUE)Check the dist/ directory for built packages.$(RESET)"

clean-debian: ## Clean up caches and build artifacts
	@echo "$(RED)WARNING: This will remove all build artifacts and caches!$(RESET)"
	@echo "This action cannot be undone."
	@read -p "Are you sure? Type 'yes' to continue: " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		echo "$(GREEN)Cleaning local caches and artifacts...$(RESET)"; \
		cd app && rm -rf dist dist-electron node_modules; \
		echo "$(GREEN)Cleanup completed successfully!$(RESET)"; \
	else \
		echo "$(YELLOW)Cleanup cancelled.$(RESET)"; \
	fi

check-env-debian: ## Check if .env file exists
	@if [ ! -f "$(ENV_FILE)" ]; then \
		echo "$(RED)ERROR:$(RESET) No .env file found."; \
		echo ""; \
		if [ -f ".env.example" ]; then \
			echo "Run the following command to create it:"; \
			echo "    cp .env.example .env"; \
		else \
			echo "A .env.example file is missing, but you can still create a .env file manually:"; \
			echo "    cp /dev/null .env"; \
		fi; \
		echo ""; \
		echo "After creating the .env file, update the values inside it before continuing."; \
		exit 1; \
	fi

help-debian: ## Show available commands
	@echo ""
	@echo "$(BOLD)$(BLUE)Available Commands for $(PROJECT_NAME)$(RESET)"
	@echo ""
	@grep -hE '^[a-zA-Z0-9_-]+:.*?## ' $(firstword $(MAKEFILE_LIST)) | sort \
	  | awk 'BEGIN {FS = ":.*?## "}; {printf "$(BLUE)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
