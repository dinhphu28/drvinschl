package com.dinhphu28.drvinschl.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.model.CompletionStatsResponse;
import com.dinhphu28.drvinschl.model.ExamStatsResponse;
import com.dinhphu28.drvinschl.service.DirectorService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/director")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('GIAM_DOC')")
public class DirectorController {
    private final DirectorService directorService;

    @GetMapping("/overview")
    public Map<String, Object> getOverview() {
        return directorService.getSystemOverview();
    }

    @PutMapping("/salaries/{id}/approve")
    public SalaryRecord approveSalary(@PathVariable UUID id) {
        return directorService.approveSalary(id);
    }

    @GetMapping("/salaries/pending")
    public List<SalaryRecord> getPendingSalaries() {
        return directorService.getPendingSalaries();
    }

    @GetMapping("/exam-stats")
    public ExamStatsResponse getExamStats() {
        return directorService.getExamStats();
    }

    @GetMapping("/completion-stats")
    public CompletionStatsResponse getCompletionStats() {
        return directorService.getCompletionStats();
    }
}
