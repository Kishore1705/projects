package com.example.test.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Table(name = "login")
@Entity
public class Login implements Serializable{
private static final long serialVersionUID = 4256464694078512928L;
	
	@GeneratedValue(strategy = GenerationType.IDENTITY,generator = "login_gen")
    @SequenceGenerator(name = "login_gen", sequenceName ="login_seq")
	
	@Id
	@Column(name="loginid")
	private Integer loginid;
	
	@Column(name="created",updatable = false)
	private Date created;
	
	@Column(name="modified")
	private Date modified;
	
	@Column(name="firstname")
	private String firstname;
	

	@Column(name="lastname")
	private String lastname;
	

	@Column(name="username")
	private String username;
	

	@Column(name="password")
	private String password;


	public Integer getLoginid() {
		return loginid;
	}


	public void setLoginid(Integer loginid) {
		this.loginid = loginid;
	}


	public Date getCreated() {
		return created;
	}


	public void setCreated(Date created) {
		this.created = created;
	}


	public Date getModified() {
		return modified;
	}


	public void setModified(Date modified) {
		this.modified = modified;
	}


	public String getFirstname() {
		return firstname;
	}


	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}


	public String getLastname() {
		return lastname;
	}


	public void setLastname(String lastname) {
		this.lastname = lastname;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
}
