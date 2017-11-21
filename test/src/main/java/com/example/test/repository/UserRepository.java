package com.example.test.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.test.model.Login;

public interface UserRepository extends CrudRepository<Login, Integer>{
	@Query("Select c from Login c where username= :username and password= :password")
	public Login getuser(@Param("username") String username, @Param("password") String password);	
	

	@Query("Select c from Login c where username= :username")
	public Login getuserDet(@Param("username") String username);
}
