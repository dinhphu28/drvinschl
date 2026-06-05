package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.Contract;
import com.dinhphu28.drvinschl.entity.User;

public interface ContractRepository extends JpaRepository<Contract, UUID> {
    List<Contract> findBySales(User sales);
}
