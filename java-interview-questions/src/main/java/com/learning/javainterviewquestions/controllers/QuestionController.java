package com.learning.javainterviewquestions.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.javainterviewquestions.assemblers.QuestionModelAssembler;
import com.learning.javainterviewquestions.entities.QuestionEntity;
import com.learning.javainterviewquestions.models.QuestionModel;
import com.learning.javainterviewquestions.services.QuestionService;

@RestController
@RequestMapping( "/api/v1" )
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @Autowired
    QuestionModelAssembler questionModelAssembler;

    @GetMapping("/question/{id}")
    public ResponseEntity<QuestionModel> findById( @PathVariable (value = "id") Long id) {
        return questionService.findById( id )
            .map( questionModelAssembler :: toModel )
            .map( ResponseEntity :: ok)
            .orElse( ResponseEntity.notFound().build());
    }

    @PostMapping("question/create")
    public ResponseEntity<QuestionModel> save( @RequestBody QuestionEntity questionEntity) {

        questionEntity = questionService.save ( questionEntity );


            return ResponseEntity.ok((questionModelAssembler.toModel( questionEntity )));
             
    }

}
