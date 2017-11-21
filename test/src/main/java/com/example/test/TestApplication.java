package com.example.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class TestApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
	}
	
	@Bean
	  public WebMvcConfigurer corsConfigurer() {
	      return new WebMvcConfigurerAdapter() {
	          @Override
	          public void addCorsMappings(CorsRegistry registry) {
	              registry.addMapping("/user").allowedOrigins("http://localhost:9056");
	              registry.addMapping("/task").allowedOrigins("http://localhost:9056");
	          }	      
	      };
	}
}
