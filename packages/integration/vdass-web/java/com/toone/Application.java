package com.toone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
@ServletComponentScan
public class Application {

	public static void main(String[] args) throws Exception {

		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
		System.out.println(context);
	}

}
