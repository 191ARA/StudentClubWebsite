package com.studentclub.service;

import com.studentclub.model.Club;
import com.studentclub.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;

    public Club createClub(Club club) {
        return clubRepository.save(club);
    }

    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    public Club getClubById(UUID id) {
        return clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Клуб не найден"));
    }

    public Club updateClub(UUID id, Club updatedClub) {
        Club club = getClubById(id);
        club.setName(updatedClub.getName());
        club.setDescription(updatedClub.getDescription());
        return clubRepository.save(club);
    }

    public void deleteClub(UUID id) {
        clubRepository.deleteById(id);
    }
}