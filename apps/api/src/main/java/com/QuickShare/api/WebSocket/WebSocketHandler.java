package com.QuickShare.api.WebSocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();

    public void notifyClient(String connectionId, String message) throws IOException {
        WebSocketSession session = sessions.get(connectionId);
        System.out.println("session: " + session + " message: " + message + " connectionId: " + connectionId);
        if(session != null && session.isOpen()) {
            System.out.println("Sending " + message);
            session.sendMessage(new TextMessage(message));
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Connected");
        System.out.println("session: " + session + " sessionId: " + session.getId());
        String connectionId = getConnectionIdFromQuery(session.getUri());
        if (connectionId != null) {
            sessions.put(connectionId, session);
            System.out.println("WebSocket opened for: " + connectionId);
        }
    }

    private String getConnectionIdFromQuery(URI uri) {
        if (uri == null) return null;

        String query = uri.getQuery(); // e.g., connectionId=abc-123
        if (query == null) return null;

        for (String param : query.split("&")) {
            String[] parts = param.split("=");
            if (parts.length == 2 && parts[0].equals("connectionId")) {
                return parts[1];
            }
        }
        return null;
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
