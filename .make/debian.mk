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

setup-debian:
	@echo "$(GREEN)Setting up project dependencies...$(RESET)"
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
	@echo "$(BLUE)Installing npm packages and configuring Husky...$(RESET)"
	@cd app && npm install && npx husky init && npx husky add .husky/pre-commit "npx lint-staged"
	@echo "$(GREEN)Setup completed successfully!$(RESET)"

run-debian:
	@echo "$(GREEN)Starting development server...$(RESET)"
	@cd app && npm run dev

lint-debian:
	@echo "$(GREEN)Running linting with auto-fix...$(RESET)"
	@cd app && npm run lint:fix

format-debian:
	@echo "$(GREEN)Formatting code files...$(RESET)"
	@cd app && npm run format

test-debian:
	@echo "$(GREEN)Running tests...$(RESET)"
	@cd app && npm run test

build-debian:
	@echo "$(GREEN)Building and packaging project...$(RESET)"
	@cd app && npm run build
	@echo "$(GREEN)Build and packaging completed successfully!$(RESET)"

clean-debian:
	@echo "$(RED)WARNING: This will remove all build artifacts and caches!$(RESET)"
	@echo "This action cannot be undone."
	@read -p "Are you sure? Type 'yes' to continue: " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		echo "$(GREEN)Cleaning local caches and artifacts...$(RESET)"; \
		rm -rf .pytest_cache .mypy_cache .ruff_cache htmlcov coverage dist build node_modules; \
		find . -type d -name "__pycache__" -exec rm -rf {} +; \
		find . -type f -name "*.pyc" -delete; \
		echo "$(GREEN)Cleanup completed successfully!$(RESET)"; \
	else \
		echo "$(YELLOW)Cleanup cancelled.$(RESET)"; \
	fi

check-env-debian:
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

help-debian:
	@echo ""
	@echo "$(BOLD)$(BLUE)Available Commands for $(PROJECT_NAME)$(RESET)"
	@echo ""
	@grep -hE '^[a-zA-Z0-9_-]+:.*?## ' $(firstword $(MAKEFILE_LIST)) | sort \
	  | awk 'BEGIN {FS = ":.*?## "}; {printf "$(BLUE)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
