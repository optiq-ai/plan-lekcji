#!/bin/bash

# Skrypt do testowania aplikacji Inteligentny Plan Lekcji
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

# Sprawdzenie czy curl jest zainstalowany
if ! command -v curl &> /dev/null; then
  print_error "curl nie jest zainstalowany. Proszę zainstalować curl przed kontynuacją."
  exit 1
fi

# Funkcja do testowania połączenia z usługą
test_connection() {
  local service=$1
  local url=$2
  local max_attempts=$3
  local attempt=1
  
  print_message "Testowanie połączenia z $service ($url)..."
  
  while [ $attempt -le $max_attempts ]; do
    if curl -s -f $url > /dev/null; then
      print_success "$service jest dostępny!"
      return 0
    else
      print_warning "Próba $attempt/$max_attempts: $service nie jest jeszcze dostępny. Oczekiwanie..."
      sleep 5
      attempt=$((attempt+1))
    fi
  done
  
  print_error "$service nie jest dostępny po $max_attempts próbach."
  return 1
}

# Funkcja do testowania bazy danych
test_database() {
  print_message "Testowanie połączenia z bazą danych..."
  
  # Sprawdzenie czy kontener bazy danych jest uruchomiony
  if ! docker-compose ps | grep -q "db.*Up"; then
    print_error "Kontener bazy danych nie jest uruchomiony."
    return 1
  fi
  
  # Wykonanie zapytania testowego do bazy danych
  if docker-compose exec db psql -U postgres -c "SELECT 1" > /dev/null 2>&1; then
    print_success "Połączenie z bazą danych działa poprawnie!"
    return 0
  else
    print_error "Nie można połączyć się z bazą danych."
    return 1
  fi
}

# Funkcja do testowania backendu
test_backend() {
  print_message "Testowanie backendu..."
  
  # Sprawdzenie czy kontener backendu jest uruchomiony
  if ! docker-compose ps | grep -q "backend.*Up"; then
    print_error "Kontener backendu nie jest uruchomiony."
    return 1
  fi
  
  # Testowanie endpointów API
  local backend_url="http://localhost:8080"
  
  # Test endpointu health
  if ! test_connection "Backend health endpoint" "$backend_url/actuator/health" 5; then
    return 1
  fi
  
  # Test endpointu API
  if ! test_connection "Backend API" "$backend_url/api/subjects" 5; then
    return 1
  fi
  
  print_success "Backend działa poprawnie!"
  return 0
}

# Funkcja do testowania frontendu
test_frontend() {
  print_message "Testowanie frontendu..."
  
  # Sprawdzenie czy kontener frontendu jest uruchomiony
  if ! docker-compose ps | grep -q "frontend.*Up"; then
    print_error "Kontener frontendu nie jest uruchomiony."
    return 1
  fi
  
  # Testowanie dostępności frontendu
  local frontend_url="http://localhost:3000"
  
  if ! test_connection "Frontend" "$frontend_url" 5; then
    return 1
  fi
  
  print_success "Frontend działa poprawnie!"
  return 0
}

# Funkcja do testowania Portainer
test_portainer() {
  print_message "Testowanie Portainer..."
  
  # Sprawdzenie czy kontener Portainer jest uruchomiony
  if ! docker-compose ps | grep -q "portainer.*Up"; then
    print_error "Kontener Portainer nie jest uruchomiony."
    return 1
  fi
  
  # Testowanie dostępności Portainer
  local portainer_url="http://localhost:9000"
  
  if ! test_connection "Portainer" "$portainer_url" 5; then
    return 1
  fi
  
  print_success "Portainer działa poprawnie!"
  return 0
}

# Funkcja do uruchamiania wszystkich testów
run_all_tests() {
  print_message "Uruchamianie wszystkich testów..."
  
  local all_passed=true
  
  # Uruchomienie aplikacji w trybie deweloperskim
  print_message "Uruchamianie aplikacji w trybie deweloperskim..."
  docker-compose up -d
  
  # Oczekiwanie na uruchomienie wszystkich kontenerów
  print_message "Oczekiwanie na uruchomienie wszystkich kontenerów..."
  sleep 30
  
  # Testowanie bazy danych
  if ! test_database; then
    all_passed=false
  fi
  
  # Testowanie backendu
  if ! test_backend; then
    all_passed=false
  fi
  
  # Testowanie frontendu
  if ! test_frontend; then
    all_passed=false
  fi
  
  # Testowanie Portainer
  if ! test_portainer; then
    all_passed=false
  fi
  
  if $all_passed; then
    print_success "Wszystkie testy zakończone pomyślnie!"
    return 0
  else
    print_error "Niektóre testy nie powiodły się. Sprawdź logi, aby uzyskać więcej informacji."
    return 1
  fi
}

# Główna logika skryptu
case "$1" in
  database)
    test_database
    ;;
  backend)
    test_backend
    ;;
  frontend)
    test_frontend
    ;;
  portainer)
    test_portainer
    ;;
  all|*)
    run_all_tests
    ;;
esac

exit 0
