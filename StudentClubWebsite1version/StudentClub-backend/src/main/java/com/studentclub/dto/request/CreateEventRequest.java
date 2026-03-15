package com.studentclub.dto.request;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CreateEventRequest {
    private String title;
    private String description;
    private LocalDateTime eventDate;
    private UUID clubId;
}