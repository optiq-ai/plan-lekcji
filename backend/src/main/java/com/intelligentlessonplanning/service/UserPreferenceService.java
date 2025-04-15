package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.UserPreferenceDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.User;
import com.intelligentlessonplanning.model.UserPreference;
import com.intelligentlessonplanning.repository.UserPreferenceRepository;
import com.intelligentlessonplanning.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserPreferenceService {

    private final UserPreferenceRepository userPreferenceRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserPreferenceService(UserPreferenceRepository userPreferenceRepository,
                               UserRepository userRepository,
                               ModelMapper modelMapper) {
        this.userPreferenceRepository = userPreferenceRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public List<UserPreferenceDto> getAllUserPreferences() {
        return userPreferenceRepository.findAll().stream()
                .map(userPreference -> modelMapper.map(userPreference, UserPreferenceDto.class))
                .collect(Collectors.toList());
    }

    public UserPreferenceDto getUserPreferenceById(Long id) {
        UserPreference userPreference = userPreferenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserPreference not found with id: " + id));
        return modelMapper.map(userPreference, UserPreferenceDto.class);
    }

    public List<UserPreferenceDto> getUserPreferencesByUser(Long userId) {
        return userPreferenceRepository.findByUserId(userId).stream()
                .map(userPreference -> modelMapper.map(userPreference, UserPreferenceDto.class))
                .collect(Collectors.toList());
    }

    public List<UserPreferenceDto> getUserPreferencesByPreferenceKey(String preferenceKey) {
        return userPreferenceRepository.findByPreferenceKey(preferenceKey).stream()
                .map(userPreference -> modelMapper.map(userPreference, UserPreferenceDto.class))
                .collect(Collectors.toList());
    }
    
    public List<UserPreferenceDto> getUserPreferencesByKey(String preferenceKey) {
        return getUserPreferencesByPreferenceKey(preferenceKey);
    }

    public UserPreferenceDto createUserPreference(UserPreferenceDto userPreferenceDto) {
        UserPreference userPreference = new UserPreference();
        userPreference.setPreferenceKey(userPreferenceDto.getPreferenceKey());
        userPreference.setPreferenceValue(userPreferenceDto.getPreferenceValue());
        
        // Set User
        if (userPreferenceDto.getUser() != null && userPreferenceDto.getUser().getId() != null) {
            User user = userRepository.findById(userPreferenceDto.getUser().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userPreferenceDto.getUser().getId()));
            userPreference.setUser(user);
        }
        
        UserPreference savedUserPreference = userPreferenceRepository.save(userPreference);
        return modelMapper.map(savedUserPreference, UserPreferenceDto.class);
    }

    public UserPreferenceDto updateUserPreference(Long id, UserPreferenceDto userPreferenceDto) {
        UserPreference existingUserPreference = userPreferenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserPreference not found with id: " + id));
        
        existingUserPreference.setPreferenceKey(userPreferenceDto.getPreferenceKey());
        existingUserPreference.setPreferenceValue(userPreferenceDto.getPreferenceValue());
        
        // Update User
        if (userPreferenceDto.getUser() != null && userPreferenceDto.getUser().getId() != null) {
            User user = userRepository.findById(userPreferenceDto.getUser().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userPreferenceDto.getUser().getId()));
            existingUserPreference.setUser(user);
        }
        
        UserPreference updatedUserPreference = userPreferenceRepository.save(existingUserPreference);
        return modelMapper.map(updatedUserPreference, UserPreferenceDto.class);
    }

    public void deleteUserPreference(Long id) {
        if (!userPreferenceRepository.existsById(id)) {
            throw new ResourceNotFoundException("UserPreference not found with id: " + id);
        }
        userPreferenceRepository.deleteById(id);
    }
}
