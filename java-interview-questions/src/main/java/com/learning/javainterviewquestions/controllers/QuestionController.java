package com.learning.javainterviewquestions.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

            return ResponseEntity.ok(
                (questionModelAssembler.toModel( questionService.save ( questionEntity ) )));
             
    }

    @PostMapping("question/create/many")
    public ResponseEntity<CollectionModel<QuestionModel>> save( @RequestBody List< QuestionEntity> questionEntities ) {

            return ResponseEntity.ok(
                (questionModelAssembler.toCollectionModel( questionService.save ( questionEntities ) )));
             
    }

    @PutMapping("question/update")
    public ResponseEntity<QuestionModel> update( @RequestBody QuestionEntity questionEntity) {

            return ResponseEntity.ok(
                (questionModelAssembler.toModel( questionService.save ( questionEntity ) )));
             
    }

    @DeleteMapping("question/{id}/delete")
    public ResponseEntity<QuestionModel> deleteById( @PathVariable(value = "id") Long id ){
        ResponseEntity<QuestionModel> model = questionService.findById( id )
            .map( questionModelAssembler :: toModel )
            .map( ResponseEntity :: ok)
            .orElse( ResponseEntity.notFound().build());
        
       return questionService.deleteById(id) ? model : ResponseEntity.notFound().build();
            
    }

    @GetMapping("question/all")
    public ResponseEntity<CollectionModel<QuestionModel>> findAll() {
        List<QuestionEntity> questionEntities = questionService.findAll();
        
        return new ResponseEntity<>(
            questionModelAssembler.toCollectionModel(questionEntities),
            HttpStatus.OK
        );
    }

}
