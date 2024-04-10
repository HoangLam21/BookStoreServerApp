package com.team.bookstore.Mappers;

import com.team.bookstore.Dtos.Requests.RoleRequest;
import com.team.bookstore.Dtos.Responses.RoleResponse;
import com.team.bookstore.Entities.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleRequest roleRequest);
    RoleResponse toRoleResponse(RoleResponse roleResponse);
}
