package com.studentclub.dto.response;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class ClubResponse {
    private UUID id;
    private String name;
    private String description;
}