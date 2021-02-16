package com.movies.app;

import com.movies.app.config.CommendHandlerService;
import com.movies.app.config.WebsocketInterceptors;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer, InitializingBean {

	@Autowired
	WebsocketInterceptors websocketInterceptors;

	@Autowired
	CommendHandlerService commendHandlerService;

	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new SocketHandler(commendHandlerService), "/movie").addInterceptors(websocketInterceptors).setAllowedOrigins("*");
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		System.out.println("test comments");
		System.out.println(commendHandlerService);

	}
}