package com.QuickShare.api.WebSocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Connected to " + session.getRemoteAddress());
    }

    @Override
    protected void handleTextMessage(WebSocketSession socketSession, TextMessage message) throws IOException
    {
        Map<String, String> data = mapper.readValue(message.getPayload(), Map.class);
        String connectionId = data.get("connectionId");

        if (connectionId != null) {
            sessions.put(connectionId, socketSession);
            System.out.println("User connected with ID: " + connectionId);
        }

        socketSession.sendMessage(new TextMessage("Connected with ID: " + connectionId));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession socketSession, CloseStatus status) {
        sessions.values().remove(socketSession);
        System.out.println("Disconnected from " + socketSession.getId());
    }
}
