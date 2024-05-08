package com.team.bookstore.Controllers;

import com.team.bookstore.Dtos.Responses.APIResponse;
import com.team.bookstore.Dtos.Responses.UserResponse;
import com.team.bookstore.Mappers.UserMapper;
import com.team.bookstore.Services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/user")
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    @Autowired
    UserMapper userMapper;
    @Autowired
    UserService userService;
    @GetMapping("/all")
    public ResponseEntity<APIResponse<?>> getAllUsers(){
        List<UserResponse> result = userService.getAllUser();
        return ResponseEntity.ok(APIResponse.builder().code(200).message("OK").result(result).build());
    }
    @GetMapping("/find")
    public ResponseEntity<APIResponse<?>> findUserBy(@RequestParam String keyword){
        return ResponseEntity.ok(APIResponse.builder().code(200).message("OK").result(userService.findUser(keyword)).build());
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<APIResponse<?>> deleteUser(@PathVariable int id){
        UserResponse result = userService.deleteUser(id);
        return ResponseEntity.ok(APIResponse.builder().code(200).message("OK").result(result).build());
    }
}
