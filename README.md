# Intelligent Lesson Planning

Inteligentny system planowania lekcji dla szkół w Polsce.

## Opis projektu

Aplikacja do inteligentnego planowania lekcji to kompleksowe rozwiązanie dla szkół, które umożliwia efektywne zarządzanie planem zajęć. System wykorzystuje zaawansowane algorytmy i sztuczną inteligencję do optymalizacji planu lekcji, uwzględniając dostępność nauczycieli, sal lekcyjnych oraz preferencje dotyczące rozkładu przedmiotów.

## Funkcjonalności

- Zarządzanie szkołami, klasami i nauczycielami
- Zarządzanie przedmiotami i salami lekcyjnymi
- Tworzenie i optymalizacja planów lekcji
- Zarządzanie zastępstwami
- Konfiguracja parametrów planu
- Zarządzanie dostępnością nauczycieli i sal
- Zarządzanie preferencjami użytkowników
- Asystent AI do optymalizacji planu
- Zaawansowana analityka i wizualizacja danych

## Technologie

- Frontend: React
- Backend: Spring Boot
- Baza danych: PostgreSQL
- Konteneryzacja: Docker, Docker Compose
- Zarządzanie kontenerami: Portainer

## Struktura projektu

```
intelligent-lesson-planning/
├── backend/                # Aplikacja backendowa Spring Boot
│   ├── src/                # Kod źródłowy backendu
│   ├── pom.xml             # Konfiguracja Maven
│   └── Dockerfile          # Konfiguracja obrazu Docker dla backendu
├── frontend/               # Aplikacja frontendowa React
│   ├── public/             # Pliki statyczne
│   ├── src/                # Kod źródłowy frontendu
│   ├── package.json        # Zależności npm
│   ├── Dockerfile          # Konfiguracja obrazu Docker dla frontendu
│   └── nginx.conf          # Konfiguracja Nginx
├── db/                     # Skrypty inicjalizacyjne bazy danych
│   └── init.sql            # Skrypt inicjalizacyjny SQL
├── docker-compose.yml      # Konfiguracja Docker Compose
├── portainer-stack.yml     # Konfiguracja stosu Portainer
├── .env                    # Zmienne środowiskowe
├── .env.example            # Przykładowe zmienne środowiskowe
├── deploy.sh               # Skrypt do wdrażania aplikacji
├── deploy-prod.sh          # Skrypt do wdrażania w środowisku produkcyjnym
└── test.sh                 # Skrypt do testowania aplikacji
```

## Instalacja i uruchomienie

### Wymagania

- Docker
- Docker Compose
- Git

### Uruchomienie w środowisku deweloperskim

1. Sklonuj repozytorium:
   ```
   git clone https://github.com/optiq-ai/plan-lekcji.git
   cd plan-lekcji
   ```

2. Utwórz plik `.env` na podstawie `.env.example`:
   ```
   cp .env.example .env
   ```

3. Uruchom aplikację w trybie deweloperskim:
   ```
   ./deploy.sh dev
   ```

4. Aplikacja będzie dostępna pod adresami:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080
   - Portainer: http://localhost:9000

### Uruchomienie w środowisku produkcyjnym

1. Sklonuj repozytorium:
   ```
   git clone https://github.com/optiq-ai/plan-lekcji.git
   cd plan-lekcji
   ```

2. Utwórz plik `.env` na podstawie `.env.example` i dostosuj zmienne środowiskowe:
   ```
   cp .env.example .env
   nano .env
   ```

3. Uruchom aplikację w trybie produkcyjnym:
   ```
   ./deploy.sh prod
   ```

4. Lub użyj skryptu do wdrożenia produkcyjnego z tworzeniem kopii zapasowych:
   ```
   ./deploy-prod.sh
   ```

5. Aplikacja będzie dostępna pod adresami:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080
   - Portainer: http://localhost:9000

### Wdrożenie za pomocą Portainer

1. Uruchom Portainer:
   ```
   ./deploy.sh portainer
   ```

2. Zaloguj się do Portainer pod adresem http://localhost:9000

3. Utwórz nowy stos (stack) i użyj pliku `portainer-stack.yml`

## Testowanie

Aby przetestować aplikację, użyj skryptu `test.sh`:

```
./test.sh
```

Możesz również testować poszczególne komponenty:

```
./test.sh database   # Test bazy danych
./test.sh backend    # Test backendu
./test.sh frontend   # Test frontendu
./test.sh portainer  # Test Portainer
```

## Licencja

Ten projekt jest objęty licencją [MIT](LICENSE).
