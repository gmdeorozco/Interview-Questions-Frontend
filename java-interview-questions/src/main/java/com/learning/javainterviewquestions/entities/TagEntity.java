package com.learning.javainterviewquestions.entities;

import java.util.List;

import org.hibernate.resource.beans.internal.FallbackBeanInstanceProducer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Data;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class TagEntity {
    @Id
    Long id;

    @Column(nullable = false)
    TagEnum value;
}
