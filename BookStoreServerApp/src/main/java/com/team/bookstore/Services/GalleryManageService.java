package com.team.bookstore.Services;

import com.team.bookstore.Dtos.Responses.GalleryManageResponse;
import com.team.bookstore.Entities.GalleryManage;
import com.team.bookstore.Enums.ErrorCodes;
import com.team.bookstore.Enums.Object;
import com.team.bookstore.Exceptions.ApplicationException;
import com.team.bookstore.Exceptions.ObjectException;
import com.team.bookstore.Mappers.GalleryManageMapper;
import com.team.bookstore.Repositories.BookRepository;
import com.team.bookstore.Repositories.GalleryManageRepository;
import com.team.bookstore.Utilities.ImageUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static com.team.bookstore.Specifications.GallerySpecification.CreateGalleryKeywordSpec;

@Service
@Log4j2
public class GalleryManageService {
    @Autowired
    GalleryManageRepository galleryManageRepository;
    @Autowired
    GalleryManageMapper galleryManageMapper;
    @Autowired
    BookRepository bookRepository;
    public List<GalleryManageResponse> getAllGallery(){
        try{
            return galleryManageRepository.findAll().stream().map(galleryManageMapper::toGalleryManageResponse).collect(Collectors.toList());
        } catch(Exception e){
            log.info(e);
            throw new ObjectException(Object.GALLERY.getName(), ErrorCodes.NOT_EXIST);
        }
    }
    public List<GalleryManageResponse> findGalleriesBy(String keyword){
        try{
            Specification<GalleryManage> spec=
                    CreateGalleryKeywordSpec(keyword);
            return galleryManageRepository.findAll(spec).stream().map(galleryManageMapper::toGalleryManageResponse).collect(Collectors.toList());
        } catch(Exception e){
            log.info(e);
            throw new ObjectException(keyword, ErrorCodes.NOT_EXIST);
        }
    }
    @Secured("ROLE_ADMIN")
    public GalleryManageResponse addGallery(MultipartFile image,
                                            GalleryManage galleryManage){
        try{
            byte[] compressImage = ImageUtils.compressImage(image.getBytes(),
                    0.2f);
            galleryManage.setThumbnail(compressImage);
            return galleryManageMapper.toGalleryManageResponse(galleryManageRepository.save(galleryManage));
        }catch(Exception e){
            log.info(e);
            throw new ObjectException(Object.GALLERY.getName(),
                    ErrorCodes.CANNOT_CREATE);
        }
    }
    @Secured("ROLE_ADMIN")
    public GalleryManageResponse updateGallery(int id, MultipartFile image,
                                               GalleryManage galleryManage){
        try{
            byte[] compressImage = ImageUtils.compressImage(image.getBytes(),
                    0.2f);
            galleryManage.setThumbnail(compressImage);
            if(!galleryManageRepository.existsById(id)){
                throw new ObjectException(Object.GALLERY.getName(), ErrorCodes.NOT_EXIST);
            }
            if(!bookRepository.existsById(galleryManage.getBook().getId())){
                throw new ObjectException(Object.BOOK.getName(),
                        ErrorCodes.NOT_EXIST);
            }
            galleryManage.setId(id);
            return galleryManageMapper.toGalleryManageResponse(galleryManageRepository.save(galleryManage));
        }catch (Exception e){
            log.info(e);
            throw new ObjectException(Object.GALLERY.getName(), ErrorCodes.CANNOT_UPDATE);
        }
    }

    @Secured("ROLE_ADMIN")
    public GalleryManageResponse deleteGallery(int id){
        try{
            if(!galleryManageRepository.existsById(id)){
                throw new ObjectException(Object.GALLERY.getName(), ErrorCodes.NOT_EXIST);
            }
            GalleryManage existGalleryManage =
                    galleryManageRepository.findGalleryManageById(id);
            galleryManageRepository.delete(existGalleryManage);
            return galleryManageMapper.toGalleryManageResponse(existGalleryManage);
        }catch(Exception e){
            log.info(e);
            throw new ObjectException(Object.GALLERY.getName(), ErrorCodes.NOT_EXIST);
        }
    }
}
