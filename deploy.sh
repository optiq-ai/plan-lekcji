#!/bin/bash

# Skrypt do wdrażania aplikacji Inteligentny Plan Lekcji
# Autor: Manus AI
# Data: 15.04.2025

# Kolory do wyświetlania komunikatów
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Funkcja do wyświetlania komunikatów
print_message() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[UWAGA]${NC} $1"
}

print_error() {
  echo -e "${RED}[BŁĄD]${NC} $1"
}

# Sprawdzenie czy plik .env istnieje
if [ ! -f .env ]; then
  print_warning "Plik .env nie istnieje. Kopiowanie z .env.example..."
  cp .env.example .env
  print_message "Plik .env utworzony. Proszę zweryfikować ustawienia przed kontynuacją."
  exit 1
fi

# Sprawdzenie czy Docker jest zainstalowany
if ! command -v docker &> /dev/null; then
  print_error "Docker nie jest zainstalowany. Proszę zainstalować Docker przed kontynuacją."
  exit 1
fi

# Sprawdzenie czy Docker Compose jest zainstalowany
if ! command -v docker-compose &> /dev/null; then
  print_error "Docker Compose nie jest zainstalowany. Proszę zainstalować Docker Compose przed kontynuacją."
  exit 1
fi

# Funkcja do budowania i uruchamiania aplikacji w trybie deweloperskim
run_dev() {
  print_message "Uruchamianie aplikacji w trybie deweloperskim..."
  docker-compose up -d
  print_message "Aplikacja uruchomiona w trybie deweloperskim."
  print_message "Frontend: http://localhost:3000"
  print_message "Backend: http://localhost:8080"
  print_message "Portainer: http://localhost:9000"
}

# Funkcja do budowania i uruchamiania aplikacji w trybie produkcyjnym
run_prod() {
  print_message "Uruchamianie aplikacji w trybie produkcyjnym..."
  
  # Ustawienie zmiennej środowiskowej SPRING_PROFILES_ACTIVE na prod
  sed -i 's/SPRING_PROFILES_ACTIVE=.*/SPRING_PROFILES_ACTIVE=prod/' .env
  
  # Budowanie obrazów
  print_message "Budowanie obrazów Docker..."
  docker-compose build
  
  # Uruchamianie aplikacji
  docker-compose up -d
  
  print_message "Aplikacja uruchomiona w trybie produkcyjnym."
  print_message "Frontend: http://localhost:3000"
  print_message "Backend: http://localhost:8080"
  print_message "Portainer: http://localhost:9000"
}

# Funkcja do zatrzymywania aplikacji
stop() {
  print_message "Zatrzymywanie aplikacji..."
  docker-compose down
  print_message "Aplikacja zatrzymana."
}

# Funkcja do zatrzymywania aplikacji i usuwania wolumenów
clean() {
  print_message "Zatrzymywanie aplikacji i usuwanie wolumenów..."
  docker-compose down -v
  print_message "Aplikacja zatrzymana i wolumeny usunięte."
}

# Funkcja do wyświetlania logów
logs() {
  print_message "Wyświetlanie logów..."
  docker-compose logs -f
}

# Funkcja do wdrażania aplikacji za pomocą Portainer
deploy_portainer() {
  print_message "Wdrażanie aplikacji za pomocą Portainer..."
  
  # Sprawdzenie czy Portainer jest uruchomiony
  if ! curl -s http://localhost:9000 > /dev/null; then
    print_warning "Portainer nie jest uruchomiony. Uruchamianie Portainer..."
    docker-compose up -d portainer
    print_message "Portainer uruchomiony. Proszę zalogować się do Portainer i wdrożyć stos ręcznie."
    print_message "URL: http://localhost:9000"
    print_message "Plik stosu: portainer-stack.yml"
  else
    print_message "Portainer jest już uruchomiony."
    print_message "Proszę zalogować się do Portainer i wdrożyć stos ręcznie."
    print_message "URL: http://localhost:9000"
    print_message "Plik stosu: portainer-stack.yml"
  fi
}

# Funkcja do wyświetlania pomocy
show_help() {
  echo "Użycie: $0 [opcja]"
  echo "Opcje:"
  echo "  dev       - Uruchomienie aplikacji w trybie deweloperskim"
  echo "  prod      - Uruchomienie aplikacji w trybie produkcyjnym"
  echo "  stop      - Zatrzymanie aplikacji"
  echo "  clean     - Zatrzymanie aplikacji i usunięcie wolumenów"
  echo "  logs      - Wyświetlenie logów aplikacji"
  echo "  portainer - Wdrożenie aplikacji za pomocą Portainer"
  echo "  help      - Wyświetlenie tej pomocy"
}

# Główna logika skryptu
case "$1" in
  dev)
    run_dev
    ;;
  prod)
    run_prod
    ;;
  stop)
    stop
    ;;
  clean)
    clean
    ;;
  logs)
    logs
    ;;
  portainer)
    deploy_portainer
    ;;
  help|*)
    show_help
    ;;
esac

exit 0
