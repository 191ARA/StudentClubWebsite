package com.studentclub.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class EventResponse {
    private UUID id;
    private String title;
    private String description;
    private LocalDateTime eventDate;
    private ClubResponse club;

    // ДОБАВИТЬ ЭТО:
    private String organizerName;
}