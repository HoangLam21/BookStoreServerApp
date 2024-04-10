package com.team.bookstore.Mappers;

import com.team.bookstore.Dtos.Requests.PermissionRequest;
import com.team.bookstore.Dtos.Responses.PermissionResponse;
import com.team.bookstore.Entities.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest permissionRequest);
    PermissionResponse toPermissionResponse(Permission permission);
}
