package com.QuickShare.api.Controller;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.QuickShare.api.WebSocket.WebSocketHandler;

import java.io.IOException;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {
    private static WebSocketHandler handler;

    @Autowired
    public SessionController(WebSocketHandler handler) {
        this.handler = handler;
    }

    @PostMapping("/connect/{connectionId}")
    public ResponseEntity<?> connect(@PathVariable String connectionId, HttpSession session) {
        System.out.println("Connecting to " + connectionId);
        try{
            handler.notifyClient(connectionId, "mobile_connected");
            System.out.println("sus " + connectionId);
            return ResponseEntity.ok("PC notified");
        }catch (IOException e){
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to notify PC " + e.getMessage());
        }
    }
}
