package com.learning.javainterviewquestions.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.learning.javainterviewquestions.entities.QuestionEntity;

public interface QuestionRepository extends CrudRepository< QuestionEntity, Long >{

    List<QuestionEntity> findByTopic ( String topic );
    
}
