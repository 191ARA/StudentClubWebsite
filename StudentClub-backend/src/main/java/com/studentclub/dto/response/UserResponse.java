package com.studentclub.dto.response;

import com.studentclub.model.UserRole;
import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class UserResponse {
    private UUID id;
    private String email;
    private UserRole role;

    // Вкладываем DTO клуба, а не саму сущность из БД
    private ClubResponse club;
}