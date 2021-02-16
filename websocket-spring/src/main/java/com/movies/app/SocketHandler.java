package com.movies.app;

import com.google.gson.Gson;
import com.movies.app.config.CommendHandlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {

	CommendHandlerService commendHandlerService;

    public SocketHandler() {
		System.out.println("socket object created");
	}
	public SocketHandler(CommendHandlerService commendHandlerService) {
		this.commendHandlerService = commendHandlerService;
	}
	
		List<WebSocketSession> sessions = new CopyOnWriteArrayList();

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {

		Map<String, String> value = new Gson().fromJson(message.getPayload(), Map.class);
		System.out.println(value.toString());
		//System.out.println(new TextMessage());
		//String str = message.getPayload().replaceAll("\\\\", "");

       Object obj = commendHandlerService.execute(message.getPayload());
       String json = new Gson().toJson(obj);
       session.sendMessage(new TextMessage(json));
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

}