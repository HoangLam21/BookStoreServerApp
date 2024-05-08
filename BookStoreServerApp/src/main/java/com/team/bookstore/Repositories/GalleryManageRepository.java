package com.team.bookstore.Repositories;

import com.team.bookstore.Entities.GalleryManage;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryManageRepository extends JpaRepository<GalleryManage,Integer> {
    GalleryManage findGalleryManageById(int id);
    Boolean existsById(int id);
    List<GalleryManage> findAll(Specification<GalleryManage> spec);
}
