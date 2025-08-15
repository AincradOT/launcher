# Windows Makefile - Compatible with Command Prompt and PowerShell
# Uses Windows-native commands and syntax

# Color codes for Windows (using echo commands that work in both cmd and powershell)
BOLD :=
RED  :=
GREEN :=
YELLOW :=
BLUE :=
RESET :=

setup-windows: ## Set up project dependencies
	@echo Setting up project dependencies...
	@echo Checking Node.js and npm installation...
	@node --version >nul 2>&1 || (echo ERROR: Node.js is not installed. Please install Node.js first. && exit /b 1)
	@npm --version >nul 2>&1 || (echo ERROR: npm is not installed. Please install npm first. && exit /b 1)
	@echo Node.js version: && node --version
	@echo npm version: && npm --version
	@echo Installing npm packages...
	cd app && npm install
	@echo Setup completed successfully!

run-windows: ## Run the project
	@echo Starting development server...
	cd app && npm run dev

lint-windows: ## Run code linting
	@echo Running linting...
	cd app && npm run lint

format-windows: ## Format code
	@echo Formatting code...
	cd app && npm run format

test-windows: ## Run tests
	@echo Running tests...
	cd app && npm run test

build-windows: ## Build the project
	@echo Building project...
	cd app && npm run build

clean-windows: ## Clean up caches and build artifacts
	@echo WARNING: This will remove caches and build artifacts!
	@echo This action cannot be undone.
	@set /p confirm="Type 'yes' to continue: " && ^
	if not "!confirm!"=="yes" ( ^
		echo Cleanup cancelled. && ^
		exit /b 0 ^
	) && ^
	echo Cleaning up build directories... && ^
	cd app && ^
	if exist "dist" rmdir /s /q "dist" 2>nul && ^
	if exist "dist-electron" rmdir /s /q "dist-electron" 2>nul && ^
	if exist "node_modules" rmdir /s /q "node_modules" 2>nul && ^
	echo Cleanup completed successfully!

help-windows: ## Show available commands
	@echo.
	@echo Available Commands for $(PROJECT_NAME)
	@echo.
	@echo   help          	Show available commands
	@echo   setup         	Set up project dependencies
	@echo   run           	Run the project
	@echo   lint          	Run code linting
	@echo   format        	Format code
	@echo   test          	Run tests
	@echo   build         	Build the project
	@echo   clean         	Clean up caches and build artifacts
	@echo.

check-env-windows: ## Check if .env file exists
	@if not exist "$(ENV_FILE)" ( ^
		echo ERROR: No .env file found. && ^
		echo. && ^
		if exist ".env.example" ( ^
			echo Run the following command to create it: && ^
			echo     copy .env.example .env ^
		) else ( ^
			echo Create an empty one: && ^
			echo     type NUL ^> .env ^
		) && ^
		echo. && ^
		echo After creating the .env file, update the values inside it before continuing. && ^
		exit /b 1 ^
	)
