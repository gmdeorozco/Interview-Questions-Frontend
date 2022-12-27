package com.learning.javainterviewquestions.entities;



public enum TagEnum {
    SPRING ( "SPRING" ),
    JAVA_CORE ( "JAVA_CORE" ),
    SPRING_JPA ( "SPRING_JPA");


    private String code;

    TagEnum( String code){
        this.code =  code;
    }

    public String getCode() {
        return code;
    }
}
