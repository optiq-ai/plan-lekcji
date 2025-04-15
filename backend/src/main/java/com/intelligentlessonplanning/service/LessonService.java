package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.LessonDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.*;
import com.intelligentlessonplanning.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final LessonPlanRepository lessonPlanRepository;
    private final ClassRepository classRepository;
    private final SubjectRepository subjectRepository;
    private final TeacherRepository teacherRepository;
    private final RoomRepository roomRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public LessonService(LessonRepository lessonRepository,
                        LessonPlanRepository lessonPlanRepository,
                        ClassRepository classRepository,
                        SubjectRepository subjectRepository,
                        TeacherRepository teacherRepository,
                        RoomRepository roomRepository,
                        TimeSlotRepository timeSlotRepository,
                        ModelMapper modelMapper) {
        this.lessonRepository = lessonRepository;
        this.lessonPlanRepository = lessonPlanRepository;
        this.classRepository = classRepository;
        this.subjectRepository = subjectRepository;
        this.teacherRepository = teacherRepository;
        this.roomRepository = roomRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.modelMapper = modelMapper;
    }

    public List<LessonDto> getAllLessons() {
        return lessonRepository.findAll().stream()
                .map(lesson -> modelMapper.map(lesson, LessonDto.class))
                .collect(Collectors.toList());
    }

    public LessonDto getLessonById(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));
        return modelMapper.map(lesson, LessonDto.class);
    }

    public List<LessonDto> getLessonsByLessonPlan(Long lessonPlanId) {
        return lessonRepository.findByLessonPlanId(lessonPlanId).stream()
                .map(lesson -> modelMapper.map(lesson, LessonDto.class))
                .collect(Collectors.toList());
    }

    public List<LessonDto> getLessonsByClass(Long classId) {
        return lessonRepository.findByClassEntityId(classId).stream()
                .map(lesson -> modelMapper.map(lesson, LessonDto.class))
                .collect(Collectors.toList());
    }

    public List<LessonDto> getLessonsByTeacher(Long teacherId) {
        return lessonRepository.findByTeacherId(teacherId).stream()
                .map(lesson -> modelMapper.map(lesson, LessonDto.class))
                .collect(Collectors.toList());
    }

    public List<LessonDto> getLessonsByRoom(Long roomId) {
        return lessonRepository.findByRoomId(roomId).stream()
                .map(lesson -> modelMapper.map(lesson, LessonDto.class))
                .collect(Collectors.toList());
    }
    
    public List<LessonDto> getLessonsBySubject(Long subjectId) {
        return lessonRepository.findBySubjectId(subjectId).stream()
                .map(lesson -> modelMapper.map(lesson, LessonDto.class))
                .collect(Collectors.toList());
    }
    
    public List<LessonDto> getLessonsByDayOfWeek(DayOfWeek dayOfWeek) {
        return lessonRepository.findByDayOfWeekAndTimeSlotId(dayOfWeek.getValue(), null).stream()
                .map(lesson -> modelMapper.map(lesson, LessonDto.class))
                .collect(Collectors.toList());
    }

    public List<LessonDto> getLessonsByDayAndTimeSlot(Integer dayOfWeek, Long timeSlotId) {
        return lessonRepository.findByDayOfWeekAndTimeSlotId(dayOfWeek, timeSlotId).stream()
                .map(lesson -> modelMapper.map(lesson, LessonDto.class))
                .collect(Collectors.toList());
    }

    public LessonDto createLesson(LessonDto lessonDto) {
        Lesson lesson = new Lesson();
        lesson.setDayOfWeek(lessonDto.getDayOfWeek());
        
        // Set LessonPlan
        if (lessonDto.getLessonPlan() != null && lessonDto.getLessonPlan().getId() != null) {
            LessonPlan lessonPlan = lessonPlanRepository.findById(lessonDto.getLessonPlan().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("LessonPlan not found with id: " + lessonDto.getLessonPlan().getId()));
            lesson.setLessonPlan(lessonPlan);
        }
        
        // Set Class
        if (lessonDto.getClassEntity() != null && lessonDto.getClassEntity().getId() != null) {
            com.intelligentlessonplanning.model.Class classEntity = classRepository.findById(lessonDto.getClassEntity().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Class not found with id: " + lessonDto.getClassEntity().getId()));
            lesson.setClassEntity(classEntity);
        }
        
        // Set Subject
        if (lessonDto.getSubject() != null && lessonDto.getSubject().getId() != null) {
            Subject subject = subjectRepository.findById(lessonDto.getSubject().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + lessonDto.getSubject().getId()));
            lesson.setSubject(subject);
        }
        
        // Set Teacher
        if (lessonDto.getTeacher() != null && lessonDto.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(lessonDto.getTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + lessonDto.getTeacher().getId()));
            lesson.setTeacher(teacher);
        }
        
        // Set Room
        if (lessonDto.getRoom() != null && lessonDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(lessonDto.getRoom().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + lessonDto.getRoom().getId()));
            lesson.setRoom(room);
        }
        
        // Set TimeSlot
        if (lessonDto.getTimeSlot() != null && lessonDto.getTimeSlot().getId() != null) {
            TimeSlot timeSlot = timeSlotRepository.findById(lessonDto.getTimeSlot().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found with id: " + lessonDto.getTimeSlot().getId()));
            lesson.setTimeSlot(timeSlot);
        }
        
        Lesson savedLesson = lessonRepository.save(lesson);
        return modelMapper.map(savedLesson, LessonDto.class);
    }

    public LessonDto updateLesson(Long id, LessonDto lessonDto) {
        Lesson existingLesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));
        
        existingLesson.setDayOfWeek(lessonDto.getDayOfWeek());
        
        // Update LessonPlan
        if (lessonDto.getLessonPlan() != null && lessonDto.getLessonPlan().getId() != null) {
            LessonPlan lessonPlan = lessonPlanRepository.findById(lessonDto.getLessonPlan().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("LessonPlan not found with id: " + lessonDto.getLessonPlan().getId()));
            existingLesson.setLessonPlan(lessonPlan);
        }
        
        // Update Class
        if (lessonDto.getClassEntity() != null && lessonDto.getClassEntity().getId() != null) {
            com.intelligentlessonplanning.model.Class classEntity = classRepository.findById(lessonDto.getClassEntity().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Class not found with id: " + lessonDto.getClassEntity().getId()));
            existingLesson.setClassEntity(classEntity);
        }
        
        // Update Subject
        if (lessonDto.getSubject() != null && lessonDto.getSubject().getId() != null) {
            Subject subject = subjectRepository.findById(lessonDto.getSubject().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + lessonDto.getSubject().getId()));
            existingLesson.setSubject(subject);
        }
        
        // Update Teacher
        if (lessonDto.getTeacher() != null && lessonDto.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(lessonDto.getTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + lessonDto.getTeacher().getId()));
            existingLesson.setTeacher(teacher);
        }
        
        // Update Room
        if (lessonDto.getRoom() != null && lessonDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(lessonDto.getRoom().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + lessonDto.getRoom().getId()));
            existingLesson.setRoom(room);
        }
        
        // Update TimeSlot
        if (lessonDto.getTimeSlot() != null && lessonDto.getTimeSlot().getId() != null) {
            TimeSlot timeSlot = timeSlotRepository.findById(lessonDto.getTimeSlot().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found with id: " + lessonDto.getTimeSlot().getId()));
            existingLesson.setTimeSlot(timeSlot);
        }
        
        Lesson updatedLesson = lessonRepository.save(existingLesson);
        return modelMapper.map(updatedLesson, LessonDto.class);
    }

    public void deleteLesson(Long id) {
        if (!lessonRepository.existsById(id)) {
            throw new ResourceNotFoundException("Lesson not found with id: " + id);
        }
        lessonRepository.deleteById(id);
    }
}
