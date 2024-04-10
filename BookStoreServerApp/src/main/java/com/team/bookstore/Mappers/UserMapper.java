package com.team.bookstore.Mappers;

import com.team.bookstore.Dtos.Requests.UserRegisterRequest;
import com.team.bookstore.Dtos.Responses.UserResponse;
import com.team.bookstore.Entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserRegisterRequest userRegisterRequest);
    UserResponse toUserResponse(User user);
}
