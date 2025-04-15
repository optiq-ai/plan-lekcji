package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.SchoolType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolTypeRepository extends JpaRepository<SchoolType, Long> {
    // Dodatkowe metody zapytań można dodać tutaj
}
