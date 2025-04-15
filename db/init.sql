-- Database initialization script for Intelligent Lesson Planning application

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create schemas
CREATE SCHEMA IF NOT EXISTS lesson_planning;

-- Set search path
SET search_path TO lesson_planning, public;

-- Create tables

-- School types
CREATE TABLE IF NOT EXISTS school_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Schools
CREATE TABLE IF NOT EXISTS schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    school_type_id INTEGER REFERENCES school_types(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subjects
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    short_name VARCHAR(10),
    color VARCHAR(7),
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Teachers
CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    employment_type VARCHAR(50),
    hours_per_week INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Teacher subjects
CREATE TABLE IF NOT EXISTS teacher_subjects (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES teachers(id),
    subject_id INTEGER REFERENCES subjects(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (teacher_id, subject_id)
);

-- Classes
CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    school_id INTEGER REFERENCES schools(id),
    grade INTEGER,
    homeroom_teacher_id INTEGER REFERENCES teachers(id),
    students_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rooms
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    capacity INTEGER,
    room_type VARCHAR(50),
    building VARCHAR(50),
    floor INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Room equipment
CREATE TABLE IF NOT EXISTS room_equipment (
    id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES rooms(id),
    equipment_name VARCHAR(100) NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Time slots
CREATE TABLE IF NOT EXISTS time_slots (
    id SERIAL PRIMARY KEY,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_number INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (start_time, end_time)
);

-- Lesson plans
CREATE TABLE IF NOT EXISTS lesson_plans (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT false,
    plan_style VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Lessons
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    lesson_plan_id INTEGER REFERENCES lesson_plans(id),
    class_id INTEGER REFERENCES classes(id),
    subject_id INTEGER REFERENCES subjects(id),
    teacher_id INTEGER REFERENCES teachers(id),
    room_id INTEGER REFERENCES rooms(id),
    day_of_week INTEGER CHECK (day_of_week BETWEEN 1 AND 7),
    time_slot_id INTEGER REFERENCES time_slots(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Substitutions
CREATE TABLE IF NOT EXISTS substitutions (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lessons(id),
    substitute_teacher_id INTEGER REFERENCES teachers(id),
    substitute_room_id INTEGER REFERENCES rooms(id),
    date DATE NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Teacher availability
CREATE TABLE IF NOT EXISTS teacher_availability (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES teachers(id),
    day_of_week INTEGER CHECK (day_of_week BETWEEN 1 AND 7),
    time_slot_id INTEGER REFERENCES time_slots(id),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (teacher_id, day_of_week, time_slot_id)
);

-- Room availability
CREATE TABLE IF NOT EXISTS room_availability (
    id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES rooms(id),
    day_of_week INTEGER CHECK (day_of_week BETWEEN 1 AND 7),
    time_slot_id INTEGER REFERENCES time_slots(id),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (room_id, day_of_week, time_slot_id)
);

-- Teacher preferences
CREATE TABLE IF NOT EXISTS teacher_preferences (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES teachers(id),
    preference_type VARCHAR(50) NOT NULL,
    preference_value TEXT NOT NULL,
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Plan configurations
CREATE TABLE IF NOT EXISTS plan_configurations (
    id SERIAL PRIMARY KEY,
    lesson_plan_id INTEGER REFERENCES lesson_plans(id),
    config_key VARCHAR(100) NOT NULL,
    config_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (lesson_plan_id, config_key)
);

-- Events
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    event_type VARCHAR(50),
    is_all_day BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    teacher_id INTEGER REFERENCES teachers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User preferences
CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    preference_key VARCHAR(100) NOT NULL,
    preference_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, preference_key)
);

-- Insert default data

-- School types
INSERT INTO school_types (name, description) VALUES
('Przedszkole', 'Placówka dla dzieci w wieku 3-6 lat'),
('Szkoła podstawowa', 'Placówka dla dzieci w wieku 7-15 lat'),
('Liceum ogólnokształcące', 'Placówka dla młodzieży w wieku 15-19 lat'),
('Technikum', 'Placówka dla młodzieży w wieku 15-20 lat'),
('Szkoła branżowa I stopnia', 'Placówka dla młodzieży w wieku 15-18 lat'),
('Liceum wieczorowe', 'Placówka dla dorosłych')
ON CONFLICT DO NOTHING;

-- Time slots
INSERT INTO time_slots (start_time, end_time, slot_number) VALUES
('08:00', '08:45', 1),
('08:55', '09:40', 2),
('09:50', '10:35', 3),
('10:45', '11:30', 4),
('11:50', '12:35', 5),
('12:45', '13:30', 6),
('13:40', '14:25', 7),
('14:35', '15:20', 8),
('15:30', '16:15', 9)
ON CONFLICT DO NOTHING;

-- Subjects
INSERT INTO subjects (name, short_name, color, difficulty_level) VALUES
('Matematyka', 'MAT', '#4285F4', 5),
('Język polski', 'POL', '#EA4335', 4),
('Język angielski', 'ANG', '#FBBC05', 3),
('Fizyka', 'FIZ', '#34A853', 5),
('Chemia', 'CHE', '#8E24AA', 4),
('Biologia', 'BIO', '#43A047', 3),
('Geografia', 'GEO', '#FB8C00', 2),
('Historia', 'HIS', '#795548', 3),
('Informatyka', 'INF', '#00ACC1', 2),
('Wychowanie fizyczne', 'WF', '#9E9E9E', 1),
('Religia', 'REL', '#607D8B', 1)
ON CONFLICT DO NOTHING;
