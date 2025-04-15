package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.EventDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Event;
import com.intelligentlessonplanning.model.School;
import com.intelligentlessonplanning.repository.EventRepository;
import com.intelligentlessonplanning.repository.SchoolRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final SchoolRepository schoolRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public EventService(EventRepository eventRepository,
                       SchoolRepository schoolRepository,
                       ModelMapper modelMapper) {
        this.eventRepository = eventRepository;
        this.schoolRepository = schoolRepository;
        this.modelMapper = modelMapper;
    }

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(event -> modelMapper.map(event, EventDto.class))
                .collect(Collectors.toList());
    }

    public EventDto getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return modelMapper.map(event, EventDto.class);
    }

    public List<EventDto> getEventsBySchool(Long schoolId) {
        return eventRepository.findBySchoolId(schoolId).stream()
                .map(event -> modelMapper.map(event, EventDto.class))
                .collect(Collectors.toList());
    }

    public List<EventDto> getEventsByDateRange(LocalDate startDate, LocalDate endDate) {
        return eventRepository.findByEventDateBetween(startDate, endDate).stream()
                .map(event -> modelMapper.map(event, EventDto.class))
                .collect(Collectors.toList());
    }

    public List<EventDto> getEventsByType(String eventType) {
        return eventRepository.findByEventType(eventType).stream()
                .map(event -> modelMapper.map(event, EventDto.class))
                .collect(Collectors.toList());
    }

    public EventDto createEvent(EventDto eventDto) {
        Event event = new Event();
        event.setName(eventDto.getName());
        event.setDescription(eventDto.getDescription());
        event.setEventDate(eventDto.getEventDate());
        event.setEventType(eventDto.getEventType());
        event.setAffectsSchedule(eventDto.getAffectsSchedule());
        
        // Set School
        if (eventDto.getSchool() != null && eventDto.getSchool().getId() != null) {
            School school = schoolRepository.findById(eventDto.getSchool().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + eventDto.getSchool().getId()));
            event.setSchool(school);
        }
        
        Event savedEvent = eventRepository.save(event);
        return modelMapper.map(savedEvent, EventDto.class);
    }

    public EventDto updateEvent(Long id, EventDto eventDto) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        
        existingEvent.setName(eventDto.getName());
        existingEvent.setDescription(eventDto.getDescription());
        existingEvent.setEventDate(eventDto.getEventDate());
        existingEvent.setEventType(eventDto.getEventType());
        existingEvent.setAffectsSchedule(eventDto.getAffectsSchedule());
        
        // Update School
        if (eventDto.getSchool() != null && eventDto.getSchool().getId() != null) {
            School school = schoolRepository.findById(eventDto.getSchool().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + eventDto.getSchool().getId()));
            existingEvent.setSchool(school);
        }
        
        Event updatedEvent = eventRepository.save(existingEvent);
        return modelMapper.map(updatedEvent, EventDto.class);
    }

    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }
}
