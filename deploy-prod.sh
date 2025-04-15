#!/bin/bash

# Skrypt do wdrażania aplikacji Inteligentny Plan Lekcji w środowisku produkcyjnym
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

print_success() {
  echo -e "${GREEN}[SUKCES]${NC} $1"
}

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

# Funkcja do tworzenia kopii zapasowej
create_backup() {
  print_message "Tworzenie kopii zapasowej bazy danych..."
  
  # Utworzenie katalogu na kopie zapasowe, jeśli nie istnieje
  mkdir -p backups
  
  # Nazwa pliku kopii zapasowej z datą
  local backup_file="backups/db_backup_$(date +%Y%m%d_%H%M%S).sql"
  
  # Wykonanie kopii zapasowej
  if docker-compose exec -T db pg_dump -U postgres lesson_planning_db > "$backup_file"; then
    print_success "Kopia zapasowa utworzona: $backup_file"
    return 0
  else
    print_error "Nie udało się utworzyć kopii zapasowej."
    return 1
  fi
}

# Funkcja do budowania obrazów Docker
build_images() {
  print_message "Budowanie obrazów Docker..."
  
  if docker-compose build; then
    print_success "Obrazy Docker zbudowane pomyślnie."
    return 0
  else
    print_error "Nie udało się zbudować obrazów Docker."
    return 1
  fi
}

# Funkcja do wdrażania aplikacji
deploy_application() {
  print_message "Wdrażanie aplikacji..."
  
  # Zatrzymanie istniejących kontenerów
  print_message "Zatrzymywanie istniejących kontenerów..."
  docker-compose down
  
  # Uruchomienie aplikacji
  print_message "Uruchamianie aplikacji..."
  if docker-compose up -d; then
    print_success "Aplikacja uruchomiona pomyślnie."
    
    # Wyświetlenie informacji o dostępie
    print_message "Frontend: http://localhost:3000"
    print_message "Backend: http://localhost:8080"
    print_message "Portainer: http://localhost:9000"
    
    return 0
  else
    print_error "Nie udało się uruchomić aplikacji."
    return 1
  fi
}

# Funkcja do wdrażania aplikacji za pomocą Portainer
deploy_with_portainer() {
  print_message "Wdrażanie aplikacji za pomocą Portainer..."
  
  # Sprawdzenie czy Portainer jest uruchomiony
  if ! curl -s http://localhost:9000 > /dev/null; then
    print_warning "Portainer nie jest uruchomiony. Uruchamianie Portainer..."
    docker-compose up -d portainer
    
    # Oczekiwanie na uruchomienie Portainer
    print_message "Oczekiwanie na uruchomienie Portainer..."
    sleep 10
  fi
  
  print_message "Portainer jest dostępny pod adresem: http://localhost:9000"
  print_message "Aby wdrożyć aplikację, zaloguj się do Portainer i użyj pliku portainer-stack.yml."
  
  return 0
}

# Funkcja do monitorowania wdrożenia
monitor_deployment() {
  print_message "Monitorowanie wdrożenia..."
  
  # Sprawdzenie statusu kontenerów
  docker-compose ps
  
  # Wyświetlenie logów
  print_message "Wyświetlanie logów (naciśnij Ctrl+C, aby zakończyć)..."
  docker-compose logs -f
}

# Główna funkcja wdrożeniowa
main() {
  print_message "Rozpoczynanie procesu wdrażania aplikacji Inteligentny Plan Lekcji..."
  
  # Utworzenie kopii zapasowej
  if ! create_backup; then
    print_warning "Kontynuowanie bez kopii zapasowej..."
  fi
  
  # Budowanie obrazów
  if ! build_images; then
    print_error "Proces wdrażania przerwany z powodu błędu podczas budowania obrazów."
    exit 1
  fi
  
  # Wdrażanie aplikacji
  if ! deploy_application; then
    print_error "Proces wdrażania przerwany z powodu błędu podczas uruchamiania aplikacji."
    exit 1
  fi
  
  # Monitorowanie wdrożenia
  monitor_deployment
}

# Uruchomienie głównej funkcji
main
