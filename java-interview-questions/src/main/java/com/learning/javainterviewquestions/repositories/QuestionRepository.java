package com.learning.javainterviewquestions.repositories;

import org.springframework.data.repository.CrudRepository;

import com.learning.javainterviewquestions.entities.QuestionEntity;

public interface QuestionRepository extends CrudRepository< QuestionEntity, Long >{
    
}
