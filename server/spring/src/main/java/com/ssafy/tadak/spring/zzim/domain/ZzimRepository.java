package com.ssafy.tadak.spring.zzim.domain;

import com.ssafy.tadak.spring.zzim.domain.entity.Zzim;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ZzimRepository extends JpaRepository<Zzim, Long> {

    void findByOwnerId(Long ownerId);

    List<Zzim> findAllByOwnerId(long ownerId);

    Optional<Zzim> findByProductIdAndOwnerId(long productId, long userId);

    int countByOwnerId(long l);
}
