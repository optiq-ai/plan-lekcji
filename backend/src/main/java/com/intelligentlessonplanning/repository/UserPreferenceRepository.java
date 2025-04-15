package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {
    List<UserPreference> findByUserId(Long userId);
    Optional<UserPreference> findByUserIdAndPreferenceKey(Long userId, String preferenceKey);
    List<UserPreference> findByPreferenceKey(String preferenceKey);
}
