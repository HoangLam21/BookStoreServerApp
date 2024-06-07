package com.team.bookstore.Services;

import com.team.bookstore.Dtos.Requests.MessageRequest;
import com.team.bookstore.Dtos.Responses.MessageResponse;
import com.team.bookstore.Entities.Message;
import com.team.bookstore.Mappers.MessageMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@Log4j2
public class ChatController {
    @Autowired
    MessageMapper messageMapper;
    @Autowired
    MessageService messageService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(MessageRequest messageRequest) {
        try {
            Message         message     = messageMapper.toMessage(messageRequest);
            MessageResponse response    = messageService.createMessage(message);
            String          destination = "/queue/" + message.getReceiver().getUsername();
            messagingTemplate.convertAndSend(destination, response);
        } catch (Exception e) {
            log.info(e);
            throw e;
        }
    }

    @MessageMapping("/chat.addUser")
    public void addUser(MessageRequest messageRequest) {
        String destination = "/topic/public";
        messagingTemplate.convertAndSend(destination,
                messageMapper.toMessage(messageRequest));
    }

}
