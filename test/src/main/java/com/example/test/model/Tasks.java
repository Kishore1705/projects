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

@Table(name = "task")
@Entity
public class Tasks implements Serializable{
private static final long serialVersionUID = 4256464694078512928L;
	
	@GeneratedValue(strategy = GenerationType.IDENTITY,generator = "task_taskid_gen")
    @SequenceGenerator(name = "task_taskid_gen", sequenceName ="task_taskid_seq")
	
	@Id
	@Column(name="taskid")
	private Integer taskid;
	
	@Column(name="created",updatable = false)
	private Date created;
	
	@Column(name="modified")
	private Date modified;
	
	@Column(name="objective")
	private String objective;
	
	@Column(name="status")
	private String status;
	
	@Column(name="name")
	private String name;
	
	@Column(name="starttime")
	private String starttime;
	

	@Column(name="startdate")
	private String startdate;
	
	@Column(name="endtime")
	private String endtime;
	

	@Column(name="enddate")
	private String enddate;
	
	
	public String getStartdate() {
		return startdate;
	}

	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	public String getEnddate() {
		return enddate;
	}

	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}

	public String getObjective() {
		return objective;
	}

	public void setObjective(String objective) {
		this.objective = objective;
	}

	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getEndtime() {
		return endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	public Integer getTaskid() {
		return taskid;
	}

	public void setTaskid(Integer taskid) {
		this.taskid = taskid;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/**
     * On create.
     */
    @PrePersist
    protected void onCreate()  
    {
    	modified = created =new Date();
    }

    /**
     * On update.
     */
    @PreUpdate
    protected void onUpdate() 
    {
    	modified =new Date();
    }
    
    /**
     * Gets the created.
     *
     * @return     The created
     */
    public Date getCreated() 
    {
        return created;
    }

    /**
     * Sets the created.
     *
     * @param created     The created
     */
    public void setCreated(Date created) 
    {
        this.created = created;
    }
    

    /**
     * Gets the modified.
     *
     * @return     The modified
     */
    public Date getModified() 
    {
        return modified;
    }

    /**
     * Sets the modified.
     *
     * @param modified     The modified
     */
    public void setModified(Date modified) 
    {
        this.modified = modified;
    }
}
