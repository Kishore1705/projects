package com.example.test.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.model.Login;
import com.example.test.model.Response;
import com.example.test.repository.UserRepository;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.security.Key;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/user")
public class LoginController {
	
	static Logger log = Logger.getLogger(LoginController.class.getName());
	
	@Autowired
	UserRepository userRepo;
	
	@ResponseBody
	@RequestMapping(value="/login",method = RequestMethod.POST)
	public Response  userLogin(@RequestBody Login login){
		log.info(login.getUsername() + login.getPassword());
		Login userDet = new Login();
		Response res = new Response();
		try{
			userDet = userRepo.getuser(login.getUsername(), login.getPassword());
			log.info(userDet);
			if(userDet != null){
				log.info("if enetered");
				Key key = MacProvider.generateKey();

				String compactJws = Jwts.builder()
				  .setSubject("{username: "+userDet.getFirstname()+"}")
				  .signWith(SignatureAlgorithm.HS512, key)
				  .compact();
				res.setStatus(200);
				res.setMessage("Login Success");
				res.setAuth_token(compactJws);
			}else{
				log.info("else enetered");
				res.setStatus(422);
			}
		}catch (Exception e) {
			log.info(e.getMessage());
			res.setStatus(422);
			res.setMessage("Login Failed");
		}
		log.info("returning " + res.getStatus());
		return res;
	}
	
	@RequestMapping(value="/register",method = RequestMethod.POST)
	public Response  userRegister(@RequestBody Login register){
		log.info("User register");
		log.info(register.getUsername() + register.getPassword());
		log.info(register.getFirstname() + register.getLastname());
		Login userDet = new Login();
		Response res = new Response();
		try{
			userDet = userRepo.getuserDet(register.getUsername());
			log.info(userDet);
			if(userDet == null){
				log.info("if entered");
				userRepo.save(register);
				res.setStatus(200);
				res.setMessage("Registartion Success");
				return res;
			}
		}catch (Exception e) {
			log.info(e.getMessage());
			res.setStatus(422);
			res.setMessage("Registartion Failed");
		}
		return res;
	}
	

}
