package com.learning.javainterviewquestions.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.learning.javainterviewquestions.entities.QuestionEntity;

public interface QuestionRepository extends  JpaRepository < QuestionEntity, Long >{

    List<QuestionEntity> findByTopic ( String topic );
    
}
